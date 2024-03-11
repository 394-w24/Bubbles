import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Login state test", () => {
  test("Testing login page display", () => {
    render(<App />);
    expect(screen.getByText("Sign In")).toBeDefined();
  });
});
