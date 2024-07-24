import { config as environmentVariableConfig } from "dotenv";
try {
  const { parsed } = environmentVariableConfig();
  if (!parsed || Object.keys(parsed).length === 0) {
    throw new Error("Failed to load environment variables or .env is empty");
  }
} catch (error) {
  console.error(`Failed to load environment variables ${error}`);
  throw new Error("Failed to load environment variables");
}

import "src/config/express";
