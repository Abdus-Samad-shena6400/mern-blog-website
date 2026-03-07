# 🔧 CLOUDINARY SETUP GUIDE

## 🚨 Current Status: Using Local Image Storage

Your blog website is currently working with **local image storage** as a fallback because the Cloudinary credentials are invalid. This means images are stored on your server instead of the cloud.

## ✅ What Works Now:
- ✅ Blog creation with images
- ✅ Image preview and display
- ✅ All blog functionality
- ✅ Local image serving

## 🌐 To Use Cloudinary (Recommended for Production):

### Step 1: Create Cloudinary Account
1. Go to https://cloudinary.com
2. Click "Sign Up" (free tier available)
3. Verify your email

### Step 2: Get Your Credentials
1. Login to your Cloudinary dashboard
2. Go to "Account" → "Settings" → "Access Keys"
3. Copy these values:
   - **Cloud Name**: (shown at the top)
   - **API Key**: (from Access Keys section)
   - **API Secret**: (from Access Keys section)

### Step 3: Update Your .env File
Update your `backend/.env` file with real credentials:

```env
# Replace these with your actual Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

### Step 4: Restart Backend Server
```bash
# Stop the current server (Ctrl+C)
# Then restart
cd backend
npm start
```

## 📊 Cloudinary Free Tier Limits:
- 25GB storage
- 25GB monthly bandwidth
- 25,000 monthly transformations

## 🔄 Current Fallback System:
- If Cloudinary fails → Uses local storage automatically
- Images are served from `http://localhost:5000/uploads/filename`
- Works perfectly for development and small-scale use

## 🎯 Recommendation:
For now, your blog works perfectly with local storage. When you're ready to deploy to production, set up a real Cloudinary account for better performance and scalability.

**Your blog is fully functional!** 🎉