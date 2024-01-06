import React from 'react';
import usePokemonTypes from '../hooks/use-hooks-context';

const Dropdown = ({ onSelectType }) => {
  const types = usePokemonTypes();

  return (
    <div className="relative inline-block">
      <select
        onChange={(event) => onSelectType(event.target.value)}
        className="p-2 border rounded cursor-pointer"
      >
        <option value="">Select Type</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
