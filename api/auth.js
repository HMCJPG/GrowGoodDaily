/**
 * @module api/auth
 * @description POST endpoint for admin authentication.
 * Validates password against the hardcoded ADMIN_PASSWORD constant
 * (with optional env var override). Uses a simple token strategy where
 * the password itself serves as the bearer token.
 */

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'growgood2026';

/** Apply CORS headers to the response. */
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

/**
 * Vercel serverless handler for /api/auth
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  setCors(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body ?? {};

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.status(200).json({ success: true, token: password });
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(500).json({ error: err.message });
  }
}
