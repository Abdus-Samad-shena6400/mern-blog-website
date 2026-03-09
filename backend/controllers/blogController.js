const Blog = require('../models/Blog');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
// helper to rewrite any localhost image links to the public backend url
const normalizeImageUrl = (url) => {
  if (!url) return url;
  const localPrefix = 'http://localhost:5000';
  const publicUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
  if (url.startsWith(localPrefix)) {
    return url.replace(localPrefix, publicUrl);
  }
  return url;
};

exports.getAllBlogs = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    let blogs = await Blog.find(query)
      .populate('author', 'name email')
      .sort('-createdAt')
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Blog.countDocuments(query);

    // rewrite image URLs from any old localhost values
    blogs = blogs.map((b) => {
      const obj = b.toObject();
      obj.image = normalizeImageUrl(obj.image);
      return obj;
    });

    res.status(200).json({
      success: true,
      blogs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlogById = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id).populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Increment views
    blog.views = (blog.views || 0) + 1;
    await blog.save();

    // rewrite image url if necessary
    const obj = blog.toObject();
    obj.image = normalizeImageUrl(obj.image);

    res.status(200).json({
      success: true,
      blog: obj,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get blogs by user
// @route   GET /api/blogs/user/:userId
// @access  Public
exports.getBlogsByUser = async (req, res) => {
  try {
    let blogs = await Blog.find({ author: req.params.userId }).sort('-createdAt');
    blogs = blogs.map((b) => {
      const obj = b.toObject();
      obj.image = normalizeImageUrl(obj.image);
      return obj;
    });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user blogs
// @route   GET /api/blogs/me
// @access  Private
exports.getMyBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find({ author: req.userId }).sort('-createdAt');
    blogs = blogs.map((b) => {
      const obj = b.toObject();
      obj.image = normalizeImageUrl(obj.image);
      return obj;
    });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private
exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = 'https://via.placeholder.com/800x400?text=Blog+Image';
    let imagePublicId = null;

    // Validation
    if (!title || !description) {
      return res.status(400).json({ message: 'Please provide title and description' });
    }

    // Get user information
    const User = require('../models/User');
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Upload image to Cloudinary if provided
    if (req.file) {
      try {
        console.log('Uploading image to Cloudinary:', {
          filename: req.file.filename,
          path: req.file.path,
          size: req.file.size,
          mimetype: req.file.mimetype
        });

        // Check if file exists before upload
        if (!fs.existsSync(req.file.path)) {
          throw new Error('Uploaded file not found on server');
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'blog-posts',
          resource_type: 'auto',
          timeout: 60000, // 60 seconds timeout
        });

        imageUrl = result.secure_url;
        imagePublicId = result.public_id;
        console.log('Image uploaded successfully:', {
          url: imageUrl,
          publicId: imagePublicId
        });

        // Delete local file
        fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        console.error('Cloudinary upload error details:', {
          message: uploadError.message,
          http_code: uploadError.http_code,
          name: uploadError.name
        });

        // Fallback: Use local file URL if Cloudinary fails
        console.log('Cloudinary failed, using local file as fallback');
        const localImagePath = `/uploads/${req.file.filename}`;
        const publicUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
        imageUrl = `${publicUrl}${localImagePath}`;
        imagePublicId = null;

        // Don't delete the file since we're using it locally
        console.log('Using local image URL:', imageUrl);
      }
    }

    const blog = new Blog({
      title,
      description,
      image: imageUrl,
      imagePublicId,
      author: req.userId,
      authorName: user.name,
    });

    await blog.save();
    await blog.populate('author', 'name email');

    res.status(201).json({
      message: 'Blog created successfully',
      blog,
    });
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = async (req, res) => {
  try {
    console.log('Update blog request:', {
      blogId: req.params.id,
      userId: req.userId,
      body: req.body
    });

    const { title, description } = req.body;
    let blog = await Blog.findById(req.params.id);

    console.log('Blog found:', {
      blogExists: !!blog,
      blogId: blog?._id,
      blogAuthor: blog?.author
    });

    if (!blog) {
      if (req.file && req.file.path) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user is the author - Multiple validation methods
    const isOwner = blog.author.toString() === req.userId;
    const isOwnerByQuery = await Blog.findOne({ _id: req.params.id, author: req.userId });

    console.log('Authorization check:', {
      blogAuthor: blog.author.toString(),
      reqUserId: req.userId,
      stringComparison: isOwner,
      queryCheck: !!isOwnerByQuery,
      blogAuthorType: typeof blog.author,
      reqUserIdType: typeof req.userId
    });

    // Use database query as primary check (more reliable)
    if (!isOwnerByQuery) {
      if (req.file && req.file.path) fs.unlinkSync(req.file.path);
      return res.status(403).json({
        message: 'Not authorized to update this blog',
        debug: {
          blogAuthor: blog.author.toString(),
          yourUserId: req.userId,
          reason: 'You can only edit blogs you created'
        }
      });
    }

    if (title) blog.title = title;
    if (description) blog.description = description;

    // Update image if new image is provided
    if (req.file) {
      try {
        console.log('Updating image for blog:', req.params.id);

        // Delete old image from Cloudinary if it exists
        if (blog.imagePublicId) {
          try {
            await cloudinary.uploader.destroy(blog.imagePublicId);
          } catch (deleteError) {
            console.error('Error deleting old image:', deleteError.message);
          }
        }

        // Upload new image
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'blog-posts',
          resource_type: 'auto',
          timeout: 60000,
        });
        blog.image = result.secure_url;
        blog.imagePublicId = result.public_id;

        // Delete local file
        fs.unlinkSync(req.file.path);
        console.log('Image updated successfully for blog:', req.params.id);
      } catch (uploadError) {
        console.error('Cloudinary upload error during update:', uploadError.message);

        // Fallback: Use local file URL if Cloudinary fails
        console.log('Cloudinary failed during update, using local file as fallback');
        const localImagePath = `/uploads/${req.file.filename}`;
        const publicUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
        blog.image = `${publicUrl}${localImagePath}`;
        blog.imagePublicId = null;

        // Don't delete the file since we're using it locally
        console.log('Using local image URL for update:', blog.image);
      }
    }

    await blog.save();
    await blog.populate('author', 'name email');

    res.status(200).json({
      message: 'Blog updated successfully',
      blog,
    });
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res) => {
  try {
    console.log('Delete blog request:', {
      blogId: req.params.id,
      userId: req.userId
    });

    const blog = await Blog.findById(req.params.id);

    console.log('Blog found for deletion:', {
      blogExists: !!blog,
      blogId: blog?._id,
      blogAuthor: blog?.author
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user is the author - Multiple validation methods
    const isOwner = blog.author.toString() === req.userId;
    const isOwnerByQuery = await Blog.findOne({ _id: req.params.id, author: req.userId });

    console.log('Delete authorization check:', {
      blogAuthor: blog.author.toString(),
      reqUserId: req.userId,
      stringComparison: isOwner,
      queryCheck: !!isOwnerByQuery
    });

    // Use database query as primary check (more reliable)
    if (!isOwnerByQuery) {
      return res.status(403).json({
        message: 'Not authorized to delete this blog',
        debug: {
          blogAuthor: blog.author.toString(),
          yourUserId: req.userId,
          reason: 'You can only delete blogs you created'
        }
      });
    }

    // Delete image from Cloudinary
    if (blog.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(blog.imagePublicId);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
