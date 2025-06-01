// models/Blog.ts
const mongoose = require('mongoose');
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
      type: String,
      ref: 'User'
    },
    isPublished: {
      type: Boolean,
      default: false,
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