import fs from "fs";
import dotenv from "dotenv";

if (!fs.existsSync("config/.env")) {
  throw Error("No .env file found at /config dir");
}

dotenv.config({ path: "config/.env" });

const requiredEnvVars = [
  "GOOGLE_IMAGE_SEARCH_ENGINE_ID",
  "GOOGLE_PROJECT_API_KEY",
  "N8N_LOGIN_USERNAME",
  "N8N_LOGIN_PASSWORD",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw Error("Env var missing in .env file: " + process.env[envVar]);
  }
});

export default {
  googleImageSearch: {
    engineId: process.env.GOOGLE_IMAGE_SEARCH_ENGINE_ID,
    apiKey: process.env.GOOGLE_PROJECT_API_KEY,
  },
  n8n: {
    username: process.env.N8N_LOGIN_USERNAME,
    password: process.env.N8N_LOGIN_PASSWORD,
  },
};
