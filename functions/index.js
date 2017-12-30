const functions = require('firebase-functions');
const admin = require('firebase-admin');

const FieldValue = require("firebase-admin").firestore.FieldValue;

admin.initializeApp(functions.config().firebase);

//
const SENDGRID_API_KEY = functions.config().sendgrid.key
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);

exports.processUserSignUp = functions.auth.user().onCreate(event => {  
  const user = event.data

  // Update database to notify client to force refresh.
  const userRef = admin.firestore().doc("users/" + user.uid);
  // Set the refresh time to the current UTC timestamp.
  // This will be captured on the client to force a token refresh.
  if (user.displayName == null) {
    return userRef.set({
      approved: false,
      email: user.email,
      firstName: '',
      group: '',
      homePhoneNumber1: '',
      homePhoneNumber2: '',
      mobilePhoneNumber: '',
      name: '',
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-portail-production.appspot.com/o/profiles-images%2Fdefault-image%2Fplaceholder-profile-image.jpg?alt=media&token=ef4fc919-1169-4cf9-8ce2-2c3792609757',
      professionalTitle: '',
      roles: {
        admin: false,
        mentor: false
      },
      timestamp: FieldValue.serverTimestamp(),
      uid: event.data.uid
    })
  } else {
    var fullName = input.split('~')
    console.log(user.displayName)

    return userRef.set({
      approved: false,
      email: user.email,
      firstName: fullName[0],
      group: '',
      homePhoneNumber1: '',
      homePhoneNumber2: '',
      mobilePhoneNumber: '',
      name: fullName[1],
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/tech-portail-production.appspot.com/o/profiles-images%2Fdefault-image%2Fplaceholder-profile-image.jpg?alt=media&token=ef4fc919-1169-4cf9-8ce2-2c3792609757',
      professionalTitle: '',
      roles: {
        admin: false,
        mentor: false
      },
      timestamp: FieldValue.serverTimestamp(),
      uid: event.data.uid
    })
  }
});

exports.processUserDeletion = functions.auth.user().onDelete(event => {
  const uid = event.data.uid
  return admin.firestore().doc(`/users/${uid}`).delete()
});

exports.sendWebPushOnEventPost = functions.firestore.document('/events/{eventId}').onCreate(event => {
  const snapshot = event.data.data();

  // Détails de la notification (ce qui va s'afficher chez l'utilisateur).
  const body = snapshot.body;
  const payload = {
    notification: {
      title: `${snapshot.title}`,
      body: body ? (body.length <= 100 ? body : body.substring(0, 97) + '...') : '',
      icon: '/assets/img/T4K_ROUND.png',
      click_action: `https://${functions.config().firebase.authDomain}/events/afficher/${event.params.newId}}`
    }
  };

  // Récupérer la liste des tokens.
  return admin.database().ref('fcmTokens').once('value').then(allTokens => {
    if (allTokens.val()) {
      // Faire une liste à partir de tous les tokens.
      const tokens = Object.keys(allTokens.val());

      // Envoyer une notification à tous les tokens enregistrés.
      return admin.messaging().sendToDevice(tokens, payload).then(response => {
        // For each message check if there was an error.
        const tokensToRemove = [];
        response.results.forEach((result, index) => {
          const error = result.error;
          if (error) {
            console.error('Failure sending notification to', tokens[index], error);
            // Cleanup the tokens who are not registered anymore.
            if (error.code === 'messaging/invalid-registration-token' ||
                error.code === 'messaging/registration-token-not-registered') {
              tokensToRemove.push(allTokens.ref.child(tokens[index]).remove());
            }
          }
        });
        return Promise.all(tokensToRemove);
      });
    }
  });
});

exports.sendPushOnEventPost = functions.firestore.document('/events/{eventId}').onCreate(event => {
  const snapshot = event.data.data();

  // Détails de la notification (ce qui va s'afficher chez l'utilisateur).
  const body = snapshot.body;
  const payload = {
    notification: {
      title: `${snapshot.title}`,
      body: body ? (body.length <= 100 ? body : body.substring(0, 97) + '...') : '',
      icon: '/assets/img/T4K_ROUND.png',
      sound: 'default'
    }
  };

  return admin.messaging().sendToTopic('/topics/teamMembers', payload)
  .then(function(response) {
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });
});