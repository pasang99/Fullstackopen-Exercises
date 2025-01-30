import React from 'react';
import Person from './Persons';

const Persons = ({ persons, filter }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      {filteredPersons.map(person => <Person key={person.id} person={person} />)}
    </div>
  );
};

export default Persons;
