import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Symbols from "./Symbols";

describe("Symbols component", () => {
    test("the user can only select one symbol per category, ensuring only the latest selection's translation is displayed", () => {
        render(<Symbols user={{}} />);

        // Select the first symbol from the 'washing' category
        fireEvent.click(screen.getByTestId("washing-0"));

        // Assuming the translation text updates in the document, check for the first translation
        let translationElement = screen.getByText(/Machine Wash at or below 95°C\/203°F!/i);
        expect(translationElement).toBeDefined();

        // Select the second symbol within the same 'washing' category
        fireEvent.click(screen.getByTestId("washing-1"));

        // Check for the second symbol's translation, ensuring it's now present
        translationElement = screen.getByText(/Machine Wash at or below 70°C\/160°F!/i);
        expect(translationElement).toBeDefined();

        // Verify that the first symbol's translation is no longer displayed
        const firstTranslationAbsent = screen.queryByText(/Machine Wash at or below 95°C\/203°F!/i);
        expect(firstTranslationAbsent).toBeNull();

        // Optionally, verify that there's only one translation displayed in the translations section
        // This step assumes each selection results in a single translation element being present
        const allTranslations = screen.getAllByText(/Machine Wash at or below [0-9]+°C\/[0-9]+°F!/i);
        expect(allTranslations).toHaveLength(1);
    });
});
