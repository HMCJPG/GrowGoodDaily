/**
 * @module api/posts/index
 * @description Handles listing (GET) and creating (POST) blog posts.
 *
 * Storage strategy (Vercel KV):
 *   - `post:{slug}`   → full post JSON
 *   - `posts:slugs`   → JSON array of all slugs ordered by publishedDate desc
 */

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DB_FILE = '/tmp/growgood_posts.json';

// Basic KV mock using the filesystem
const kv = {
  async get(key) {
    try {
      if (!fs.existsSync(DB_FILE)) return null;
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      return data[key] || null;
    } catch { return null; }
  },
  async set(key, value) {
    try {
      let data = {};
      if (fs.existsSync(DB_FILE)) {
        data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      }
      data[key] = value;
      fs.writeFileSync(DB_FILE, JSON.stringify(data));
    } catch {}
  },
  async del(key) {
    try {
      if (!fs.existsSync(DB_FILE)) return;
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      delete data[key];
      fs.writeFileSync(DB_FILE, JSON.stringify(data));
    } catch {}
  }
};

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Apply CORS headers to the response. */
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

/**
 * Verify the Bearer token matches ADMIN_PASSWORD.
 * @param {import('@vercel/node').VercelRequest} req
 * @returns {boolean}
 */
function verifyAuth(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  return token === 'growgood2026';
}

/**
 * Derive a URL-safe slug from a title string.
 * @param {string} title
 * @returns {string}
 */
function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // remove special chars
    .replace(/[\s_]+/g, '-')    // spaces / underscores → hyphens
    .replace(/-+/g, '-')        // collapse consecutive hyphens
    .replace(/^-|-$/g, '');     // trim leading/trailing hyphens
}

// ─── Handler ────────────────────────────────────────────────────────────────

/**
 * Vercel serverless handler for /api/posts
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  setCors(res);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      return await handleGet(req, res);
    }

    if (req.method === 'POST') {
      return await handlePost(req, res);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Posts handler error:', err);
    return res.status(500).json({ error: err.message, stack: err.stack, name: err.name });
  }
}

// ─── GET /api/posts ─────────────────────────────────────────────────────────

/**
 * List posts with pagination, optional tag filter, and optional draft inclusion.
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
async function handleGet(req, res) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 6);
  const tagFilter = req.query.tag || null;
  const includeAll = req.query.all === 'true';
  const isAuthed = verifyAuth(req);

  // Fetch ordered slug list
  const slugs = (await kv.get('posts:slugs')) || [];

  // Fetch all posts in parallel
  const posts = (
    await Promise.all(slugs.map((slug) => kv.get(`post:${slug}`)))
  ).filter(Boolean);

  // Filter: published-only unless authed + all flag
  let filtered = posts;
  if (!(includeAll && isAuthed)) {
    filtered = filtered.filter((p) => p.published);
  }

  // Filter by tag
  if (tagFilter) {
    filtered = filtered.filter(
      (p) => Array.isArray(p.tags) && p.tags.includes(tagFilter),
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const paged = filtered.slice(start, start + limit);

  // Strip full content from list items
  const items = paged.map(({ content, ...rest }) => rest);

  return res.status(200).json({ posts: items, total, page, totalPages });
}

// ─── POST /api/posts ────────────────────────────────────────────────────────

/**
 * Create a new blog post (requires auth).
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
async function handlePost(req, res) {
  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const {
    title,
    slug: rawSlug,
    content,
    excerpt = '',
    coverImage = '',
    tags = [],
    published = false,
  } = req.body ?? {};

  // Validate required fields
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const slug = rawSlug ? slugify(rawSlug) : slugify(title);

  if (!slug) {
    return res.status(400).json({ error: 'Unable to generate a valid slug from the title' });
  }

  // Check for duplicate slug
  const existing = await kv.get(`post:${slug}`);
  if (existing) {
    return res.status(409).json({ error: `A post with slug "${slug}" already exists` });
  }

  const now = new Date().toISOString();
  const post = {
    id: uuidv4(),
    title,
    slug,
    content,
    excerpt,
    coverImage,
    tags,
    published,
    publishedDate: now,
    updatedDate: now,
  };

  // Persist post and update slugs index
  await kv.set(`post:${slug}`, post);

  const slugs = (await kv.get('posts:slugs')) || [];
  slugs.unshift(slug); // newest first
  await kv.set('posts:slugs', slugs);

  return res.status(201).json(post);
}
