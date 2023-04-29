import { render, screen } from "@testing-library/vue";
import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  // responsibility off ActionButton Components:
  // 1. Render text that we give it
  // 2. dynamic aplly classes

  it("render text", () => {
    render(ActionButton, {
      props: {
        text: "Sign In",
        type: "primary",
      },
    });

    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("applies one of several style css", () => {
    render(ActionButton, {
      props: {
        text: "Sign In",
        type: "primary",
      },
    });

    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    expect(button).toHaveClass("primary");
  });
});
