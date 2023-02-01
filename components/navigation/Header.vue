<template>
    <header>
        <div class="image-ct">
            <img src="~public/image/csu-logo.png" alt="csu-logo">
        </div>
    </header>
</template>

<script>
export default {

}
</script>

<style lang="postcss" scoped>
header {
    & .image-ct {
        @apply absolute top-24 left-6;
    }
}
</style>