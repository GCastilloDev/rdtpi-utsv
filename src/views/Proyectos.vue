<template>
  <v-container>
    <h1>
      Proyectos <v-icon right color="green dark-1">mdi-folder-multiple</v-icon>
    </h1>
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
          @click="showNuevoProyecto = true"
        >
          Agregar proyecto</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="proyects"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <!-- <v-btn @click="editarUsuario(item)" icon color="blue">
              <v-icon> mdi-account-edit </v-icon>
            </v-btn> -->
            <v-btn @click="eliminarProyecto(item)" icon color="red">
              <v-icon> mdi-trash-can</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <nuevoProyecto
      v-if="showNuevoProyecto"
      :showNuevoProyecto="showNuevoProyecto"
      @cerrar="showNuevoProyecto = false"
      @proyectoCreado="usuarioCreado"
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
    this.getProyects();
  },
  components: {
    nuevoProyecto: () => import("../components/proyecto/nuevoProyecto"),
    editarAlumno: () => import("../components/alumno/editarAlumno"),
  },
  data: () => ({
    showEditarAlumno: false,
    showNuevoProyecto: false,
    search: "",
    proyects: [],
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "nombre",
      },
      { text: "Nivel", value: "nivel" },
      { text: "% avance", value: "avance" },
      { text: "Generación", value: "generacion" },
      { text: "Acciones", value: "actions" },
    ],
    data: {},
  }),
  methods: {
    usuarioCreado() {
      this.users = [];
      this.getUsersByRol("alumno");
      this.showNuevoProyecto = false;
      this.showEditarAlumno = false;
    },
    editarUsuario(usuario) {
      this.data = Object.assign({}, usuario);
      this.showEditarAlumno = true;
    },
    async eliminarProyecto(proyecto) {
      const response = confirm(
        `¿Seguro que desea eliminar el proyecto ${proyecto.nombre}? Esta acción no se podrá deshacer.`
      );

      try {
        if (response) {
          this.proyects = await [];
          await this.deleteProyect(proyecto);
          this.getProyects();
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