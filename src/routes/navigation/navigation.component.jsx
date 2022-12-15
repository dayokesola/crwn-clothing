import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.util';

const Navigation = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

    const signOuthandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    };

    return (
        <Fragment>

            <nav className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>SHOP</Link>
                    {
                        currentUser ?
                            (<Link className='nav-link' onClick={signOuthandler}>SIGN OUT</Link>) :
                            (<Link className='nav-link' to='/auth'>SIGN IN</Link>)
                    }
                    <CartIcon />
                </div>

                { isCartOpen && <CartDropdown /> }
            </nav>
            <Outlet />
        </Fragment>
    );
}
export default Navigation;