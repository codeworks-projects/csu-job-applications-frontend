<template>
  <div :class="{ disabled }">
    <InputLabel v-if="title && type === 'switch-on'" :text="title" />
    <div
      :class="{
        checkbox: true,
        'switch-on': type === 'switch-on',
        clickable: type === 'switch-on',
        checked: isChecked,
      }"
      @click="clickInput"
    >
      <div class="input">
        <input
          ref="input"
          v-model="inputModel"
          :value="value"
          type="checkbox"
          :disabled="disabled"
          @click.stop="preventDefault"
        />
        <icon name="check" />
      </div>
      <label>
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import {computed} from "@vue/runtime-core";
export default defineNuxtComponent({
  model: {
    prop: "checked",
    event: "change",
  },

  props: {
    label: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "checkbox",
      validator(value: String) {
        return (["checkbox", "switch-on"] as String[]).includes(value);
      },
    },
    modelValue: Boolean,
  },

  setup(props, {emit}) {
    const inputModel = computed({
      get(){
        return props.modelValue
      },
      set(newValue){
        emit('update:modelValue', newValue)
      }
    })

    return {
      inputModel,
      isChecked: false,
    };
  },

  computed: {
    selected: {
      get() {
        return this.checked;
      },
      set(val: boolean) {
        this.isChecked = val;
        this.$emit("change", val);
      },
    },
  },

  created() {
    this.isChecked = this.checked;
  },

  methods: {
    clickInput() {
      (this.$refs.input as HTMLInputElement).click();
    },

    preventDefault() {
      return true;
    },
  },
});
</script>

<style lang="postcss" scoped>
.checkbox {
  @apply relative inline-block text-black select-none;

  & > .input {
    @apply relative inline-block mr-2 text-center;

    width: 24px;
    height: 24px;

    & > input {
      @apply absolute w-full h-full left-0 top-0 rounded-md align-top cursor-pointer bg-input border-primary;

      transition: background 0.2s ease;
      -webkit-appearance: none;
      border-width: 3px;

      &:focus {
        @apply outline-none;
      }

      &:checked {
        @apply bg-primary !important;
      }
    }

    & > svg {
      @apply relative inline-block pointer-events-none opacity-0 align-top;

      margin-top: 5px;
      width: 14px;
      height: 14px;
      fill: #fff;
      transition: opacity 0.2s ease, transform 0.2s ease;
      transform: scale(0.5);
    }
  }

  & > label {
    @apply inline-block text-black text-sm font-medium leading-tight font-semibold align-top cursor-pointer;

    margin-top: 0.35rem;
  }

  &.checked {
    & > .input {
      & > svg {
        @apply opacity-100;

        transform: scale(1);
      }
    }
  }

  &.switch-on {
    @apply px-6 rounded-lg bg-input;

    height: 50px;
    min-width: 225px;

    & > .input {
      margin-top: 12px;
    }

    & label {
      margin-top: 18px;
    }
  }

  &.disabled {
    @apply pointer-events-none opacity-25;
  }
}
</style>
