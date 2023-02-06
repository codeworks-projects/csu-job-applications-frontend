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

    <!-- Switch prova per linguaggio -->
    <!-- <h1 class="text-9xl">{{ $t('hello', { name: 'vue-i18n' }) }}</h1>
    <form>
      <label for="locale-select">{{ $t('language') }}: </label>
      <select id="locale-select" v-model="$i18n.locale">
        <option value="it">it</option>
        <option value="de">de</option>
      </select>
    </form> -->

    <main ref="job-section">
      <p class="open-positions">{{ $t('common.openPositions') }}</p>
      <div class="section-wrapper" >
        <nuxt-link
          class="section"
          v-for="(job, i) in getJobs"
          :key="i"
          :to="useRoute().path + job.attributes.slug"
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
        class="section-wrapper.placeholder"
      >
        <div class="section"></div>
        <div class="section"></div>
        <div class="section"></div>
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

  computed: {
    getJobs() {
      return this.jobs?.data
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
    @apply my-28 p-4;

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

    & .section-wrapper.placeholder {
      & .section {
        @apply h-32 bg-placeholder;
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
