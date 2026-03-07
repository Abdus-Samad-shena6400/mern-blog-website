# MERN Blog Website - Environment Variables Configuration

This file serves as a template for setting up environment variables for both backend and frontend.

## Backend Environment Variables (.env)

```
# MongoDB Atlas Connection String
# Get this from: https://www.mongodb.com/cloud/atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog_db?retryWrites=true&w=majority

# JWT Secret Key (make it long and complex for security)
# Example: something like "aB!@#$%cD&()_+1234567890abcdefghijklmnop"
JWT_SECRET=your_very_long_secret_key_here_change_this_to_something_secure

# Cloudinary Image Upload Service
# Get these from: https://cloudinary.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## Frontend Environment Variables (.env)

```
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api
```

## Setup Instructions

### 1. MongoDB Atlas Setup
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Click "Connect" and select "Connect your application"
5. Copy the connection string and replace username:password
6. Update MONGODB_URI in backend .env

### 2. Cloudinary Setup
1. Go to https://cloudinary.com
2. Sign up for a free account
3. Go to Dashboard to get your credentials:
   - Cloud Name
   - API Key
   - API Secret
4. Update these values in backend .env

### 3. JWT Secret Generation
Generate a secure random string:
- Option 1: Use an online generator (NOT recommended for production)
- Option 2: Run in terminal:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- Option 3: Use a strong passphrase manually (min 32 characters)

### 4. Copy .env Files
```bash
# Backend
cd backend
cp .env.example .env
# Edit with your values

# Frontend  
cd frontend
cp .env.example .env
# Edit with your values
```

## Security Notes

⚠️ **IMPORTANT:**
- Never commit .env files to Git (use .gitignore)
- Never share your JWT_SECRET or API keys
- Use strong, unique values for production
- Rotate keys periodically
- Keep environment variables private

## Verify Setup

After creating .env files:

1. **Backend**: `npm start` should connect to MongoDB without errors
2. **Frontend**: `npm start` should make API calls successfully
3. **Test**: Try registering a new user

## Troubleshooting

If you get errors:

**MongoDB Connection Error**
- Check connection string format
- Whitelist your IP in MongoDB Atlas
- Verify credentials are correct

**Cloudinary Upload Error**
- Verify API credentials
- Check folder permissions
- Ensure image is under 10MB

**API Call Failures**
- Check REACT_APP_API_URL matches backend PORT
- Ensure both servers are running
- Clear browser cache

## Production Deployment

For production:
1. Use environment-specific .env files
2. Store secrets in deployment platform (Heroku, Vercel, AWS, etc.)
3. Use strong, randomly generated JWT_SECRET
4. Enable HTTPS
5. Set FRONTEND_URL to production domain
6. Update CORS origins

---

**All set!** Follow the Quick Start guide when ready. 🚀
