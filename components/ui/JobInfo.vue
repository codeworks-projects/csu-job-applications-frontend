<template>
    <div class="section-ct">
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
</template>

<script>
export default {
    props: {
        job: {
            type: Object,
            default: {}
        },
    }

}
</script>

<style lang="postcss" scoped>
.section-ct {
    & .section {
        @apply w-full mt-6 pt-2 pb-8 border-t-2 border-t-primary text-grey;
            
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
    }
    & .section:first-child {
        & h1 {
            @apply text-black;
        }
    }
}
</style>