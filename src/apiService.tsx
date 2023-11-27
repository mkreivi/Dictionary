import { useState } from "react";

function useApiService() {
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDefinition = async (word: string) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch definition for ${word}`);
      }
      const data = await response.json();
      setWordData(data[0] || null);
      setError(null);
    } catch (error) {
      console.error("Error fetching definition:", error);
      setError((error as Error).message);
      throw error;
    }
  };

  return { fetchDefinition, wordData };
}

export default useApiService;
