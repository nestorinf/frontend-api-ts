<template>
  <q-layout>
    <q-page-container
      class="bg-light-primary window-height window-width row justify-center items-center"
    >
      <q-dialog v-model="icon">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section> Credenciales incorrectas </q-card-section>
        </q-card>
      </q-dialog>
      <div class="column">
        <div class="row"></div>
        <div class="row">
          <q-card square bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
                  square
                  filled
                  clearable
                  v-model="email"
                  type="email"
                  label="email"
                />
                <q-input
                  square
                  filled
                  clearable
                  v-model="password"
                  type="password"
                  label="password"
                />
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                color="light-green-7"
                size="lg"
                @click="send"
                class="full-width"
                label="Login"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: "LoginPage",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
import { ref } from "vue";
import UserService from "../services/user";

import { useRouter } from "vue-router";
const router = useRouter();
const password = ref(null);
const email = ref(null);
const icon = ref(false);

const send = async () => {
  const payload = {
    email: email.value,
    password: password.value,
  };

  if (payload.email != null && payload.password != null) {
    const { token } = await fetchLogin(payload);
    if (token != null) {
      router.push("/home");
      localStorage.setItem("access_token", token);
      localStorage.setItem("email", payload.email);
    }
  } else {
    icon.value = true;
  }
};

const fetchLogin = async (payload) => {
  const token = await UserService.login(payload);
  return token;
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
