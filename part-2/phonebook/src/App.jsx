import { useState } from 'react';

const App = () => {
  // State to store the list of persons in the phonebook
  const [persons, setPersons] = useState([{ name: 'pasang bhuti'}]);

  // State to store the new name from the input field
  const [newName, setNewName] = useState('');

  // Function to handle the name input change
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Function to handle the form submission
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Add the new name to the phonebook
    const personObject = { name: newName };
    setPersons(persons.concat(personObject));
    setNewName(''); // Reset the input field after submission
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Form to add a new name */}
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      {/* List the phonebook entries */}
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
