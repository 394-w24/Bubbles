import React from "react";
import { render, screen, fireEvent, within} from "@testing-library/react";
import { describe, expect } from "vitest";
import Symbols from "./Symbols";
import data from "../../data/symbol.json";

const getRandomSymbol = (section) => {
    const symbols = data[section];
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return [section, symbols[randomIndex]];
};

describe("Symbols component", () => {
    test("displays the correct symbol in translations when clicked", () => {
        render(<Symbols user={{}} />);
        // Click the capture button
        fireEvent.click(screen.getByTestId("washing-0"));


        // const img = screen.getByAltText('A washing cow');
        const div = screen.getByTestId('translations');
        const img = within(div).getByRole('img')

        expect(img).toHaveProperty("src")
        expect(img.src).toContain("/images/symbols/0.svg")
        expect(div.contains(img)).toBe(true);
    });
});
