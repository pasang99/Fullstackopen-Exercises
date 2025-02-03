import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import personService from "./services/person"; // Updated import path

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  // Fetch contacts from backend when component mounts
  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => console.error("Error fetching persons:", error));
  }, []);

  // Function to add a new person
  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      // Update existing person's number
      const updatedPerson = { ...existingPerson, number: newNumber };

      personService
        .update(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : returnedPerson)));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error updating person:", error);
          alert("Failed to update contact.");
        });
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      // Save new contact to backend
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]); // Update state
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
          alert("Failed to add new contact.");
        });
    }
  };

  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        Filter shown with <input value={search} onChange={handleSearchChange} />
      </div>

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} search={search} />
    </div>
  );
};

export default App;
