<template>
    <header>
        <div class="container center">
            <NuxtLink class="image-ct" :to="'/'">
                <img src="~public/image/csu-logo.png" alt="csu-logo">
            </NuxtLink>
        </div>
    </header>
</template>

<script>
export default {

}
</script>

<style lang="postcss" scoped>
header {
    & .container {
        & .image-ct {
            @apply absolute top-24 left-6;
        }
    }
}
</style>