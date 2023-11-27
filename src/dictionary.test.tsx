import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Dictionary from "./Dictionary";

describe("Dictionary component", () => {
  it("renders input field correctly", () => {
    render(<Dictionary />);

    const inputElement = screen.getByPlaceholderText(
      "Enter a word"
    ) as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(inputElement.value).toBe("test");
  });
});

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});
