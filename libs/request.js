
module.exports.extractHeadersAuthToken = (headers) => {
  const CLAIM = 'Authorization';
  if (!headers[CLAIM]) throw new Error(`headers missing '${CLAIM}' claim`);

  // Has to be in the format of: 
  // Authorization: Bearer <JWT_TOKEN>

  const tokenParts = headers['Authorization'].split(' ');
  const tokenValue = tokenParts[1];

  if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
    // no auth token!
    throw new Error('Invalid Authorization Header');
  }
  return tokenValue;
};
