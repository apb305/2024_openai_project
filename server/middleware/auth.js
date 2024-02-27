const admin = require("firebase-admin");
const serviceAccount = require("../config/firebaseAdmin");

// Initialize Firebase Admin SDK once outside of the middleware function
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    const tokenString = req.headers.authorization ? req.headers.authorization.split(" ") : null;

    // Using early returns to make the code cleaner and more readable
    if (!tokenString) {
      return res.status(401).send("Authorization header is missing.");
    }

    if (tokenString.length < 2) {
      return res.status(401).send("Bearer token is missing.");
    }

    const token = tokenString[1];
    admin.auth().verifyIdToken(token)
      .then((decodedToken) => {
        req.uid = decodedToken.uid; // Optional: Attach uid to request object for use in next middleware or route handler
        next();
      })
      .catch((error) => {
        console.error("Error verifying Firebase ID token:", error);
        res.status(403).send("Failed to authenticate token.");
      });
  },
};
