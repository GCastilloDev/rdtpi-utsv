<template>
  <v-row justify="center">
    <v-dialog v-model="showNuevoAdmin" persistent max-width="800">
      <v-card>
        <v-card-title class="headline"> Agregar administrador </v-card-title>
        <v-card-text class="mt-3">
          <v-form ref="form" v-model="valid" lazy-validation>
            <pre>{{ dataAdmin }}</pre>
            <v-row>
              <v-col cols="12" class="ma-0 pt-0 pb-0"
                ><v-text-field
                  label="Nombre"
                  placeholder="Ingresa el nombre"
                  v-model="dataAdmin.nombre"
                  :rules="campoRequerido"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="ma-0 pt-0 pb-0"
                ><v-text-field
                  label="Apellido paterno"
                  placeholder="Ingresa el apellido paterno"
                  v-model="dataAdmin.apellidoPaterno"
                  :rules="campoRequerido"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="ma-0 pt-0 pb-0"
                ><v-text-field
                  label="Apellido materno"
                  placeholder="Ingresa el apellido materno"
                  v-model="dataAdmin.apellidoMaterno"
                  :rules="campoRequerido"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="ma-0 pt-0 pb-0"
                ><v-select
                  :items="genero"
                  label="Género"
                  placeholder="Selecciona el género"
                  v-model="dataAdmin.genero"
                  :rules="campoRequerido"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" class="ma-0 pt-0 pb-0"
                ><v-text-field
                  label="Correo"
                  placeholder="Ingresa el correo"
                  v-model="dataAdmin.correo"
                  :rules="emailRules"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="ma-0 pt-0 pb-0"
                ><v-text-field
                  label="Contraseña"
                  placeholder="Ingresa la contraseña"
                  v-model="dataAdmin.password"
                  type="password"
                  :rules="passwordRules"
                  outlined
                  dense
                ></v-text-field>
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
          <v-btn color="green darken-1" text @click="crearUsuario">
            Registrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { auth } from "../../common/Firebase";
import { validacionesMixin } from "../../mixins/Validaciones";
import { firebaseMixin } from "../../mixins/RegistrosFirebase";
import { mapActions } from "vuex";
export default {
  name: "nuevoAdmin",
  mixins: [validacionesMixin, firebaseMixin],
  props: {
    showNuevoAdmin: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    authError: false,
    messageError: "",
    genero: ["Mujer", "Hombre"],
    dataAdmin: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      genero: "",
      correo: "",
      password: "",
      rol: "admin",
    },
    uid: "",
  }),
  methods: {
    ...mapActions(["showLoading"]),
    cerrar() {
      this.$refs.form.reset();
      this.$emit("cerrar");
    },
    async crearUsuario() {
      if (!this.$refs.form.validate()) return;
      this.showLoading(true);
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          this.dataAdmin.correo,
          this.dataAdmin.password
        );
        this.uid = await user.uid;
        await this.registarUsuarioDB(this.uid, this.dataAdmin);
        this.$refs.form.reset();
        this.$emit("usuarioCreado");
      } catch (error) {
        this.authError = true;
        this.messageError = error.message;
        console.log(error.message);
      } finally {
        this.showLoading(false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>