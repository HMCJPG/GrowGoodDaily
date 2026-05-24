/**
 * @module api/posts/[slug]
 * @description Single-post operations: GET, PUT, DELETE by slug.
 * Persistence is backed by the GitHub Contents API — see api/_lib/github.js.
 */

import {
  getPost,
  savePost,
  deletePost,
  stripInternal,
} from '../_lib/github.js';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function verifyAuth(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  return token === 'growgood2026';
}

function slugify(text) {
  return text
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

async function handleGet(req, res, slug) {
  const post = await getPost(slug);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const isAuthed = verifyAuth(req);

  if (!post.published && !isAuthed) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (!isAuthed) {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  }

  return res.status(200).json(stripInternal(post));
}

async function handlePut(req, res, slug) {
  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const existing = await getPost(slug);
  if (!existing) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const updates = req.body ?? {};
  const now = new Date().toISOString();

  // If slug is changing, we'll create-new + delete-old
  let newSlug = slug;
  if (updates.slug && updates.slug !== slug) {
    newSlug = slugify(updates.slug);
    const conflict = await getPost(newSlug);
    if (conflict) {
      return res
        .status(409)
        .json({ error: `A post with slug "${newSlug}" already exists` });
    }
  }

  const updatedPost = {
    ...existing,
    ...updates,
    slug: newSlug,
    updatedDate: now,
    id: existing.id,
    publishedDate: existing.publishedDate,
  };

  // Don't leak _sha into the persisted JSON
  delete updatedPost._sha;

  if (newSlug !== slug) {
    // Create the new file, then delete the old one
    const saved = await savePost(newSlug, updatedPost);
    await deletePost(slug, existing._sha);
    return res.status(200).json(stripInternal(saved));
  }

  const saved = await savePost(slug, updatedPost, existing._sha);
  return res.status(200).json(stripInternal(saved));
}

async function handleDelete(req, res, slug) {
  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const existing = await getPost(slug);
  if (!existing) {
    return res.status(404).json({ error: 'Post not found' });
  }

  await deletePost(slug, existing._sha);

  return res.status(200).json({ success: true });
}
