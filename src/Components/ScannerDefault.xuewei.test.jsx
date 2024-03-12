import React from "react";
import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ScannerDefault from "./ScannerDefault";

const { getInstructionsMock } = vi.hoisted(() => {
  return {
    getInstructionsMock: vi.fn().mockImplementation(async (url) => {
      return [1, 2, 3];
    }),
  };
});

// Replace the getInstructions function with the mock
vi.mock("./FunctionCalls", () => ({
  getInstructions: getInstructionsMock,
}));

describe("ScannerDefault", () => {
  test("should set the image state when the capture button is clicked", async () => {
    const mockScreenshot = "data:image/jpeg;base64,mockImage";
    const { getScreenshotMock } = vi.hoisted(() => {
      return {
        getScreenshotMock: vi.fn().mockImplementation(async (url) => {
          return mockScreenshot;
        }),
      };
    });
    const webcamRefMock = { current: { getScreenshot: getScreenshotMock } };

    const { rerender } = render(
      <ScannerDefault
        webcamRef={webcamRefMock}
        getInstructions={getInstructionsMock}
      />
    );
    // Click the capture button
    fireEvent.click(screen.getByTestId("capture button"));

    expect(screen.getByText("Loading...")).toBeDefined();
    await waitFor(() => {
      expect(getInstructionsMock).toHaveBeenCalled();
    });

    const retakeButton = screen.getByRole('button', { name: /retake image/i });
    expect(retakeButton).to.not.be.null;
    // expect(retakeButton.textContent).toBe("Nonexistent Text");

  });
});
