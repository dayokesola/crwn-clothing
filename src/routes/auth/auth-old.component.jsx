import { useEffect } from 'react';
import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signInWithGoogleRedirect } from '../../utils/firebase/firebase.util';

    
import { getRedirectResult } from 'firebase/auth';

const SignIn = () => {
    useEffect(() => {
        async function fetchData(){
            const response = await getRedirectResult(auth);
            console.log(response);
            if(response){
                await  createUserDocumentFromAuth(response.user);
            }
        };
        fetchData();
    },[]);


    const logGooglePopupUser = async () => {
        const { user } = await signInWithGooglePopup(); 
        await  createUserDocumentFromAuth(user);
    };

    const logGoogleRedirectUser = async () => {
        const { user } = await signInWithGoogleRedirect();
         console.log(user);
    };

    return (
        <div>
            <h1>Sign In page</h1>
            <button onClick={logGooglePopupUser}>
                Sign in with Google Popup
            </button>
            <button onClick={logGoogleRedirectUser}>
                Sign in with Google Redirect
            </button>
        </div>
    );
}

export default SignIn;