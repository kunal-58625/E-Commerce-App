import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentProduct: product, loading, error } = useSelector((state) => state.products);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
        alert(`Added ${quantity} ${product.name}(s) to cart!`);
    };

    if (loading) {
        return (
            <div className="page-container">
                <div className="container">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Loading product details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="page-container">
                <div className="container">
                    <div className="error-container">
                        <span className="error-icon">⚠️</span>
                        <h2>Product Not Found</h2>
                        <p>{error || 'The product you are looking for does not exist.'}</p>
                        <button className="btn btn-primary" onClick={() => navigate('/')}>
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="container">
                <button className="btn-back" onClick={() => navigate(-1)}>
                    ← Back
                </button>

                <div className="product-details">
                    <div className="product-image-section">
                        <img src={product.image} alt={product.name} className="detail-image" />
                    </div>

                    <div className="product-info-section">
                        <span className="product-category-badge">{product.category}</span>
                        <h1 className="product-title">{product.name}</h1>

                        {product.rating > 0 && (
                            <div className="product-rating-detail">
                                <span className="rating-stars">
                                    {'⭐'.repeat(Math.round(product.rating))}
                                </span>
                                <span className="rating-text">
                                    {product.rating} ({product.numReviews} reviews)
                                </span>
                            </div>
                        )}

                        <div className="product-price-section">
                            <span className="price-label">Price:</span>
                            <span className="price-value">${product.price.toFixed(2)}</span>
                        </div>

                        <div className="product-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="product-stock">
                            <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                            </span>
                        </div>

                        {product.stock > 0 && (
                            <div className="product-actions">
                                <div className="quantity-selector">
                                    <label htmlFor="quantity">Quantity:</label>
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            id="quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                                            min="1"
                                            max={product.stock}
                                            className="quantity-input"
                                        />
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button className="btn btn-primary btn-large" onClick={handleAddToCart}>
                                    🛒 Add to Cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
