import { describe, expect, it } from "vitest";
import { formatMonth, formatRange } from "../src/lib/format";

describe("date formatting", () => {
  it("formats a year-month", () => {
    expect(formatMonth("2025-06")).toBe("Jun 2025");
    expect(formatMonth("2024-11")).toBe("Nov 2024");
  });

  it("formats an open range as Present", () => {
    expect(formatRange("2025-06", null)).toBe("Jun 2025 – Present");
  });

  it("formats a closed range", () => {
    expect(formatRange("2024-11", "2025-05")).toBe("Nov 2024 – May 2025");
  });
});
