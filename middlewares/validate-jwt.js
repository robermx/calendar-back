const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  // x-token headers
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'there is not token available',
    });
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_KEY);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'invalid token',
    });
  }
  next();
};

module.exports = { validateJWT };
