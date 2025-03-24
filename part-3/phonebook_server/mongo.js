require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

if (!url) {
  console.error('Error: MONGODB_URI is not set');
  process.exit(1);
}

mongoose.set("strictQuery", false);
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

const phonebookSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'], 
    minlength: [3, 'Name must be at least 3 characters long'],
    trim: true
  },
  number: { 
    type: String, 
    minlength: [8, 'Number must be at least 8 characters long'],
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! Format must be XX-XXXXXX or XXX-XXXXXXX`
    },
    required: [true, 'Number is required']
  }
});

const Person = mongoose.model("Person", phonebookSchema);

// **Handle Command-Line Arguments**
const args = process.argv.slice(2);

if (args.length === 0) {
  // If no arguments are passed, display all phonebook entries
  Person.find({}).then(result => {
    console.log('Phonebook:');
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (args.length === 2) {
  // If name and number are provided, add new entry
  const name = args[0];
  const number = args[1];

  const person = new Person({ name, number });

  person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('Usage: node mongo.js "Name" "Number"');
  mongoose.connection.close();
}
