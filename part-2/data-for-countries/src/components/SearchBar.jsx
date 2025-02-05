// In SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e)}
      />
    </div>
  );
};

export default SearchBar;
