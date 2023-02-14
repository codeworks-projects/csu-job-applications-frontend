<template>
  <header>
    <div class="container center">
      <NuxtLink class="image-ct" :to="'/'">
        <img src="~public/image/csu-logo.png" alt="csu-logo" />
      </NuxtLink>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
header {
  @apply absolute top-24 left-6 right-6 z-10;
  & .container {
    & .image-ct {
      @apply inline-block w-56 h-20;
    }
  }
}

@media only screen and (max-width: 980px) {
  header {
    @apply left-0 right-0;
  }
}
</style>
