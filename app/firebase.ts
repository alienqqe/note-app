import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

export const firebaseConfig = {
  apiKey: 'AIzaSyB8DZb9MB4O4mU-LAb22yrmuEJ12uq6HgA',

  authDomain: 'notes-35ad3.firebaseapp.com',

  projectId: 'notes-35ad3',

  storageBucket: 'notes-35ad3.appspot.com',

  messagingSenderId: '797788302377',

  appId: '1:797788302377:web:f7d42fa8708f898d6a8038',

  databaseURL:
    'https://notes-35ad3-default-rtdb.europe-west1.firebasedatabase.app',
}

export const app = initializeApp(firebaseConfig)
export const googleAuthProvider = new GoogleAuthProvider()

export const db = getDatabase(app)
