import { screen, render } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  it("render job title", () => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          title: "Vue Developer",
        },
      },
    });
    expect(screen.getByText("Vue Developer")).toBeInTheDocument();
  });

  it("render job organization", () => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          title: "PT. SAS Corp",
        },
      },
    });
    expect(screen.getByText("PT. SAS Corp")).toBeInTheDocument();
  });
});
