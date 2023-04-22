<template>
  <section>
    <h1>
      <span :class="actionClasses"> {{ action }} </span> for everyone
    </h1>
    <h2>Find your next job at SAS Corp</h2>
  </section>
</template>

<script>
export default {
  name: "TheHeadline",
  data() {
    return {
      action: "Build",
      interval: null,
    };
  },

  computed: {
    actionClasses() {
      return {
        build: this.action === "Build",
        create: this.action === "Create",
        design: this.action === "Design",
        code: this.action === "Code",
      };
    },
  },

  // Menginisialisasi state atau data reactive pada awalnya
  created() {
    this.changeTitle();
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ["Build", "Create", "Design", "Code"]; // 0, 1, 2, 3
        const currentIndexAction = actions.indexOf(this.action); // 0
        const nextActionIndex = (currentIndexAction + 1) % 4;
        const nextAction = actions[nextActionIndex];

        this.action = nextAction;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.build {
  color: #1a73e8;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
