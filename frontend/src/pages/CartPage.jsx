import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice';
import './CartPage.css';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= item.stock) {
            dispatch(addToCart({ ...item, quantity: newQuantity }));
        }
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate('/login?redirect=shipping');
        } else {
            alert('Checkout functionality coming soon!');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="page-container">
                <div className="container">
                    <div className="empty-cart">
                        <span className="empty-cart-icon">🛒</span>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/" className="btn btn-primary">
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="container">
                <h1 className="cart-title">Shopping Cart ({totalItems} items)</h1>

                <div className="cart-layout">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>

                                <div className="cart-item-details">
                                    <Link to={`/product/${item._id}`} className="cart-item-name">
                                        {item.name}
                                    </Link>
                                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                                    <p className="cart-item-stock">
                                        {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </p>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls small">
                                        <button
                                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                            disabled={item.quantity >= item.stock}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => handleRemoveItem(item._id)}
                                        className="btn-remove"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-card">
                            <h3>Order Summary</h3>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>

                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="btn btn-primary btn-full"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
