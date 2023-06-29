<template>
  <q-layout>
    <q-page>
      <q-form @submit="onSubmit" @reset="onReset">
        <div class="row q-ml-lg q-mr-lg">
          <h5 class="text-uppercase">
            <strong>{{ titleForm }}</strong>
          </h5>
        </div>
        <q-card
          square
          class="q-ml-lg q-mr-lg"
          style="
            flex-direction: column;
            border-radius: 8px !important;
            box-sizing: border-box;
          "
        >
          <div class="q-pa-lg">
            <q-card-section>
              <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <label><strong>Usuario</strong></label>
                  <q-input
                    class="q-mb-lg"
                    dense
                    hide-bottom-space
                    :readonly="readonly"
                    id="user"
                    lazy-rules
                    outlined
                    placeHolder="Escribir aquí"
                    :rules="rules.username"
                    v-model="models.username"
                  />
                </div>
                <div class="col-1"></div>
                <!-- Name Field -->
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <label><strong>Nombres</strong></label>
                  <q-input
                    class="q-mb-lg"
                    dense
                    hide-bottom-space
                    id="name"
                    lazy-rules
                    outlined
                    :readonly="readonly"
                    placeHolder="Escribir aquí"
                    v-model="models.name"
                    :rules="rules.name"
                  />
                </div>
                <!-- Name Field -->
                <div class="col-1"></div>
                <!-- lastname Field -->
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <label><strong>Apellidos</strong></label>
                  <q-input
                    class="q-mb-lg"
                    dense
                    hide-bottom-space
                    id="lastname"
                    lazy-rules
                    outlined
                    :readonly="readonly"
                    placeHolder="Escribir aquí"
                    v-model="models.lastname"
                    :rules="rules.lastname"
                  />
                </div>
                <!-- lastname Field -->
              </div>

              <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <label><strong>Correo Electrónico</strong></label>
                  <q-input
                    class="q-mb-lg"
                    dense
                    hide-bottom-space
                    id="email"
                    lazy-rules
                    outlined
                    :readonly="readonly"
                    placeHolder="Escribir aquí"
                    :rules="rules.email"
                    v-model="models.email"
                  />
                </div>
                <div class="col-1"></div>
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <label><strong>Contrasena</strong></label>
                  <q-input
                    class="q-mb-lg"
                    dense
                    hide-bottom-space
                    id="password"
                    lazy-rules
                    outlined
                    :readonly="readonly"
                    placeHolder="Escribir aquí"
                    :rules="rules.password"
                    v-model="models.password"
                  />
                </div>
                <!-- email Field -->

                <!-- email Field -->
              </div>
            </q-card-section>
          </div>
        </q-card>
        <!-- Form Submit/Cancel Buttons -->
        <div class="create-user-botones">
          <q-btn class="create-user-btn-cancel" label="Cancelar" type="reset" />
          <q-btn
            class="create-user-btn-submit"
            label="Guardar"
            type="submit"
            v-if="props.action == 'consult' ? false : true"
          >
          </q-btn>
        </div>

        <br />
      </q-form>
    </q-page>
  </q-layout>
</template>
<script>
export default {
  name: "CreateUser",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
import { onUnmounted, onBeforeMount, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserService from "../../services/user";
const models = ref({});
const props = defineProps(["id", "action"]);
const router = useRouter();

const titleForm = ref("");
const readonly = ref(null);
const emailPattern =
  /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

const rules = {
  name: [(val) => (val && val.length > 0) || "Por favor ingrese un nombre"],
  username: [
    (val) => (val && val.length > 0) || "Por favor ingrese un usuario",
  ],
  lastname: [
    (val) => (val && val.length > 0) || "Por favor ingrese un apellido",
  ],
  password: [
    (val) => (val && val.length > 0) || "Por favor ingrese una contrasena",
  ],
  email: [
    (val) => (val && val.length > 0) || "debería completar este campo",
    (val) => emailPattern.test(val) || "email parece no ser valido",
  ],
};

const onSubmit = async () => {
  const payload = {
    name: models.value.name,
    lastname: models.value.lastname,
    username: models.value.username,
    password: models.value.password,
    email: models.value.email,
  };

  try {
    if (props.id != null) {
      payload.id = props.id;
      const updateUser = await UserService.updateUser(payload);
    } else {
      const newUser = await UserService.createUser(payload);
      models.value = {};
    }
  } catch (err) {
    console.log(err);
  }
  // console.log(payload);
};

const fetchUserById = async () => {
  const { data } = await UserService.getUserById(props.id);
  return data;
};

onMounted(async () => {
  console.log(props);

  titleForm.value = "Registrar Usuario";
  if (props.action == "edit") {
    titleForm.value = "Editar Usuario";
  }

  if (props.action == "consult") {
    titleForm.value = "Consultar Usuario";
    readonly.value = true;
  }

  if (props.id != null) {
    const user = await fetchUserById();
    user.password = "";
    models.value = user;
  }
});

const onReset = () => {
  models.value = {};
  router.push("/user");
};
</script>

<style scoped>
.create-user-botones {
  margin-top: 15px;
  padding-right: 50px;
  text-align: right;
  width: 100%;
}

.create-user-input-label {
  font-family: "Encode Sans";
  font-style: normal;
  color: #2c3a47;
}
.create-user-btn-cancel {
  background: white;
  border: 2px solid #2e65f3;
  color: #2e65f3;
  margin-right: 25px;
}

.create-user-btn-submit {
  background: #2e65f3;
  color: white;
  width: 150px;
}

label {
  margin-top: 10px;
}
</style>
