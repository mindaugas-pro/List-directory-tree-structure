<template>
  <div>
    <div class="node" :style="{ 'margin-left': `${depth * 20}px` }">
      <span class="type" @click="nodeClicked()">
        {{ expanded ? "&#9660;" : "&#9658;" }}
      </span>
      {{ node.name }}
      <span v-if="expanded" class="pointer" @click="createFolder()">&#43;</span>
    </div>
    <div v-if="expanded">
      <FolderTree
        v-for="child in node.children"
        :key="child.name"
        :node="child"
        :depth="depth + 1"
        @onClick="node => $emit('onClick', node)"
      />
      <!-- @onClick accepts parameter 'node' and propagates it up to the parent -->
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
      // nodeLocal: this.node,
      // depthLocal: this.depth
    };
  },
  computed: {
    hasChildren() {
      return this.node.children; // returns array if there is children, returns 'undefined' if there is no children
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
      if (!this.hasChildren) {
        console.log("func nodeClicked, this.node = ", this.node);
        this.$emit("onClick", this.node);
      }
    },
    createFolder() {
      this.folderCount = this.folderCount + 1;
      let obj = {
        name: "folder " + this.folderCount,
        children: []
      };
      this.node.children.push(obj);
    },
    createFolder2() {
      if (this.node.children) {
        console.log("if statement)");
        console.log("this.node.children = ", this.node.children);
        this.folderCount = this.folderCount + 1;
        let obj = {
          name: "folder " + this.folderCount,
          children: []
        };
        this.node.children.push(obj);
      } else {
        console.log("else statement");
        console.log("this.node =", this.node);
        console.log("this.expanded = ", this.expanded);
        this.folderCount = this.folderCount + 1;
        let folderName = "folder " + this.folderCount;
        this.node.children = [];
        let obj = {
          name: folderName
        };
        this.node.children.push(obj);
        // this.expanded = true;
        // this.node = Object.assign({}, this.node, {
        //   children: [{ name: folderName }]
        // });
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
