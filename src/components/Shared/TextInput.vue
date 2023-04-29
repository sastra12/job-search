<template>
  <input
    type="text"
    :value="value"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: "TextInput",
  data() {
    return {
      value: "",
    };
  },

  methods: {
    handleInput($event) {
      this.value = $event.target.value;
      // console.log(this.value);
      this.$emit("handleInput", this.value);
    },
  },
};
</script>
