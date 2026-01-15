export function getAuthErrorMessage(error: unknown, fallback: string): string {
  const firebaseError =
    error && typeof error === "object" && "code" in error
      ? (error as { code?: string })
      : undefined;

  const code = firebaseError?.code;

  if (code) {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Try logging in instead.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Incorrect email or password.";
      default:
        return fallback;
    }
  }

  // Non-Firebase or custom errors keep their message when available
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
