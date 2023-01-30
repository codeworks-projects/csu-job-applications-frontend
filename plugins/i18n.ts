import { createI18n } from "vue-i18n";

const DEFAULT_LOCALE = "it";
const rawLangs = import.meta.glob("@/locales/*.json", { as: "raw" });
import defaultTranslations from "@/locales/it.json";

const messages: any = {};
messages[DEFAULT_LOCALE] = defaultTranslations;

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: DEFAULT_LOCALE,
    messages,
  });

  vueApp.use(i18n);

  for (const path in rawLangs) {
    rawLangs[path]().then((mod) => {
      const langName = path.replace(/^.*[\\\/]/, "").split(".")[0];
      i18n.global.setLocaleMessage(
        langName,
        JSON.parse(mod as unknown as string)
      );
    });
  }
});
