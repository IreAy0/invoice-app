import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { ErrorBoundary } from "../components/ErrorBoundary";

const ProblemChild: React.FC = () => {
  throw new Error("Boom!");
};

describe("ErrorBoundary", () => {
  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  it("renders fallback UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/boom!/i)).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
