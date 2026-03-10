# 🚀 Complete Deployment Guide - Blog Website

## 📋 Table of Contents
1. [Local Development Setup](#local-setup)
2. [Deployment to Render (Backend)](#render-deployment)
3. [Deployment to Vercel (Frontend)](#vercel-deployment)
4. [Final Connection Setup](#final-connection)

---

## Local Setup

### Prerequisites
- Node.js v14+ installed
- MongoDB Atlas account (free tier available)
- Cloudinary account (free tier available)
- Git installed

### Step 1: Clone & Install Dependencies

```bash
# Clone repository
git clone <your-repo-url>
cd "Blog website"

# Backend setup
cd backend
npm install

# Frontend setup (in another terminal)
cd ../frontend
npm install
```

### Step 2: Configure Backend (.env)

Create/edit `backend/.env`:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=blogwebsite

# JWT Secret (generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your_32_char_min_random_secure_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=5000

# For local development
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Step 3: Configure Frontend (.env)

Create/edit `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Run Locally

```bash
# Terminal 1: Backend
cd backend
npm run dev
# Should show: Server running on port 5000

# Terminal 2: Frontend
cd frontend
npm start
# Should open: http://localhost:3000
```

---

## Render Deployment

### Step 1: Create Backend on Render

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Fill in details:
   - **Name**: `mern-blog-api` (or your choice)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `cd backend && npm start` (OR `node backend/server.js`)
6. Click **Create Web Service**

### Step 2: Add Environment Variables (Render)

Wait for initial deploy to finish, then:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=blogwebsite

JWT_SECRET=your_32_char_min_random_secure_key_here

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PORT=5000
BACKEND_URL=https://mern-blog-api.onrender.com
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
```

3. Click **Save Changes**
4. Your backend will redeploy

### Step 3: Get Backend URL

- Copy your Render backend URL (e.g., `https://mern-blog-api.onrender.com`)
- Save this for frontend configuration

---

## Vercel Deployment

### Step 1: Create Frontend on Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **New Project**
4. Select your GitHub repository
5. In **Root Directory**, set to `frontend`
6. Click **Deploy**

### Step 2: Add Environment Variables (Vercel)

Before deployment completes:

1. Go to **Settings** → **Environment Variables**
2. Add:

```
REACT_APP_API_URL=https://mern-blog-api.onrender.com/api
```

3. Redeploy the project
4. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

---

## Final Connection Setup

### Step 1: Update Backend FRONTEND_URL

1. Go back to Render dashboard
2. Select your backend service
3. Go to **Settings** → **Environment Variables**
4. Update `FRONTEND_URL` to your Vercel URL:

```
FRONTEND_URL=https://your-app.vercel.app
```

5. Save (backend will redeploy)

### Step 2: Verify Everything Works

Test in this order:

1. **Backend Health Check**:
   ```
   https://mern-blog-api.onrender.com/api/health
   ```
   Should return: `{"message":"Server is running"}`

2. **Get All Blogs**:
   ```
   https://mern-blog-api.onrender.com/api/blogs
   ```

3. **Frontend**: Visit your Vercel URL and try to:
   - View homepage (should display blogs)
   - Register a new account
   - Create a blog post

---

## 🔧 Troubleshooting

### "Failed to fetch blogs"

**Problem**: Frontend can't reach backend API

**Solutions**:
1. Check `REACT_APP_API_URL` includes `/api` at the end
2. Verify `FRONTEND_URL` in backend matches Vercel domain
3. Check browser console (F12) for exact error
4. Test API directly in browser: `https://your-backend.onrender.com/api/blogs`

### CORS Error

**Problem**: "CORS policy: origin not allowed"

**Solutions**:
1. Update `FRONTEND_URL` in backend .env to match Vercel URL
2. Make sure HTTPS/HTTP protocols match
3. Redeploy backend after updating FRONTEND_URL

### Images Not Loading

**Problem**: Blog images show as broken

**Solutions**:
1. Set `BACKEND_URL` in backend .env to your Render URL
2. Or use Cloudinary (more reliable) - check Cloudinary credentials
3. Verify Render allows image uploads in `/uploads` directory

### "Cannot POST /api/blogs"

**Problem**: Create blog returns 405 error

**Solutions**:
1. Make sure you're logged in (token in localStorage)
2. Check CORS headers in browser console
3. Verify backend has proper middleware setup

---

## 📝 Environment Variables Summary

### Backend (Render)
| Variable | Value | Notes |
|----------|-------|-------|
| `MONGODB_URI` | Your MongoDB connection | Must match your DB credentials |
| `JWT_SECRET` | 32+ char random string | Keep secret, regenerate for prod |
| `CLOUDINARY_CLOUD_NAME` | Your cloud name | Optional, for image uploads |
| `CLOUDINARY_API_KEY` | Your API key | Optional |
| `CLOUDINARY_API_SECRET` | Your API secret | Optional |
| `PORT` | 5000 | Keep as is |
| `BACKEND_URL` | Your Render URL | `https://xxx.onrender.com` |
| `FRONTEND_URL` | Your Vercel URL | `https://xxx.vercel.app` |
| `NODE_ENV` | production | For error handling |

### Frontend (Vercel)
| Variable | Value | Notes |
|----------|-------|-------|
| `REACT_APP_API_URL` | Backend API URL | Must include `/api` → `https://xxx.onrender.com/api` |

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created and credentials saved
- [ ] Cloudinary account set up with API credentials
- [ ] Backend .env.example updated with all required variables
- [ ] Backend deployed to Render
- [ ] Backend shows "Server running" in Render logs
- [ ] Frontend .env configured with Render backend URL
- [ ] Frontend deployed to Vercel
- [ ] Backend FRONTEND_URL updated to Vercel URL
- [ ] Both services redeployed after URL updates
- [ ] API health check works: `/api/health`
- [ ] Blogs API works: `/api/blogs`
- [ ] Frontend can fetch blogs without CORS errors
- [ ] User registration works
- [ ] Blog creation works with image upload

---

## 🚨 Important Notes

1. **Never commit .env files** - They're in .gitignore
2. **Use HTTPS URLs** in production - HTTP won't work with Vercel
3. **First Render request takes 30-50 seconds** - Normal startup time
4. **Keep JWT_SECRET secure** - Regenerate if exposed
5. **Monitor Render logs** - Check for deployment errors

---

## 📞 Support

If you encounter issues:
1. Check Render deployment logs
2. Check Vercel deployment logs
3. Check browser console (F12)
4. Check Network tab for failed API requests
5. Verify all environment variables are set correctly

