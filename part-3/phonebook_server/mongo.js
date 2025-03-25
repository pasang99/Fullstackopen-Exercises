const mongoose = require('mongoose');

// Create a schema for Note with validation for content
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Content is required'], // Ensures the field is not empty
    minlength: [5, 'Content must be at least 5 characters long'], // Minimum length validation
    maxlength: [500, 'Content can\'t be more than 500 characters'], // Maximum length validation
  },
  important: {
    type: Boolean,
    default: false,
  },
});

// Create a model based on the schema
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
