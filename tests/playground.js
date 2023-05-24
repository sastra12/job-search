const jobs = [
  {
    id: 1,
    title: "Angular Developer",
    organization: "Vue and Me",
    degree: "Master's",
    jobType: "Intern",
    locations: ["Lisbon"],
  },
  {
    id: 2,
    title: "Java Coder",
    organization: "VueTube",
    degree: "Bachelor's",
    jobType: "Part-time",
    locations: ["Buenos Aires", "Oslo"],
  },
  {
    id: 3,
    title: "Svelte Ninja",
    organization: "Vue Can Do It",
    degree: "Ph.D.",
    jobType: "Full-time",
    locations: ["Yokohama", "The Hague", "Stockholm", "Ottawa"],
  },
  {
    id: 4,
    title: "Software Designer",
    organization: "VueTube",
    degree: "Master's",
    jobType: "Part-time",
    locations: ["Memphis", "Hong Kong"],
  },
];

const selectOrganizations = ["VueTube"];

function FILTERED_JOBS(jobs) {
  return jobs.filter(function (job) {
    // mengembalikan true
    return selectOrganizations.includes(job.degree);
  });
}

console.log(FILTERED_JOBS(jobs));
