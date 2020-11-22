<template>
  <div class="home">
    <h1>This is Home</h1>
    <FolderTree v-bind:node="getRoot" @onClick="nodeWasClicked($event)" />
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
    nodeWasClicked(event) {
      console.log("nodeWasClicked() event = ", event);
    }
  }
};
</script>
