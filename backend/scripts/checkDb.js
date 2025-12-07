import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const checkDb = async (uri, name) => {
    try {
        const conn = await mongoose.createConnection(uri).asPromise();
        const count = await conn.collection('products').countDocuments();
        console.log(`📊 Database [${name}]: ${count} products`);
        await conn.close();
    } catch (error) {
        console.log(`❌ Database [${name}] Error: ${error.message}`);
    }
};

const run = async () => {
    const baseUri = process.env.MONGODB_URI;
    // URL with /ecommerce
    const ecommerceUri = baseUri.includes('ecommerce') ? baseUri : baseUri.replace('.net/', '.net/ecommerce');
    // URL without /ecommerce (defaults to test)
    const testUri = baseUri.replace('/ecommerce', '').replace('.net/', '.net/test');
    // Pure URL
    const rootUri = baseUri.replace('/ecommerce', '').replace('.net/', '.net/');

    console.log("Checking databases...");
    await checkDb(ecommerceUri, 'ecommerce');
    await checkDb(testUri, 'test');
    await checkDb(rootUri, 'default (root)');
};

run();
