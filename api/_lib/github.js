/**
 * @module api/_lib/github
 * @description GitHub Contents API wrapper used as the blog's persistence layer.
 *
 * Posts are stored as `content/posts/{slug}.json` in the configured repo.
 * Listing reads the directory then fetches each file in parallel.
 *
 * Required env vars:
 *   GITHUB_TOKEN    — fine-grained PAT with `Contents: read and write`
 *
 * Optional env vars (defaults shown):
 *   GITHUB_OWNER    — repo owner   (default: 'HMCJPG')
 *   GITHUB_REPO     — repo name    (default: 'GrowGoodDaily')
 *   GITHUB_BRANCH   — branch name  (default: 'main')
 */

const GITHUB_OWNER = process.env.GITHUB_OWNER || 'HMCJPG';
const GITHUB_REPO = process.env.GITHUB_REPO || 'GrowGoodDaily';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const POSTS_DIR = 'content/posts';

const API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;

function ghHeaders(extra = {}) {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN env var is not set');
  }
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'growgooddaily-blog',
    ...extra,
  };
}

function encodeB64(str) {
  return Buffer.from(str, 'utf8').toString('base64');
}

function decodeB64(str) {
  return Buffer.from(str, 'base64').toString('utf8');
}

/**
 * List all posts. Returns an array of post objects, newest first.
 * Each post includes a `_sha` field for update/delete operations —
 * strip it before returning to public clients.
 */
export async function listPosts() {
  const res = await fetch(`${API_BASE}/${POSTS_DIR}?ref=${GITHUB_BRANCH}`, {
    headers: ghHeaders(),
  });

  if (res.status === 404) return []; // directory doesn't exist yet
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub list failed: ${res.status} ${body}`);
  }

  const files = await res.json();
  const jsonFiles = Array.isArray(files)
    ? files.filter((f) => f.type === 'file' && f.name.endsWith('.json'))
    : [];

  const posts = await Promise.all(
    jsonFiles.map(async (f) => {
      const r = await fetch(`${API_BASE}/${f.path}?ref=${GITHUB_BRANCH}`, {
        headers: ghHeaders(),
      });
      if (!r.ok) return null;
      const data = await r.json();
      try {
        const parsed = JSON.parse(decodeB64(data.content));
        return { ...parsed, _sha: data.sha };
      } catch {
        return null;
      }
    }),
  );

  return posts
    .filter(Boolean)
    .sort((a, b) => (b.publishedDate || '').localeCompare(a.publishedDate || ''));
}

/**
 * Fetch one post by slug. Returns null if not found.
 */
export async function getPost(slug) {
  const res = await fetch(
    `${API_BASE}/${POSTS_DIR}/${slug}.json?ref=${GITHUB_BRANCH}`,
    { headers: ghHeaders() },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub get failed: ${res.status} ${body}`);
  }

  const data = await res.json();
  const parsed = JSON.parse(decodeB64(data.content));
  return { ...parsed, _sha: data.sha };
}

/**
 * Create or update a post. Pass `sha` when updating; omit when creating.
 */
export async function savePost(slug, post, sha = null) {
  const { _sha, ...clean } = post; // never persist _sha into the file
  const body = {
    message: sha ? `Update post: ${slug}` : `Create post: ${slug}`,
    content: encodeB64(JSON.stringify(clean, null, 2)),
    branch: GITHUB_BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${API_BASE}/${POSTS_DIR}/${slug}.json`, {
    method: 'PUT',
    headers: ghHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(
      `GitHub save failed: ${res.status} ${errBody.message || ''}`,
    );
  }
  const data = await res.json();
  return { ...clean, _sha: data.content?.sha };
}

/**
 * Delete a post by slug. Requires its current sha.
 */
export async function deletePost(slug, sha) {
  const res = await fetch(`${API_BASE}/${POSTS_DIR}/${slug}.json`, {
    method: 'DELETE',
    headers: ghHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      message: `Delete post: ${slug}`,
      sha,
      branch: GITHUB_BRANCH,
    }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(
      `GitHub delete failed: ${res.status} ${errBody.message || ''}`,
    );
  }
}

/** Remove the internal `_sha` field before returning to clients. */
export function stripInternal(post) {
  if (!post) return post;
  const { _sha, ...rest } = post;
  return rest;
}

/**
 * Upload a binary file (already base64-encoded) to the configured repo at
 * the given path. Returns the raw.githubusercontent.com URL suitable for
 * direct embedding in <img src=...>.
 *
 * @param {string} path   - repo-relative path e.g. "content/images/foo.jpg"
 * @param {string} contentBase64 - base64-encoded file bytes (no data URL prefix)
 */
export async function uploadFile(path, contentBase64) {
  const res = await fetch(`${API_BASE}/${path}`, {
    method: 'PUT',
    headers: ghHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      message: `Upload: ${path}`,
      content: contentBase64,
      branch: GITHUB_BRANCH,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `GitHub upload failed: ${res.status} ${err.message || ''}`,
    );
  }

  const data = await res.json();
  return data.content?.download_url;
}
