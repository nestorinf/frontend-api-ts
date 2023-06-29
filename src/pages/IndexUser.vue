<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-12">
        <q-btn
          square
          color="primary"
          @click="$router.push({ path: '/user/create' })"
          label="Registrar Usuario"
        />
      </div>

      <div class="col-12">
        <data-table
          :columns="columns"
          :rows="rows"
          @deleted="deleted"
        ></data-table>
      </div>

      <ModalConfirm
        v-model:confirm="confirm"
        message="Esta seguro de eliminar este usuario"
      ></ModalConfirm>
    </div>
  </q-page>
</template>
<script>
export default {
  name: "IndexUser",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
import DataTable from "../components/DataTable.vue";
import ModalConfirm from "../components/ModalConfirm.vue";
import { ref, watch } from "vue";
import UserService from "../services/user";
import { onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const columns = ref([]);
const rows = ref([]);
const confirm = ref(null);
const deleted = async (id) => {
  const deleteUser = await UserService.deleteUser(id);
  if (deleteUser.data.status == 0) {
    const deleteRow = rows.value.findIndex((element) => element.id === id);
    rows.value.splice(deleteRow, 1);

    //   confirm.value = true;
  }
};

const routerCreate = () => {
  router.push({ path: "/user/create" });
};
columns.value = [
  {
    name: "action",
    required: true,
    label: "Accion",
    align: "left",
    field: (row) => "",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    align: "center",
    label: "Nombre",
    field: "name",
    sortable: true,
  },
  { name: "lastname", label: "Apellido", field: "lastname", sortable: true },
  { name: "username", label: "Usuario", field: "username" },
  { name: "email", label: "Email", field: "email" },
];

const fetchUsers = async () => {
  try {
    const users = await UserService.getUsers();
    rows.value = users.data;
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
