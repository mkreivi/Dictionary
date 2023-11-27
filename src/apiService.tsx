const API_BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries"; // DictionaryAPI endpoint

export const searchDefinition = async (word: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${word}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
