<template>
    <div class="page">
        <!-- INFO ON JOB -->

        <JobInfo 
            :job-data="getCurrentEl"
        />

        <!-- FORM -->
        <div class="form-ct">
            <div class="form-wrapper">
                <div class="form-title">
                    {{ $t('jobs.signTheModule') }}
                    <strong>{{ $t('jobs.asFastAsWeCan') }}</strong>
                </div>
                <div class="form">
                    <TextInput class="input" aspect="fill" placeholder="Nome" required />
                    <TextInput class="input" aspect="fill" placeholder="Cognome" required />

                    <div class="grid grid-cols-3 gap-x-2">
                        <TextInput class="input col-span-2" aspect="fill" placeholder="Email" required />
                        <TextInput class="input" aspect="fill" placeholder="Data" required />
                        <TextInput class="input col-span-2" aspect="fill" placeholder="Professione" required />
                    </div>

                    <TextArea class="input" aspect="fill" placeholder="Messaggio" />

                    <div class="link">
                        <a href="">
                            Link al curriculum?
                        </a>
                    </div>

                    <div class="btn-ct">
                        <Button value="Apply" />
                    </div>
                    <div class="checkbox-ct">
                        <Checkbox />
                        <p class="checkbox-info">
                            {{ $t('jobs.yourPersonalData') }}
                            <a href="">
                                {{ $t('common.privacyInfo') }}
                            </a>
                            {{ $t('jobs.andOurs') }}
                            <a href="">
                                {{ $t('common.termsOfService') }}
                            </a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
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
        getCurrentEl() {
            const slug = this.$route.params.id;
            let element = {};

            this.jobs.data.forEach(el => {
                if (el.attributes.slug === slug) element = el;
            });

            return element;
        },
        getBody() {
            return this.jobs;
        }
    }
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

                        &>a {
                            @apply underline font-black;
                        }
                    }
                }
            }
        }
    }
}
</style>
