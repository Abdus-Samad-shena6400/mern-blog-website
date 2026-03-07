# Backend Setup Guide

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update credentials in `.env`

## Configuration

### Environment Variables (.env)

```
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog_db

# JWT Secret (make it long and complex)
JWT_SECRET=your_very_long_secret_key_here_change_this

# Cloudinary Setup (get from cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server runs on `http://localhost:5000`

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": { user object }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "message": "Logged in successfully",
  "token": "jwt_token_here",
  "user": { user object }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "user": { user object }
}
```

#### Update Profile
```
PUT /api/auth/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Name",
  "email": "new@example.com"
}

Response: 200 OK
```

### Blog Endpoints

#### Get All Blogs
```
GET /api/blogs?search=search_term&page=1&limit=10

Response: 200 OK
{
  "success": true,
  "blogs": [ blog objects ],
  "pagination": { page, pages, total }
}
```

#### Get Single Blog
```
GET /api/blogs/single/:id

Response: 200 OK
{
  "success": true,
  "blog": { blog object }
}
```

#### Get User Blogs
```
GET /api/blogs/user/:userId

Response: 200 OK
{
  "success": true,
  "blogs": [ blog objects ]
}
```

#### Get My Blogs
```
GET /api/blogs/my-blogs
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "blogs": [ blog objects ]
}
```

#### Create Blog
```
POST /api/blogs
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- title: "Blog Title"
- description: "Blog content..."
- image: <file> (optional)

Response: 201 Created
{
  "message": "Blog created successfully",
  "blog": { blog object }
}
```

#### Update Blog
```
PUT /api/blogs/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- title: "New Title" (optional)
- description: "New content..." (optional)
- image: <file> (optional)

Response: 200 OK
{
  "message": "Blog updated successfully",
  "blog": { blog object }
}
```

#### Delete Blog
```
DELETE /api/blogs/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Blog deleted successfully"
}
```

## Database Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Model
```javascript
{
  _id: ObjectId,
  title: String (required, max 200),
  description: String (required),
  image: String (default: placeholder),
  imagePublicId: String (for Cloudinary),
  author: ObjectId (ref: User, required),
  authorName: String,
  views: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

## File Upload

- Maximum file size: 10MB
- Supported formats: JPEG, PNG, GIF, WebP
- Images stored on Cloudinary
- Folder structure: `blog-posts/`

## Error Handling

All errors return appropriate HTTP status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

Error response format:
```json
{
  "message": "Error description",
  "success": false,
  "status": 400
}
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes (middleware)
- Input validation
- CORS enabled
- Environment variables for secrets

## Middleware

### auth.js
- Verifies JWT token
- Extracts user ID from token
- Protects private routes

### errorHandler.js
- Centralized error handling
- Consistent error response format
- Logs errors for debugging

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variables
- **cors**: Cross-origin resource sharing
- **multer**: File upload handling
- **cloudinary**: Image hosting
- **express-validator**: Input validation

## Development Dependencies

- **nodemon**: Auto-restart on file changes
