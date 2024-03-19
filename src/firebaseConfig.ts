import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getMessaging, isSupported, type Messaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyCFD1V9OA87Q9CvPNnjwkR8LJW3H6ePip0',
  authDomain: 'byfalio-16405.firebaseapp.com',
  projectId: 'byfalio-16405',
  storageBucket: 'byfalio-16405.appspot.com',
  messagingSenderId: '670758173508',
  appId: '1:670758173508:web:875a10692390e51ba8b511',
  measurementId: 'G-JCHMWCYE0M',
}

const app = initializeApp(firebaseConfig)
export let messaging: Messaging | null = null
export const fireStore = getFirestore(app)

async function checkSupport() {
  if (await isSupported()) {
    messaging = getMessaging(app)
  }
}

void checkSupport()
