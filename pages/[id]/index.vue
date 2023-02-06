<template>
  <div class="page">
    <!-- INFO ON JOB -->
    <div v-if="pending">Loading...</div>
    <JobInfo v-else :job-data="getCurrentEl" />

    <!-- FORM -->
    <form class="form-ct">
      <div class="form-wrapper center">
        <div class="form-title">
          {{ $t("jobs.signTheModule") }}
          <strong>{{ $t("jobs.asFastAsWeCan") }}</strong>
        </div>
        <div class="form">

          <TextInput
            v-model="validations.name"
            :valid="isNameValid"
            type="text"
            class="input"
            aspect="fill"
            placeholder="Nome*"
            required
          />

          <TextInput
            v-model="validations.surname"
            :valid="isSurnameValid"
            type="text"
            class="input"
            aspect="fill"
            placeholder="Cognome*"
            required
          />

          <div class="grid grid-cols-3 gap-x-2">
            <TextInput
              v-model="validations.email"
              :valid="isEmailValid"
              type="email"
              class="input col-span-2"
              aspect="fill"
              placeholder="Email*"
              required
            />
            <DateInput
              v-model="validations.date"
              type="data"
              class="input"
              aspect="fill"
              placeholder="Data"
              required
            />
            <!-- <TextInput
              v-model="validations.date"
              :valid="isDateValid"
              type="data"
              class="input"
              aspect="fill"
              placeholder="Data"
              required
            /> -->
          </div>

          <TextInput
            v-model="validations.profession"
            :valid="isProfessionValid"
              type="text"
              class="input col-span-2"
              aspect="fill"
              placeholder="Professione"
              required
            />

          <TextArea
            v-model="validations.message"
            type="text"
            class="input"
            aspect="fill"
            placeholder="Messaggio"
          />

          <!-- <div class="link">
            <a href="#"> Link al curriculum </a>
          </div> -->

          <p v-if="errorInForm === true" class="form-error"> Qualcosa è andato storto, riprova </p>
          <p v-if="errorInForm === false" class="form-success"> Abbiamo ricevuto la tua candidatura, grazie! </p>

          <div class="btn-ct">
            <Button 
              value="Apply"
              icon="arrow-up-right"
              type="primary"
              @click="getLog(), finalCheck()"
            />
          </div>
          <div class="checkbox-ct">
            <Checkbox
              v-model="authorization"
              :checked="authorization"
              required
              @click="getLog()"
            />
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

      errorInForm: undefined,

      // VALIDATIONS
      validations: {
        name: "",
        surname: "",
        email: "",
        date: "",
        profession: "",
        message: "",
      },
      authorization: false,
    };
  },

  async setup() {
    const { public: configPublic } = useRuntimeConfig()
    const { pending, data } = await useLazyFetch(configPublic.apiBase + "/api/jobs/?populate=*")

    return {
      jobs: data,
      pending,
    }
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
    isNameValid() {
        return (
            this.validations.name.length > 2 ||
            this.validations.name === ''
        )
    },
    isSurnameValid() {
        return (
            this.validations.surname.length > 2 ||
            this.validations.surname === ''
        )
    },
    isEmailValid() {
      return (
        (this.validations.email.length > 0 && this.validations.email.match(/^[^@]+@[^@]+\.[^@]+$/)) ||
        this.validations.email.length === 0
      )
    },
    isProfessionValid() {
        return (
            this.validations.profession.length > 2 ||
            this.validations.profession === ''
        )
    },
  },

  methods: {
    getLog() {
      console.log(this.validations, this.authorization);
    },

    authorize() {
      this.authorization = !this.authorization;
    },

    // somethingWrong() {
    //   this.errorInForm = true;
    //   console.log(this.errorInForm);
      

    //   setTimeout(() => this.errorInForm = false, 1000);
    // },

    finalCheck() {
      if (
        !this.validations?.name ||
        !this.validations?.surname ||
        !this.validations?.email ||
        !this.validations?.date ||
        !this.authorization ||

        !this.isNameValid ||
        !this.isSurnameValid ||
        !this.isEmailValid ||
        !this.isProfessionValid
      ){
        // this.somethingWrong();
        console.log('error');
        this.errorInForm = true;
        
      }else{
        console.log('success')
        this.errorInForm = false;
      }
    }
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

        & .form-error {
          @apply mt-2 p-2 w-full bg-red text-center;
        }
        & .form-success {
          @apply mt-2 p-2 w-full bg-green text-center;
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
