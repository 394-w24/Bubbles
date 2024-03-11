import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ScannerCompatibility from "./ScannerCompatibility";
import * as FunctionCalls from './FunctionCalls';
import * as CheckModule from '../Utilities/check.mjs';

vi.mock('./FunctionCalls', () => ({
    getInstructions: vi.fn(),
}));
vi.mock('../Utilities/check.mjs', () => ({
    default: vi.fn(),
}));

describe("Scanner Compatibility component", () => {
    it("check that the same translation results in 100% compatibility", async () => {
        // render(<ScannerCompatibility user={{}} />);
        const mockTranslations = [[1], [1]]; // Example translation IDs
        FunctionCalls.getInstructions.mockResolvedValueOnce(mockTranslations[0]).mockResolvedValueOnce(mockTranslations[1]);
        CheckModule.default.mockReturnValue({
          washCapatible: true,
          dryCapatible: true,
          wash: 'Wash setting',
          dry: 'Dry setting',
        });
    
        // Render the component
        const { getByText, findByText } = render(<ScannerCompatibility />);
    
        // Simulate user actions or lifecycle methods that trigger getInstructions and check
        // For example, if you have buttons to simulate scanning, click them
        // fireEvent.click(getByText('Scan Button Text Here'));
        fireEvent.click(getByText('Capture Photo'));
        await waitFor(() => expect(screen.getByText('Capture Photo')).toBeDefined());
        fireEvent.click(getByText('Capture Photo'));

        // Assert that the compatibility check passes as expected
        await waitFor(() => {
          expect(FunctionCalls.getInstructions).toHaveBeenCalledTimes(2);
          expect(CheckModule.default).toHaveBeenCalledWith(mockTranslations[0], mockTranslations[1]);
          expect(getByText('You can wash these together with the following setting:')).toBeDefined();
          expect(getByText('You can dry these together with the following setting:')).toBeDefined();
        // check that test fails:
        //   expect(getByText('You can not wash these together')).toBeDefined();
        //   expect(getByText('You can not dry these together')).toBeDefined();
        });

    })
})