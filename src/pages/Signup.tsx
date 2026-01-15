import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { getAuthErrorMessage } from "../auth/errors";

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

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
        <div className="mt-3">
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            <>
              <span>Sign up with Google</span>
            </>
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
