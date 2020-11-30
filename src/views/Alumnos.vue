<template>
  <v-container>
    <h1>Alumnos <v-icon right color="green dark-1">mdi-school</v-icon></h1>
    <v-row>
      <v-col cols="8">
        <v-text-field
          outlined
          dense
          color="green"
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="4" class="pb-0 mt-1">
        <v-btn
          depressed
          color="green"
          dark
          block
          @click="showNuevoAlumno = true"
        >
          Agregar alumno</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn @click="editarUsuario(item)" icon color="blue">
              <v-icon> mdi-account-edit </v-icon>
            </v-btn>
            <v-btn @click="eliminarUsuario(item)" icon color="red">
              <v-icon> mdi-trash-can</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <nuevoAlumno
      v-if="showNuevoAlumno"
      :showNuevoAlumno="showNuevoAlumno"
      @cerrar="showNuevoAlumno = false"
      @usuarioCreado="usuarioCreado"
    />

    <editarAlumno
      v-if="showEditarAlumno"
      :showEditarAlumno="showEditarAlumno"
      :data="data"
      @cerrar="showEditarAlumno = false"
      @usuarioActualizado="usuarioCreado"
    />
  </v-container>
</template>

<script>
import { firebaseMixin } from "../mixins/RegistrosFirebase";
export default {
  name: "Docentes",
  mixins: [firebaseMixin],
  mounted() {
    this.getUsersByRol("alumno");
  },
  components: {
    nuevoAlumno: () => import("../components/alumno/nuevoAlumno"),
    editarAlumno: () => import("../components/alumno/editarAlumno"),
  },
  data: () => ({
    showEditarAlumno: false,
    showNuevoAlumno: false,
    search: "",
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
      { text: "Edad", value: "edad" },
      { text: "Género", value: "genero" },
      { text: "Correo", value: "correo" },
      { text: "Matrícula", value: "matricula" },
      { text: "Grado", value: "gradoAcademico" },
      { text: "Grupo", value: "grupo" },
      { text: "Generación", value: "generacion" },
      { text: "Acciones", value: "actions" },
    ],
    data: {},
  }),
  methods: {
    usuarioCreado() {
      this.users = [];
      this.getUsersByRol("alumno");
      this.showNuevoAlumno = false;
      this.showEditarAlumno = false;
    },
    editarUsuario(usuario) {
      this.data = Object.assign({}, usuario);
      this.showEditarAlumno = true;
    },
    async eliminarUsuario(usuario) {
      const response = confirm(
        `¿Seguro que desea eliminar a ${usuario.nombre}? Esta acción no se podrá deshacer.`
      );

      try {
        if (response) {
          console.log("HOLAAA");
          this.users = await [];
          console.log("Eliminare");
          await this.deleteUserWhitEmailPassword(usuario);
          console.log("paseee");
          this.getUsersByRol("alumno");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>