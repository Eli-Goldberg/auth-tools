const crypto = require('crypto');

module.exports.decryptAesSha256 = (textToDecrypt, shaPassword) => {
  const decipher = crypto.createDecipher('aes-256-cbc', shaPassword);
  let decrypted = decipher.update(textToDecrypt, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports.encryptAesSha256 = (textToEncrypt, shaPassword) => {
  const cipher = crypto.createCipher('aes-256-cbc', shaPassword);
  let crypted = cipher.update(textToEncrypt, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

