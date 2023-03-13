<template>
  <header>
    <div class="container center">
      <NuxtLink class="image-ct" :to="localePath('/')">
        <img src="/image/csu-logo.png" alt="csu-logo" />
      </NuxtLink>

      <div class="lang-ct">
        <ul>
          <div
            v-for="lang in locales"
            :key="lang"
            class="language"
            :class="{
              current: lang === currentLocale,
            }"
            @click="changeLanguage(lang)"
          >
            {{ lang }}
          </div>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const i18n = useI18n();
const route = useRoute();

const lastLocale = useCookie("lastLocale");

const locales = ref(i18n.localeCodes.value);

const currentLocale = computed(() => {
  return i18n.locale.value;
});

const changeLanguage = (lang: string) => {
  if (!route.params.id) {
    lastLocale.value = lang;
  }

  i18n.setLocale(lang);
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
      & .language {
        @apply inline-flex justify-center items-center text-primary uppercase mx-2 bg-secondary
        cursor-pointer bg-opacity-40 h-10 w-10 rounded-full;

        &.current {
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
