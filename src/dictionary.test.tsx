import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Dictionary from "./Dictionary";

test("renders input field", () => {
  render(<Dictionary />);
  const inputElement = screen.getByPlaceholderText("Enter a word");
  expect(inputElement).toBeInTheDocument();
});

test("fetches data when the button is clicked", async () => {
  render(<Dictionary />);
  const inputElement = screen.getByPlaceholderText("Enter a word");
  const buttonElement = screen.getByText("Search");

  fireEvent.change(inputElement, { target: { value: "test" } });
  fireEvent.click(buttonElement);

  // Wait for the data to be rendered
  await waitFor(() => {
    const wordElement = screen.getByText("test");
    expect(wordElement).toBeInTheDocument();
  });
});

test("shows an error message if no word is typed", () => {
  render(<Dictionary />);
  const buttonElement = screen.getByText("Search");
  fireEvent.click(buttonElement);

  const errorElement = screen.getByText("Failed to fetch definition");
  expect(errorElement).toBeInTheDocument();
});

test("renders audio file if available", () => {
  // Mock the API response to include an audio file
  // ...

  render(<Dictionary />);

  const inputElement = screen.getByPlaceholderText("Enter a word");
  const buttonElement = screen.getByText("Search");

  fireEvent.change(inputElement, { target: { value: "test" } });
  fireEvent.click(buttonElement);

  // Add assertions for the audio element
  const audioElement = screen.getByRole("audio");
  expect(audioElement).toBeInTheDocument();
});
