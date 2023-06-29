<template>
  <q-expansion-item
    dense
    expand-separator
    icon="perm_identity"
    :label="props.name"
    content-inset-level="1"
  >
    <q-card>
      <q-card-section>
        <strong
          @click="$router.push({ name: props.route })"
          style="cursor: pointer"
          >{{ props.content }}</strong
        ></q-card-section
      >
    </q-card>
  </q-expansion-item>
</template>
<script>
export default {
  name: "MenuItemStatic",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
const props = defineProps(["name", "route", "content"]);
</script>
