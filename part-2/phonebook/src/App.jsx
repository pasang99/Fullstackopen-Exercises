import { useState } from 'react';

const App = () => {
  // State to store the list of persons
  const [persons, setPersons] = useState([
    { name: 'pasang', number: '9801234566', id: 1 },
    { name: 'niru', number: '9801234567', id: 2 },
    { name: 'muskan', number: '9801234568', id: 3 },
    { name: 'deepanjali', number: '9801234569', id: 4 }
  ]);

  // State to store the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle the search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter persons based on the search term (case-insensitive)
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Search input field */}
      <div>
        Filter by name: <input value={searchTerm} onChange={handleSearchChange} />
      </div>

      <h2>Numbers</h2>

      {/* List the filtered persons */}
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
