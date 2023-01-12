// Native builds get the config from google-services.json GoogleService-Info.plist
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: 'AIzaSyByjINKXyVzMcXpOzQ3Q8dhypu8HzsIi5k',
  authDomain: 'testnative-31f3e.firebaseapp.com',
  projectId: 'testnative-31f3e',
  storageBucket: 'testnative-31f3e.appspot.com',
  messagingSenderId: '54612993574',
  appId: '1:54612993574:web:ba65ff39a24441154228e7',
  measurementId: 'G-TX837WMLFZ',
};

const initializeApp = (): void => {
  firebase.initializeApp(firebaseConfig);
};

export default initializeApp;
