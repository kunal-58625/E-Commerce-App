import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { categories } from '../data/categories';
import heroImage from '../assets/hero-image.png';
import './HomePage.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="page-container">
                <div className="container">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Loading amazing products...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container">
                <div className="container">
                    <div className="error-container">
                        <span className="error-icon">⚠️</span>
                        <h2>Oops!!! Something went wrong</h2>
                        <p>{error}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => dispatch(fetchProducts())}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="container">
                <div className="hero-section animate-fade-in">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Discover Amazing Products
                            <br />
                            <span className="text-gradient animate-slide-in">at Great Prices</span>
                        </h1>
                        <p className="hero-subtitle animate-slide-in" style={{ animationDelay: '0.2s' }}>
                            Shop the latest trends in electronics, fashion, and more.
                            Find exactly what you're looking for with our curated collection.
                        </p>
                        <button
                            className="btn btn-primary btn-lg animate-float"
                            onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Shop Now 🛍️
                        </button>
                    </div>
                    <div className="hero-image animate-float" style={{ animationDelay: '1.5s' }}>
                        <img src={heroImage} alt="Online Shopping" className="hero-img" />
                    </div>
                </div>

                <div className="section-title-container">
                    <h2 className="section-title">Shop by Category</h2>
                    <div className="title-underline"></div>
                </div>

                <div className="category-grid">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>

                <div id="products" className="section-title-container">
                    <h2 className="section-title">Featured Products</h2>
                    <div className="title-underline"></div>
                </div>

                {products.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">📦</span>
                        <h3>No products found</h3>
                        <p>Check back soon for new arrivals!</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
