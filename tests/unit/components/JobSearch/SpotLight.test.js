import { render, screen } from "@testing-library/vue";
import axios from "axios";

import SpotLight from "@/components/JobSearch/SpotLight.vue";

vi.mock("axios");

describe("SpotLight", () => {
  it("provide image to parent component", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "Some image",
          title: "Some title",
          description: "Some description",
        },
      ],
    });

    render(SpotLight, {
      slots: {
        default: `
        <template #default=slotProps>
        <h1>{{slotProps.img}}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("Some image");
    expect(text).toBeInTheDocument();
  });

  it("provide title to parent component", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "Some image",
          title: "Some title",
          description: "Some description",
        },
      ],
    });

    render(SpotLight, {
      slots: {
        default: `
        <template #default=slotProps>
        <h1>{{slotProps.title}}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("Some title");
    expect(text).toBeInTheDocument();
  });

  it("provide description to parent component", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "Some image",
          title: "Some title",
          description: "Some description",
        },
      ],
    });

    render(SpotLight, {
      slots: {
        default: `
        <template #default=slotProps>
        <h1>{{slotProps.description}}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("Some description");
    expect(text).toBeInTheDocument();
  });
});
