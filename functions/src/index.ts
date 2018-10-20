import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// npm run-script lint
// npm run-script build
// firebase serve --only functions

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
// https://cloud.google.com/functions/docs/writing/http

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello every from Firebase!');
});

export const getAccounts = functions.https.onRequest((request, response) => {
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
