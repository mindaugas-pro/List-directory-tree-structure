<template>
  <div class="about">
    <Tree :node="getRoot" />
  </div>
</template>

<script>
import Tree from "@/components/Tree.vue";
import { mapGetters } from "vuex";
export default {
  components: { Tree },
  computed: {
    ...mapGetters(["getRoot"])
  }
};
</script>
