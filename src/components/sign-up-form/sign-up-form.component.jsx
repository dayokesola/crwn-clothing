import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.util';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const _form = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = (props) => {
    const { setCurrentUser } = useContext(UserContext);
    const [signUpForm, setSignUpForm] = useState(_form);
    const { displayName, email, password, confirmPassword } = signUpForm;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignUpForm({ ...signUpForm, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            setSignUpForm(_form);
            setCurrentUser(user);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert(`${email} already in use`);
            }
            else {
                console.log(error);
            }
        }
    };

    return (
        <div className='sign-up-container'>
            <h2>I don't have an account</h2>
            <div>Sign un with your email and password</div>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' required type='text' name='displayName'
                    value={displayName} onChange={handleChange} />
                <FormInput label='Email' required type='email' name='email'
                    value={email} onChange={handleChange} />
                <FormInput label='Password' required type='password' name='password'
                    value={password} onChange={handleChange} />
                <FormInput label='Confirm Password' required type='password' name='confirmPassword'
                    value={confirmPassword} onChange={handleChange} />
                <Button buttonType='' type="submit">SIGN UP</Button>
            </form>
        </div>
    );
};
export default SignUpForm;