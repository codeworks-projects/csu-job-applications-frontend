<template>
  <div
    :class="{
      button: true,
      clickable: true,
      loading,
      primary: type === 'primary',
      secondary: type === 'secondary',
      disabled,
      'ico-only': value === '',
      'fill-width': aspect === 'fill',
    }"
  >
    <icon v-if="icon !== ''" :name="icon" :type="iconType" />
    {{ value }}
    <Loader
      v-if="loading"
      class="loader-ct"
      :colorscheme="type === 'secondary' ? 'colored' : 'white'"
    />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    value: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    aspect: {
      type: String,
      default: "default",
      validator(value: String) {
        return (["default", "fill"] as String[]).includes(value);
      },
    },
    type: {
      type: String,
      default: "primary",
      validator(value: String) {
        return (["primary", "secondary"] as String[]).includes(value);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const iconType = computed(() =>
      props.type === "primary" ? "primary" : "secondary"
    );

    return {
      iconType,
    };
  },
});
</script>

<style lang="postcss" scoped>
.button {
  @apply relative inline-block rounded-md px-6 text-base font-semibold select-none;

  min-width: 50px;
  height: 40px;
  line-height: 42px;

  & > svg {
    @apply align-top mr-2;

    width: 18px;
    height: 18px;
    margin-top: 16px;
    fill: theme(colors.white);
  }

  & > .loader-ct {
    border-radius: inherit;
    background-color: inherit;
  }

  &.primary {
    @apply bg-primary text-white;

    &:hover {
      @apply bg-primary-hover;
    }
  }

  &.secondary {
    @apply bg-secondary text-black;

    &:hover {
      @apply bg-secondary-hover;
    }

    & > svg {
      fill: theme(colors.black);
    }
  }

  &.ico-only {
    @apply px-0 text-center;

    & > svg {
      @apply mr-0;
    }
  }

  &.loading {
    @apply pointer-events-none;

    cursor: progress;
  }

  &.disabled {
    @apply pointer-events-none opacity-25;
  }

  &.fill-width {
    @apply block text-center;
  }
}
</style>
