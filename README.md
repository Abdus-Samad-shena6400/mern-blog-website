# MERN Stack Blog Website

A complete MERN (MongoDB, Express, React, Node.js) stack blog website with user authentication, blog CRUD operations, image uploads, and responsive design.

## Features

### Frontend
- ✅ React with React Router for navigation
- ✅ Responsive UI with mobile-first design
- ✅ User authentication (Login & Register)
- ✅ Create, Edit, Delete blog posts
- ✅ View all blogs on home page
- ✅ Single blog detail view
- ✅ My Blogs page for logged-in users
- ✅ Search functionality
- ✅ Image upload capability
- ✅ Clean and modern UI

### Backend
- ✅ Node.js & Express REST API
- ✅ MongoDB with Mongoose ODM
- ✅ JWT authentication
- ✅ User registration & login
- ✅ Protected routes (only logged-in users can create/edit blogs)
- ✅ Cloudinary integration for image uploads
- ✅ Comprehensive error handling
- ✅ Request validation

### Database
- ✅ User model with password hashing (bcryptjs)
- ✅ Blog model with author reference
- ✅ Timestamps for all records

## Project Structure

```
Blog Website/
├── backend/
│   ├── config/
│   │   ├── db.js                 (MongoDB connection)
│   │   └── cloudinary.js         (Cloudinary setup)
│   ├── models/
│   │   ├── User.js               (User schema)
│   │   └── Blog.js               (Blog schema)
│   ├── controllers/
│   │   ├── authController.js     (Auth logic)
│   │   └── blogController.js     (Blog logic)
│   ├── routes/
│   │   ├── authRoutes.js         (Auth endpoints)
│   │   └── blogRoutes.js         (Blog endpoints)
│   ├── middleware/
│   │   ├── auth.js               (JWT verification)
│   │   └── errorHandler.js       (Error handling)
│   ├── server.js                 (Main server file)
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html            (HTML entry point)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         (Navigation bar)
│   │   │   ├── Navbar.css
│   │   │   ├── BlogCard.js       (Blog card component)
│   │   │   ├── BlogCard.css
│   │   │   └── ProtectedRoute.js (Route protection)
│   │   ├── pages/
│   │   │   ├── Home.js           (Home page)
│   │   │   ├── Home.css
│   │   │   ├── Login.js          (Login page)
│   │   │   ├── Register.js       (Register page)
│   │   │   ├── Auth.css
│   │   │   ├── CreateBlog.js     (Create blog page)
│   │   │   ├── CreateBlog.css
│   │   │   ├── EditBlog.js       (Edit blog page)
│   │   │   ├── BlogDetails.js    (Blog details page)
│   │   │   ├── BlogDetails.css
│   │   │   ├── MyBlogs.js        (My blogs page)
│   │   │   └── MyBlogs.css
│   │   ├── context/
│   │   │   └── AuthContext.js    (Auth context & hooks)
│   │   ├── utils/
│   │   │   ├── api.js            (Axios setup)
│   │   │   └── blogApi.js        (API endpoints)
│   │   ├── App.js                (Main app component)
│   │   ├── App.css
│   │   ├── index.js              (React entry point)
│   │   └── index.css
│   ├── package.json
│   └── .env.example
│
└── README.md                      (This file)
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

## Installation & Setup

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with your credentials:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog_db
   JWT_SECRET=your_very_long_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder (in another terminal):**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with backend URL:**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the React app:**
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/update` | Update user profile | Yes |

### Blog Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/blogs` | Get all blogs | No |
| GET | `/api/blogs/single/:id` | Get single blog | No |
| GET | `/api/blogs/user/:userId` | Get user's blogs | No |
| GET | `/api/blogs/my-blogs` | Get my blogs | Yes |
| POST | `/api/blogs` | Create new blog | Yes |
| PUT | `/api/blogs/:id` | Update blog | Yes |
| DELETE | `/api/blogs/:id` | Delete blog | Yes |

## Usage

### User Registration
1. Click "Sign Up" in the navbar
2. Enter name, email, password, and confirm password
3. Click "Sign Up" button
4. You'll be logged in automatically

### User Login
1. Click "Login" in the navbar
2. Enter email and password
3. Click "Login" button

### Create Blog
1. After login, click "Create Blog" in navbar
2. Add title and description
3. Optionally upload cover image
4. Click "Publish Blog"

### Edit Blog
1. Go to "My Blogs"
2. Click "Edit" on any blog
3. Update title, description, or image
4. Click "Save Changes"

### Delete Blog
1. Go to "My Blogs"
2. Click "Delete" on any blog
3. Confirm deletion

### View Blogs
1. Go to Home page to see all blogs
2. Use search to find blogs by title or content
3. Click on any blog card to view full details
4. View author info and blog stats (views, date)

## Key Technologies Used

### Backend
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image uploads

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **CSS** - Styling

## Authentication Flow

1. User registers/logs in
2. Backend generates JWT token
3. Token stored in localStorage
4. Token sent with every API request in Authorization header
5. Protected routes check authentication before rendering
6. Expired/invalid tokens redirect to login

## Image Upload

- Images uploaded to Cloudinary via backend
- Local temporary files cleaned up after upload
- Image URL stored in database
- Automatic image deletion when blog is deleted
- Supported formats: JPEG, PNG, GIF, WebP
- Max file size: 10MB

## Error Handling

- Try-catch blocks in async functions
- Proper HTTP status codes
- Meaningful error messages
- Client-side validation
- Server-side validation with express-validator

## Responsive Design

- Mobile-first approach
- Breakpoints at 480px, 768px, 1024px
- Flexible grid layouts
- Touch-friendly buttons and inputs
- Optimized images and fonts

## Future Enhancements

- Comments system
- Blog categories/tags
- User profiles with favorites
- Social media sharing
- Email notifications
- Dark mode
- Rate limiting
- Admin dashboard

## Troubleshooting

### MongoDB Connection Error
- Check MongoDB URI in .env
- Ensure IP is whitelisted in MongoDB Atlas
- Verify internet connection

### Image Upload Not Working
- Check Cloudinary credentials
- Verify image file size (max 10MB)
- Check supported file formats

### Axios 401 Errors
- Token may be expired, login again
- Check token in localStorage
- Verify JWT_SECRET matches both files

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: Set PORT environment variable

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please create an issue in the repository.

---

**Happy Blogging!** 🎉
