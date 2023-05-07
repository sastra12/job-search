import { screen, render } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListings from "@/components/JobResults/JobListings.vue";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const renderjobListings = ($route) => {
    const pinia = createTestingPinia();
    render(JobListings, {
      global: {
        plugins: [pinia],
        mocks: {
          $route,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };
  it("fetches jobs", () => {
    const $route = createRoute();
    renderjobListings($route);
    const jobsStore = useJobsStore();
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("display maximum of 10 jobs", async () => {
    const queryParams = { page: "1" };
    const $route = createRoute(queryParams);
    renderjobListings($route);
    const jobsStore = useJobsStore();
    jobsStore.jobs = Array(15).fill({});
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("display page number", () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);

      renderjobListings($route);

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("display page number", () => {
      const queryParams = { page: "3" };
      const $route = createRoute(queryParams);
      renderjobListings($route);

      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user on first page", () => {
    it("it do not showing previous page", async () => {
      //axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);

      renderjobListings($route);
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", {
        name: /previous/i,
      });

      expect(previousLink).not.toBeInTheDocument();
    });

    it("show link to next page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);

      renderjobListings($route);
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", {
        name: /next/i,
      });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user on last page", () => {
    it("does not showing next page", async () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      renderjobListings($route);
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", {
        name: /next/i,
      });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("show link previous page", async () => {
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      renderjobListings($route);
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", {
        name: /previous/i,
      });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
