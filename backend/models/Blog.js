const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a blog title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide blog description'],
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/800x400?text=Blog+Image',
    },
    imagePublicId: {
      type: String,
      default: null,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Index for better query performance
blogSchema.index({ author: 1 });
blogSchema.index({ title: 'text', description: 'text' });

// Populate author details when fetching blog
blogSchema.pre('findOne', function () {
  if (this.options._recursed) {
    return;
  }
  this.populate('author', 'name email');
});

module.exports = mongoose.model('Blog', blogSchema);
