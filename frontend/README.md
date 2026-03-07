# Frontend Setup Guide

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update API URL in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode
```bash
npm start
```
Opens app in browser at `http://localhost:3000`

### Build for Production
```bash
npm run build
```
Creates optimized production build in `build/` folder

## Project Structure

```
frontend/
├── public/
│   └── index.html              (HTML entry point)
├── src/
│   ├── components/
│   │   ├── Navbar.js           (Navigation component)
│   │   ├── BlogCard.js         (Blog list item)
│   │   └── ProtectedRoute.js   (Auth guard)
│   ├── pages/
│   │   ├── Home.js             (Homepage - list all blogs)
│   │   ├── Login.js            (Login form)
│   │   ├── Register.js         (Registration form)
│   │   ├── CreateBlog.js       (Create blog form)
│   │   ├── EditBlog.js         (Edit blog form)
│   │   ├── BlogDetails.js      (Single blog view)
│   │   └── MyBlogs.js         (User's blog list)
│   ├── context/
│   │   └── AuthContext.js      (Authentication state)
│   ├── utils/
│   │   ├── api.js              (Axios instance & interceptors)
│   │   └── blogApi.js          (API function calls)
│   ├── App.js                  (Main component)
│   ├── index.js                (React entry point)
│   └── index.css               (Global styles)
└── package.json
```

## Features

### Pages

#### Home (`/`)
- Display all blogs in grid layout
- Search functionality
- Pagination
- View blog details by clicking card

#### Login (`/login`)
- Email and password input
- Form validation
- Error handling
- Redirect to home on success

#### Register (`/register`)
- Name, email, password fields
- Password confirmation
- Input validation
- Auto-login after registration

#### Create Blog (`/create-blog`)
- Protected route (requires login)
- Title input (max 200 chars)
- Description textarea
- Image upload with preview
- Publish button

#### Blog Details (`/blog/:id`)
- Full blog content display
- Author information
- View count and date
- Edit/Delete buttons (for author)
- Auto-increment view count

#### Edit Blog (`/edit-blog/:id`)
- Protected route (requires login)
- Pre-filled form with blog data
- Image replace functionality
- Save changes button

#### My Blogs (`/my-blogs`)
- Protected route (requires login)
- List of user's blogs
- View/Edit/Delete actions
- Quick stats (views, date)

### Components

#### Navbar
- Logo/branding
- Navigation links
- User greeting (when logged in)
- Logout button
- Responsive mobile menu

#### BlogCard
- Blog thumbnail image
- Title and description preview
- Author name and date
- View count badge
- Click to view details

#### ProtectedRoute
- Checks authentication status
- Redirects to login if not authenticated
- Shows loading state during auth check

### Context: AuthContext

Provides authentication state and functions:

```javascript
{
  // State
  user,              // Current user object
  token,             // JWT token
  loading,           // Loading state
  error,             // Error message
  isAuthenticated,   // Boolean

  // Functions
  register(),        // Register new user
  login(),           // Login user
  logout(),          // Logout user
  fetchUser(),       // Fetch current user
}
```

## API Integration

All API calls use Axios with:
- Base URL from environment variable
- Authorization token in headers
- Automatic token refresh handling
- Error handling and status code management

### API Functions (utils/blogApi.js)

```javascript
// Authentication
registerUser(userData)
loginUser(userData)
getCurrentUser()
updateProfile(userData)

// Blogs
getAllBlogs(params)
getBlogById(id)
getBlogsByUser(userId)
getMyBlogs()
createBlog(formData)
updateBlog(id, formData)
deleteBlog(id)
```

## Image Handling

- Input accepts JPEG, PNG, GIF, WebP
- File size limit: 10MB
- Preview shown before upload
- Images uploaded to Cloudinary
- Placeholder for missing images

## Authentication Flow

1. Register/Login → Get JWT token
2. Token stored in localStorage
3. Token sent in Authorization header
4. Protected routes check token
5. Logout clears token and user data

## Responsive Design

Breakpoints:
- Mobile: 480px
- Tablet: 768px
- Desktop: 1024px+

Features:
- Flexible grid layouts
- Touch-friendly buttons
- Responsive images
- Mobile-optimized forms
- Hamburger menu (future)

## Styling

- CSS files for each component/page
- Global styles in index.css
- CSS variables for colors
- Mobile-first approach
- Consistent spacing and typography

## Forms

All forms include:
- Input validation
- Error messages
- Loading state feedback
- Success/error handling
- Reset on success

## Error Handling

- Try-catch in async functions
- User-friendly error messages
- Network error handling
- 401 redirect to login
- Error logging to console

## Performance

- Code splitting with React Router
- Lazy loading images
- Pagination on home page
- Optimized re-renders with Context API
- CSS minification in production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- **react**: UI library
- **react-dom**: React DOM rendering
- **react-router-dom**: Client-side routing
- **axios**: HTTP client

## Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (one-way operation)
npm run eject
```

## Environment Variables

```
REACT_APP_API_URL=http://localhost:5000/api
```

**Note:** All variables must start with `REACT_APP_` to be accessible

## Debugging

- React DevTools extension recommended
- Browser console for errors
- Network tab for API calls
- LocalStorage inspection for token

## Deployment

Build and deploy to:
- Vercel
- Netlify
- GitHub Pages
- Traditional hosting with Node.js

```bash
# Build production version
npm run build

# Upload 'build' folder to hosting provider
```

## Troubleshooting

### Blank page/404
- Clear browser cache
- Check .env variables
- Verify backend is running

### API calls failing (401)
- Token expired, login again
- Check localStorage for token
- Verify backend JWT_SECRET

### Images not loading
- Check Cloudinary setup
- Verify image URLs
- Check file size (max 10MB)

### Styles not applying
- Clear browser cache
- Check CSS file imports
- Verify CSS is in public folder

