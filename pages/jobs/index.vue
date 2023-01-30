<template>
    <div class="page">
        <main>
            <div class="title">
                <h1>Job Title</h1>
            </div>
            <JobInfo :is-single-job="true" />
        </main>
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
}
</style>
