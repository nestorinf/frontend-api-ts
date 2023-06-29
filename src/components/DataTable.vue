<template>
  <div class="">
    <q-table
      flat
      bordered
      title="Datos"
      :rows="props.rows"
      :columns="props.columns"
      row-key="id"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <ButtonAction
            color="primary"
            icon="search"
            @click="redirect('Consult User', props.row.id, 'consult')"
          ></ButtonAction>
          <ButtonAction
            color="warning"
            icon="edit"
            @click="redirect('Edit User', props.row.id, 'edit')"
          ></ButtonAction>
          <ButtonAction
            color="red"
            icon="remove"
            @click="$emit('deleted', props.row.id)"
          ></ButtonAction>

          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
export default {
  name: "DataTable",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
import ButtonAction from "./ButtonAction.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const redirect = (path, id, action) => {
  console.log(action);
  router.push({
    name: path,
    params: {
      action: action,
      id: id,
    },
  });
};

const props = defineProps(["columns", "rows"]);
</script>


