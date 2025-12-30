import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RoleFilter } from "./RoleFilter";

describe("RoleFilter", () => {
  it("renders all role options", () => {
    const onChange = vi.fn();

    render(<RoleFilter selectedRoles={[]} onChange={onChange} />);

    expect(screen.getByRole("button", { name: /filter by admin/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /filter by editor/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /filter by viewer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /filter by guest/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /filter by owner/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /filter by inactive/i })).toBeInTheDocument();
  });

  it("shows selected state for active filters", () => {
    const onChange = vi.fn();

    render(<RoleFilter selectedRoles={["ADMIN", "EDITOR"]} onChange={onChange} />);

    const adminButton = screen.getByRole("button", {
      name: /filter by admin/i,
    });
    const editorButton = screen.getByRole("button", {
      name: /filter by editor/i,
    });
    const viewerButton = screen.getByRole("button", {
      name: /filter by viewer/i,
    });

    expect(adminButton).toHaveAttribute("aria-pressed", "true");
    expect(editorButton).toHaveAttribute("aria-pressed", "true");
    expect(viewerButton).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onChange with added role when clicking unselected filter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<RoleFilter selectedRoles={[]} onChange={onChange} />);

    const adminButton = screen.getByRole("button", {
      name: /filter by admin/i,
    });
    await user.click(adminButton);

    expect(onChange).toHaveBeenCalledWith(["ADMIN"]);
  });

  it("calls onChange with removed role when clicking selected filter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<RoleFilter selectedRoles={["ADMIN", "EDITOR"]} onChange={onChange} />);

    const adminButton = screen.getByRole("button", {
      name: /filter by admin/i,
    });
    await user.click(adminButton);

    expect(onChange).toHaveBeenCalledWith(["EDITOR"]);
  });

  it("supports multiple selection", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { rerender } = render(<RoleFilter selectedRoles={["ADMIN"]} onChange={onChange} />);

    const editorButton = screen.getByRole("button", {
      name: /filter by editor/i,
    });
    await user.click(editorButton);

    expect(onChange).toHaveBeenCalledWith(["ADMIN", "EDITOR"]);

    // Rerender with new selection
    rerender(<RoleFilter selectedRoles={["ADMIN", "EDITOR"]} onChange={onChange} />);

    const viewerButton = screen.getByRole("button", {
      name: /filter by viewer/i,
    });
    await user.click(viewerButton);

    expect(onChange).toHaveBeenCalledWith(["ADMIN", "EDITOR", "VIEWER"]);
  });

  it("has accessible group label", () => {
    const onChange = vi.fn();

    render(<RoleFilter selectedRoles={[]} onChange={onChange} />);

    // fieldset provides implicit group semantics
    const fieldset = screen.getByRole("group");
    expect(fieldset).toHaveAttribute("aria-label", "Filter by role");
  });
});
