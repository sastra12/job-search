<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <li>
        <router-link
          to="/job/results/1"
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
        </router-link>
      </li>
    </ol>
  </main>
</template>

<script>
export default {
  name: "JobListing",
};
</script>
