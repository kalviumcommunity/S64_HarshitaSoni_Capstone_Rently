# Rently Deployment Guide

This guide will help you deploy the Rently application to production.

## 🚀 Deployment Overview

- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Render
- **Database**: MongoDB Atlas (already configured)

## 📋 Prerequisites

1. GitHub repository with your code
2. MongoDB Atlas account
3. Vercel account
4. Render account

## 🎯 Frontend Deployment (Vercel)

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository

### Step 2: Configure Build Settings

- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 3: Environment Variables

Add these environment variables in Vercel dashboard:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your frontend will be available at `https://your-project.vercel.app`

## 🔧 Backend Deployment (Render)

### Step 1: Connect to Render

1. Go to [render.com](https://render.com)
2. Sign in with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository

### Step 2: Configure Service

- **Name**: `rently-backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `backend`

### Step 3: Environment Variables

Add these environment variables in Render dashboard:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rently
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
PORT=10000
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for the deployment to complete
3. Your backend will be available at `https://your-service.onrender.com`

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create Cluster

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Choose your preferred region

### Step 2: Configure Access

1. **Database Access**:
   - Create a database user
   - Set username and password
   - Grant read/write permissions

2. **Network Access**:
   - Add IP address `0.0.0.0/0` (for production)
   - Or add specific IP addresses

### Step 3: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Add this to your Render environment variables

## 🔗 Connecting Frontend and Backend

### Update Frontend API URL

1. In Vercel dashboard, update the `VITE_API_URL` environment variable
2. Set it to your Render backend URL: `https://your-service.onrender.com/api`

### CORS Configuration

The backend is already configured with CORS to allow requests from your frontend domain.

## 🧪 Testing Deployment

### Test Backend

1. Visit `https://your-backend-url.onrender.com`
2. You should see: "Rently Backend is running!"

### Test Frontend

1. Visit your Vercel URL
2. Try registering a new user
3. Test login functionality
4. Test property creation (for landlords)

## 📊 Monitoring

### Vercel Analytics

- Enable Vercel Analytics in your dashboard
- Monitor performance and user behavior

### Render Monitoring

- Check Render dashboard for service health
- Monitor logs for any errors

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check environment variables
   - Verify build commands
   - Check for missing dependencies

2. **API Connection Issues**:
   - Verify CORS settings
   - Check API URL in frontend
   - Ensure backend is running

3. **Database Connection**:
   - Verify MongoDB Atlas connection string
   - Check network access settings
   - Ensure database user permissions

### Debug Steps

1. Check Render logs for backend errors
2. Check Vercel build logs for frontend errors
3. Use browser developer tools to debug API calls
4. Test API endpoints directly using Postman or curl

## 🚀 Production Checklist

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Database configured in MongoDB Atlas
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] API endpoints tested
- [ ] User registration/login working
- [ ] Property management working
- [ ] Payment integration tested
- [ ] SSL certificates active (automatic with Vercel/Render)

## 📞 Support

If you encounter issues during deployment:

1. Check the logs in Vercel/Render dashboards
2. Verify all environment variables are set
3. Test API endpoints individually
4. Check MongoDB Atlas connection
5. Review CORS configuration

---

**Happy Deploying! 🎉**
