import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: '',
    loading: false,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    showLoading({ commit }, payload) {
      commit('SET_LOADING', payload);
    },
  },
  modules: {},
});
