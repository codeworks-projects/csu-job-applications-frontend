<template>
  <div class="page">
    <div class="banner">
      QUESTO E' IL BANNER
    </div>
    <main>
      <p class="open-positions">{{ $t('common.openPositions') }}</p>
      {{ jobs }}
      <JobInfo />
    </main>
  </div>
</template>

<script lang="ts">

export default defineNuxtComponent({
  data() {
    return {
      jobs: {},
    }
  },

  async setup(){
    const {public:configPublic} = useRuntimeConfig()
    const {data} = await useFetch(configPublic.apiBase+"/api/jobs/?populate=*")

    return {
      jobs:data
    }

},

  // async fetch(){
  //   console.log(this.$getFetchUrl);
    
  //   try {
  //     const res = await fetch("https://csu.codeworks.build/api/jobs/?populate=*")
  //     .then(res=>res.json());
  //     // console.log(res.data);
  //     this.jobs = res?.data[0] || {}
  //   } catch(error) {
  //     // console.log(error);
  //   }
  // }
});
</script>

<style lang="postcss" scoped>
.page {
  @apply text-base flex-col justify-center;

  & .banner {
    @apply min-h-screen bg-black;
  }

  & main {
    @apply mt-28 p-4;

    & .open-positions{
      @apply text-grey;
    }
  }

}
</style>
