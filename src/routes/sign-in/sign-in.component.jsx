import { signInwithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.util';


const SignIn = () => {
    const logGoogleuser = async () => {
        const {user} = await signInwithGooglePopup(); 
        const userDocRef =  await  createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In page</h1>
            <button onClick={logGoogleuser}>
                Sign in with Google Popup
            </button>
        </div>
    );
}

export default SignIn;