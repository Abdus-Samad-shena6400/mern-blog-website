# Quick Start Guide

## Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Cloudinary account

## Setup (5 minutes)

### 1. MongoDB Setup
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get connection string
- Whitelist your IP

### 2. Cloudinary Setup
- Go to [Cloudinary](https://cloudinary.com)
- Sign up and get API credentials
- Copy Cloud Name, API Key, and API Secret

### 3. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# MONGODB_URI=your_mongodb_connection_string
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
# JWT_SECRET=make_this_long_and_random

npm run dev
```

Backend will run at `http://localhost:5000`

### 4. Frontend Setup (new terminal)

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Already has correct API URL
npm start
```

Frontend will open at `http://localhost:3000`

## First Steps

1. **Register**: Click "Sign Up" and create an account
2. **Create Blog**: Click "Create Blog" in navbar
3. **Write Content**: Add title, description, and optional image
4. **Publish**: Click "Publish Blog"
5. **View**: Go to Home to see your blog
6. **Manage**: Go to "My Blogs" to edit or delete

## API Base URL Structure

```
http://localhost:5000/api
├── /auth
│   ├── POST /register
│   ├── POST /login
│   ├── GET /me
│   └── PUT /update
└── /blogs
    ├── GET / (all blogs)
    ├── GET /single/:id
    ├── GET /my-blogs
    ├── POST / (create)
    ├── PUT /:id (update)
    └── DELETE /:id
```

## Authentication

All requests need this header:
```
Authorization: Bearer <your_jwt_token>
```

Token is automatically added by the frontend after login.

## Image Upload

- Max size: 10MB
- Format: JPEG, PNG, GIF, WebP
- Uploaded to Cloudinary (automatic)

## Key Files to Know

**Backend:**
- `server.js` - Main server file
- `models/User.js` - User schema with password hashing
- `models/Blog.js` - Blog schema
- `controllers/authController.js` - Auth logic
- `controllers/blogController.js` - Blog CRUD logic

**Frontend:**
- `App.js` - Main component with routing
- `context/AuthContext.js` - Global auth state
- `pages/Home.js` - Blog list
- `pages/CreateBlog.js` - Blog form
- `pages/BlogDetails.js` - Single blog view

## Common Issues

### Cannot connect to MongoDB
- Check connection string in .env
- IP address whitelisted in MongoDB Atlas

### Image upload fails
- Verify Cloudinary credentials
- Check file size (max 10MB)
- Check file format

### 401 errors on API calls  
- Login again
- Check localStorage token
- Verify JWT_SECRET in .env

### Port already in use
- Change PORT in backend .env
- Or kill the process using the port

## Environment Variables Checklist

**Backend .env:**
- [ ] MONGODB_URI (MongoDB connection string)
- [ ] JWT_SECRET (any long random string)
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] PORT (optional, defaults to 5000)
- [ ] FRONTEND_URL (optional, defaults to http://localhost:3000)

**Frontend .env:**
- [ ] REACT_APP_API_URL (should be http://localhost:5000/api)

## Project Features Summary

✅ User Registration & Login
✅ JWT Authentication
✅ Password Hashing
✅ Create Blog Posts
✅ Edit Blog Posts
✅ Delete Blog Posts
✅ View All Blogs
✅ Search Blogs
✅ Pagination
✅ Image Upload (Cloudinary)
✅ Responsive Design
✅ Error Handling
✅ Protected Routes
✅ View Counter
✅ Author Info Display

## Next Steps

1. Test all features in browser
2. Create sample blogs to test functionality
3. Test search and pagination
4. Test image uploads
5. Deploy to production (Vercel, Render, AWS, etc.)

## Need Help?

Check the detailed README files:
- `/backend/README.md` - Backend API documentation
- `/frontend/README.md` - Frontend features and components
- Root `/README.md` - Full project documentation

---

**Enjoy your blog website!** 🚀
