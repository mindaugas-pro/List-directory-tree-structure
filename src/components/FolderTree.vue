<template>
  <div>
    <div class="node" :style="{ 'margin-left': `${depth * 20}px` }">
      <span v-if="hasChildren" class="type" @click="nodeClicked()">
        {{ expanded ? "&#9660;" : "&#9658;" }}
      </span>
      <span v-else @click="nodeClicked()">&#9671;</span>
      {{ node.name }}
      <span class="pointer" @click="createFolder()">&#43;</span>
    </div>
    <div v-if="expanded">
      <FolderTree
        v-for="child in node.children"
        :key="child.name"
        :node="child"
        :depth="depth + 1"
        @onClick="$emit('onClick', $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FolderTree",
  props: {
    node: Object,
    depth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    hasChildren() {
      return this.node.children; // returns array if there is children, returns 'undefined' if there is no children
    }
  },
  methods: {
    nodeClicked() {
      console.log("this.node = ", this.node);
      this.expanded = !this.expanded;
      if (this.hasChildren) {
        console.log("nodeClicked()");
        this.$emit("onClick", this.node);
      }
    },
    createFolder() {
      if (this.node.children) {
        let obj = {
          name: "folder 5"
        };
        this.node.children.push(obj);
      } else {
        console.log(this.node);
        // let obj = this.node;
        // obj.children = [{ name: "folder" }];
        // this.$set((this.node = obj));
        // this.$set((this.node.children = [{ name: "folder" }]));
        // this.expanded = !this.expanded;
        this.node = Object.assign({}, this.node, {
          children: [{ name: "folder" }]
        });
      }
    }
  },
  watch: {
    name() {
      return name;
    }
  }
};
</script>

<style scoped>
.node {
  text-align: left;
}
.pointer {
  cursor: pointer;
}
</style>
