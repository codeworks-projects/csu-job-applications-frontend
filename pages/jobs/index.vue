<template>
    <div class="page">
        <main>
            <div class="title">
                <h1>Job Title</h1>
            </div>
            <JobInfo :is-single-job="true" />
        </main>
        <div class="form-ct">
            <div class="form-wrapper">
                <div class="form-title">
                    {{ $t('jobs.signTheModule') }}
                    <strong>{{ $t('jobs.asFastasWeCan') }}</strong>
                </div>
                <div class="form">
                    <TextInput
                        class="input"
                        aspect="fill"
                        placeholder="Nome"
                        required
                    />
                    <TextInput
                        class="input"
                        aspect="fill"
                        placeholder="Cognome"
                        required
                    />

                    <div class="grid grid-cols-3 gap-x-2">
                        <TextInput 
                            class="input col-span-2"
                            aspect="fill"
                            placeholder="Email"
                            required
                        />
                        <TextInput
                            class="input"
                            aspect="fill"
                            placeholder="Data"
                            required
                        />
                        <TextInput
                            class="input col-span-2"
                            aspect="fill"
                            placeholder="Professione"
                            required
                        />
                    </div>

                    <TextArea
                        class="input"
                        aspect="fill"
                        placeholder="Messaggio"
                    />

                    <a href="">Link al curriculum?</a>

                    <div>
                        <Checkbox label="Check me" type="switch-on" />
                        <Button value="Apply" />
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
.page {
    @apply text-base flex-col justify-center;

    & main {
        @apply mt-28 p-4;

        & .title {
            @apply mt-44 mb-28 text-6xl;
        }
    }

    & .form-ct {
        @apply bg-light-grey my-10 flex justify-center items-center;

        & .form-wrapper {
            @apply w-1/3;

            & .form-title {
                @apply text-center;
            }

            & .form {
                & .input {
                    @apply mt-2 w-full bg-white border-2 border-grey;
                }
            }
        }
    }
}
</style>
