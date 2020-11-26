<template>
  <div>
    <div
      class="node pointer"
      draggable="true"
      @dragstart="dragStart($props)"
      @dragover.prevent
      @drop.prevent="drop($props, node)"
      :style="{ 'margin-left': `${depth * 20}px` }"
    >
      <span class="type" @click="nodeClicked()">
        {{ expanded ? "&#9660;" : "&#9658;" }}
      </span>
      <span class="move">{{ node.name }}</span>
      <span v-if="expanded" class="pointer" @click="createFolder($props, node)"
        >&#43;</span
      >
    </div>
    <div v-if="expanded">
      <FolderTree
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
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
    folderCount: {
      get() {
        return this.$store.getters.getFolderCount;
      },
      set(value) {
        this.$store.commit("SET_FOLDER_COUNT", value);
      }
    },
    draggable: {
      get() {
        return this.$store.getters.getDraggable;
      },
      set(value) {
        this.$store.commit("SET_DRAGGABLE", value);
      }
    },
    draggableParent: {
      get() {
        return this.$store.getters.getDraggableParent;
      },
      set(value) {
        this.$store.commit("SET_DRAGGABLE_PARENT", value);
      }
    },
    rootId: {
      get() {
        return this.$store.getters.getRootId;
      },
      set(value) {
        this.$store.commit("SET_ROOT_ID", value);
      }
    }
  },
  methods: {
    nodeClicked() {
      this.expanded = !this.expanded;
    },
    createFolder(nodeProps, node) {
      if (nodeProps.depth === 0) {
        this.createRootFolder();
      } else {
        let rootId = node.rootId;
        this.createChildFolder(rootId);
      }
    },
    createRootFolder() {
      this.folderCount = this.folderCount + 1;
      this.rootId = this.rootId + 1;
      let obj = {
        name: "folder " + this.folderCount,
        id: this.folderCount,
        rootId: this.rootId,
        children: []
      };
      this.node.children.push(obj);
    },
    createChildFolder(rootId) {
      this.folderCount = this.folderCount + 1;
      let obj = {
        name: "folder " + this.folderCount,
        id: this.folderCount,
        rootId: rootId,
        children: []
      };
      this.node.children.push(obj);
    },
    dragStart(props) {
      this.draggable = props;
      this.draggableParent = this.$parent.$props;
    },
    drop(props) {
      let droppable = props;
      // prevent drag to the same folder level
      if (droppable.node.id === this.draggableParent.node.id) {
        window.alert(
          "Dragg to the same folder deep will achieve the same result."
        );
        return;
        // prevent drag to the same folder
      } else if (droppable.node.id === this.draggable.node.id) {
        window.alert("Drag to the same folder has no effect.");
        return;
        // prevent drag to the same folder, but deeper level
      } else if (
        this.draggable.depth < droppable.depth &&
        this.draggable.node.rootId === droppable.node.rootId
      ) {
        window.alert("Drag to the same folder, but deeper level is forbidden");
        return;
        // drag and drop
      } else {
        this.draggableParent.node.children.forEach((element, index) => {
          if (element.id === this.draggable.node.id) {
            droppable.node.children.push(this.draggable.node);
            this.draggableParent.node.children.splice(index, 1);
          }
        });
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
.move {
  cursor: move;
}
</style>
