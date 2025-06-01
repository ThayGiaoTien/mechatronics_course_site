// models/Blog.ts
const mongoose = require('mongoose');

// Helper function to generate a random integer between min (inclusive) and max (exclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // This is the URL-friendly version of the title
    // e.g. "How to use React" becomes "how-to-use-react"
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // This is the content of the blog post
    // It can be in Markdown format
    content: {
      type: String, // Markdown content
      required: true,
    },
    thumbnail: {
      type: String, // URL to CDN-hosted image
    },
    categories: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    views: {
      type: Number,
      default: randomInt(0, 1000), // Random initial views between 0 and 1000
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);


const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;