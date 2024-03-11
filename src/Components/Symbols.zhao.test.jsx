import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Symbols from "./Symbols";
import data from "../../data/symbol.json";

const getRandomSymbol = (section) => {
  const symbols = data[section];
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
};

describe("Symbols component", () => {
  it("check that border color and weight of card changes when user selects a symbol", async () => {
    render(<Symbols user={{}} />);

    // Because we change the border color through the sx prop of an MUI card, we can't actually test 
    // this directly (as far as I can tell, since I can't access it)
    // Therefore, because selecting the card is in the same list as the Translations header,
    // I test if there's a translation that pops up instead
    const translations = screen.getByTestId("translations");
    const initialTranslations = within(translations).queryAllByText(/[^Translations]/);
    expect(initialTranslations.length).toBe(0);


    // Select a random symbol from each section and simulate a click
    const sections = Object.keys(data);
    for (const section of sections) {
      const symbol = getRandomSymbol(section);
      const symbolCard = screen.getByTestId(`${section}-${symbol.id}`);

      fireEvent.click(symbolCard);
      const newTranslations = within(translations).queryAllByText(/[^Translations]/);
      expect(newTranslations.length).toBeGreaterThan(0);

      // click again to unselect it and prepare for next section
      fireEvent.click(symbolCard);
    }
  });
});