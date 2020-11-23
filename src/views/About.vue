<template>
  <div class="about">
    <Tree :node="getRoot" @onClick="nodeWasClicked($event)" />
  </div>
</template>

<script>
import Tree from "@/components/Tree.vue";
import { mapGetters } from "vuex";
export default {
  components: { Tree },
  computed: {
    ...mapGetters(["getRoot"])
  },
  methods: {
    nodeWasClicked(event) {
      console.log("I was clicked = ", event);
    }
  }
};
</script>
