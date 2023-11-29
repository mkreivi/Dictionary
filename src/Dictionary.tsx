import { useState } from "react";
import useApiService from "./apiService";

function Dictionary() {
  const [word, setWord] = useState<string>("");
  const { wordData, fetchDefinition } = useApiService();
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setError(null); // Clear previous errors
      await fetchDefinition(word);
    } catch (error: any) {
      console.error("Error in Dictionary component:", error);
      setError(error.message || "Failed to fetch definition");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontSize: "16px",
      }}
    >
      <input
        type="text"
        placeholder="Enter a word"
        value={word}
        onChange={handleInputChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginRight: "10px",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginRight: "10px",
        }}
      >
        Search
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {wordData && (
        <div>
          <h2>{wordData.word}</h2>
          {wordData.phonetics &&
            wordData.phonetics.map((phonetic: any, index: number) => (
              <div key={index}>
                {phonetic.text && <p>{phonetic.text}</p>}
                {phonetic.audio && (
                  <audio controls>
                    <source src={phonetic.audio} type="audio/mpeg" />
                  </audio>
                )}
              </div>
            ))}

          {wordData.meanings &&
            wordData.meanings.slice(0, 5).map((meaning: any, index: number) => (
              <div key={index}>
                <h3>{meaning.partOfSpeech}</h3>
                {meaning.definitions &&
                  meaning.definitions
                    .slice(0, 5)
                    .map((definition: any, subIndex: number) => (
                      <div key={subIndex}>
                        <p>{definition.definition}</p>
                        {definition.example && (
                          <p>Example: {definition.example}</p>
                        )}
                        {definition.synonyms.length > 0 && (
                          <p>
                            Synonyms:{" "}
                            {definition.synonyms.slice(0, 5).join(", ")}
                          </p>
                        )}
                        {definition.antonyms.length > 0 && (
                          <p>
                            Antonyms:{" "}
                            {definition.antonyms.slice(0, 5).join(", ")}
                          </p>
                        )}
                      </div>
                    ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Dictionary;
