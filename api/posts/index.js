/**
 * @module api/posts/index
 * @description Handles listing (GET) and creating (POST) blog posts.
 * Persistence is backed by the GitHub Contents API — see api/_lib/github.js.
 */

import { v4 as uuidv4 } from 'uuid';
import { listPosts, getPost, savePost, stripInternal } from '../_lib/github.js';

/** Apply CORS headers to the response. */
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function verifyAuth(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  return token === 'growgood2026';
}

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') return await handleGet(req, res);
    if (req.method === 'POST') return await handlePost(req, res);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Posts handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}

async function handleGet(req, res) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 6);
  const tagFilter = req.query.tag || null;
  const includeAll = req.query.all === 'true';
  const isAuthed = verifyAuth(req);

  const posts = await listPosts();

  // Filter: published-only unless authed admin requested all
  let filtered = posts;
  if (!(includeAll && isAuthed)) {
    filtered = filtered.filter((p) => p.published);
  }

  if (tagFilter) {
    filtered = filtered.filter(
      (p) => Array.isArray(p.tags) && p.tags.includes(tagFilter),
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const paged = filtered.slice(start, start + limit);

  // Strip full content + internal fields from list items
  const items = paged.map(({ content, ...rest }) => stripInternal(rest));

  // Cache public list responses on Vercel's edge for 60s; admin requests stay fresh
  if (!isAuthed) {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  }

  return res.status(200).json({ posts: items, total, page, totalPages });
}

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
    seoTitle = '',
    seoDescription = '',
    seoKeywords = '',
  } = req.body ?? {};

  if (!title) return res.status(400).json({ error: 'Title is required' });
  if (!content) return res.status(400).json({ error: 'Content is required' });

  const slug = rawSlug ? slugify(rawSlug) : slugify(title);

  if (!slug) {
    return res
      .status(400)
      .json({ error: 'Unable to generate a valid slug from the title' });
  }

  const existing = await getPost(slug);
  if (existing) {
    return res
      .status(409)
      .json({ error: `A post with slug "${slug}" already exists` });
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
    seoTitle,
    seoDescription,
    seoKeywords,
    publishedDate: now,
    updatedDate: now,
  };

  const saved = await savePost(slug, post);
  return res.status(201).json(stripInternal(saved));
}
