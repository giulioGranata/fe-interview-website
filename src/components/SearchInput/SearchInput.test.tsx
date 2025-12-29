import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("renders with placeholder text", () => {
    const onChange = vi.fn();
    const onSearch = vi.fn();

    render(<SearchInput value="" onChange={onChange} onSearch={onSearch} />);

    expect(screen.getByPlaceholderText("Search by user name or email")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    const onChange = vi.fn();
    const onSearch = vi.fn();

    render(
      <SearchInput
        value=""
        onChange={onChange}
        onSearch={onSearch}
        placeholder="Custom placeholder"
      />,
    );

    expect(screen.getByPlaceholderText("Custom placeholder")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onSearch = vi.fn();

    render(<SearchInput value="" onChange={onChange} onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Search by user name or email");
    await user.type(input, "john");

    expect(onChange).toHaveBeenCalled();
  });

  it("calls onSearch when clicking the search button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onSearch = vi.fn();

    render(<SearchInput value="test" onChange={onChange} onSearch={onSearch} />);

    const button = screen.getByRole("button", { name: /search/i });
    await user.click(button);

    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it("calls onSearch when pressing Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onSearch = vi.fn();

    render(<SearchInput value="" onChange={onChange} onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Search by user name or email");
    await user.type(input, "{enter}");

    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it("has accessible label", () => {
    const onChange = vi.fn();
    const onSearch = vi.fn();

    render(<SearchInput value="" onChange={onChange} onSearch={onSearch} />);

    expect(screen.getByLabelText(/search users by name/i)).toBeInTheDocument();
  });
});
