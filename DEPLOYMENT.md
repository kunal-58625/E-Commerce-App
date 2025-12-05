# Deployment Guide

## Prerequisites
- GitHub account
- MongoDB Atlas account (for database)
- Render.com or Railway.app account (for backend)
- Vercel account (for frontend)

## Step 1: Prepare Your Code

### Initialize Git Repository
```bash
cd MERN-PROJECT
git init
git add .
git commit -m "Initial commit: MERN e-commerce application"
```

### Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., `mern-ecommerce-app`)
3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/mern-ecommerce-app.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend (Render.com)

### Option A: Render.com (Recommended)

1. **Sign up** at https://render.com

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `shophub-backend` (or your choice)
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

3. **Set Environment Variables**
   - Click "Environment" tab
   - Add these variables:
     ```
     NODE_ENV=production
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_super_secret_jwt_key_production
     JWT_EXPIRE=7d
     FRONTEND_URL=https://your-frontend-url.vercel.app
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://shophub-backend.onrender.com`)

### Option B: Railway.app

1. **Sign up** at https://railway.app

2. **Create New Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Select the `backend` folder

3. **Configure**
   - Add environment variables (same as above)
   - Railway will auto-detect Node.js and deploy

4. **Get URL**
   - Click on your service
   - Copy the public URL

## Step 3: Deploy Frontend (Vercel)

1. **Sign up** at https://vercel.com

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Set Environment Variable**
   - Go to "Settings" → "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```

4. **Update Frontend API Configuration**
   
   Before deploying, update `frontend/src/api/axios.js`:
   ```javascript
   const axiosInstance = axios.create({
     baseURL: import.meta.env.VITE_API_URL || '/api',
     // ... rest of config
   });
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - Your app will be live at `https://your-app.vercel.app`

## Step 4: Update Backend CORS

After frontend deployment, update backend `.env`:
```env
FRONTEND_URL=https://your-app.vercel.app
```

Redeploy backend if needed.

## Step 5: Seed Production Database

### Option 1: Using Render Shell
1. Go to your Render dashboard
2. Click on your backend service
3. Click "Shell" tab
4. Run: `npm run seed`

### Option 2: Temporarily Update Seed Script
1. Update `backend/scripts/seedProducts.js` to use production MongoDB URI
2. Run locally: `npm run seed`
3. Revert changes

## Step 6: Test Your Deployment

1. **Visit your frontend URL**
2. **Test user registration**
   - Click "Sign Up"
   - Create a new account
3. **Test login**
   - Login with your credentials
4. **Browse products**
   - View product list
   - Click on a product to see details
5. **Test authentication**
   - Logout and verify redirect
   - Try accessing protected routes

## Troubleshooting

### Backend Issues
- **500 Error**: Check Render logs for MongoDB connection issues
- **CORS Error**: Verify `FRONTEND_URL` in backend environment variables
- **JWT Error**: Ensure `JWT_SECRET` is set correctly

### Frontend Issues
- **API Not Found**: Check `VITE_API_URL` environment variable
- **Build Failed**: Verify all dependencies are in `package.json`
- **Blank Page**: Check browser console for errors

### Database Issues
- **Connection Failed**: Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0)
- **Authentication Failed**: Check MongoDB username/password in connection string

## Continuous Deployment

Both Render and Vercel support automatic deployments:
- Push to `main` branch → Automatic deployment
- Create PR → Preview deployment

## Custom Domain (Optional)

### Vercel
1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Update DNS records as instructed

### Render
1. Go to "Settings" → "Custom Domain"
2. Add your domain
3. Update DNS records

## Monitoring

### Render
- View logs in real-time from dashboard
- Set up email alerts for downtime

### Vercel
- Analytics available in dashboard
- Error tracking with Vercel Analytics

---

**Congratulations! Your MERN app is now live! 🎉**
