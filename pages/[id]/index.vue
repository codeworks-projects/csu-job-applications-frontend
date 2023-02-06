<template>
  <div class="page">
    <!-- INFO ON JOB -->

    <JobInfo :job-data="getCurrentEl" />

    <!-- FORM -->
    <form class="form-ct">
      <div class="form-wrapper center">
        <div class="form-title">
          {{ $t("jobs.signTheModule") }}
          <strong>{{ $t("jobs.asFastAsWeCan") }}</strong>
        </div>
        <div class="form">
          <TextInput
            v-model:value="validations.name"
            type="text"
            class="input"
            aspect="fill"
            placeholder="Nome*"
            required
          />
          <TextInput
            v-model="validations.surname"
            type="text"
            class="input"
            aspect="fill"
            placeholder="Cognome*"
            required
          />

          <div class="grid grid-cols-3 gap-x-2">
            <TextInput
              type="email"
              class="input col-span-2"
              aspect="fill"
              placeholder="Email*"
              required
            />
            <TextInput
              type="data"
              class="input"
              aspect="fill"
              placeholder="Data"
              required
            />
            <TextInput
              type="text"
              class="input col-span-2"
              aspect="fill"
              placeholder="Professione"
              required
            />
          </div>

          <TextArea
            type="text"
            class="input"
            aspect="fill"
            placeholder="Messaggio"
          />

          <div class="link">
            <a href="#"> Link al curriculum? </a>
          </div>

          <div class="btn-ct">
            <Button value="Apply" @click="getLog()" />
          </div>
          <div class="checkbox-ct">
            <Checkbox required />
            <p class="checkbox-info">
              {{ $t("jobs.yourPersonalData") }}
              <a href="">
                {{ $t("common.privacyInfo") }}
              </a>
              {{ $t("jobs.andOurs") }}
              <a href="">
                {{ $t("common.termsOfService") }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data() {
    return {
      jobs: {},

      // VALIDATIONS
      validations: {
        name: '',
        surname: "",
      },
    };
  },

  async setup() {
    const { public: configPublic } = useRuntimeConfig();
    const { data } = await useFetch(
      configPublic.apiBase + "/api/jobs/?populate=*"
    );

    return {
      jobs: data,
    };
  },

  computed: {
    getCurrentEl() {
      const slug = this.$route.params.id;
      let element = {};

      this.jobs?.data?.forEach((el) => {
        if (el.attributes.slug === slug) element = el;
      });

      return element;
    },

    // VALIDATIONS

    // isNameValid() {
    //     return (
    //         this.name.length > 2 ||
    //         this.name === ''
    //     )
    // }
  },

  methods: {
    getLog() {
      console.log(this.validations.name, this.validations.surname);
    },
  },
});
</script>

<style lang="postcss" scoped>
.page {
  @apply text-base flex-col justify-center;

  & main {
    @apply mt-28 p-4;
  }

  & .form-ct {
    @apply bg-mid-grey py-20 flex justify-center items-center;

    & .form-wrapper {
      @apply w-1/3;

      & .form-title {
        @apply text-center my-10 text-3xl;
      }

      & .form {
        & .input {
          @apply mt-2 w-full bg-white border-grey;

          border: 1px solid rgb(179 179 179);
        }

        & .link {
          @apply text-primary underline m-3 p-1;
        }

        & .btn-ct {
          @apply flex justify-center items-center;
        }

        & .checkbox-ct {
          @apply p-3 flex items-center;

          & .checkbox-info {
            @apply inline text-center;

            & > a {
              @apply underline font-black;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width:980px) {
  .page {
    & .form-ct {
      & .form-wrapper {
        @apply w-2/3;
      }
    }
  }
}

@media only screen and (max-width:500px) {
  .page {
    & .form-ct {
      & .form-wrapper {
        @apply w-full;
      }
    }
  }
}
</style>
