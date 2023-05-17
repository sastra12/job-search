import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFilterSidebarOrganizations from "@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";

describe("JobFilterSidebarOrganizations", () => {
  it("renders unique list of organizations from jobs", async () => {
    const pinia = createTestingPinia();
    const jobStore = useJobsStore();
    jobStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    render(JobFilterSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const organizationListItem = screen.getAllByRole("listitem");
    const organizations = organizationListItem.map((node) => node.textContent);
    expect(organizations).toEqual(["Google", "Amazon"]);
  });
});
