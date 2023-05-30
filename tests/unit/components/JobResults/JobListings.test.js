import { screen, render } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListings from "@/components/JobResults/JobListings.vue";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";
import { useRoute } from "vue-router";
vi.mock("vue-router");

describe("JobListings", () => {
  const renderjobListings = () => {
    const pinia = createTestingPinia();
    render(JobListings, {
      global: {
        plugins: [pinia],

        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };
  it("fetches jobs", () => {
    useRoute.mockReturnValue({ query: {} });
    renderjobListings();
    const jobsStore = useJobsStore();
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("display maximum of 10 jobs", async () => {
    useRoute.mockReturnValue({ query: { page: "1" } });
    renderjobListings();
    const jobsStore = useJobsStore();
    jobsStore.jobs = Array(15).fill({});
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("display page number 1", () => {
      useRoute.mockReturnValue({ query: {} });

      renderjobListings();

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("display page number", () => {
      useRoute.mockReturnValue({ query: { page: "3" } });
      renderjobListings();

      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user on first page", () => {
    it("it do not showing previous page", async () => {
      //axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      // const queryParams = { page: "1" };
      // const $route = createRoute(queryParams);
      useRoute.mockReturnValue({ query: { page: "1" } });

      renderjobListings();
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", {
        name: /previous/i,
      });

      expect(previousLink).not.toBeInTheDocument();
    });

    it("show link to next page", async () => {
      // const queryParams = { page: "1" };
      // const $route = createRoute(queryParams);
      useRoute.mockReturnValue({ query: { page: "1" } });
      renderjobListings();
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
      // const queryParams = { page: "2" };
      // const $route = createRoute(queryParams);
      useRoute.mockReturnValue({ query: { page: "2" } });
      renderjobListings();
      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", {
        name: /next/i,
      });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("show link previous page", async () => {
      // const queryParams = { page: "2" };
      // const $route = createRoute(queryParams);
      useRoute.mockReturnValue({ query: { page: "2" } });
      renderjobListings();
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
