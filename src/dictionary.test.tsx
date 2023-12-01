import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Dictionary from "./Dictionary";

test("renders input field", () => {
  render(<Dictionary />);
  const inputElement = screen.getByPlaceholderText("Enter a word");
  expect(inputElement).toBeInTheDocument();
});

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
  await waitFor(() => {
    const wordElement = screen.getByText("test");
    expect(wordElement).toBeInTheDocument();
  });
});

test("shows an error message if no word is typed", async () => {
  render(<Dictionary />);
  const buttonElement = screen.getByText("Search");
  fireEvent.click(buttonElement);

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

  await waitFor(() => {
    const audioElement = screen.getAllByTestId("audio-element");
    expect(audioElement).toBeInTheDocument();
  });
});
