"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// npm run-script lint
// npm run-script build
// firebase serve --only functions
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello every from Firebase!');
});
exports.getAccounts = functions.https.onRequest((request, response) => {
    admin
        .firestore()
        .doc('users/CRilEJC0CvUyL2HgNtIbfk7YDqn1')
        .get()
        .then(snapshot => {
        const data = snapshot.data();
        response.send(request);
    })
        .catch(e => {
        console.log(e);
        response.status(500).send(e);
    });
});
//# sourceMappingURL=index.js.map