<template>
    <div class="section-ct">

        {{ jobData }}

        <div class="title text-9xl">
            {{ jobData.attributes.title }}
        </div>
        <!-- Job ID -->
        <div
            class="section-wrapper"
        >
            <div
                class="section"
                :class="isShowned.includes(i) ? 'active' : ''"
                v-for="(info, i) in jobData.attributes.body"
                :key="i"
            >
                <h1>
                    {{ info }}
                </h1>
                <p 
                    class="info-job"
                    v-if="isShowned.includes(i)"
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, suscipit.
                </p>
                <div
                    class="toggle"
                    :class="isShowned.includes(i) ? 'active' : ''"
                    @click="toggleShow(i)"
                >
                    <div class="sign">
                        <span v-if="isShowned.includes(i)">&plus;</span>
                        <span v-else>&minus;</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { forEachChild } from 'typescript';


export default defineNuxtComponent({
    props: {
        jobData: {
            type: Object,
            default: {}
        },
    },
    data() {
        return {
            isShowned: [],
        }
    },
    methods: {
        toggleShow(id)  {
            if (!this.isShowned.includes(id)){
                this.isShowned.push(id)
                // console.log(id);
            } else {
                const index = this.isShowned.indexOf(id);
                this.isShowned.splice(index, 1);
                // console.log(id);
            }
        }
    }

});
</script>

<style lang="postcss" scoped>
.section-ct {
    & .section-wrapper {
        & .section {
            @apply relative w-full mt-6 pt-2 pb-4 border-t-2 border-t-primary text-grey;
                
            & h1 {
                @apply text-4xl pt-4 font-light;
            }
            & .info-job {
                @apply mt-8 flex;

                & li {
                    @apply mx-1;

                    &::after {
                        content: ',';
                    }

                    &:last-of-type::after {
                        content: '.';
                    }   
                }
            }
            & .toggle {
                @apply flex justify-center items-center absolute right-0 top-1/2 border-4 border-grey h-10 w-10;

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
        }
    }
}
</style>