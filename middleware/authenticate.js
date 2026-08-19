import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log('[authenticate] Authorization header:', authHeader ? `${authHeader.slice(0, 20)}...` : authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('[authenticate] No token provided');
    return res.status(401).json({ error: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    console.log('[authenticate] No token provided');
    return res.status(401).json({ error: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    console.log('[authenticate] Token verified successfully for user:', decoded.id || decoded.sub || 'unknown');
    next();
  } catch (err) {
    console.log('[authenticate] Invalid or expired token:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}
