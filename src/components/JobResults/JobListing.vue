<template>
  <li class="mb-7">
    <router-link
      :to="jobLinkPage"
      class="block border-solid border-brand-gray-2 bg-white hover:shadow-gray"
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pb-2 pt-5">
        <h2 class="mb-2 text-2xl">
          Technical Progam Manager, Perception, Augmented Reality
        </h2>

        <div class="flex align-middle">
          <div class="mr-4">
            <span>GOJEK</span>
          </div>

          <div>
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </div>

      <div class="px-8 py-4">
        <div>
          <h3>Qualifications:</h3>
          <div>
            <ul class="list-disc pl-8">
              <li>Bachelor’s degree or equivalent practical experience.</li>
              <li>
                2 years of experience with software development in one or more
                programming languages, or 1 year of experience with an advanced
                degree.
              </li>
              <li>
                Experience driving product direction, go-to-market strategy, and
                design with data-driven decisions.
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-2 text-center">
          <router-link class="text-brand-blue-1" :to="jobLinkPage"
            >Expand</router-link
          >
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "JobListing",
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
  computed: {
    jobLinkPage() {
      return `/job/results/${this.job.id}`;
    },
  },
};
</script>
