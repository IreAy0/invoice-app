import axios from "axios";
import { auth } from "../auth/firebase";
import type { InvoiceDetailsData, InvoiceSummary } from "../types";
import { summaries as fallbackSummaries } from "../data/sample";

export const api = axios.create({
  baseURL: "/api", // MSW mocks this
  timeout: 10_000,
});


api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : null;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.code === "ECONNABORTED") {
      return Promise.reject(new Error("Request timed out"));
    }
    if (!err.response) {
      return Promise.reject(new Error("Network error"));
    }
    return Promise.reject(
      new Error(err.response?.data?.message ?? "Request failed")
    );
  }
);

export async function fetchInvoiceSummaries(): Promise<InvoiceSummary[]> {
  try {
    const { data } = await api.get("/invoices");
    return data;
  } catch (err) {
    console.error("Failed to fetch /api/invoices, using fallback data:", err);
    return fallbackSummaries;
  }
}

export async function fetchInvoiceDetails(
  id: string
): Promise<InvoiceDetailsData> {
  const { data } = await api.get(`/invoices/${id}`);
  return data;
}

export async function createInvoice(payload: Partial<InvoiceDetailsData>) {
  const { data } = await api.post("/invoices", payload);
  return data;
}
