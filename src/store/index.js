import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    root: {
      name: "/",
      children: [
        {
          name: "folder 1",
          children: [
            {
              name: "folder 2"
            }
          ]
        },
        {
          name: "folder 3",
          children: [
            {
              name: "folder 4"
            }
          ]
        }
      ]
    }
  },
  mutations: {
    SET_ROOT(state, value) {
      state.root = value;
    }
  },
  getters: {
    getRoot: state => {
      return state.root;
    }
  },
  actions: {},
  modules: {}
});
