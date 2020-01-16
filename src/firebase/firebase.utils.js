import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDwZp9B8Vaj8nfycZnf5mW-GHir5I05UXA",
    authDomain: "crwn-db-81b86.firebaseapp.com",
    databaseURL: "https://crwn-db-81b86.firebaseio.com",
    projectId: "crwn-db-81b86",
    storageBucket: "crwn-db-81b86.appspot.com",
    messagingSenderId: "393526394744",
    appId: "1:393526394744:web:256d15c72e4e111e31528d",
    measurementId: "G-MYL9MZ02P9"
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;