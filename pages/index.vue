<template>
  <div class="page">
    <div class="banner" :style="{ backgroundImage: 'url(' + getBanner + ')' }">
      <div class="banner-overlay"></div>
      <div class="banner-text container center">
        <h1>{{ $t('common.winterJobs') }}</h1>
        <div
          class="icon-ct"
          @click="goTo('job-section')"
        >
          <Icon name="arrow-down"/>
        </div>

      </div>
    </div>

    <main ref="job-section" class="container center">
      <p class="open-positions">{{ $t('common.openPositions') }}</p>
      <div class="section-wrapper" >
        <nuxt-link
          class="section"
          v-for="(job, i) in getJobs"
          :key="i"
          :to="localePath('/') + '/' + job.attributes.slug"
        >
          <h1>
            {{ job.attributes.title }}
          </h1>
          <ul class="info-job">
            <li>{{ job.attributes.place }}</li>
            <li>{{ job.attributes.hours }}</li>
          </ul>
        </nuxt-link>
      </div>

      <div 
        v-if="!getJobs"
        class="section-wrapper placeholder"
      >
            <!-- Sections -->
            <div class="section" >
                <h1></h1>
                <p></p>
            </div>
            <div class="section" >
                <h1></h1>
                <p></p>
            </div>
            <div class="section" >
                <h1></h1>
                <p></p>
            </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  async setup() {
    const localePath = useLocalePath()
    const { public: configPublic } = useRuntimeConfig()
    const { locale } = useI18n()

    const {data: jobs} = await useLazyFetch(configPublic.apiBase + "/api/job-offers/?populate=*&locale=" + locale.value)

    return {
      localePath,
      jobs,
      locale
    }
  },

  computed: {
    getJobs() {
      return this.jobs?.data
    },
    getBanner() {
      return 'https://csu.codeworks.build/uploads/banner_e24acdfc66.png'

      // return this.bannerImg?.data?.attributes?.updatedAt
    },
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
    },
  },
});
</script>

<style lang="postcss" scoped>
.page {
  @apply text-base flex-col justify-center;

  & .banner {
    @apply relative h-screen bg-cover bg-no-repeat bg-center;
    
    & .banner-overlay {
      @apply bg-black opacity-40 absolute w-full h-full;
    }

    & .banner-text {
      @apply relative top-1/2 left-0;

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
    @apply my-28;
    & .open-positions {
      @apply text-grey;
    }

    & .section-wrapper {
        & .section {
            @apply block relative w-full mt-6 pt-2 pb-4 border-t-4 border-t-primary text-grey;
                
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

    & .placeholder {
      & .title {
          @apply h-20 bg-placeholder;
      }
      & .section {
          @apply border-t-primary;
          & h1 {
              @apply h-10 mt-2 bg-placeholder;
          }
          & p {
              @apply h-5 mt-7 w-2/3 bg-placeholder;
          }
      }
    }
  }

}

@media only screen and (max-width:980px) {
  .page {
    & .banner {
      & .banner-text {
        & h1 {
          @apply text-6xl;
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
  }
}
</style>
