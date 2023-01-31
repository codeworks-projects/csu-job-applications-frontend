<template>
    <div class="section-ct">
        <!-- Job ID -->
        <div
            v-if="isSingleJob === true"
            class="section-wrapper"
        >
            <div
                class="section"
                :class="isShowned.includes(4) ? 'active' : ''"
            >
                <h1>Dove</h1>
                <!-- v-if="isShown includes id" -->
                <p class="info-job">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, suscipit.
                </p>
                <div
                    class="toggle"
                    :class="isShowned.includes(4) ? 'active' : ''"
                    @click="toggleShow(4)"
                >
                    <div class="sign">
                        <span v-if="isShowned.includes(4)">&plus;</span>
                        <span v-else>&minus;</span>
                    </div>
                </div>
            </div>
            <div class="section">
                <h1>Quando</h1>
                <p class="info-job">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, suscipit. Lorem ipsum dolor sit amet consectetur.
                </p>
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
        isSingleJob: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            // Se ci metto un array che si riempie e si svuota in base a cosa clicco allora ottengo l'apertura di tutte le cose che voglio per confronto diretto fra id cliccato e array riempito

            isShowned: [0, 1, 2, 3],
        }
    },
    computed: {
        // getBodyWithoutId(){
        //     const body = [];
        //     this.jobData.attributes.body.forEach((el, key) => {
        //         if(key !== 'id') body.push(el);
        //     });
        //     return body;
        // }
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