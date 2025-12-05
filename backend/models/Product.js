import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a product name'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
            min: [0, 'Price cannot be negative'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
        },
        image: {
            type: String,
            required: [true, 'Please provide an image URL'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
            enum: ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Toys', 'Beauty', 'Other'],
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: [0, 'Stock cannot be negative'],
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
