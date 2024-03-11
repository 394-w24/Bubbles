import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Symbols from "./Symbols";
import data from "../../data/symbol.json";

const getRandomSymbol = (section) => {
  const symbols = data[section];
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return [section, symbols[randomIndex]];
};

describe("Symbols component", () => {
  it("displays the correct translations based on user selections", () => {
    render(<Symbols user={{}} />);

    // Select a random symbol from each section
    const sections = Object.keys(data);
    const selectedSymbols = sections.map((section) => getRandomSymbol(section));

    selectedSymbols.forEach(([header, symbol]) => {
      const symbolCard = screen.getByTestId(`${header}-${symbol.id}`);
      fireEvent.click(symbolCard);
    });

    // Check if the translations match the selected symbols
    selectedSymbols.forEach(([, symbol]) => {
      // Will throw an error if text does not exist on the screen
      const translationText = screen.getByText(symbol.translation);
      expect(translationText).toBeDefined();
    });
  });

  it("removes the translation when a selected symbol is deselected", () => {
    render(<Symbols user={{}} />);

    // Select a random symbol
    const [, randomSymbol] = getRandomSymbol("bleaching");
    const symbolCard = screen.getByTestId(`bleaching-${randomSymbol.id}`);
    fireEvent.click(symbolCard);

    // Check if the translation is displayed
    const translationText = screen.getByText(randomSymbol.translation);
    expect(translationText).toBeDefined();

    // Deselect the symbol
    fireEvent.click(symbolCard);

    // Check if the translation is removed
    // queryByText defaults to null if the text does not exist on the screen
    expect(screen.queryByText(randomSymbol.translation)).toBeNull();
  });
});
