import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-logo">
                        <span className="logo-icon">🛍️</span>
                        <span className="logo-text">ShopHub</span>
                    </Link>

                    <div className="navbar-links">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>

                        <Link to="/cart" className="nav-cart-link">
                            <span className="cart-icon">🛒</span>
                            {cartItems.length > 0 && (
                                <span className="cart-badge">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <span className="nav-user">
                                    👋 {user?.name}
                                </span>
                                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary btn-sm">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
