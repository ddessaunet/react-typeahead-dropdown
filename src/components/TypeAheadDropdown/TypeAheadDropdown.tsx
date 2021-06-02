import React, { useState } from "react";

import "./TypeAheadDropdown.css";

export const TypeAheadDropdown = ({ items }: any): JSX.Element => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");

  const onTextChange = (e: any) => {
    let suggestions = [];
    const value = e.target.value;
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      suggestions = items.sort().filter((v: string) => regex.test(v));
    }

    setSuggestions(suggestions);
    setText(value);
  };

  const suggestionSelected = (value: string) => {
    setText(value);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    console.log("suggestions :", suggestions);
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((city) => (
          <li key={city} onClick={(e) => suggestionSelected(city)}>
            {city}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="TypeAheadDropDown">
      <input
        onChange={(e) => onTextChange(e)}
        placeholder="Search city name"
        value={text}
        type="text"
      />
      {renderSuggestions()}
    </div>
  );
};
