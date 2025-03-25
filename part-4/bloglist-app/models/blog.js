const mongoose = require('mongoose')

// Define the schema for a blog
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 }
})

// Create the model based on the schema
const Blog = mongoose.model('Blog', blogSchema)

// Export the Blog model to use in other files
module.exports = Blog
