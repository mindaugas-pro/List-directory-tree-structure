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
      <span v-if="expanded" class="pointer" @click="createFolder()">&#43;</span>
    </div>
    <div v-if="expanded">
      <FolderTree
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
        @onClick="node => $emit('onClick', node)"
      />
      <!-- @onClick accepts parameter 'node' and propagates it up to the parent -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    ...mapGetters(["getRoot"]),
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
    draggableProps: {
      get() {
        return this.$store.getters.getdraggableProps;
      },
      set(value) {
        this.$store.commit("SET_DRAGGABLE_PROPS", value);
      }
    },
    draggableParent: {
      get() {
        return this.$store.getters.getDraggableParent;
      },
      set(value) {
        this.$store.commit("SET_DRAGGABLE_PARENT", value);
      }
    }
  },
  methods: {
    nodeClicked() {
      this.expanded = !this.expanded;
      this.$emit("onClick", this.node);
    },
    createFolder() {
      this.folderCount = this.folderCount + 1;
      let obj = {
        name: "folder " + this.folderCount,
        id: this.folderCount,
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
      if (droppable.node.id === this.draggableParent.node.id) {
        console.log("statement 1");
        return;
      } else if (droppable.node.id === this.draggable.node.id) {
        console.log("statement 2");
        return;
      } else if (
        droppable.node.id !== this.draggableParent.node.id &&
        droppable.depth === this.draggable.depth
      ) {
        console.log("statement 3");
        this.draggableParent.node.children.forEach((element, index) => {
          if (element.id === this.draggable.node.id) {
            droppable.node.children.push(this.draggable.node);
            this.draggableParent.node.children.splice(index, 1);
          }
        });
      } else {
        console.log("statement 4");
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
