/**
 * @module api/auth
 * @description POST endpoint for admin authentication.
 * Validates password against ADMIN_PASSWORD env var.
 * Uses a simple token strategy where the password itself serves as the bearer token.
 */

/** CORS headers applied to every response */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Vercel serverless handler for /api/auth
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).set(CORS_HEADERS).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res
      .status(405)
      .set(CORS_HEADERS)
      .json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body ?? {};

    if (!password) {
      return res
        .status(400)
        .set(CORS_HEADERS)
        .json({ error: 'Password is required' });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res
        .status(401)
        .set(CORS_HEADERS)
        .json({ error: 'Invalid password' });
    }

    return res
      .status(200)
      .set(CORS_HEADERS)
      .json({ success: true, token: password });
  } catch (err) {
    console.error('Auth error:', err);
    return res
      .status(500)
      .set(CORS_HEADERS)
      .json({ error: 'Internal server error' });
  }
}
