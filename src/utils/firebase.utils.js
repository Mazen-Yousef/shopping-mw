import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDdkV-EV3dmBifsXdUI0XlWFLiFOuV2SQk",
    authDomain: "shopping-mw-db.firebaseapp.com",
    projectId: "shopping-mw-db",
    storageBucket: "shopping-mw-db.appspot.com",
    messagingSenderId: "911612682378",
    appId: "1:911612682378:web:5d39b06eeddffcad694d73"
  };

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};
