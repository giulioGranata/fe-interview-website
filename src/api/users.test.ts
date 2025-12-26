import { describe, expect, it } from "vitest";
import type { User } from "../types";
import { filterUsers, filterUsersByName, filterUsersByRole } from "./users";

const mockUsers: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "ADMIN",
    team: "Tech",
    jobTitle: "Software Engineer",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    role: "EDITOR",
    team: "Design",
    jobTitle: "Designer",
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    role: "VIEWER",
    team: "HR",
    jobTitle: "Manager",
  },
  {
    id: 4,
    firstName: "Alice",
    lastName: "Williams",
    email: "alice@example.com",
    role: "ADMIN",
    team: "Tech",
    jobTitle: "Developer",
  },
];

describe("filterUsersByName", () => {
  it("returns all users when search query is empty", () => {
    const result = filterUsersByName(mockUsers, "");
    expect(result).toHaveLength(4);
  });

  it("returns all users when search query is only whitespace", () => {
    const result = filterUsersByName(mockUsers, "   ");
    expect(result).toHaveLength(4);
  });

  it("filters by first name (case insensitive)", () => {
    const result = filterUsersByName(mockUsers, "john");
    expect(result).toHaveLength(2); // John Doe and Bob Johnson
    expect(result.map((u) => u.firstName)).toContain("John");
    expect(result.map((u) => u.lastName)).toContain("Johnson");
  });

  it("filters by last name (case insensitive)", () => {
    const result = filterUsersByName(mockUsers, "smith");
    expect(result).toHaveLength(1);
    expect(result[0].lastName).toBe("Smith");
  });

  it("filters by partial match", () => {
    const result = filterUsersByName(mockUsers, "ali");
    expect(result).toHaveLength(1);
    expect(result[0].firstName).toBe("Alice");
  });

  it("returns empty array when no matches", () => {
    const result = filterUsersByName(mockUsers, "xyz");
    expect(result).toHaveLength(0);
  });
});

describe("filterUsersByRole", () => {
  it("returns all users when no roles selected", () => {
    const result = filterUsersByRole(mockUsers, []);
    expect(result).toHaveLength(4);
  });

  it("filters by single role", () => {
    const result = filterUsersByRole(mockUsers, ["ADMIN"]);
    expect(result).toHaveLength(2);
    expect(result.every((u) => u.role === "ADMIN")).toBe(true);
  });

  it("filters by multiple roles", () => {
    const result = filterUsersByRole(mockUsers, ["ADMIN", "EDITOR"]);
    expect(result).toHaveLength(3);
    expect(result.every((u) => ["ADMIN", "EDITOR"].includes(u.role))).toBe(
      true
    );
  });

  it("returns empty array when no matching roles", () => {
    const result = filterUsersByRole(mockUsers, ["GUEST"]);
    expect(result).toHaveLength(0);
  });
});

describe("filterUsers", () => {
  it("combines name and role filters", () => {
    const result = filterUsers(mockUsers, "a", ["ADMIN"]);
    expect(result).toHaveLength(1);
    expect(result[0].firstName).toBe("Alice");
  });

  it("returns empty when name matches but role does not", () => {
    const result = filterUsers(mockUsers, "john", ["GUEST"]);
    expect(result).toHaveLength(0);
  });

  it("returns empty when role matches but name does not", () => {
    const result = filterUsers(mockUsers, "xyz", ["ADMIN"]);
    expect(result).toHaveLength(0);
  });

  it("returns all when no filters applied", () => {
    const result = filterUsers(mockUsers, "", []);
    expect(result).toHaveLength(4);
  });
});
