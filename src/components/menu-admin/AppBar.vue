import { mapState } from 'vuex';
<template>
  <v-app-bar color="green accent-4" dense dark>
    <v-app-bar-nav-icon
      v-if="sesionActiva"
      @click="$store.state.isOpen = true"
    ></v-app-bar-nav-icon>

    <v-toolbar-title
      >REPOSITORIO DIGITAL DE PROYECTOS DE TI (RDPTI)</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <v-btn text :to="{ path: '/' }">
      <v-icon left>mdi-home</v-icon> Inicio
    </v-btn>
    <v-btn text :to="{ name: 'Login' }">
      <v-icon left>mdi-account-key</v-icon> Login
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "appBar",
  computed: {
    ...mapState(["sesionActiva"]),
  },
};
</script>

<style lang="scss" scoped>
</style>