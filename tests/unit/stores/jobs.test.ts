import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { useJobsStore } from "@/stores/jobs";
import { describe } from "vitest";
import { useUserStore } from "@/stores/user";
import type { Job } from "@/api/types";
import type { Mock } from "vitest";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

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
      axiosGetMock.mockResolvedValue({ data: ["Job 1", "Job 2"] });
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
      ] as Job[];
      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATIONS", () => {
    describe("when the user has not selected any organizations", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectOrganizations = [];
        const jobStore = useJobsStore();
        const job = { organization: "Google" } as Job;

        const result = jobStore.INCLUDE_JOB_BY_ORGANIZATIONS(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is asociated with given organizations", () => {
      const userStore = useUserStore();
      userStore.selectOrganizations = ["Google", "Amazon"];
      const jobStore = useJobsStore();
      const job = { organization: "Google" } as Job;

      const result = jobStore.INCLUDE_JOB_BY_ORGANIZATIONS(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any job type", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const jobStore = useJobsStore();
        const job = { jobType: "Full-time" } as Job;

        const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is asociated with given job type", () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Part-time", "Full-time"];
      const jobStore = useJobsStore();
      const job = { jobType: "Full-time" } as Job;

      const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);
      expect(result).toBe(true);
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { jobType: "Full-time" },
        { jobType: "Temporary" },
        { jobType: "Full-time" },
      ] as Job[];
      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(["Full-time", "Temporary"]));
    });
  });

  // describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
  //   it("identifies jobs that are associated with the given organizations", () => {
  //     const jobsStore = useJobsStore();
  //     jobsStore.jobs = [
  //       { organization: "Google" },
  //       { organization: "Amazon" },
  //       { organization: "Microsoft" },
  //     ];

  //     const userStore = useUserStore();
  //     userStore.selectOrganizations = ["Google", "Amazon"];

  //     const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;
  //     expect(result).toEqual([
  //       { organization: "Google" },
  //       { organization: "Amazon" },
  //     ]);
  //   });

  //   describe("when user has not selected any organizations", () => {
  //     it("return all jobs", () => {
  //       const jobsStore = useJobsStore();
  //       jobsStore.jobs = [
  //         { organization: "Google" },
  //         { organization: "Amazon" },
  //         { organization: "Microsoft" },
  //       ];

  //       const userStore = useUserStore();
  //       userStore.selectOrganizations = [];
  //       const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;

  //       expect(result).toEqual([
  //         { organization: "Google" },
  //         { organization: "Amazon" },
  //         { organization: "Microsoft" },
  //       ]);
  //     });
  //   });
  // });

  // describe("FILTERED_JOBS_BY_JOB_TYPES", () => {
  //   it("identifies jobs that are associated with the given job types", () => {
  //     const jobsStore = useJobsStore();
  //     jobsStore.jobs = [
  //       { jobType: "Full-time" },
  //       { jobType: "Temporary" },
  //       { jobType: "Part-time" },
  //     ];

  //     const userStore = useUserStore();
  //     userStore.selectedJobTypes = ["Full-time", "Part-time"];

  //     const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES;
  //     expect(result).toEqual([
  //       { jobType: "Full-time" },
  //       { jobType: "Part-time" },
  //     ]);
  //   });

  //   describe("when the user has not selected any job type", () => {
  //     it("return all jobs", () => {
  //       const jobsStore = useJobsStore();
  //       jobsStore.jobs = [
  //         { jobType: "Full-time" },
  //         { jobType: "Temporary" },
  //         { jobType: "Full-time" },
  //       ];

  //       const userStore = useUserStore();
  //       userStore.selectedJobTypes = [];
  //       const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES;

  //       expect(result).toEqual([
  //         { jobType: "Full-time" },
  //         { jobType: "Temporary" },
  //         { jobType: "Full-time" },
  //       ]);
  //     });
  //   });
  // });
});
