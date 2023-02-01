<template>
  <div class="page">
    <div class="banner">
      <div class="banner-text">
        <h1>Die heißesten Winterjobs</h1>
        <div
          class="icon-ct"
          @click="goTo('job-section')"
        >
          <Icon name="arrow-down"/>
        </div>
      </div>
    </div>
    <main ref="job-section">
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
            <!-- <li
              v-for="(info, key) in job.attributes.informations"
              :key="'info' + key"
              :class="key === 'id' ? 'hidden' : ''"
            >
              {{ info.title }}
            </li> -->
            <li>{{ job.attributes.place }}</li>
            <li>{{ job.attributes.hours }}</li>
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

  methods: {
    goTo(refName) {
      const element = this.$refs[refName];
      const top = element.offsetTop;
      window.scrollTo({
        top: top,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
});
</script>

<style lang="postcss" scoped>
.page {
  @apply text-base flex-col justify-center;

  & .banner {
    @apply bg-black h-screen;

    & .banner-text {
      @apply relative top-1/2 left-4 px-6 w-1/2;

      & h1 {
        @apply text-8xl font-light text-white;

        line-height: 1.2;
      }

      & .icon-ct {
        @apply mt-10 h-20 w-14 text-primary;

        & svg {
          @apply w-full h-full;

          fill: currentColor;
        }

        &:hover {
          @apply cursor-pointer;
        }
      }
    }
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
