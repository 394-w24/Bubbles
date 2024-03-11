import { describe, it, expect, vi } from "vitest";
import { getInstructions } from "./FunctionCalls";

vi.mock("firebase/functions", () => ({
  getFunctions: vi.fn(),
  httpsCallable: vi.fn(() =>
    vi.fn(() => Promise.resolve({ data: { res: "mocked_api_key" } }))
  ),
}));

vi.mock("../Utilities/firebase.js", () => ({
  firebase: {
    // Mock firebase app initialization or any relevant properties
  },
}));

//mock the OpenAI module
vi.mock("openai", () => ({
  default: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: vi.fn(() =>
          Promise.resolve({
            choices: [{ message: { content: "mocked response" } }],
          })
        ),
      },
    },
  })),
}));

describe("getInstructions", () => {
  it("returns instructions given a valid URL", async () => {
    const url = "https://example.com/image.png";
    const instructions = await getInstructions(url);

    expect(instructions).toEqual(["mocked response"]);
  });

  it("returns an error message when no URL is provided", async () => {
    const instructions = await getInstructions();
    expect(instructions).toEqual(["no url/image provided"]);
  });
});
