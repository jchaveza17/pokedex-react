import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchValue}
        onChange={handleInputChange}
        className="p-2 border rounded-full  "
      />
    </div>
  );
}

export default SearchBar;
