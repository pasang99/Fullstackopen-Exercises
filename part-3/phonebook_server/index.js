require('dotenv').config(); // Add this line at the top of the file

const express = require('express');
const cors = require('cors');
const { Person } = require('./mongo'); // Import the Person model from mongo.js
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist')); // This serves your frontend static files

// API routes for persons

// Get all persons from the database
app.get('/api/persons', async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    next(error);
  }
});

// Get info about the phonebook (number of persons and current date)
app.get('/info', async (req, res, next) => {
  try {
    const count = await Person.countDocuments({});
    res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`);
  } catch (error) {
    next(error);
  }
});

// Get a specific person by ID
app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    next(error);
  }
});

// Delete a person by ID
app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const result = await Person.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Add a new person or update an existing person
app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  try {
    const existingPerson = await Person.findOne({ name });

    if (existingPerson) {
      existingPerson.number = number;
      const updatedPerson = await existingPerson.save();
      return res.json(updatedPerson);
    }

    const person = new Person({ name, number });
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// Update a person's number
app.put('/api/persons/:id', async (req, res, next) => {
  const { number } = req.body;

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { number },
      { new: true, runValidators: true }
    );

    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

// Global error handler
app.use((error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed ID' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  response.status(500).send({ error: 'Internal server error' });
});

// Set port and MongoDB URI from environment variables
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI; // MongoDB URI from .env

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
