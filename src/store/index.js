import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: sessionStorage.usuario
      ? JSON.parse(sessionStorage.usuario).nombre
      : '',
    loading: false,
    sesionActiva: sessionStorage.usuario ? true : false,
    isOpen: false,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_SESION(state, payload) {
      state.sesionActiva = payload;
    },
  },
  actions: {
    showLoading({ commit }, payload) {
      commit('SET_LOADING', payload);
    },
  },
  modules: {},
});
