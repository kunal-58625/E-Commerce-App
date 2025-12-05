import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const products = [
    {
        name: 'Wireless Bluetooth Headphones',
        price: 79.99,
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        category: 'Electronics',
        stock: 50,
        rating: 4.5,
        numReviews: 128,
    },
    {
        name: 'Smart Watch Series 7',
        price: 399.99,
        description: 'Advanced fitness tracking, heart rate monitoring, and seamless smartphone integration.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        category: 'Electronics',
        stock: 35,
        rating: 4.8,
        numReviews: 256,
    },
    {
        name: 'Laptop Backpack',
        price: 49.99,
        description: 'Durable water-resistant backpack with padded laptop compartment and USB charging port.',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        category: 'Other',
        stock: 100,
        rating: 4.3,
        numReviews: 89,
    },
    {
        name: 'Mechanical Gaming Keyboard',
        price: 129.99,
        description: 'RGB backlit mechanical keyboard with customizable keys and anti-ghosting technology.',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
        category: 'Electronics',
        stock: 45,
        rating: 4.7,
        numReviews: 167,
    },
    {
        name: 'Yoga Mat Premium',
        price: 34.99,
        description: 'Extra thick non-slip yoga mat with carrying strap, perfect for all types of workouts.',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
        category: 'Sports',
        stock: 75,
        rating: 4.6,
        numReviews: 94,
    },
    {
        name: 'Stainless Steel Water Bottle',
        price: 24.99,
        description: 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours.',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
        category: 'Sports',
        stock: 120,
        rating: 4.4,
        numReviews: 203,
    },
    {
        name: 'Classic Denim Jacket',
        price: 89.99,
        description: 'Timeless denim jacket with a modern fit, perfect for any casual outfit.',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
        category: 'Clothing',
        stock: 60,
        rating: 4.5,
        numReviews: 112,
    },
    {
        name: 'Running Shoes Pro',
        price: 119.99,
        description: 'Lightweight running shoes with advanced cushioning and breathable mesh upper.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        category: 'Clothing',
        stock: 80,
        rating: 4.7,
        numReviews: 189,
    },
    {
        name: 'Coffee Maker Deluxe',
        price: 159.99,
        description: 'Programmable coffee maker with thermal carafe and auto-shutoff feature.',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
        category: 'Home & Kitchen',
        stock: 40,
        rating: 4.6,
        numReviews: 145,
    },
    {
        name: 'Air Fryer XL',
        price: 129.99,
        description: 'Large capacity air fryer with digital controls and 8 preset cooking functions.',
        image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop',
        category: 'Home & Kitchen',
        stock: 55,
        rating: 4.8,
        numReviews: 278,
    },
    {
        name: 'The Art of Programming',
        price: 39.99,
        description: 'Comprehensive guide to modern software development practices and design patterns.',
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop',
        category: 'Books',
        stock: 90,
        rating: 4.9,
        numReviews: 321,
    },
    {
        name: 'Wireless Mouse Ergonomic',
        price: 29.99,
        description: 'Comfortable ergonomic wireless mouse with adjustable DPI and long battery life.',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
        category: 'Electronics',
        stock: 110,
        rating: 4.4,
        numReviews: 156,
    },
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Clear existing products
        await Product.deleteMany();
        console.log('🗑️  Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log('✅ Sample products added successfully');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
