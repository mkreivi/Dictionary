import { useState } from "react";
import useApiService from "./apiService";

function Dictionary() {
  const [word, setWord] = useState<string>("");
  const { wordData, fetchDefinition } = useApiService();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleSearch = () => {
    fetchDefinition(word);
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
            wordData.meanings.map((meaning: any, index: number) => (
              <div key={index}>
                <h3>{meaning.partOfSpeech}</h3>
                {meaning.definitions &&
                  meaning.definitions.map(
                    (definition: any, subIndex: number) => (
                      <div key={subIndex}>
                        <p>{definition.definition}</p>
                        {definition.synonyms.length > 0 && (
                          <p>Synonyms: {definition.synonyms.join(", ")}</p>
                        )}
                        {definition.antonyms.length > 0 && (
                          <p>Antonyms: {definition.antonyms.join(", ")}</p>
                        )}
                      </div>
                    )
                  )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Dictionary;
