import './checkout-item.styles.scss';
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

const CheckOutItem = ({ cartItem }) => {
    const { name, price, imageUrl, quantity } = cartItem;

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const addProductHandler = () => addItemToCart(cartItem);
    const removeProductHandler = () => removeItemFromCart(cartItem);
    const clearProductHandler = () => clearItemFromCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <img className='image-container' src={imageUrl} alt={`${name}`} />
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeProductHandler}>&#10094;</div>
                <span className='value'>{quantity}</span> 
                <div className='arrow' onClick={addProductHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearProductHandler}>&#10005;</div>
        </div>
    )
}

export default CheckOutItem;