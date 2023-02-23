<template>
  <div
    :class="{
      textarea: true,
      disabled,
      fill: aspect === 'fill',
      'not-valid': !valid,
    }"
  >
    <InputLabel v-if="label" :text="label" :required="required" />
    <textarea
      ref="input"
      :placeholder="placeholder"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      @keypress="keypress($event)"
      @blur="onBlur(($event.target as HTMLInputElement).value)"
      @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    <InputDescription v-if="description" :text="description" />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    aspect: {
      type: String,
      default: "default",
      validator(value: String) {
        return (["default", "fill"] as String[]).includes(value);
      },
    },
    description: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    updateValue(value: String) {
      this.$emit("input", value);
    },

    focus() {
      (this.$refs.input as HTMLInputElement).focus();
    },

    keypress(event: KeyboardEvent) {
      switch (event.keyCode) {
        case 13:
          this.$emit("onEnter");
          break;
      }
    },

    onBlur(value: String) {
      this.$emit("blur", value);
    },
  },
});
</script>

<style lang="postcss" scoped>
.textarea {
  & textarea {
    @apply text-base py-3 px-5 bg-input resize-none font-semibold align-top text-black rounded-md;

    width: 300px;
    min-height: 150px;

    &:focus {
      @apply outline-none bg-input-focus;
    }
  }

  &.fill {
    & textarea {
      @apply w-full bg-white;
    }
  }

  &.not-valid {
    & input {
      @apply bg-red;
    }
  }

  &.disabled {
    @apply pointer-events-none opacity-25;
  }
}

@media only screen and (max-width: 980px) {
  .textarea {
    & textarea {
      @apply w-full;
    }
  }
}
</style>
