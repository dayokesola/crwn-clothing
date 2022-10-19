// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBN-pekLt_f2bjk2DDyz9Mhkab8t67Lfog",
    authDomain: "jammer-9e212.firebaseapp.com",
    projectId: "jammer-9e212",
    storageBucket: "jammer-9e212.appspot.com",
    messagingSenderId: "1082314217524",
    appId: "1:1082314217524:web:929ad3421c9f8289229261",
    measurementId: "G-FXE2M0CJTK"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
if (!firebaseApp) {
    console.log("firebase app is deleted");
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, addedInfo ={}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        //create user on firestore
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt,
                ...addedInfo
            });
        }
        catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return; 
    return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return; 
    return await signInWithEmailAndPassword(auth, email, password);
}


export const signOutUser = async () => {
    return await signOut(auth); 
}

export const onAuthStateChangedListener = (callback) => { 
    onAuthStateChanged(auth, callback);
}