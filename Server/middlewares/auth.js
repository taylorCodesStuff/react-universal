const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { AUTH0_DOMAIN, AUTH0_API_AUDIENCE } = require('../config');

const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: AUTH0_API_AUDIENCE,
    issuer: `https://${AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

module.exports = { checkJwt };