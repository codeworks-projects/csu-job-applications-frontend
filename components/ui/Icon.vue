<template>
  <component :is="icon" class="fill-current" />
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const icon = defineAsyncComponent(() =>
  import(`../../assets/icon/${props.name}.svg`)
);
</script>
