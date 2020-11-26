import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    root: {
      name: "/",
      id: 0,
      rootId: 0,
      children: [
        {
          name: "folder 1",
          id: 1,
          rootId: 1,
          children: [
            {
              name: "folder 2",
              id: 2,
              rootId: 1,
              children: []
            }
          ]
        },
        {
          name: "folder 3",
          id: 3,
          rootId: 2,
          children: [
            {
              name: "folder 4",
              id: 4,
              rootId: 2,
              children: []
            }
          ]
        }
      ]
    },
    folderCount: 4,
    rootId: 2,
    draggable: Object,
    draggableParent: Object
  },
  mutations: {
    SET_ROOT(state, value) {
      state.root = value;
    },
    SET_FOLDER_COUNT(state, value) {
      state.folderCount = value;
    },
    SET_DRAGGABLE(state, value) {
      state.draggable = value;
    },
    SET_DRAGGABLE_PARENT(state, value) {
      state.draggableParent = value;
    },
    SET_ROOT_ID(state, value) {
      state.rootId = value;
    }
  },
  getters: {
    getRoot: state => {
      return state.root;
    },
    getFolderCount: state => {
      return state.folderCount;
    },
    getDraggable: state => {
      return state.draggable;
    },
    getDraggableParent: state => {
      return state.draggableParent;
    },
    getRootId: state => {
      return state.rootId;
    }
  },
  actions: {},
  modules: {}
});
