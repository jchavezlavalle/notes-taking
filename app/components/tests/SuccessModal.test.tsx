import { render, screen, fireEvent } from "@testing-library/react";
import SuccessModal from "../SuccessModal";

describe("SuccessModal", () => {
  it("renders the modal with the correct message", () => {
    render(<SuccessModal message="Test message" onClose={() => {}} />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("calls onClose when OK button is clicked", () => {
    const onClose = jest.fn();
    render(<SuccessModal message="Success!" onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /ok/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
