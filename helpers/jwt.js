const jwt = require('jsonwebtoken');

const generateJwt = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
      name,
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: '3h',
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generateJwt };
