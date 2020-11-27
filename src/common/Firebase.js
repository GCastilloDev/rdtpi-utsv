import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBmHxk-IG4CNO9dUXi-14EwA77Sw1YiKqk',
  authDomain: 'repositorio-utsv.firebaseapp.com',
  databaseURL: 'https://repositorio-utsv.firebaseio.com',
  projectId: 'repositorio-utsv',
  storageBucket: 'repositorio-utsv.appspot.com',
  messagingSenderId: '186824608499',
  appId: '1:186824608499:web:05297f19ef3630f1f2c586',
};

firebase.initializeApp(firebaseConfig);

// Instancia que nos permite manejar la base de datos
// de firestore
const db = firebase.firestore();
const storage = firebase.storage().ref();
const auth = firebase.auth();

export { db, storage, auth };
