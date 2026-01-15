import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "../pages/Login";

const mockedLogin = vi.fn();
const mockedLoginWithGoogle = vi.fn();

vi.mock("../auth/AuthContext", () => ({
  useAuth: () => ({
    login: mockedLogin,
    loginWithGoogle: mockedLoginWithGoogle,
  }),
}));

describe("Login page", () => {
  beforeEach(() => {
    mockedLogin.mockReset();
    mockedLoginWithGoogle.mockReset();
  });

  it("submits credentials and calls login", async () => {
    mockedLogin.mockResolvedValueOnce(undefined);

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(mockedLogin).toHaveBeenCalledTimes(1);
    expect(mockedLogin).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("shows error message when login fails", async () => {
    mockedLogin.mockRejectedValueOnce(new Error("Invalid credentials"));

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/email/i), "bad@example.com");
    await user.type(screen.getByLabelText(/password/i), "wrong");

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
