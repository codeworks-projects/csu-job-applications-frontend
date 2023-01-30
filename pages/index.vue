<template>
  <div class="page">
    <div class="banner">
      QUESTO E' IL BANNER
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  setup() {
    return {
    };
  },

  methods: {
  },
});
</script>

<style lang="postcss" scoped>
.page {
  @apply text-base flex-col justify-center;

  & .banner {
    @apply min-h-screen bg-black;
  }

  & h1 {
    @apply font-bold font-sans text-primary;
  }
}
</style>
