// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyANpl4dOMnW8rtw_t5t8JG-0bU2MS9SK3Q",
	authDomain: "clothing-shop-cad90.firebaseapp.com",
	projectId: "clothing-shop-cad90",
	storageBucket: "clothing-shop-cad90.appspot.com",
	messagingSenderId: "890446104624",
	appId: "1:890446104624:web:dd7d1369f24f02570545f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const database = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(database, "users", userAuth.uid); //database, collection, unique ID --> it is looking for specific document
	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef); // variable that is pointing at this specific doc
	console.log(userSnapshot);
	console.log(userSnapshot.exists()); //checking if this document even exists

	// if user data doesn't exists
	// create/ set the document ith the data from userAuth in my collection
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date(); // when users are signing in
		console.log("hej");
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log(
				"I just caught some error while creating users!!",
				error.message
			);
		}
	}
	// if user data exists
	else if (userSnapshot.exists()) {
	}

	return userDocRef;
};
