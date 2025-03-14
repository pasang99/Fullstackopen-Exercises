const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON and enable CORS
app.use(cors());
app.use(express.json());

// Custom token for logging request body
morgan.token('body', (req) => JSON.stringify(req.body));

// Use morgan with a custom format that includes request body
app.use(morgan(':method :url :status :response-time ms - :body'));

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Hardcoded phonebook entries
let phonebook = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];

// Get all persons
app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});

// Add a new person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  const nameExists = phonebook.some(person => person.name === name);
  if (nameExists) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 10000).toString(),
    name,
    number,
  };

  phonebook.push(newPerson);
  res.status(201).json(newPerson);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.send({ status: 'Server is running' });
});

// Serve the frontend for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
