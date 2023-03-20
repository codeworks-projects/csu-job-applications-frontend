<template>
    <div class="select" :class="{
        disabled: disabled,
        'not-valid': !valid,
        fill: aspect === 'fill',
        md: size === 'md',
    }">
        <InputLabel v-if="label" :text="label" :required="required" />
        <div class="selector">
            {{ prefix ? prefix : "" }}
            <select v-model="selected" :required="required">
                <option disabled value="">
                    {{ disabledOption }}
                </option>
                <option v-for="option in options" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: "",
        },
        disabledOption: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            required: true,
        },
        prefix: {
            type: String,
            default: "",
        },
        value: {
            type: [String || Number],
            default: "",
        },
        aspect: {
            type: String,
            default: "default",
            validator(value) {
                return ["default", "fill"].includes(value);
            },
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
        size: {
            type: String,
            default: "base",
            validator(value) {
                return ["base", "md", "sm", "lg"].includes(value);
            },
        },
        modelValue: String,
    },
    setup(props, { emit }) {
        const selected = computed({
            get() {
                return props.modelValue;
            },
            set(newValue) {
                emit("update:modelValue", newValue);
            },
        });
        return {
            selected,
        };
    },
};
</script>

<style lang="postcss" scoped>
.select {
    & label {
        @apply block text-sm font-medium text-black mb-1;
    }


    & .selector {
        @apply inline-block bg-white px-5 text-base font-medium cursor-pointer;

        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 10px;

        & select {
            @apply text-black text-base font-medium opacity-50;

            &:focus {
                @apply outline-none opacity-100;
            }
        }
    }

    &.not-valid {
        & .selector {
            @apply bg-light-red;
        }
    }

    &.fill {
        & .selector {
            @apply block;

            & select {
                @apply w-full;
            }
        }
    }

    &.md {
        & .selector {
            width: 350px;
            padding-top: 11px;
            padding-bottom: 11px;

            & select {
                @apply font-bold text-base w-full;
            }
        }
    }

    &.inverted-colorscheme {
        & label {
            @apply text-white;
        }

        & .selector {
            @apply text-white text-base bg-primary;

            & select {
                @apply text-white;
            }
        }
    }

    &.disabled {
        @apply pointer-events-none opacity-25;
    }
}

@media only screen and (max-width: 980px) {
    .select {
        &.md {
            & .selector {
                width: 100%;
            }
        }
    }
}
</style>
