import React from 'react';
import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ScannerDefault from './ScannerDefault';
// import ScannerDefault from './Components/ScannerDefault';

const { getInstructionsMock } = vi.hoisted(() => {
    return { getInstructionsMock: vi.fn().mockImplementation(async (url) => {

        return [1, 2, 3];
    }) }
})


// Replace the getInstructions function with the mock
vi.mock('./FunctionCalls', () => ({
    getInstructions: getInstructionsMock,
}));

describe('ScannerDefault', () => {
    test('should set the image state when the capture button is clicked', async () => {


        const mockScreenshot = "emptyimagethiscontenmtdoesn'tatter";
        const { getScreenshotMock } = vi.hoisted(() => {
            return { getScreenshotMock: vi.fn().mockImplementation(async (url) => {
        
                return mockScreenshot;
            }) }
        })
        const webcamRefMock = { current: { getScreenshot: getScreenshotMock } };

        const { rerender } = render(<ScannerDefault webcamRef={webcamRefMock} getInstructions={getInstructionsMock}/>);
        // Click the capture button
        fireEvent.click(screen.getByTestId('capture button'));


        expect(screen.getByText('Loading...')).toBeDefined();
        await waitFor(() => {
            expect(getInstructionsMock).toHaveBeenCalled();
          });


        const capturedImage = (screen.getByAltText('Captured'))
        // console.log(screen.getByAltText('Captured'))
        expect(screen.getByAltText('Captured')).toBeInstanceOf(HTMLImageElement);
        console.log(capturedImage.outerHTML);

    });
});