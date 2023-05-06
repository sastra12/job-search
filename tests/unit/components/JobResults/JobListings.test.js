import { screen, render } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import axios from "axios";
import JobListings from "@/components/JobResults/JobListings.vue";
import { vi } from "vitest";

vi.mock("axios");

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const renderjobListings = ($route) => {
    render(JobListings, {
      global: {
        mocks: {
          $route,
        },
      },
    });
  };
  it("fetches jobs", () => {
    axios.get.mockResolvedValue({ data: [] });
    const $route = createRoute();
    renderjobListings($route);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("display maximum of 10 jobs", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const queryParams = { page: "1" };
    const $route = createRoute(queryParams);
    renderjobListings($route);
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });
});
