import { useState } from 'react';

const App = () => {
  // State to store the list of persons (with both name and number)
  const [persons, setPersons] = useState([{ name: 'pasang', number: '9809809809' }]);

  // State to store the new name and number from the input fields
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // Function to handle the name input change
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Function to handle the number input change
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // Function to handle the form submission
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if the name already exists in the phonebook
    const nameExists = persons.some(person => person.name === newName);

    // If the name exists, show an alert and do not add it
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      // If the name does not exist, add the new person with their number to the phonebook
      const personObject = { name: newName, number: newNumber };
      setPersons(persons.concat(personObject));
    }

    // Reset the input fields after submission
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Form to add a new name and number */}
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      {/* List the phonebook entries */}
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name} - {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
