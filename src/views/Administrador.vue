<template>
  <v-container>
    <h1><v-icon color="green dark-1">mdi-ninja</v-icon> Administrador</h1>
    <v-row>
      <v-col>
        <v-btn block @click="showNuevoAdmin = true">
          Agregar administrador</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="users"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
    <nuevoAdmin
      v-if="showNuevoAdmin"
      :showNuevoAdmin="showNuevoAdmin"
      @cerrar="showNuevoAdmin = false"
      @usuarioCreado="getUsersByRol('admin')"
    />
  </v-container>
</template>

<script>
import { firebaseMixin } from "../mixins/RegistrosFirebase";
export default {
  name: "Administrador",
  mixins: [firebaseMixin],
  mounted() {
    this.getUsersByRol("admin");
  },
  components: {
    nuevoAdmin: () => import("../components/administrador/nuevoAdmin"),
  },
  data: () => ({
    showNuevoAdmin: false,
    users: [],
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "nombre",
      },
      { text: "Apellido paterno", value: "apellidoPaterno" },
      { text: "Apellido materno", value: "apellidoMaterno" },
      { text: "Correo", value: "correo" },
      { text: "Género", value: "genero" },
    ],
  }),
};
</script>

<style lang="scss" scoped>
</style>