import React, { useEffect, useState } from "react";
import "./TypeAheadDropdown.css";

import { useDebounce } from "../../utils/debounceHook";
import axios from "axios";

export const TypeAheadDropdown = ({ items }: any): JSX.Element => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [text, setText] = useState("");

  const debouncedSearchTerm = useDebounce(text, 1000);

  useEffect(() => {
    let suggestions: any[] = [];
    async function searchCountries(text: string) {
      const { data } = await axios.get(
        `https://restcountries.eu/rest/v2/name/${text}`
      );
      suggestions = data.map((country: any) => country.name);
      setSuggestions(suggestions);
    }

    if (text.length > 0) {
      searchCountries(text);
    }
  }, [debouncedSearchTerm]);

  const onTextChange = (e: any) => {
    const { value } = e.target;
    setText(value);
  };

  const suggestionSelected = (value: string) => {
    setText(value);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
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
