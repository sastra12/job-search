import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFilterSidebarJobTypes from "@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobTypes.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { vi } from "vitest";

vi.mock("vue-router");

describe("JobFilterSidebarJobTypes", () => {
  const renderJobFilterSidebarJobTypes = () => {
    const pinia = createTestingPinia();
    const jobStore = useJobsStore();
    const userStore = useUserStore();

    render(JobFilterSidebarJobTypes, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobStore, userStore };
  };

  it("renders unique list of job types from jobs", async () => {
    // destructuring
    const { jobStore } = renderJobFilterSidebarJobTypes();

    // yang lama
    // const pinia = createTestingPinia();
    // const jobStore = useJobsStore();
    jobStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);
    // yang lama
    // render(JobFilterSidebarOrganizations, {
    //   global: {
    //     plugins: [pinia],
    //     stubs: {
    //       FontAwesomeIcon: true,
    //     },
    //   },
    // });
    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const JobTypesListItem = screen.getAllByRole("listitem");
    const JobTypes = JobTypesListItem.map((node) => node.textContent);
    expect(JobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for job types", async () => {
      useRouter.mockReturnValue({ push: vi.fn() });
      const { jobStore, userStore } = renderJobFilterSidebarJobTypes();
      // yang lama
      // const pinia = createTestingPinia();
      // const userStore = useUserStore();
      // const jobStore = useJobsStore();
      jobStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

      // yang lama
      // render(JobFilterSidebarOrganizations, {
      //   global: {
      //     plugins: [pinia],
      //     stubs: {
      //       FontAwesomeIcon: true,
      //     },
      //   },
      // });
      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });

      await userEvent.click(fullTimeCheckbox);

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
        "Full-time",
      ]);
    });

    it("navigates user to job result page to see fresh batch of filtered jobs", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });
      const { jobStore } = renderJobFilterSidebarJobTypes();
      // yang lama
      // const pinia = createTestingPinia();
      // const userStore = useUserStore();
      // const jobStore = useJobsStore();
      jobStore.UNIQUE_JOB_TYPES = new Set(["Full-time"]);

      // yang lama
      // render(JobFilterSidebarOrganizations, {
      //   global: {
      //     plugins: [pinia],
      //     stubs: {
      //       FontAwesomeIcon: true,
      //     },
      //   },
      // });
      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });

      await userEvent.click(fullTimeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
