<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="d-flex justify-center">
        <v-img
          max-width="100px"
          src="https://lh3.googleusercontent.com/proxy/6BWz2dlKyW8lyleXVzmdVwFfyufp4ib1bpcc1cBnNTuHaJyTpK7ll1oCevvx6kDwtoEVNwD9A6Oz591bpBaA4KMpwe-FndMxyzTSSzaDp9lEO_TuCurmlLDmIKL93oBFJKhu3azBmO3_vYEEMA"
        ></v-img>
      </v-col>
      <v-col cols="6" class="d-flex align-center">
        <h1 class="text-center">
          REPOSITORIO DIGITAL DE PROYECTOS DE TI (RDPTI)
        </h1>
      </v-col>
      <v-col cols="3" class="d-flex justify-center">
        <v-img
          max-width="100px"
          src="https://scontent.fmtt1-1.fna.fbcdn.net/v/t1.0-9/10660158_598668003578525_2592562474524826770_n.png?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGiiBkUjso9xA_V6QzcmiKtSMIKByGwH_tIwgoHIbAf-3sTaFbQF-Xs1GQyBgzXdkWkzcFNQu1ysK5kZ9zlpt75&_nc_ohc=h6XKbCyS0kcAX8ndhkX&_nc_ht=scontent.fmtt1-1.fna&oh=0c2a1b9d8f3a3dbb83a71ad9b11a36a5&oe=5FEB9A0F"
        ></v-img>
      </v-col>
      <v-col cols="12" v-if="proyects.length <= 0" class="mt-10">
        <h2 class="text-center">No tenemos proyectos registrados <span style='font-size:30px;'>&#128549;</span></h2>
        <div class="d-flex justify-center">
          <v-img
            max-width="50vh"
            src="https://data.whicdn.com/images/306180132/original.png?t=1517115254"
          >
          </v-img>
        </div>
      </v-col>
      <v-col cols="12" v-if="proyects.length > 0">
        <h2>Proyectos:</h2>
      </v-col>

      <v-col cols="4" v-if="proyects.length > 0">
        <v-card v-for="proyect in proyects" :key="proyect.id">
          <v-img height="200" :src="proyect.imagenUrl"></v-img>
          <v-card-title>Cafe Badilico</v-card-title>
          <v-card-text>
            <div class="subtitle-1">{{ proyect.nivel }}</div>
            <div>
              <v-progress-linear
                :value="proyect.avance"
                height="25"
                color="deep-purple"
                dark
              >
                <strong>{{ Math.ceil(proyect.avance) }}%</strong>
              </v-progress-linear>
            </div>

            <div>
              <ul>
                <li v-for="student in proyect.integrantes" :key="student">
                  {{ nombreCompleto(student) }}
                </li>
              </ul>
            </div>
            <div>
              {{ proyect.descripcion }}
            </div>
            <div>
              <v-btn
                block
                dark
                color="green"
                @click="verDocumento(proyect.documentoUrl)"
                >Ver documentación</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { firebaseMixin } from "../mixins/RegistrosFirebase";

export default {
  name: "Home",
  mixins: [firebaseMixin],
  async mounted() {
    await this.getUsersByRol("alumno");
    await this.getProyects();
  },
  data: () => ({
    proyects: [],
    users: [],
  }),
  methods: {
    nombreCompleto(id) {
      let student = this.users.find((e) => e.id == id);
      return `${student.nombre} ${student.apellidoPaterno} ${student.apellidoMaterno}`;
    },
    verDocumento(url) {
      window.open(url);
    },
  },
};
</script>
