import React, { useState } from 'react';

const Autocomplete = ({ doctors, filters, setFilters }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, name: value }));

    if (value.length > 0) {
      const filtered = doctors.filter(doc =>
        doc.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 3);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (name) => {
    setFilters(prev => ({ ...prev, name }));
    setSuggestions([]);
  };

  return (
    <div className="mb-4 relative">
      <input
        type="text"
        value={filters.name}
        onChange={handleChange}
        data-testid="autocomplete-input"
        className="border border-gray-300 rounded px-4 py-2 w-full"
        placeholder="Search doctors by name..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') setSuggestions([]);
        }}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded mt-1 w-full shadow z-50">
          {suggestions.map((doc, index) => (
            <li
              key={index}
              data-testid="suggestion-item"
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => selectSuggestion(doc.name)}
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
