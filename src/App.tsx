import React from "react";
import { Routes, Route } from "react-router-dom";
import InvoiceHome from "./pages/InvoiceHome";
import InvoiceDetails from "./pages/InvoiceDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <InvoiceHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoice/:id"
          element={
            <ProtectedRoute>
              <InvoiceDetails />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}
