import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Dictionary from "./Dictionary";

//Test to check if the input field is rendered
test("renders input field", () => {
  render(<Dictionary />);
  const inputElement = screen.getByPlaceholderText("Enter a word");
  expect(inputElement).toBeInTheDocument();
});

// Test to check if the input value is captured correctly
test("captures input value", () => {
  render(<Dictionary />);
  const inputElement = screen.getByPlaceholderText(
    "Enter a word"
  ) as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: "test" } });
  expect(inputElement.value).toBe("test");
});

test("fetches data when the button is clicked", async () => {
  render(<Dictionary />);
  const inputElement = screen.getByPlaceholderText("Enter a word");
  const buttonElement = screen.getByText("Search");

  fireEvent.change(inputElement, { target: { value: "test" } });
  fireEvent.click(buttonElement);

  // Wait for the data to be rendered
  const wordElement = await screen.findByText("test");
  expect(wordElement).toBeInTheDocument();

  // Test the API response: first meaning's part of speech
  const partOfSpeechElement = await screen.findByText("noun");
  expect(partOfSpeechElement).toBeInTheDocument();

  // Test the API response: first meaning's first definition
  const definitionElement = await screen.findByText("A challenge, trial.");
  expect(definitionElement).toBeInTheDocument();
});

test("shows an error message if no word is typed", async () => {
  render(<Dictionary />);
  const buttonElement = screen.getByText("Search");
  fireEvent.click(buttonElement);

  //Wait for the error message to be rendered

  await waitFor(() => {
    const errorElement = screen.getByText(/failed to fetch definition/i);
    expect(errorElement).toBeInTheDocument();
  });
});

test("renders audio file if available", async () => {
  render(<Dictionary />);

  const inputElement = screen.getByPlaceholderText("Enter a word");
  const buttonElement = screen.getByText("Search");

  fireEvent.change(inputElement, { target: { value: "test" } });
  fireEvent.click(buttonElement);

  // Wait for the audio element to be rendered
  await waitFor(() => {
    const audioElement = screen.getAllByTestId("audio-element")[0];
    expect(audioElement).toBeInTheDocument();
  });
});
