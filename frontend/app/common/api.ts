import axios from "axios";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";

export const api = axios.create({
  baseURL: "${process.env.NEXT_PIBLIC_SERVER_URL}",
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});
