import { screen, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

describe("CollapsibleAccrodion", () => {
  const renderCollapsibleAccordio = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: "My Category",
      },
      slots: {
        default: "<h3>My nested child</h3>",
      },
      ...config,
    });
  };

  it("render child content", async () => {
    const props = {
      header: "My Category",
    };
    const slots = {
      default: "<h3>My nested child</h3>",
    };

    const config = { props, slots };

    renderCollapsibleAccordio(config);

    expect(screen.queryByText("My nested child")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /my category/i });
    await userEvent.click(button);
    expect(screen.getByText("My nested child")).toBeInTheDocument();
  });

  describe("when parent does not provide custom child content", () => {
    it("renders default content", async () => {
      const props = {
        header: "My Category",
      };
      const slots = {};
      const config = { props, slots };
      renderCollapsibleAccordio(config);
      const button = screen.getByRole("button", { name: /my category/i });
      await userEvent.click(button);
      expect(screen.getByText("Whoops, somebody forget to populate me!"));
    });
  });
});
