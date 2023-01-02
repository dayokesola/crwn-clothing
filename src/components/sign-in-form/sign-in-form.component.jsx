import { useState } from 'react';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.util';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const _signInForm = {
    email: '',
    password: ''
};



const SignInForm = (props) => {
    const [signInForm, setSignInForm] = useState(_signInForm);
    const { email, password } = signInForm;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignInForm({ ...signInForm, [name]: value });
    };

    const logGooglePopupUser = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password === '') {
            alert("Passwords is required");
            return;
        }
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
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
        <SignInContainer>
            <h2>I already have an account?</h2>
            <div>Sign in with your email and password</div>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    required
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange} />
                <FormInput
                    label='Password'
                    required
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange} />
                <ButtonsContainer>
                    <Button type="submit">SIGN IN</Button>
                    <Button
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        type="button"
                        onClick={logGooglePopupUser}>
                        GOOGLE SIGN IN
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};
export default SignInForm;