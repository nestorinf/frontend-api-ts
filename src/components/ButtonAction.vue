<template>
  <div class="">
    <q-btn square :color="props.color" :icon="props.icon" />
  </div>
</template>

<script setup>
const props = defineProps(["icon", "color"]);
</script>
