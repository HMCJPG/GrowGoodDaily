/**
 * @module api/upload
 * @description POST endpoint that accepts a base64-encoded image and commits
 * it to `content/images/{timestamp}-{name}` in the repo. Returns the raw
 * GitHub URL so the admin editor can drop it into the post's coverImage field.
 *
 * Auth: same hardcoded bearer token as the rest of the admin API.
 * Body shape: { filename, mimeType, contentBase64 }
 */

import { uploadFile } from './_lib/github.js';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function verifyAuth(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  return token === 'growgood2026';
}

const ALLOWED_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
]);

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { filename, contentBase64, mimeType } = req.body ?? {};

    if (!filename || !contentBase64) {
      return res
        .status(400)
        .json({ error: 'filename and contentBase64 are required' });
    }

    if (mimeType && !ALLOWED_MIMES.has(mimeType)) {
      return res.status(400).json({
        error: 'Unsupported file type. Use JPEG, PNG, GIF, WebP, or SVG.',
      });
    }

    // Sanitize filename and prepend a timestamp so two uploads with the same
    // name never collide.
    const base = filename
      .toLowerCase()
      .replace(/[^a-z0-9.\-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    const finalName = `${Date.now()}-${base}`;

    const url = await uploadFile(`content/images/${finalName}`, contentBase64);

    return res.status(200).json({ url, filename: finalName });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: err.message });
  }
}
