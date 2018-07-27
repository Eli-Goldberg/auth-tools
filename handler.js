const auth = require('./authorizer');

module.exports.authenticate = async (event, context, callback) => {
  try {
    console.log('event', event);    
    const token = extractAuthorizationHeader(event.authorizationToken);
    if (!header) throw new Error('Missing Autorization token');
    return auth.authenticate(token);
  } catch (error) {
    console.log(error.message);
    throw new Error('Unauthorized');
  }
}
