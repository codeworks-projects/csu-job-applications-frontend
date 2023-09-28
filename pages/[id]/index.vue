<template>
  <div class="page">
    <!-- INFO ON JOB -->
    <JobInfo :job-data="currentElement" />

    <!-- FORM -->
    <form class="form-ct" method="post" action="/api/email">
      <div class="form-wrapper center">
        <div class="form-title">
          {{ $t("jobs.signTheModule") }}
          <strong>{{ $t("jobs.asFastAsWeCan") }}</strong>
        </div>
        <div class="form">
          <!-- Name -->
          <TextInput
            v-model="validations.name"
            :disabled="isSendingForm"
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
            :disabled="isSendingForm"
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
              :disabled="isSendingForm"
              :valid="isEmailValid"
              type="email"
              class="input first-input"
              aspect="fill"
              :placeholder="$t('placeholder.email')"
              required
            />
            <DateInput
              v-model="validations.birthday"
              :disabled="isSendingForm"
              type="data"
              class="input"
              aspect="fill"
              :placeholder="$t('placeholder.birthday')"
              required
            />
          </div>
          <!-- Phone and Gender -->
          <div class="double-input-ct">
            <TextInput
              v-model="validations.phone"
              :disabled="isSendingForm"
              :valid="isPhoneValid"
              type="text"
              class="input first-input"
              aspect="fill"
              :placeholder="$t('placeholder.phone')"
              required
            />
            <Select
              v-model="validations.gender"
              :disabled="isSendingForm"
              :disabled-option="$t('placeholder.gender')"
              :options="genders"
              class="input"
              aspect="fill"
            />
          </div>
          <!-- Formation -->
          <TextInput
            v-model="validations.studyTitle"
            :disabled="isSendingForm"
            :valid="isStudyTitleValid"
            type="text"
            class="input"
            aspect="fill"
            :placeholder="$t('placeholder.studyTitle')"
            required
          />
          <!-- Language -->
          <TextInput
            v-model="validations.languages"
            :disabled="isSendingForm"
            :valid="isLanguagesValid"
            type="text"
            class="input"
            aspect="fill"
            :placeholder="$t('placeholder.languages')"
            required
          />
          <!-- Profession -->
          <TextInput
            v-model="validations.lastWorkingExperience"
            :disabled="isSendingForm"
            :valid="isLastWorkingExperienceValid"
            type="text"
            class="input col-span-2"
            aspect="fill"
            :placeholder="$t('placeholder.lastWorkingExperience')"
            required
          />
          <!-- Message -->
          <TextArea
            v-model="validations.message"
            :disabled="isSendingForm"
            type="text"
            class="input"
            aspect="fill"
            :placeholder="$t('placeholder.message')"
          />

          <InputLabel :text="$t('jobs.uploadCV')" required class="mt-2" />

          <!-- NOTE: it should be set after changing error handling on other inputs. They should also have error state after send email click (if needed). -->
          <!-- :valid="isCurriculumFileValid" -->
          <TextInput
            v-model="validations.curriculumFile"
            :disabled="isSendingForm"
            ref="fileInput"
            type="file"
            class="input no-margin"
            aspect="fill"
            required
          />

          <div class="checkbox-ct">
            <Checkbox
              v-model="isPrivacyCheck"
              :disabled="isSendingForm"
              :checked="isPrivacyCheck === true"
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
          <div class="btn-ct" @click="finalCheck()" type="submit">
            <Button
              value="Apply"
              icon="arrow-up-right"
              type="primary"
              :loading="isSendingForm"
            />
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
        birthday: "",
        gender: "",
        phone: "",
        studyTitle: "",
        languages: "",
        lastWorkingExperience: "",
        message: "",
        curriculumFile: undefined,
      },

      isPrivacyCheck: false,

      isCurriculumFileValid: true,

      isSendingForm: false,

      genders: [
        this.$t("placeholder.man"),
        this.$t("placeholder.woman"),
        this.$t("placeholder.other"),
      ],
    };
  },

  async setup() {
    const { public: configPublic } = useRuntimeConfig();
    const localePath = useLocalePath();
    const { locale, t } = useI18n();
    const route = useRoute();
    const router = useRouter();

    const jobsFetch = ref();

    // COOKIES
    const jobApplicationLocalizations: any = useCookie(
      "jobApplicationLocalizations"
    );

    const lastLocale = useCookie("lastLocale");

    const clearCookies = () => {
      lastLocale.value = null;
      jobApplicationLocalizations.value = null;
    };

    if (lastLocale.value && lastLocale.value !== locale.value) {
      if (!jobApplicationLocalizations.value?.length) {
        clearCookies();
        throw createError({
          statusCode: 404,
          statusMessage: "Page Not Found",
          fatal: true,
        });
      }

      lastLocale.value = locale.value;

      const pageInCurrentLocale = jobApplicationLocalizations?.value?.find(
        (item: any) => item?.locale === locale.value
      );

      router.replace(localePath(`/${pageInCurrentLocale.slug}`));
    } else {
      lastLocale.value = locale.value;

      jobsFetch.value = await useFetch(
        `${configPublic.apiBase}/api/job-offers/?populate=*&filters[slug][$eq]=${route.params.id}&locale=${locale.value}`
      );

      const { data } = jobsFetch.value;

      if (!data || !data.data?.length) {
        throw createError({
          statusCode: 404,
          statusMessage: "Page Not Found",
          fatal: true,
        });
      }

      const jobApplicationLocalizationsAvailable =
        data?.data?.[0]?.attributes?.localizations?.data?.map((item: any) => {
          return {
            locale: item.attributes.locale,
            slug: item.attributes.slug,
          };
        });

      jobApplicationLocalizations.value =
        jobApplicationLocalizationsAvailable ??
        jobApplicationLocalizations.value;
    }

    const pageInfo = jobsFetch.value?.data?.data?.[0]?.attributes;

    // Page meta
    useHead({
      title: pageInfo?.title,
      meta: [
        {
          name: "description",
          content: `${pageInfo?.title} - ${pageInfo?.place}`,
        },
      ],
    });

    return {
      jobs: jobsFetch.value?.data,
      locale,
    };
  },

  computed: {
    currentElement() {
      return this.jobs?.data?.[0];
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
    isPhoneValid() {
      return (
        this.validations.phone.match(/\d{10,}/) || this.validations.phone === ""
      );
    },
    isGenderValid() {
      return (
        this.validations.gender.length > 2 || this.validations.gender === ""
      );
    },
    isStudyTitleValid() {
      return (
        this.validations.studyTitle.length > 2 ||
        this.validations.studyTitle === ""
      );
    },
    isLanguagesValid() {
      return (
        this.validations.languages.length > 2 ||
        this.validations.languages === ""
      );
    },
    isLastWorkingExperienceValid() {
      return (
        this.validations.lastWorkingExperience.length > 2 ||
        this.validations.lastWorkingExperience === ""
      );
    },

    isFormValid() {
      return (
        !this.validations?.name ||
        !this.validations?.surname ||
        !this.validations?.email ||
        !this.validations?.birthday ||
        !this.validations?.phone ||
        !this.validations?.gender ||
        !this.validations?.studyTitle ||
        !this.validations?.languages ||
        !this.validations?.lastWorkingExperience ||
        !this.validations?.curriculumFile ||
        // !this.validations?.message ||
        !this.isPrivacyCheck ||
        !this.isNameValid ||
        !this.isSurnameValid ||
        !this.isEmailValid ||
        !this.isPhoneValid ||
        !this.isGenderValid ||
        !this.isStudyTitleValid ||
        !this.isLanguagesValid ||
        !this.isLastWorkingExperienceValid
      );
    },
  },

  methods: {
    authorize() {
      this.isPrivacyCheck = !this.isPrivacyCheck;
    },

    toggleErrorModal() {
      this.isErrorModalVisible = !this.isErrorModalVisible;
    },
    toggleSuccessModal() {
      this.isSuccessModalVisible = !this.isSuccessModalVisible;
    },

    getFormattedNameForFile(value: any) {
      return value.toLowerCase().replace(/ /g, "-");
    },

    getBase64File(file: any): any {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },

    async sendEmail() {
      const refInput = this.$refs.fileInput as any;
      const file = refInput.$el.children[0].files[0];
      const filename = `${this.getFormattedNameForFile(
        this.validations.name
      )}_${this.getFormattedNameForFile(this.validations.surname)}_CV.pdf`;
      const attachmentContent = await this.getBase64File(file);

      await useFetch("/api/email", {
        method: "POST",
        body: {
          name: this.validations.name,
          surname: this.validations.surname,
          birthday: this.validations.birthday,
          gender: this.validations.gender,
          phone: this.validations.phone,
          email: this.validations.email,
          studyTitle: this.validations.studyTitle,
          lastWorkingExperience: this.validations.lastWorkingExperience,
          languages: this.validations.languages,
          message: this.validations.message,
          jobOffer: this.currentElement.attributes?.title,
          attachment: {
            content: attachmentContent.replace(
              "data:application/pdf;base64,",
              ""
            ),
            filename,
          },
        },
      });
    },

    async finalCheck() {
      if (!this.isFormValid && this.validations.curriculumFile) {
        this.isSendingForm = true;

        await this.sendEmail();

        this.toggleSuccessModal();

        this.validations.name = "";
        this.validations.surname = "";
        this.validations.email = "";
        this.validations.birthday = "";
        this.validations.gender = "";
        this.validations.phone = "";
        this.validations.studyTitle = "";
        this.validations.languages = "";
        this.validations.lastWorkingExperience = "";
        this.validations.message = "";
        this.validations.curriculumFile = undefined;

        this.isPrivacyCheck = false;
        this.isCurriculumFileValid = true;

        this.isSendingForm = false;
      } else {
        this.isCurriculumFileValid = false;
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

          &.no-margin {
            @apply mt-0;
          }
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
          @apply p-3 flex items-start;

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
