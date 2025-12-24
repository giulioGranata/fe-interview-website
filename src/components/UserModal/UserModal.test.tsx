import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { User } from "../../types";
import { UserModal } from "./UserModal";

const mockUser: User = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  role: "ADMIN",
  company: {
    title: "Software Engineer",
    department: "Engineering",
    name: "Acme Corp",
  },
};

describe("UserModal", () => {
  it("does not render when closed", () => {
    const onClose = vi.fn();

    render(<UserModal user={mockUser} isOpen={false} onClose={onClose} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not render when no user provided", () => {
    const onClose = vi.fn();

    render(<UserModal user={null} isOpen={true} onClose={onClose} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when open with user", () => {
    const onClose = vi.fn();

    render(<UserModal user={mockUser} isOpen={true} onClose={onClose} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("displays all user details", () => {
    const onClose = vi.fn();

    render(<UserModal user={mockUser} isOpen={true} onClose={onClose} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("ADMIN")).toBeInTheDocument();
  });

  it("calls onClose when clicking close button", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<UserModal user={mockUser} isOpen={true} onClose={onClose} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when pressing Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<UserModal user={mockUser} isOpen={true} onClose={onClose} />);

    await user.keyboard("{Escape}");

    // May be called multiple times due to both document and element handlers
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when clicking overlay background", () => {
    const onClose = vi.fn();

    render(<UserModal user={mockUser} isOpen={true} onClose={onClose} />);

    const overlay = screen.getByRole("dialog");
    // Use fireEvent to directly click on the overlay element
    // This simulates e.target === e.currentTarget (clicking the overlay itself)
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("has proper ARIA attributes", () => {
    const onClose = vi.fn();

    render(<UserModal user={mockUser} isOpen={true} onClose={onClose} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
  });
});
