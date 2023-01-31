<template>
  <div class="page">
    <div class="banner">
      QUESTO E' IL BANNER
    </div>
    <main>
      <p class="open-positions">{{ $t('common.openPositions') }}</p>
      <div class="section-wrapper">
        <nuxt-link
          class="section"
          v-for="(job, i) in jobs.data"
          :key="i"
          :to="useRoute().path + job.attributes.slug"
        >
          <h1>
            {{ job.attributes.title }}
          </h1>
          <ul class="info-job">
            <li
              v-for="(info, key) in job.attributes.body"
              :key="'info' + key"
              :class="key === 'id' ? 'hidden' : ''"
            >
              {{ info }}
            </li>
          </ul>
        </nuxt-link>
      </div>
    </main>
  </div>
</template>

<script lang="ts">

export default defineNuxtComponent({
  data() {
    return {
      jobs: {},
    }
  },

  async setup() {
    const { public: configPublic } = useRuntimeConfig()
    const { data } = await useFetch(configPublic.apiBase + "/api/jobs/?populate=*")

    return {
      jobs: data
    }
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

    & .open-positions {
      @apply text-grey;
    }

    & .section-wrapper {
        & .section {
            @apply block relative w-full mt-6 pt-2 pb-4 border-t-2 border-t-primary text-grey;
                
            & h1 {
                @apply text-4xl pt-4 font-light;
            }
            & .info-job {
                @apply mt-8 flex;

                & li {
                    @apply mx-1;

                    &::after {
                        content: ',';
                    }

                    &:last-of-type::after {
                        content: '.';
                    }   
                }
            }
        }
        & .section:hover {
            & h1 {
                @apply text-black cursor-pointer;
            }
        }
    }
  }

}
</style>
