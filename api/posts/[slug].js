/**
 * @module api/posts/[slug]
 * @description Handles single-post operations: GET, PUT, DELETE by slug.
 *
 * Storage keys (Vercel KV):
 *   - `post:{slug}`   → full post JSON
 *   - `posts:slugs`   → ordered array of all slugs
 */

import fs from 'fs';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

/**
 * Verify the Bearer token matches the admin password.
 * @param {import('@vercel/node').VercelRequest} req
 * @returns {boolean}
 */
function verifyAuth(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  return token === 'growgood2026';
}

/**
 * Derive a URL-safe slug from a string.
 * @param {string} text
 * @returns {string}
 */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ─── Handler ────────────────────────────────────────────────────────────────

/**
 * Vercel serverless handler for /api/posts/:slug
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  setCors(res);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: 'Slug parameter is required' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return await handleGet(req, res, slug);
      case 'PUT':
        return await handlePut(req, res, slug);
      case 'DELETE':
        return await handleDelete(req, res, slug);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error(`Post [${slug}] handler error:`, err);
    return res.status(500).json({ error: err.message });
  }
}

// ─── GET /api/posts/:slug ───────────────────────────────────────────────────

async function handleGet(req, res, slug) {
  const post = await kv.get(`post:${slug}`);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  // Hide unpublished posts from unauthenticated users
  if (!post.published && !verifyAuth(req)) {
    return res.status(404).json({ error: 'Post not found' });
  }

  return res.status(200).json(post);
}

// ─── PUT /api/posts/:slug ───────────────────────────────────────────────────

async function handlePut(req, res, slug) {
  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const existing = await kv.get(`post:${slug}`);
  if (!existing) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const updates = req.body ?? {};
  const now = new Date().toISOString();

  // Determine the new slug (may differ from current)
  let newSlug = slug;
  if (updates.slug && updates.slug !== slug) {
    newSlug = slugify(updates.slug);

    // Make sure the new slug isn't already taken by another post
    const conflict = await kv.get(`post:${newSlug}`);
    if (conflict) {
      return res.status(409).json({ error: `A post with slug "${newSlug}" already exists` });
    }
  }

  const updatedPost = {
    ...existing,
    ...updates,
    slug: newSlug,
    updatedDate: now,
    // Preserve immutable fields
    id: existing.id,
    publishedDate: existing.publishedDate,
  };

  // If slug changed, swap KV keys and update the slugs index
  if (newSlug !== slug) {
    await kv.del(`post:${slug}`);
    await kv.set(`post:${newSlug}`, updatedPost);

    const slugs = (await kv.get('posts:slugs')) || [];
    const idx = slugs.indexOf(slug);
    if (idx !== -1) {
      slugs[idx] = newSlug;
    }
    await kv.set('posts:slugs', slugs);
  } else {
    await kv.set(`post:${slug}`, updatedPost);
  }

  return res.status(200).json(updatedPost);
}

// ─── DELETE /api/posts/:slug ────────────────────────────────────────────────

async function handleDelete(req, res, slug) {
  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const existing = await kv.get(`post:${slug}`);
  if (!existing) {
    return res.status(404).json({ error: 'Post not found' });
  }

  // Remove post data
  await kv.del(`post:${slug}`);

  // Remove slug from ordered index
  const slugs = (await kv.get('posts:slugs')) || [];
  const filtered = slugs.filter((s) => s !== slug);
  await kv.set('posts:slugs', filtered);

  return res.status(200).json({ success: true });
}
