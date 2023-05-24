import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFilterSidebarOrganizations from "@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

describe("JobFilterSidebarOrganizations", () => {
  const renderJobFilterSidebarOrganizations = () => {
    const pinia = createTestingPinia();
    const jobStore = useJobsStore();
    const userStore = useUserStore();
    render(JobFilterSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobStore, userStore };
  };

  it("renders unique list of organizations from jobs", async () => {
    // destructuring
    const { jobStore } = renderJobFilterSidebarOrganizations();

    // yang lama
    // const pinia = createTestingPinia();
    // const jobStore = useJobsStore();
    jobStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);
    // yang lama
    // render(JobFilterSidebarOrganizations, {
    //   global: {
    //     plugins: [pinia],
    //     stubs: {
    //       FontAwesomeIcon: true,
    //     },
    //   },
    // });
    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const organizationListItem = screen.getAllByRole("listitem");
    const organizations = organizationListItem.map((node) => node.textContent);
    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  it("communicates that user has selected checkbox for organizations", async () => {
    const { jobStore, userStore } = renderJobFilterSidebarOrganizations();
    // yang lama
    // const pinia = createTestingPinia();
    // const userStore = useUserStore();
    // const jobStore = useJobsStore();
    jobStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    // yang lama
    // render(JobFilterSidebarOrganizations, {
    //   global: {
    //     plugins: [pinia],
    //     stubs: {
    //       FontAwesomeIcon: true,
    //     },
    //   },
    // });
    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const googleCheckbox = screen.getByRole("checkbox", {
      name: /google/i,
    });

    await userEvent.click(googleCheckbox);

    expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
      "Google",
    ]);
  });
});
