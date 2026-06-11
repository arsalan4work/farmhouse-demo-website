import { beforeAll, afterEach, afterAll } from "vitest";

// Setup for testing
beforeAll(() => {
  console.log("Vitest test environment initialized");
});

afterEach(() => {
  // Clear any mocks after each test
});

afterAll(() => {
  console.log("Vitest test environment cleanup complete");
});
