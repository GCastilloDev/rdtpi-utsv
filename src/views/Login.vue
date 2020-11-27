<template>
  <v-img
    height="100vh"
    src="http://sayune.com/image/?path=archivos/imagenes/8525_image_contacto.jpg"
  >
    <v-container class="justify-center" fill-height fluid>
      <v-row justify="center" justify-lg="center">
        <v-col cols="12" lg="4" sm="6">
          <v-card dark color="rgba(0, 0, 0, 0.75)">
            <v-card-title class="justify-center">
              <h3>Inicio de sesión</h3>
            </v-card-title>
            <v-form
              @submit.prevent="auth"
              lazy-validation
              ref="loginForm"
              v-model="valid"
            >
              <v-container class="py-0 px-12">
                <v-row no-gutters wrap>
                  <v-col cols="12">
                    <v-text-field
                      :rules="rules.email"
                      label="Correo electrónico"
                      required
                      v-model="formLogin.username"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :rules="rules.password"
                      label="Contraseña"
                      required
                      type="password"
                      v-model="formLogin.password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-row justify="center">
                  <v-btn :disabled="!valid" color="primary" type="submit"
                    >Iniciar sesión</v-btn
                  >
                </v-row>
              </v-card-actions>
            </v-form>
            <v-card-text>
              <v-row justify="center" v-if="authError">
                <v-alert outlined color="warning">
                  <div>{{ messageError }}</div>
                </v-alert>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script>
import { auth } from "../common/Firebase";

export default {
  data: () => ({
    loading: false,
    authError: false,
    messageError: "",
    valid: true,
    formLogin: {
      username: "admin@utsv.edu.mx",
      password: "123456",
    },
    rules: {
      email: [
        (v) => !!v || "Se requiere el email",
        (v) =>
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            v
          ) || "No es un email válido",
      ],
      password: [(v) => !!v || "No puede estar vacía la contraseña"],
    },
  }),
  methods: {
    async auth() {
      try {
        const { user } = await auth.signInWithEmailAndPassword(
          this.formLogin.username,
          this.formLogin.password
        );
        console.log(user);
      } catch (error) {
        this.authError = true;
        this.messageError = error.message;
        console.log(error.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>