import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { getAuthErrorMessage } from "../auth/errors";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: { pathname?: string } } | null;
  const from = state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setEmailLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err, "Login failed"));
    } finally {
      setEmailLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-bg">
      <form
        onSubmit={onSubmit}
        className="card w-[360px] p-6"
        aria-label="Login form"
      >
        <h1 className="mb-4 text-xl font-semibold">Log in</h1>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
        />
        <div className="mt-3">
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
          />
        </div>
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
            <Spinner inline label="Authenticating..." />
          ) : (
            "Log in"
          )}
        </Button>
        <Button
          type="button"
          className="mt-3 w-full border border-gray-200 bg-white hover:bg-transparent !text-text-soft flex items-center justify-center gap-2"
          disabled={emailLoading || googleLoading}
          onClick={async () => {
            setError(null);
            setGoogleLoading(true);
            try {
              await loginWithGoogle();
              navigate(from, { replace: true });
            } catch (err) {
              setError(getAuthErrorMessage(err, "Google login failed"));
            } finally {
              setGoogleLoading(false);
            }
          }}
        >
          {googleLoading ? (
            <Spinner inline label="Authenticating with Google..." />
          ) : (
            <>
              <span>Continue with Google</span>
            </>
          )}
        </Button>
        <p className="mt-3 text-center text-sm">
          No account?{" "}
          <Link className="text-primary underline" to="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
