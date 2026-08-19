export function authorizeModification(req, res, next) {
  // Allow if role is "parent", or if role is "child" and the userId param matches the user's id
  if (
    req.user.role === 'parent' ||
    (req.user.role === 'child' && String(req.params.userId) === String(req.user.id))
  ) {
    console.log(`[authorizeModification] Access granted for role="${req.user.role}" userId=${req.user.id} target=${req.params.userId}`);
    return next();
  }

  console.log(`[authorizeModification] Access denied for role="${req.user.role}" userId=${req.user.id} target=${req.params.userId}`);
  return res.status(403).json({ error: 'Access denied' });
}
