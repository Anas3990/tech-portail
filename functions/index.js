const functions = require('firebase-functions');
const admin = require('firebase-admin');

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
  return userRef.set({
    email: user.email,
    firstName: '',
    group: '',
    homePhoneNumber1: '',
    homePhoneNumber2: '',
    mobilePhoneNumber: '',
    name: '',
    professionalTitle: '',
    roles: {
      admin: false,
      mentor: false,
    },
    uid: event.data.uid,
    refreshTime: new Date().getTime()
  })
});

exports.processUserDeletion = functions.auth.user().onDelete(event => {
  const uid = event.data.uid
  return admin.firestore().doc(`/users/${uid}`).delete()
});

exports.sendMailOnEventPost = functions.firestore.document('/events/{eventId}').onCreate(event => {
  const snapshot = event.data.data();

  const db = admin.firestore()

  const msg = {
    to: 'anas.merbouh@outlook.com',
    from: 'noreply@tech-portail-production.firebaseapp.com',
    subject: snapshot.title,

    templateId: '98a67b11-11c7-4365-ac48-28655d7cf985',
    substitutionWrappers: ['{{', '}}'],
    substitutions: {
      eventTitle: snapshot.title,
      eventId: event.params.eventId
    }
  };

  return sgMail.send(msg).then(_ => {
    console.log('Courriel envoyé avec succès')
  }).catch(error => {
    console.log(error)
  });
})

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