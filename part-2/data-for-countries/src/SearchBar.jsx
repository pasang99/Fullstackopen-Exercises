import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a country"
      />
    </div>
  );
};

export default SearchBar;
