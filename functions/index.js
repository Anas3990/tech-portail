const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp(functions.config().firebase);

exports.processUserSignUp = functions.auth.user().onCreate(event => {  
  const user = event.data

  // Update database to notify client to force refresh.
  const userRef = admin.firestore().doc("users/" + user.uid);
  // Set the refresh time to the current UTC timestamp.
  // This will be captured on the client to force a token refresh.
  return userRef.set({
    email: user.email,
    role: "N/A",
    uid: event.data.uid,
    refreshTime: new Date().getTime()
  })
});

exports.processUserDeletion = functions.auth.user().onDelete(event => {
  const uid = event.data.uid
  return admin.firestore().doc(`/users/${uid}`).delete()
});

exports.processUserUpdate = functions.firestore.document('/users/{userId}').onUpdate((event) => {
  const data = event.data.data();

  //
  return admin.auth().setCustomUserClaims(data.uid, { role: data.role })
  .then(() => {
    // Update real-time database to notify client to force refresh.
    const metadataRef = admin.database().ref("metadata/" + data.uid);
    // Set the refresh time to the current UTC timestamp.
    // This will be captured on the client to force a token refresh.
    return metadataRef.set({refreshTime: new Date().getTime()});
  })
  .catch(error => {
    console.log(error);
  })
});

exports.sendWebPushOnNewPost = functions.firestore.document('/news/{newId}').onCreate(event => {
  const snapshot = event.data.data();

  // Détails de la notification (ce qui va s'afficher chez l'utilisateur).
  const body = snapshot.body;
  const payload = {
    notification: {
      title: `${snapshot.title}`,
      body: body ? (body.length <= 100 ? body : body.substring(0, 97) + '...') : '',
      icon: '/assets/img/T4K_ROUND.png',
      click_action: `https://${functions.config().firebase.authDomain}/news/afficher/${event.params.newId}}`
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

exports.sendPushOnNewPost = functions.firestore.document('/news/{newId}').onCreate(event => {
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