<template>
  <div class="demo-ct">
    <h1>{{ $t("hello", { name: "developer" }) }}</h1>
    <nuxt-img
      src="/image/example-img-to-compress.png"
      sizes="sm:100vw md:50vw lg:400px"
      format="webp"
      quality="80"
      loading="lazy"
    />
    <Icon name="map" />
    <TextInput label="Hello" description="This is a text input" required />
    <TextArea label="A text area" />
    <div>
      <Button value="This is a button" class="mr-3" />
      <Button value="This is a button" loading class="mr-3" />
      <Button value="This is a button" type="secondary" />
    </div>
    <div>
      <Checkbox label="Check me" />
    </div>
    <div>
      <Checkbox label="Check me" type="switch-on" />
    </div>
    <div>
      <DateInput label="Enter a date" />
    </div>
    <div>
      <NavigationTabs
        :items="navigationTabsItems"
        :cur-item="curNavigationTabItem"
        @choose="setCurNavigationTab"
      />
    </div>
    <div>
      <Modal :is-visible="modalIsVisible" @close="hideModal" />
      <Button value="Show modal" @click="showModal" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  setup() {
    return {
      curNavigationTabItem: ref("one"),
      modalIsVisible: ref(false),
      navigationTabsItems: [
        {
          id: "one",
          name: "One",
        },
        {
          id: "two",
          name: "Two",
        },
        {
          id: "three",
          name: "Three",
        },
      ],
    };
  },

  methods: {
    setCurNavigationTab(newTabId: string) {
      this.curNavigationTabItem = newTabId;
    },

    showModal() {
      this.modalIsVisible = true;
    },

    hideModal() {
      this.modalIsVisible = false;
    },
  },
});
</script>

<style lang="postcss" scoped>
.demo-ct {
  @apply flex-col justify-center space-y-8 p-5;

  & h1 {
    @apply font-bold font-mono text-primary;
  }
}
</style>
