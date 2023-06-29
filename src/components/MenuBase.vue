<template>
  <MenuItemStatic
    name="Menu"
    route="Menu"
    content="Crear Menu"
  ></MenuItemStatic>
  <MenuItemStatic
    name="Usuarios"
    content="Crear usuarios"
    route="User"
  ></MenuItemStatic>
  <MenuItem :menu="dataMenu"> </MenuItem>
</template>

<script>
export default {
  name: "MenuBase",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup>
import MenuService from "../services/menu.js";
import MenuItem from "./MenuItem.vue";
import MenuItemStatic from "./MenuItemStatic.vue";

import { onBeforeMount, ref } from "vue";
const dataMenu = ref([]);
const fetchMenu = async () => {
  const email = localStorage.getItem("email");
  const data = await MenuService.getMenuByUser(email);
  dataMenu.value = data.data;
};

onBeforeMount(() => {
  fetchMenu();
});
</script>
