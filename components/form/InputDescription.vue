<template>
  <p>{{ text }}</p>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    text: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="postcss" scoped>
p {
  @apply text-grey text-xs mt-2;
}
</style>
