<template>
  <v-app>
    <navigationDrawer />
    <v-main>
      <appBar />
      <router-view />
    </v-main>
    <v-overlay :value="loading" z-index="999">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",

  components: {
    navigationDrawer: () => import("./components/menu-admin/NavigatioDrawer"),
    appBar: () => import("./components/menu-admin/AppBar"),
  },

  data: () => ({
    //
  }),
  computed: {
    ...mapState(["loading"]),
  },
};
</script>
