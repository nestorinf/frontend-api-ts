<template>
  <q-expansion-item
    dense
    expand-separator
    icon="perm_identity"
    :content-inset-level="index + 0.3"
    :label="menu.name"
    v-for="(menu, index) in props.menu"
    :key="index"
  >
    <MenuItem :menu="menu.child"></MenuItem>
  </q-expansion-item>
  <div></div>
</template>
<script>
export default {
  name: "MenuItem",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
const props = defineProps(["menu"]);
</script>
