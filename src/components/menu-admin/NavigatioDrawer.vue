  <template>
  <v-navigation-drawer absolute app permanent right>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Jane Smith</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-folder-multiple</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Proyectos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
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
    </v-list>
  </v-navigation-drawer>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
</style>