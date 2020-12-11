  <template>
  <v-navigation-drawer absolute app temporary right v-model="show">
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img
            src="https://scontent.fmtt1-1.fna.fbcdn.net/v/t1.0-9/10660158_598668003578525_2592562474524826770_n.png?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGiiBkUjso9xA_V6QzcmiKtSMIKByGwH_tIwgoHIbAf-3sTaFbQF-Xs1GQyBgzXdkWkzcFNQu1ysK5kZ9zlpt75&_nc_ohc=h6XKbCyS0kcAX8ndhkX&_nc_ht=scontent.fmtt1-1.fna&oh=0c2a1b9d8f3a3dbb83a71ad9b11a36a5&oe=5FEB9A0F"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user }}</v-list-item-title>
          <v-list-item-subtitle>Bienvenido</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item link :to="{ name: 'Home' }">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Proyectos' }">
        <v-list-item-icon>
          <v-icon>mdi-folder-multiple</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Proyectos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Alumnos' }">
        <v-list-item-icon>
          <v-icon>mdi-school</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Alumnos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Docentes' }">
        <v-list-item-icon>
          <v-icon>mdi-teach</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Docentes</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Admin' }">
        <v-list-item-icon>
          <v-icon>mdi-ninja</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Administrador</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Estadisticas' }">
        <v-list-item-icon>
          <v-icon>mdi-chart-timeline-variant</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Estadisticas</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="cerrarSesion">
        <v-list-item-icon>
          <v-icon>mdi-account-off</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    items: [
      { title: "Inicio", icon: "mdi-home-city" },
      { title: "Proyectos", icon: "mdi-account" },
      { title: "Alumno", icon: "mdi-account-group-outline" },
      { title: "Docente", icon: "mdi-account-group-outline" },
      { title: "Administrador", icon: "mdi-account-group-outline" },
    ],
  }),
  methods: {
    cerrarSesion() {
      sessionStorage.clear();
      this.$store.state.sesionActiva = false;
      this.$store.state.isOpen = false;
      this.$store.state.user = "";
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(["isOpen", "user"]),
    show: {
      get() {
        return this.isOpen;
      },
      set(val) {
        this.$store.state.isOpen = val;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>