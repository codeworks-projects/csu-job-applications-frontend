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

          <div class="double-input-ct">
            <TextInput
              v-model="validations.email"
              :valid="isEmailValid"
              type="email"
              class="input md:col-span-2"
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

          <div class="btn-ct">
            <Button
              value="Apply"
              icon="arrow-up-right"
              type="primary"
              @click="finalCheck()"
            />
          </div>
          <div class="checkbox-ct">
            <Checkbox
              v-model="authorization"
              :checked="authorization === true"
              required
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

    <Modal
      :is-visible="isErrorModalVisible === true"
      :title="$t('jobs.pleaseCompleteAllMandatoryFields')"
      :height="200"
      @close="toggleErrorModal()"
    >
      <p>{{ $t("jobs.mandatoryFieldsDesc") }}</p>
      <Button :value="$t('common.okThanks')" @click="toggleErrorModal()" />
    </Modal>

    <Modal
      :is-visible="isSuccessModalVisible === true"
      :title="$t('jobs.formSubmissionConfirmationTitle')"
      :height="200"
      @close="toggleSuccessModal()"
    >
      <p>{{ $t("jobs.formSubmissionConfirmation") }}</p>
      <Button :value="$t('common.okThanks')" @click="toggleSuccessModal()" />
    </Modal>

    <!--<Modal
      :is-visible="errorInForm === false"
      :title="$t('jobs.formSubmissionConfirmationTitle')"
      @close="errorReset()"
    >
    <p>{{ $t("jobs.formSubmissionConfirmation") }}</p>
    </Modal> // NOTE: commented due to wrong/incomplete implementation -->
  </div>
</template>

<script lang="ts">
// import nuxtConfig from '~~/nuxt.config';
import { useI18n } from 'vue-i18n';

export default defineNuxtComponent({
  data() {
    return {
      jobs: {},
      
      isErrorModalVisible: false,
      isSuccessModalVisible: false,

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
    const { public: configPublic } = useRuntimeConfig();
    const {locale} = useI18n();
    const { pending, data } = await useLazyFetch(
      configPublic.apiBase + "/api/job-offers/?populate=*&locale=" + locale
    );

    return {
      jobs: data,
      pending,
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
    isNameValid() {
      return this.validations.name.length > 2 || this.validations.name === "";
    },
    isSurnameValid() {
      return (
        this.validations.surname.length > 2 || this.validations.surname === ""
      );
    },
    isEmailValid() {
      return (
        (this.validations.email.length > 0 &&
          this.validations.email.match(/^[^@]+@[^@]+\.[^@]+$/)) ||
        this.validations.email.length === 0
      );
    },
    isProfessionValid() {
      return (
        this.validations.profession.length > 2 ||
        this.validations.profession === ""
      );
    },
    isFormValid() {
      return (
        !this.validations?.name ||
        !this.validations?.surname ||
        !this.validations?.email ||
        !this.validations?.date ||
        !this.authorization ||
        !this.isNameValid ||
        !this.isSurnameValid ||
        !this.isEmailValid ||
        !this.isProfessionValid
      )
    },
  },

  methods: {
    authorize() {
      this.authorization = !this.authorization;
    },

    toggleErrorModal() {
      this.isErrorModalVisible = !this.isErrorModalVisible
    },
    toggleSuccessModal() {
      this.isSuccessModalVisible = !this.isSuccessModalVisible
    },

    finalCheck() {
      if (!this.isFormValid) {
        console.log("success");
        this.toggleSuccessModal();
      } else {
        console.log("error");
        this.toggleErrorModal();
      }
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

        & .double-input-ct {
          @apply grid grid-cols-1 md:grid-cols-3 gap-x-2;
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

@media only screen and (max-width: 1500px) {
  .page {
    & .form-ct {
      & .form-wrapper {
        @apply w-1/2;
      }
    }
  }
}
@media only screen and (max-width: 980px) {
  .page {
    & .form-ct {
      & .form-wrapper {
        @apply w-2/3;
      }
    }
  }
}

@media only screen and (max-width: 700px) {
  .page {
    & .form-ct {
      & .form-wrapper {
        @apply w-full;
      }
    }
  }
}
</style>
