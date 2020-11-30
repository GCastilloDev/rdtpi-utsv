<template>
  <v-row justify="center">
    <v-dialog v-model="showNuevoProyecto" persistent max-width="800">
      <v-card>
        <v-card-title class="headline"> Agregar proyecto </v-card-title>
        <v-card-text class="mt-3">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" class="ma-0 pt-0 pb-0"
                ><v-text-field
                  label="Nombre"
                  placeholder="Ingresa el nombre del proyecto"
                  v-model="data.nombre"
                  :rules="campoRequerido"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="data.integrantes"
                  :items="users"
                  color="green"
                  item-value="id"
                  item-color="green"
                  item-text="nombre"
                  outlined
                  dense
                  chips
                  small-chips
                  deletable-chips
                  label="Integrantes"
                  multiple
                  :rules="integrantesRules"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" class="ma-0 pt-0 pb-0"
                ><v-select
                  :items="nivel"
                  label="Nivel"
                  placeholder="Selecciona el nivel"
                  v-model="data.nivel"
                  :rules="campoRequerido"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-slider
                  v-model="data.avance"
                  label="Porcentaje de avance"
                  color="green"
                  track-color="grey"
                  persistent-hint
                  thumb-label="always"
                ></v-slider>
              </v-col>
              <v-col cols="12" class="ma-0 pt-0 pb-0"
                ><v-text-field
                  label="Generación"
                  placeholder="Ingresa la generación"
                  v-model="data.generacion"
                  :rules="campoRequerido"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="ma-0 pt-0 pb-0"
                ><v-text-field
                  label="Fecha de registro del proyecto"
                  placeholder="Ingresa la generación"
                  v-model="data.fechaRegistroProyecto"
                  disabled
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="ma-0 pt-0 pb-0"
                ><v-textarea
                  label="Descripción del proyecto"
                  placeholder="Ingresa la descripción del proyecto"
                  v-model="data.descripcion"
                  :rules="campoRequerido"
                  outlined
                  dense
                ></v-textarea>
              </v-col>
              <v-col cols="6">
                <v-file-input
                  label="File input"
                  v-model="pdfFile"
                  outlined
                  dense
                  accept="application/pdf"
                ></v-file-input>
              </v-col>
              <v-col cols="6">
                <v-btn
                  class="mb-5"
                  block
                  color="purple darken-4"
                  dark
                  @click="$refs.boton.click()"
                >
                  <v-icon left>mdi-image-outline</v-icon>Adjuntar foto del
                  proyecto
                </v-btn>

                <input
                  type="file"
                  accept="image/*"
                  ref="boton"
                  @change="processImage($event)"
                  class="d-none"
                  multiple
                />
              </v-col>
              <v-col cols="12">
                <v-img v-if="image != ''" :src="image"></v-img>
              </v-col>
            </v-row>
          </v-form>
          <v-row justify="center" v-if="authError">
            <v-alert outlined color="red">
              <div>{{ messageError }}</div>
            </v-alert>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cerrar"> Cancelar </v-btn>
          <v-btn color="green darken-1" text @click="crearProyecto">
            Registrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { storage, db } from "../../common/Firebase";
import { validacionesMixin } from "../../mixins/Validaciones";
import { firebaseMixin } from "../../mixins/RegistrosFirebase";
import { mapActions } from "vuex";
export default {
  name: "nuevoProyecto",
  mixins: [validacionesMixin, firebaseMixin],
  props: {
    showNuevoProyecto: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    this.getStudents();
    this.data.fechaRegistroProyecto = new Date();
  },
  data: () => ({
    authError: false,
    messageError: "",
    nivel: ["Tecnico Superior Universitario", "INGENIERIA"],
    data: {
      nombre: "",
      integrantes: [],
      nivel: "",
      avance: "",
      generacion: "",
      fechaRegistroProyecto: "",
      descripcion: "",
      documentoUrl: "",
      documentoRuta: "",
      imagenUrl: "",
      imagenRuta: "",
    },
    uid: "",
    pdfFile: [],
    imageFile: "",
    image: "",
    users: [],
  }),
  methods: {
    ...mapActions(["showLoading"]),
    cerrar() {
      this.$refs.form.reset();
      this.$emit("cerrar");
    },
    async crearProyecto() {
      if (!this.$refs.form.validate()) return;
      this.showLoading(true);
      try {
        await this.subirPDF();
        await this.subirImagen();
        await this.subirDatos();
        this.$refs.form.reset();
        this.$emit("proyectoCreado");
      } catch (error) {
        this.authError = true;
        this.messageError = error.message;
        console.log(error.message);
      } finally {
        this.showLoading(false);
      }
    },
    async subirPDF() {
      try {
        let name = this.pdfFile.name.split(".")[0] + new Date();
        let extension = this.pdfFile.name.split(".")[1];
        let route = `pdf/${name}.${extension}`;
        const upload = await storage.child(route).put(this.pdfFile);
        const url = await upload.ref.getDownloadURL();
        this.data.documentoUrl = url;
        this.data.documentoRuta = route;
      } catch (error) {
        console.log(error);
      }
    },
    async subirDatos() {
      try {
        await db.collection("proyects").add(this.data);
      } catch (error) {
        console.log(error);
      }
    },
    async subirImagen() {
      try {
        let name = this.imageFile.name.split(".")[0] + new Date();
        let extension = this.imageFile.name.split(".")[1];
        let route = `image/${name}.${extension}`;
        const upload = await storage.child(route).put(this.imageFile);
        const url = await upload.ref.getDownloadURL();
        this.data.imagenRuta = route;
        this.data.imagenUrl = url;
      } catch (error) {
        console.log(error);
      }
    },
    processImage(e) {
      this.imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.imageFile);
      reader.onload = async (e) => {
        this.image = await e.target.result;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>