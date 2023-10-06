const requireAuth = (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ msg: "Authentication required" });
    }
    next();
  };

export default requireAuth