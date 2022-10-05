import Button from '../../components/button/button.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { signInWithGooglePopup,createUserDocumentFromAuth } from '../../utils/firebase/firebase.util';



const SignIn = () => {
    const logGooglePopupUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    };



    return (
        <div>
            <h1>Sign In page</h1>
            <Button buttonType='google' onClick={logGooglePopupUser}>
                Sign in with Google Popup
            </Button> 
            <SignUpForm />
        </div>
    );
}

export default SignIn;