const { decryptAesSha256, encryptAesSha256 } = require('./encryption');
const { verifyToken, signToken } = require('./token');

module.exports.decodeToken = async ({ token, jwtSecret, isToDecrypt, shaPassword }) => {
  if (isToDecrypt) {
    if (!shaPassword) throw new Error(`Missing 'shaPassword' for decryption`);
    if (typeof shaPassword !== 'string') throw new Error(`'shaPassword' must be a string`);
  }

  let payload;
  try {
    payload = await verifyToken({ token, secret: jwtSecret });
  } catch (error) {
    throw new Error(`Token could not be verified: ${error.message}`);
  }

  if (isToDecrypt) {
    try {
      // We're assuming the payload was encrypted the same way we're decrypting it
      // meaning it was wrapped in a 'token' object when it was encrypted
      const { token } = payload;

      payload = decryptAesSha256(token, shaPassword);
    } catch (error) {
      throw new Error(`Token payload could not be decrypted: ${error.message}`);
    }

    try {
      payload = JSON.parse(payload);
    } catch (error) {
      throw new Error(`Decrypted token couldn't be parsed: ${error.message}`);
    }
  }
  
  return payload;
};

module.exports.encodeToken = async ({ payload, expiresIn, jwtSecret, isToEncrypt, shaPassword }) => {
  if (isToEncrypt) {
    if (!shaPassword) throw new Error(`Missing 'shaPassword' for encryption`);
    if (typeof shaPassword !== 'string') throw new Error(`'shaPassword' must be a string`);
  }

  let payloadToEncode = payload;
  let encoded;

  if (isToEncrypt) {
    try {
      // The payload has to be an object (for convenience sake - expiresIn, etc.)
      // so if it's encrypted we have to wrap it in a { token: ... } object
      payloadToEncode = {
        token: encryptAesSha256(JSON.stringify(payload), shaPassword)
      };
    } catch (error) {
      throw new Error(`Payload could not be encrypted: ${error.message}`);
    }
  }

  try {
    encoded = await signToken({ payload: payloadToEncode, secret: jwtSecret, expiresIn });
  } catch (error) {
    throw new Error(`${isToEncrypt ? 'Encrypted payload' : 'Payload'} could not be encoded: ${error.message}`);
  }

  return encoded;
};