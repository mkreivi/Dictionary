import { useState } from "react";

//const API_URL = "https://https://api.dictionaryapi.dev/api/v2/entries/en/";

function useApiService() {
  const [wordData, setWordData] = useState<any>(null);

  const fetchDefinition = async (word: string) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch definition for ${word}`);
      }
      const data = await response.json();
      setWordData(data);
      return data;
    } catch (error) {
      console.error("Error fetching definition:", error);
      throw error;
    }
  };

  return { fetchDefinition, wordData };
}

export default useApiService;
