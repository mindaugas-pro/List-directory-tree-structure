<template>
  <div>
    <h1>{{ this.node.name }}</h1>
    <Tree v-for="child in node.children" :key="child.name" :node="child">
      {{ child.name }}
    </Tree>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Tree",
  props: {
    node: Object
  },
  data() {
    return {
      // node: Object
    };
  },
  computed: {
    root: {
      get() {
        return this.$store.getters.getRoot;
      }
    },
    // node: {
    //   get() {
    //     return this.$store.getters.getNode;
    //   },
    //   set(value) {
    //     this.$store.commit("SET_NODE", value);
    //   }
    // },
    ...mapGetters(["getRoot"])
  }
};
</script>

<style lang="scss" scoped></style>
