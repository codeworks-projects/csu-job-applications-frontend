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
          <!-- Name -->
          <TextInput
            v-model="validations.name"
            :valid="isNameValid"
            type="text"
            class="input"
            aspect="fill"
            :placeholder="$t('placeholder.name')"
            required
          />
          <!-- Surname -->
          <TextInput
            v-model="validations.surname"
            :valid="isSurnameValid"
            type="text"
            class="input"
            aspect="fill"
            :placeholder="$t('placeholder.surname')"
            required
          />
          <!-- Email and Data -->
          <div class="double-input-ct">
            <TextInput
              v-model="validations.email"
              :valid="isEmailValid"
              type="email"
              class="input first-input"
              aspect="fill"
              :placeholder="$t('placeholder.email')"
              required
            />
            <DateInput
              v-model="validations.date"
              type="data"
              class="input"
              aspect="fill"
              :placeholder="$t('placeholder.date')"
              required
            />
          </div>
          <!-- Phone and Gender -->
          <div class="double-input-ct">
            <TextInput
              v-model="validations.phone"
              :valid="isPhoneValid"
              type="text"
              class="input first-input"
              aspect="fill"
              :placeholder="$t('placeholder.phone')"
              required
            />
            <Select
              v-model="validations.gender"
              :disabled-option="$t('placeholder.gender')"
              :options="genders"
              class="input"
              aspect="fill"
            />
          </div>
          <!-- Formation -->
          <TextInput
            v-model="validations.formation"
            :valid="isFormationValid"
            type="text"
            class="input"
            aspect="fill"
            :placeholder="$t('placeholder.formation')"
            required
          />
          <!-- Language -->
          <TextInput
            v-model="validations.language"
            :valid="isLanguageValid"
            type="text"
            class="input"
            aspect="fill"
            :placeholder="$t('placeholder.language')"
            required
          />
          <!-- Profession -->
          <TextInput
            v-model="validations.profession"
            :valid="isProfessionValid"
            type="text"
            class="input col-span-2"
            aspect="fill"
            :placeholder="$t('placeholder.profession')"
            required
          />
          <!-- Message -->
          <TextArea
            v-model="validations.message"
            type="text"
            class="input"
            aspect="fill"
            :placeholder="$t('placeholder.message')"
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
  </div>
</template>

<script lang="ts">
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
        gender: "",
        phone: "",
        formation: "",
        language: "",
        profession: "",
        message: "",
      },
      authorization: false,

      genders: [
        this.$t('placeholder.man'),
        this.$t('placeholder.woman'),
        this.$t('placeholder.other'),
      ]
    };
  },

  async setup() {
    const { public: configPublic } = useRuntimeConfig();
    const {locale} = useI18n();
    
    const { pending, data } = await useLazyFetch(
      configPublic.apiBase + "/api/job-offers/?populate=*&locale=" + locale.value
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
    isGenderValid() {
      return (
        this.validations.gender.length > 2 ||
        this.validations.gender === ""
      );
    },
    isPhoneValid() {
      return (
        this.validations.phone.match(/\d{10,}/) ||
        this.validations.phone === ""
      );
    },
    isFormationValid() {
      return (
        this.validations.formation.length > 2 ||
        this.validations.formation === ""
      );
    },
    isLanguageValid() {
      return (
        this.validations.language.length > 2 ||
        this.validations.language === ""
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
        !this.validations?.gender ||
        !this.validations?.phone ||
        !this.validations?.formation ||
        !this.validations?.language ||
        !this.validations?.profession ||
        !this.authorization ||
        !this.isNameValid ||
        !this.isSurnameValid ||
        !this.isEmailValid ||
        !this.isGenderValid ||
        !this.isPhoneValid ||
        !this.isFormationValid ||
        !this.isLanguageValid ||
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

          & .first-input {
            @apply md:col-span-2;
          }
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
