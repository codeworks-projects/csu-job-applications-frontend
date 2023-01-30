<template>
    <div class="section-ct">
        <!-- Pagina principale -->
        <div
            v-if="!isSingleJob"
            class="section-wrapper"
        >
            <div class="section">
                <h1>Job Title</h1>
                <ul class="info-job">
                    <li>Luogo</li>
                    <li>Full-time</li>
                </ul>
            </div>
                <div class="section">
                <h1>Job Due</h1>
                <ul class="info-job">
                    <li>Luogo</li>
                    <li>Tempo</li>
                </ul>
            </div>
        </div>

        <!-- Job ID -->
        <div
            v-if="isSingleJob === true"
            class="section-wrapper"
        >
            <div class="section"
                :class="{
                    'orange': isSingleJob,
                }"
            >
                <h1>Jobbone</h1>
                <!-- v-if="isShown includes id" -->
                <p class="info-job">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, suscipit.
                </p>
                <div class="toggle">
                    <div
                        class="sign"
                        @click="toggleShow()"
                    >
                        <span v-if="isShowned.includes(0)">&plus;</span>
                        <span v-else>&minus;</span>
                    </div>
                </div>
            </div>
            <div class="section">
                <h1>Job Due</h1>
                <p class="info-job">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, suscipit. Lorem ipsum dolor sit amet consectetur.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        job: {
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

            isShowned: [],
        }
    },
    computed: {

    },
    method: {
        toggleShow(id){
            if (!this.isShowned.includes(id)){
                this.isShowned.push(id)
            } else {
                const index = this.isShowned.indexOf(id);
                this.isShowned.splice(index, 1);
            }
        }
    }

}
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
                @apply flex justify-center items-center absolute right-0 top-1/2 border-2 border-primary h-10 w-10;

                border-radius: 50%;

                &:hover {
                    @apply cursor-pointer;
                }

                & .sign {
                    @apply text-primary text-xl;
                }
            }
        }
        & .section:first-child {
            & h1 {
                @apply text-black;
            }
        }
        & .section.orange:first-child {
            & h1 {
                @apply text-primary;
            }
        }
    }
}
</style>