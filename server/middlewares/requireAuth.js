const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "Authentication required" });
  }
  const user = req.session.user;
  res.header("Access-Control-Allow-Credentials", true);
  res.status(200).json({ user });
  next();
};

export default requireAuth;
