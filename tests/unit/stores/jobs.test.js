import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { useJobsStore } from "@/stores/jobs";
import { describe } from "vitest";
import { useUserStore } from "@/stores/user";

vi.mock("axios");

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("action", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("make API request and store received jobs", async () => {
      axios.get.mockResolvedValue({ data: ["Job 1", "Job 2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["Job 1", "Job 2"]);
    });
  });
});

describe("getter", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Google" },
      ];
      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { jobType: "Full-time" },
        { jobType: "Temporary" },
        { jobType: "Full-time" },
      ];
      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(["Full-time", "Temporary"]));
    });
  });

  describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
    it("identifies jobs that are associated with the given organizations", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Microsoft" },
      ];

      const userStore = useUserStore();
      userStore.selectOrganizations = ["Google", "Amazon"];

      const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;
      expect(result).toEqual([
        { organization: "Google" },
        { organization: "Amazon" },
      ]);
    });

    describe("when user has not selected any organizations", () => {
      it("return all jobs", () => {
        const jobsStore = useJobsStore();
        jobsStore.jobs = [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ];

        const userStore = useUserStore();
        userStore.selectOrganizations = [];
        const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;

        expect(result).toEqual([
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ]);
      });
    });
  });
});
