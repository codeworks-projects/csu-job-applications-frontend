<script>
/**
 * @see https://vitejs.dev/guide/features.html#glob-import
 */

/**
 * NOTE: this feature may be optimized importing only the single image when requested. At the moment all images are always imported
 */
const rawIcons = import.meta.glob("@/assets/icon/*.svg", { as: "raw" });

const icons = {};
for (const path in rawIcons) {
  rawIcons[path]().then((mod) => {
    icons[path] = mod;
  });
}

import { h } from "vue";

const Icon = (props, context) => {
  let iconData = icons["/assets/icon/" + props.name + ".svg"];
  if (!iconData) {
    iconData = icons["/assets/icon/broken-image.svg"];
  }

  return h(`svg`, { innerHTML: iconData });
};

export default Icon;
</script>
