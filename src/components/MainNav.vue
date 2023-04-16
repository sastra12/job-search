<template>
  <header class="w-full">
    <div class="fixed w-full h-16">
      <div class="flex flex-nowrap h-full border-b border-solid border-brand-gray-1 px-8">
        <a href="/" class="flex items-center text-xl">{{ company }}</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainNav',
  data() {
    return {
      company: 'SAS Corporation'
    }
  }
}
</script>
