<template>
  <div id="app">
    <h1>Folder Tree</h1>
    <FolderTree :node="getRoot" />
  </div>
</template>

<script>
// @ is an alias to /src
import FolderTree from "@/components/FolderTree.vue";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    FolderTree
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getRoot"])
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.move {
  cursor: move;
}
</style>
