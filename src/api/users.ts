import type { DummyJsonResponse, DummyJsonUser, User, UserRole } from "../types";

const API_URL = "https://dummyjson.com/users?limit=20";

const ROLES: UserRole[] = ["ADMIN", "EDITOR", "VIEWER", "GUEST", "OWNER", "INACTIVE"];

/**
 * Assigns a deterministic role based on user ID
 * This ensures consistent role assignment across re-renders
 */
function assignRole(userId: number): UserRole {
  return ROLES[userId % ROLES.length];
}

/**
 * Transforms DummyJSON user data to our User type
 */
function transformUser(apiUser: DummyJsonUser): User {
  return {
    id: apiUser.id,
    firstName: apiUser.firstName,
    lastName: apiUser.lastName,
    email: apiUser.email,
    role: assignRole(apiUser.id),
    company: {
      title: apiUser.company.title,
      department: apiUser.company.department,
      name: apiUser.company.name,
    },
  };
}

/**
 * Fetches users from DummyJSON API and transforms them
 */
export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
  }

  const data: DummyJsonResponse = await response.json();
  return data.users.map(transformUser);
}

/**
 * Filters users by name (first or last name)
 */
export function filterUsersByName(users: User[], searchQuery: string): User[] {
  if (!searchQuery.trim()) {
    return users;
  }

  const query = searchQuery.toLowerCase().trim();
  return users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query),
  );
}

/**
 * Filters users by selected roles
 */
export function filterUsersByRole(users: User[], selectedRoles: UserRole[]): User[] {
  if (selectedRoles.length === 0) {
    return users;
  }

  return users.filter((user) => selectedRoles.includes(user.role));
}

/**
 * Combines search and role filters
 */
export function filterUsers(users: User[], searchQuery: string, selectedRoles: UserRole[]): User[] {
  let filtered = filterUsersByName(users, searchQuery);
  filtered = filterUsersByRole(filtered, selectedRoles);
  return filtered;
}
