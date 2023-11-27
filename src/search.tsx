import React, { useState } from "react";
import { searchDefinition } from "./apiService";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const data = await searchDefinition(query);
      setResults(data); // Assuming the API returns an array of items
    } catch (error) {
      // Handle error
      console.error("Error searching definition:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((item) => (
          <li key={item.word}>
            <strong>{item.word}</strong>: {item.meanings[0].definition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
