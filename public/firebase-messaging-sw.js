importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js')

const defaultConfig = {
  apiKey: 'AIzaSyCFD1V9OA87Q9CvPNnjwkR8LJW3H6ePip0',
  authDomain: 'byfalio-16405.firebaseapp.com',
  projectId: 'byfalio-16405',
  storageBucket: 'byfalio-16405.appspot.com',
  messagingSenderId: '670758173508',
  appId: '1:670758173508:web:875a10692390e51ba8b511',
  measurementId: 'G-JCHMWCYE0M'
}

firebase.initializeApp(defaultConfig)

let messaging

try {
  messaging = firebase.messaging()
} catch (err) {
  console.error('Failed to initialize Firebase Messaging', err)
}

if (messaging) {
  try {
    messaging.onBackgroundMessage((payload) => {
      const notificationTitle = payload.notification.title
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image
      }

      return self.registration.showNotification(notificationTitle, notificationOptions)
    })
  } catch (error) {
    console.log('onBackgroundMessage error', error)
  }
}
