<template>
    <div class="section-ct container center">
        <div v-if="isPlaceholder" class="section-wrapper placeholder">
            <!-- Title -->
            <div class="title">
                {{ getTitle }}
            </div>

            <!-- Sections -->
            <div class="section" >
                <h1></h1>
                <p></p>
            </div>
            <div class="section" >
                <h1></h1>
                <p></p>
            </div>
            <div class="section" >
                <h1></h1>
                <p></p>
            </div>

            <!-- Divisore -->
            <div class="section"></div>
        </div>

        <div v-else class="section-wrapper">
            <!-- Title -->
            <div class="title">
                {{ getTitle }}
            </div>

            <!-- Sections -->
            <div
                class="section" 
                :class="isShowned.includes(i) ? 'active' : ''"
                v-for="(info, i) in getInformations"
                :key="i"
            >
                <h1 @click="toggleShow(i)">
                    {{ info.title }}
                </h1>
                <p  
                    class="info-job" 
                    v-if="isShowned.includes(i)"
                >
                    {{ info.description }}
                </p>

                <!-- Toggle -->
                <div   
                    class="toggle" 
                    :class="isShowned.includes(i) ? 'active' : ''" 
                    @click="toggleShow(i)"
                >
                    <div class="sign">
                        <span v-if="isShowned.includes(i)">&minus;</span>
                        <span v-else>&plus;</span>
                    </div>
                </div>
            </div>

            <!-- Divisore -->
            <div class="section"></div>
        </div>
    </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
    props: {
        jobData: {
            type: Object,
            default: {},
        },
        isPlaceholder: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isShowned: [],
        };
    },
    methods: {
        toggleShow(id) {
            if (!this.isShowned.includes(id)) {
                this.isShowned.push(id);
            } else {
                const index = this.isShowned.indexOf(id);
                this.isShowned.splice(index, 1);
            }
        },
    },
    computed: {
        getTitle() {
            return this.jobData?.attributes?.title;
        },
        getInformations() {
            return this.jobData?.attributes?.informations;
        },
    },
});
</script>

<style lang="postcss" scoped>
.section-ct {
    & .section-wrapper {
        @apply mb-28;

        & .title {
            @apply mt-72 mb-28 text-6xl;
        }

        & .section {
            @apply relative w-full mt-6 border-t-4 border-t-primary text-grey;

            & h1 {
                @apply text-4xl py-6 font-light;

                &:hover {
                    @apply cursor-pointer;
                }
            }

            & .info-job {
                @apply mt-2 w-2/3 flex;
            }

            & .toggle {
                @apply flex justify-center items-center absolute right-0 top-6 border-4 border-grey h-10 w-10;

                border-radius: 50%;

                & .sign {
                    @apply text-grey text-xl font-semibold;
                }

                &:hover {
                    @apply cursor-pointer border-primary;

                    & .sign {
                        @apply text-primary;
                    }
                }

                &.active {
                    @apply cursor-pointer border-primary;

                    & .sign {
                        @apply text-primary;
                    }
                }
            }
        }

        & .section:hover {
            & h1 {
                @apply text-black;
            }
        }

        & .section.active {
            & h1 {
                @apply text-primary;
            }

            & .info-job {
                @apply text-black;
            }
        }
    }
    & .placeholder {
        & .title {
            @apply h-20 bg-placeholder;
        }
        & .section {
            @apply border-t-primary;

            & h1 {
                @apply h-10 mt-2 w-1/4 bg-placeholder;
            }
            & p {
                @apply h-20 mt-2 w-2/3 bg-placeholder;
            }

        }
    }
}

@media only screen and (max-width:980px) {
    .section-ct {
        & .section-wrapper {
            & .title {
                @apply text-4xl;
            }

            & .section {
                & h1 {
                    @apply text-3xl;
                }
            }

        }
    }
}
</style>
