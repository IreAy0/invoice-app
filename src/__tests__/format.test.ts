import { describe, it, expect } from "vitest";
import { formatCurrency, formatDate } from "../utils/format";

describe("format utilities", () => {
  it("formats currency with default USD", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });

  it("formats currency with custom currency", () => {
    expect(formatCurrency(1000, "EUR")).toBe("€1,000.00");
  });

  it("formats ISO-like date strings as short date", () => {
    expect(formatDate("2023-03-30")).toBe("Mar 30, 2023");
  });
});
