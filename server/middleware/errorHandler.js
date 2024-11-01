// errorHandler.js
const Sentry = require('@sentry/node');
function errorHandler(err, req, res, next) {
 Sentry.captureException(err);
// Log the error for debugging purposes
 console.error(err);
res.status(500).json({ error: 'Something went wrong.' });
}
module.exports = errorHandler;