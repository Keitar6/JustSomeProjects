import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
		console.log(response);
		const userDocRef = await createUserDocumentFromAuth(response.user);
	};
	return (
		<div>
			<h1>This is Sign In page!</h1>
			<button onClick={logGoogleUser}>
				<p style={{ textTransform: "capitalize" }}>Sign in with google popup</p>
			</button>
		</div>
	);
};

export default SignIn;
