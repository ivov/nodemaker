import fs from "fs";
import dotenv from "dotenv";

if (!fs.existsSync("config/.env")) {
  throw Error("No .env file found at /config dir");
}

dotenv.config({ path: "config/.env" });

[
  process.env.GOOGLE_IMAGE_SEARCH_ENGINE_ID,
  process.env.GOOGLE_PROJECT_API_KEY,
  process.env.N8N_LOGIN_USERNAME,
  process.env.N8N_LOGIN_PASSWORD,
  process.env.IMGBB_API_KEY,
].forEach((envVar) => {
  if (envVar === undefined) {
    throw Error("Missing required environment variable! Check for: " + envVar);
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
  imgbb: {
    apiKey: process.env.IMGBB_API_KEY,
  },
};
