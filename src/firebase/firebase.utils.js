import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD4x4Oe9xtcFK85pQNL_BZhd1xdmT5Ggqs",
    authDomain: "e-shopping-1cc11.firebaseapp.com",
    databaseURL: "https://e-shopping-1cc11.firebaseio.com",
    projectId: "e-shopping-1cc11",
    storageBucket: "e-shopping-1cc11.appspot.com",
    messagingSenderId: "238792208392",
    appId: "1:238792208392:web:b4aad4a80526efbd76e1bd",
    measurementId: "G-63VBSG7FG6"
}

export const createUserProfileDocument = async ( userAuth, additionalData ) =>{
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    //console.log(snapShot);

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log( 'error creating user', error.message )
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

//export const signInWithGoogle = () => auth.signInWithPopUp( provider );

export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    //var token = result.credential.accessToken;
    // The signed-in user info.
    //var user = result.user;
    // ...
}).catch(function(error) {
    // Handle Errors here.
    //var errorCode = error.code;
    //var errorMessage = error.message;
    // The email of the user's account used.
    //var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    //var credential = error.credential;
    // ...
});

export default firebase;