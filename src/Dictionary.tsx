import { useState } from "react";
import useApiService from "./apiService";

function Dictionary() {
  const [word, setWord] = useState<string>("");
  const { wordData, fetchDefinition } = useApiService();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const data = await fetchDefinition(word);
      console.log("Definition fetched:", data);
    } catch (error) {
      console.error("Error fetching definition:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a word"
        value={word}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>

      {wordData && (
        <div>
          <h2>{wordData[0]?.word}</h2>
        </div>
      )}
    </div>
  );
}

export default Dictionary;
