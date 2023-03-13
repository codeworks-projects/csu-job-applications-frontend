<template>
  <header>
    <div class="container center">
      <NuxtLink class="image-ct" :to="localePath('/')">
        <img src="/image/csu-logo.png" alt="csu-logo" />
      </NuxtLink>

      <div class="lang-ct">
        <ul>
          <NuxtLink
            v-for="lang in locales"
            :key="lang.code"
            :to="switchLocalePath(lang.code)"
            class="language"
            :class="{
              'current': lang.code === locale
            }"
          >
            {{ lang.code }}
          </NuxtLink>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  setup() {
    const localePath = useLocalePath();
    const { locale, locales } = useI18n();
    const switchLocalePath = useSwitchLocalePath();

    return {
      localePath,
      locale,
      locales,
      switchLocalePath,
    };
  },
};
</script>

<style lang="postcss" scoped>
header {
  @apply absolute top-24 left-6 right-6 z-10;
  & .container {
    @apply flex items-center justify-between;
    & .image-ct {
      @apply inline-block w-96;
    }

    & .lang-ct {
      & .language{
        @apply inline-flex justify-center items-center text-primary uppercase mx-2 bg-secondary bg-opacity-40 h-10 w-10 rounded-full;

        &.current{
          @apply underline underline-offset-4;
        }
      }
    }
  }
}

@media only screen and (max-width: 980px) {
  header {
    @apply left-0 right-0;

    & .container {
      & .image-ct {
        max-width: 80vw;
      }
    }
  }
}
</style>
