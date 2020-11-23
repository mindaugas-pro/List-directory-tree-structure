<template>
  <div class="home">
    <h1>This is Home</h1>
    <FolderTree v-bind:node="getRoot" @onClick="nodeWasClicked($event)" />
    <!-- $event is second parameter passed to $emit() func -->
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
  },
  methods: {
    nodeWasClicked(node) {
      console.log("nodeWasClicked() node = ", node);
      // alert(node.name);
      // console.log(this.getRoot.children);
    }
  }
};
</script>

<style scoped>
.move {
  cursor: move;
}
</style>
