import { Client } from "appwrite";

export const client = new Client();
client
  .setEndpoint(`${location.origin}/v1`) // Your API Endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID
