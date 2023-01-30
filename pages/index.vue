<template>
  <div class="page">
    <div class="banner">
      QUESTO E' IL BANNER
    </div>
    <main>
      <p class="open-positions">{{ $t('common.openPositions') }}</p>
      <JobInfo />
    </main>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  setup() {
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

  & main {
    @apply mt-28 p-4;

    & .open-positions{
      @apply text-grey;
    }
  }

}
</style>
