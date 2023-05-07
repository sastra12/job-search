import axios from "axios";

import getJobs from "@/api/getJobs";
import { vi } from "vitest";

vi.mock("axios");

describe("getJobs", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Vue Developer",
        },
      ],
    });
  });

  it("fetches jobs that candidates can aplly to", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  });

  it("extract jobs from response", async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([{ id: 1, title: "Vue Developer" }]);
  });
});
