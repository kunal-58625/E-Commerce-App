import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                />
                {product.stock < 10 && product.stock > 0 && (
                    <span className="product-badge badge-warning">Low Stock</span>
                )}
                {product.stock === 0 && (
                    <span className="product-badge badge-error">Out of Stock</span>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>

                <div className="product-footer">
                    <div className="product-price">
                        <span className="price-currency">$</span>
                        <span className="price-amount">{product.price.toFixed(2)}</span>
                    </div>

                    {product.rating > 0 && (
                        <div className="product-rating">
                            <span className="rating-star">⭐</span>
                            <span className="rating-value">{product.rating}</span>
                            <span className="rating-count">({product.numReviews})</span>
                        </div>
                    )}
                </div>

                <button className="btn btn-primary btn-full">
                    View Details
                </button>
            </div>
        </Link>
    );
};

export default ProductCard;
