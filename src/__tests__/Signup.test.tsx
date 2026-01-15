import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Signup from "../pages/Signup";

const mockedSignup = vi.fn();
const mockedLoginWithGoogle = vi.fn();

vi.mock("../auth/AuthContext", () => ({
  useAuth: () => ({
    signup: mockedSignup,
    loginWithGoogle: mockedLoginWithGoogle,
  }),
}));

describe("Signup page", () => {
  beforeEach(() => {
    mockedSignup.mockReset();
    mockedLoginWithGoogle.mockReset();
  });

  it("submits credentials and calls signup", async () => {
    mockedSignup.mockResolvedValueOnce(undefined);

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/email/i), "new@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");

    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(mockedSignup).toHaveBeenCalledTimes(1);
    expect(mockedSignup).toHaveBeenCalledWith("new@example.com", "password123");
  });

  it("shows error message when signup fails", async () => {
    mockedSignup.mockRejectedValueOnce(new Error("Signup failed"));

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/email/i), "bad@example.com");
    await user.type(screen.getByLabelText(/password/i), "short");

    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText(/signup failed/i)).toBeInTheDocument();
  });
});
