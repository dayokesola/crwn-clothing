import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './checkout-item.styles';
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

const CheckOutItem = ({ cartItem }) => {
    const { name, price, imageUrl, quantity } = cartItem;

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const addProductHandler = () => addItemToCart(cartItem);
    const removeProductHandler = () => removeItemFromCart(cartItem);
    const clearProductHandler = () => clearItemFromCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img className='image-container' src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeProductHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addProductHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearProductHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckOutItem;