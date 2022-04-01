const functions = require("firebase-functions");

// gives admin rights for accessing database
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// TODO: add fullname into db
exports.newUser = functions.auth.user().onCreate((user) => {
  // dumping all user information into a collection
  return db
    .collection("user")
    .doc(user.uid)
    .create(JSON.parse(JSON.stringify(user)));
});
