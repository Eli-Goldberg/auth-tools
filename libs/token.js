const jwt = require('jsonwebtoken');

module.exports.verifyToken = async ({ token, secret }) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (verifyError, decoded) => {
      if (verifyError) reject(verifyError);
      else resolve(decoded);
    });
  });
};

module.exports.signToken = async ({ payload, secret, expiresIn }) => {
  return new Promise((resolve, reject) => {
    if (typeof payload !== 'object') reject('Cannot sign token: Payload must be an object');
    jwt.sign(payload, secret, { expiresIn }, (signError, encoded) => {
      if (signError) reject(signError);
      else resolve(encoded);
    });
  });
};