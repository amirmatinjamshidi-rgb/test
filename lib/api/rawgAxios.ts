import axios from "axios";

const BASE_URL = "https://api.rawg.io/api";
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

if (!API_KEY) {
  throw new Error("API key is missing");
}

export const rawgClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
