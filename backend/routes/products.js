import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, search, minPrice, maxPrice } = req.query;

        // Build query object
        let query = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const products = await Product.find(query).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error('Get product error:', error);

        // Handle invalid MongoDB ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


// @route   POST /api/products
// @desc    Add new product
// @access  Public (you can make it Admin later)
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;
