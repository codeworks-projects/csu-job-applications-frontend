<template>
  <header>
    <div class="container center">
      <NuxtLink class="image-ct" :to="localePath('/')">
        <img src="~public/image/csu-logo.png" alt="csu-logo" />
      </NuxtLink>

      <!-- <div class="lang-ct">
        <ul>
          <NuxtLink
            v-for="lang in locales"
            :key="lang.code"
            :to="switchLocalePath(lang.code)"
            class="text-white cursor-pointer bg-primary m-5 text-lg inline-block"
          >
            {{ lang.code }}
          </NuxtLink>
        </ul>
      </div> -->

    </div>
  </header>
</template>

<script>
export default {
  setup() {
    const localePath = useLocalePath()
    const {locale, locales} = useI18n()
    const switchLocalePath = useSwitchLocalePath()

    return {
      localePath,
      locale,
      locales,
      switchLocalePath
    }
  },
};
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
