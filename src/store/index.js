import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    root: {
      name: "/",
      id: 0,
      children: [
        {
          name: "folder 1",
          id: 1,
          children: [
            {
              name: "folder 2",
              id: 2,
              children: []
            }
          ]
        },
        {
          name: "folder 3",
          id: 3,
          children: [
            {
              name: "folder 4",
              id: 4,
              children: []
            }
          ]
        }
      ]
    },
    node: Object,
    nodeLocal: Object,
    folderCount: 4
  },
  mutations: {
    SET_ROOT(state, value) {
      state.root = value;
    },
    SET_NODE(state, value) {
      state.node = value;
    },
    SET_FOLDER_COUNT(state, value) {
      state.folderCount = value;
    },
    SET_NODE_LOCAL(state, value) {
      state.nodeLocal = value;
    }
  },
  getters: {
    getRoot: state => {
      return state.root;
    },
    getNode: state => {
      return state.node;
    },
    getFolderCount: state => {
      return state.folderCount;
    },
    getNodeLocal: state => {
      return state.nodeLocal;
    }
  },
  actions: {},
  modules: {}
});
