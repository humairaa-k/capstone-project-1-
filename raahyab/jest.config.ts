import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
//   setupFilesAfterFramework: ["<rootDir>/jest.setup.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
