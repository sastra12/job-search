import axios from "axios";

import getJobs from "@/api/getJobs";
import { vi } from "vitest";

vi.mock("axios");

describe("getJobs", () => {
  it("fetches job that candidates can aplly to", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  });
});
