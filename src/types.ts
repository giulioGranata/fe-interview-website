export type UserRole = "ADMIN" | "EDITOR" | "VIEWER" | "GUEST" | "OWNER" | "INACTIVE";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  company: {
    title: string;
    department: string;
    name: string;
  };
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// DummyJSON API response types
export interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: {
    title: string;
    department: string;
    name: string;
  };
}

export interface DummyJsonResponse {
  users: DummyJsonUser[];
  total: number;
  skip: number;
  limit: number;
}
