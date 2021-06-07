<template>
  <el-dialog
    :center="true"
    :loading="isLoading"
    :width="width"
    :visible.sync="show"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    @closed="$emit('dialogClose')"
    custom-class="base-dialog-container">
    <template #title>
      <base-text :content="title" class="el-dialog__title"></base-text>
    </template>
    <slot></slot>
    <template #footer>
      <slot name="dialogFooter"></slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    width: {
      type: String,
      default: () => {
        return document.body.clientWidth <= 1440 ? '40%' : '30%';
      }
    },
    title: {
      type: String,
      default: ''
    },
    nodeId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: false,
      isLoading: false
    };
  },
  methods: {
    loadingOpen() {
      this.isLoading = true;
    },
    loadingClose() {
      this.isLoading = false;
    }
  },
  watch: {
    nodeId(val) {
      this.show = !!val;
    }
  }
};
</script>
