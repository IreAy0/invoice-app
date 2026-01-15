import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ProtectedRoute } from "../routes/ProtectedRoute";

const mockedUseAuth = vi.fn();

vi.mock("../auth/AuthContext", () => ({
  useAuth: () => mockedUseAuth(),
}));

describe("ProtectedRoute", () => {
  beforeEach(() => {
    mockedUseAuth.mockReset();
  });

  it("shows loading spinner when auth is loading", () => {
    mockedUseAuth.mockReturnValue({ user: null, loading: true });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Secret</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading authentication/i)).toBeInTheDocument();
  });

  it("redirects to login when user is not authenticated", async () => {
    mockedUseAuth.mockReturnValue({ user: null, loading: false });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Secret</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/login page/i)).toBeInTheDocument();
  });

  it("renders children when user is authenticated", () => {
    mockedUseAuth.mockReturnValue({ user: { uid: "123" }, loading: false });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Secret content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/secret content/i)).toBeInTheDocument();
  });
});
