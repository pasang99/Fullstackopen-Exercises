// Import necessary modules
const express = require('express');
const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());

// Hardcoded phonebook entries
let phonebook = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

// Route to return all phonebook data
app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});

// Route for /info page
app.get('/info', (req, res) => {
  const numEntries = phonebook.length;
  const currentTime = new Date();

  res.send(`
    <p>Phonebook has info for ${numEntries} people</p>
    <p>${currentTime}</p>
  `);
});

// Route to get a single person's details by ID
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = phonebook.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

// Route to delete a person by ID
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const initialLength = phonebook.length;

  phonebook = phonebook.filter(person => person.id !== id);

  if (phonebook.length < initialLength) {
    res.status(204).end(); // No content, successful deletion
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

// Helper function to generate a unique ID
const generateId = () => {
  return Math.floor(Math.random() * 10000).toString(); // Random 4-digit ID
};

// Route to add a new person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  // Check if name or number is missing
  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  // Check if name already exists
  const nameExists = phonebook.some(person => person.name === name);
  if (nameExists) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  // Create new entry
  const newPerson = {
    id: generateId(),
    name,
    number,
  };

  phonebook.push(newPerson);
  res.status(201).json(newPerson); // 201 Created status
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
