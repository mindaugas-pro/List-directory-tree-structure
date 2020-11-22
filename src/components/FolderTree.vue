<template>
  <div>
    <div class="node" :style="{ 'margin-left': `${depth * 20}px` }">
      <span v-if="hasChildren" class="type" @click="nodeClicked()">
        {{ expanded ? "&#9660;" : "&#9658;" }}
      </span>
      <span v-else @click="nodeClicked()">&#9671;</span>
      {{ nodeLocal.name }}
      <span class="pointer" @click="createFolder()">&#43;</span>
    </div>
    <div v-if="expanded">
      <FolderTree
        v-for="child in nodeLocal.children"
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
      expanded: false,
      nodeLocal: this.node,
      depthLocal: this.depth
    };
  },
  computed: {
    hasChildren() {
      return this.nodeLocal.children; // returns array if there is children, returns 'undefined' if there is no children
    },
    folderCount: {
      get() {
        return this.$store.getters.getFolderCount;
      },
      set(value) {
        this.$store.commit("SET_FOLDER_COUNT", value);
      }
    }
  },
  methods: {
    nodeClicked() {
      this.expanded = !this.expanded;
      if (this.hasChildren) {
        this.$emit("onClick", this.nodeLocal);
      }
    },
    createFolder() {
      if (this.nodeLocal.children) {
        console.log("this.nodeLocal.children = ", this.nodeLocal.children);
        this.folderCount = this.folderCount + 1;
        let obj = {
          name: "folder " + this.folderCount
        };
        this.nodeLocal.children.push(obj);
      } else {
        console.log("this.nodeLocal.children =", this.nodeLocal.children);
        this.folderCount = this.folderCount + 1;
        let folderName = "folder " + this.folderCount;
        this.nodeLocal = Object.assign({}, this.nodeLocal, {
          children: [{ name: folderName }]
        });
        this.expanded = !this.expanded;
      }
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
