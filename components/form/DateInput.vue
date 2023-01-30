<template>
  <div
    :class="{
      'date-input': true,
      disabled,
      fill: aspect === 'fill',
      'not-valid': !valid,
    }"
  >
    <InputLabel v-if="label" :text="label" :required="required" />
    <div>
      <input
        ref="input"
        v-model="date"
        type="date"
        placeholder="YYYY-MM-DD"
        :required="required"
        :disabled="disabled"
        :max="maxDate"
        :min="minDate"
        class="inline-block"
        @input="updateValue"
      />
    </div>
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
    value: {
      type: [String, Number],
      default: "",
      validator(value) {
        return !value || String(value).length >= 13;
      },
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
    maxDate: {
      type: String,
      default: "20-03-2040",
    },
    minDate: {
      type: String,
      default: "01-01-1970",
    },
  },

  setup() {
    return {
      date: "",
      time: "",
    };
  },

  created() {
    if (this.value) {
      const date = new Date(this.value);
      if (date) {
        this.date =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
        this.time = date.getHours() + ":" + date.getMinutes();
      }
    }
  },

  methods: {
    updateValue() {
      const timeDec = this.time ? " " + this.time : "";
      const dateDec = this.date + timeDec;
      const timestamp = new Date(dateDec).getTime();

      this.$emit("input", timestamp);
    },

    focus() {
      (this.$refs.input as HTMLInputElement).focus();
    },
  },
});
</script>

<style lang="postcss" scoped>
.date-input {
  & input {
    @apply text-base px-5 bg-input rounded-md resize-none font-semibold relative cursor-pointer;

    height: 52px;
    width: 220px;
    padding-top: 13px;
    padding-bottom: 13px;

    &::after {
      @apply absolute float-right top-1/2 bg-no-repeat pointer-events-none;

      content: "";
      background-image: url('data:image/svg+xml,<svg  enable-background="new 0 0 323.358 323.358" viewBox="0 0 323.358 323.358" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m48.863 323.358h225.632c23.653 0 42.875-19.222 42.875-42.875v-213.656c0-23.653-19.222-42.875-42.875-42.875h-17.006v-11.976c0-6.587-5.39-11.976-11.977-11.976s-11.976 5.389-11.976 11.976v11.976h-143.714v-11.976c0-6.587-5.39-11.976-11.977-11.976s-11.976 5.389-11.976 11.976v11.976h-17.006c-23.653 0-42.875 19.222-42.875 42.875v213.656c0 23.653 19.222 42.875 42.875 42.875zm-18.922-256.531c0-10.419 8.503-18.922 18.922-18.922h17.006v11.976c0 6.587 5.389 11.976 11.976 11.976s11.976-5.389 11.976-11.976v-11.976h143.715v11.976c0 6.587 5.389 11.976 11.976 11.976s11.976-5.389 11.976-11.976v-11.976h17.006c10.419 0 18.922 8.503 18.922 18.922v34.971h-263.475zm0 58.923h263.477v154.733c0 10.419-8.503 18.922-18.922 18.922h-225.633c-10.419 0-18.922-8.503-18.922-18.922z"/></g></g></svg>');
      background-size: 16px 16px;
      width: 16px;
      height: 16px;
      padding: 0 12px;
      right: 12px;
      transform: translateY(-50%);
    }

    &::-webkit-calendar-picker-indicator {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      height: auto;
      color: transparent;
      background: transparent;
    }

    &::-webkit-inner-spin-button {
      z-index: 1;
    }

    &::-webkit-clear-button {
      z-index: 1;
    }

    &:focus {
      @apply outline-none bg-input-focus;
    }
  }

  &.fill {
    & input {
      @apply w-full;
    }
  }

  &.not-valid {
    & input {
      @apply bg-light-red;

      &:focus {
        @apply bg-light-red-focus;
      }
    }
  }

  &.disabled {
    @apply pointer-events-none opacity-25;
  }
}
</style>
