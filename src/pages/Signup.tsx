import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { getAuthErrorMessage } from "../auth/errors";
import { Eye, EyeOff } from "lucide-react";

type PasswordErrors = {
  length?: string;
  uppercase?: string;
  lowercase?: string;
  number?: string;
};

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [passwordErrors, setPasswordErrors] =
    useState<PasswordErrors>({});

  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validatePassword(value: string): PasswordErrors {
    const errors: PasswordErrors = {};

    if (value.length < 8) {
      errors.length = "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(value)) {
      errors.uppercase =
        "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(value)) {
      errors.lowercase =
        "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(value)) {
      errors.number = "Password must contain at least one number.";
    }

    return errors;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const validationErrors = validatePassword(password);
    setPasswordErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setEmailLoading(true);
    try {
      await signup(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err, "Signup failed"));
    } finally {
      setEmailLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-bg">
      <form
        onSubmit={onSubmit}
        className="card w-[360px] p-6"
        aria-label="Signup form"
      >
        <h1 className="mb-4 text-xl font-semibold">Create account</h1>

        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password field with toggle */}
        <div className="mt-3 relative">
          <Input
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordErrors(validatePassword(e.target.value));
            }}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[30px] text-sm text-text-soft hover:text-text"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Password validation messages */}
        {Object.keys(passwordErrors).length > 0 && (
          <ul className="mt-2 space-y-1 text-sm text-danger">
            {Object.values(passwordErrors).map((msg) => (
              <li key={msg}>• {msg}</li>
            ))}
          </ul>
        )}

        {/* Auth error */}
        {error && (
          <div className="mt-3 rounded-xl bg-danger/10 p-2 text-sm text-danger">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="mt-4 w-full flex items-center justify-center gap-2"
          disabled={emailLoading || googleLoading}
        >
          {emailLoading ? (
            <Spinner inline label="Creating account..." />
          ) : (
            "Sign up"
          )}
        </Button>

        <Button
          type="button"
          className="mt-3 w-full border border-gray-200 bg-white !text-text-soft hover:bg-transparent flex items-center justify-center gap-2"
          disabled={emailLoading || googleLoading}
          onClick={async () => {
            setError(null);
            setGoogleLoading(true);
            try {
              await loginWithGoogle();
              navigate("/", { replace: true });
            } catch (err) {
              setError(getAuthErrorMessage(err, "Google signup failed"));
            } finally {
              setGoogleLoading(false);
            }
          }}
        >
          {googleLoading ? (
            <Spinner inline label="Signing up with Google..." />
          ) : (
            "Sign up with Google"
          )}
        </Button>

        <p className="mt-3 text-center text-sm">
          Already have an account?{" "}
          <Link className="text-primary underline" to="/login">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
