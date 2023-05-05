import { screen, render } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "PT. SAS Corp",
    ...jobProps,
  });

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...jobProps,
        },
      },
    });
  };

  it("render job title", () => {
    const jobProps = createJobProps({ title: "Vue Progammer" });
    renderJobListing(jobProps);
    expect(screen.getByText("Vue Progammer")).toBeInTheDocument();
  });

  it("render job organization", () => {
    const jobProps = createJobProps({ organization: "PT. ALI BABA" });
    renderJobListing(jobProps);
    expect(screen.getByText("PT. ALI BABA")).toBeInTheDocument();
  });
});
