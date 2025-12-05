# MongoDB Setup Instructions

## Option 1: MongoDB Atlas (Recommended for Development)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Set Up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `ecommerce` (or your preferred name)

6. **Update .env File**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

## Option 2: Local MongoDB

1. **Install MongoDB**
   - Download from https://www.mongodb.com/try/download/community
   - Follow installation instructions for your OS

2. **Start MongoDB**
   ```bash
   # Windows
   mongod
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

3. **Update .env File**
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   ```

## Testing Connection

After setting up MongoDB, test the connection:

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running in development mode on port 5000
```

## Seeding Sample Data

Once connected, seed the database with sample products:

```bash
npm run seed
```

You should see:
```
✅ MongoDB Connected
🗑️  Cleared existing products
✅ Sample products added successfully
```
