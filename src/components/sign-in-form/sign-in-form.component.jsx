import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.util';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

const _signInForm = {
    email: '',
    password: ''
};
 


const SignInForm = (props) => {
    const { setCurrentUser } = useContext(UserContext);
    const [signInForm, setSignInForm] = useState(_signInForm);
    const { email, password } = signInForm; 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignInForm({ ...signInForm, [name]: value });
    };

    const logGooglePopupUser = async () => {
        const { user } = await signInWithGooglePopup();
        setCurrentUser(user);
        await createUserDocumentFromAuth(user); 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password === '') {
            alert("Passwords is required");
            return;
        }
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            setSignInForm(_signInForm);
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert(`invalid credentials`);
                    break;
                case 'auth/user-not-found':
                    alert(`invalid credentials..`);
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
    };

    return (
        <div className='sign-in-container'>
            <h2>I already have an account?</h2>
            <div>Sign in with your email and password</div>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' required type='email' name='email'
                    value={email} onChange={handleChange} />
                <FormInput label='Password' required type='password' name='password'
                    value={password} onChange={handleChange} />
                <div className='buttons-container'>
                    <Button buttonType='' type="submit">SIGN IN</Button>
                    <Button buttonType='google' type="button" onClick={logGooglePopupUser}>
                       GOOGLE SIGN IN
                    </Button>
                </div>
            </form> 
        </div>
    );
};
export default SignInForm;