module.exports = async (req, res, next) => {
    if (!req.headers.ID) {
      return res.status(401).json({ error: "Token not provided" });
    }
    return next();
  };
