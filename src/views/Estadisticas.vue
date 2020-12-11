<template>
  <v-container>
    <h1>Estadisticas</h1>
    <v-row>
      <v-col cols="2">
        <v-card>
          <v-card-title class="d-flex justify-center">
            <v-icon x-large color="green dark-1">mdi-folder-multiple</v-icon>
          </v-card-title>
          <v-card-title class="d-flex justify-center"
            >Proyectos: {{ proyectos }}</v-card-title
          >
        </v-card>
      </v-col>

      <v-col cols="2">
        <v-card>
          <v-card-title class="d-flex justify-center">
            <v-icon x-large color="green dark-1">mdi-school</v-icon>
          </v-card-title>
          <v-card-title class="d-flex justify-center"
            >Alumnos: {{ alumnos }}</v-card-title
          >
        </v-card>
      </v-col>

      <v-col cols="2">
        <v-card>
          <v-card-title class="d-flex justify-center">
            <v-icon x-large color="green dark-1">mdi-teach</v-icon>
          </v-card-title>
          <v-card-title class="d-flex justify-center"
            >Maestros: {{ maestros }}</v-card-title
          >
        </v-card>
      </v-col>
      <v-col cols="12">
        <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "../common/Firebase";
import { GChart } from "vue-google-charts";
export default {
  name: "Estadisticas",
  async mounted() {
    await this.getProyects();
    await this.getUsers();
    const dataChart = [
      "Estadisticas",
      this.proyectos,
      this.alumnos,
      this.maestros,
    ];
    this.chartData.push(dataChart);
  },
  components: {
    GChart,
  },
  data: () => ({
    proyectos: 0,
    alumnos: 0,
    maestros: 0,
    chartData: [
      ["", "Proyectos", "Alumnos", "Maestros"],
      //   ["Estadisticas", 10, 10, 3],
    ],
    chartOptions: {
      chart: {
        title: "Company Performaassasnce",
        subtitle: "Sales, Expenses, and Profit: 2014-2017",
      },
    },
  }),
  methods: {
    async getUsers() {
      try {
        const users = await db.collection("users").get();
        users.forEach((e) => {
          if (e.data().rol == "alumno") this.alumnos++;
          if (e.data().rol == "docente") this.maestros++;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getProyects() {
      try {
        const proyects = await db.collection("proyects").get();
        this.proyectos = proyects.docs.length;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>