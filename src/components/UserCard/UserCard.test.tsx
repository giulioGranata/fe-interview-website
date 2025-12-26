import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { User } from "../../types";
import { UserCard } from "./UserCard";

const mockUser: User = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  role: "ADMIN",
  team: "Engineering",
  jobTitle: "Software Engineer",
};

describe("UserCard", () => {
  it("renders user name", () => {
    const onViewDetails = vi.fn();

    render(<UserCard user={mockUser} onViewDetails={onViewDetails} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders user job title", () => {
    const onViewDetails = vi.fn();

    render(<UserCard user={mockUser} onViewDetails={onViewDetails} />);

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("renders user team", () => {
    const onViewDetails = vi.fn();

    render(<UserCard user={mockUser} onViewDetails={onViewDetails} />);

    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });

  it("renders user email", () => {
    const onViewDetails = vi.fn();

    render(<UserCard user={mockUser} onViewDetails={onViewDetails} />);

    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  it("renders role badge", () => {
    const onViewDetails = vi.fn();

    render(<UserCard user={mockUser} onViewDetails={onViewDetails} />);

    expect(screen.getByText("ADMIN")).toBeInTheDocument();
  });

  it("calls onViewDetails when clicking view details button", async () => {
    const user = userEvent.setup();
    const onViewDetails = vi.fn();

    render(<UserCard user={mockUser} onViewDetails={onViewDetails} />);

    const button = screen.getByRole("button", { name: /view details/i });
    await user.click(button);

    expect(onViewDetails).toHaveBeenCalledTimes(1);
    expect(onViewDetails).toHaveBeenCalledWith(mockUser);
  });

  it("has accessible card label", () => {
    const onViewDetails = vi.fn();

    render(<UserCard user={mockUser} onViewDetails={onViewDetails} />);

    expect(screen.getByRole("article", { name: /user card for john doe/i })).toBeInTheDocument();
  });
});
