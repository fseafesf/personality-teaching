<template>
  <div class="input-title-container" @click="this.changeFocus">
    <div className="input-title-value " v-show="focus">{{ this.editTitle }}</div>
    <i v-show="focus" class="el-icon-edit"></i>
    <div v-show="!focus">
      <input
        ref="inputRef"
        type="text"
        v-model="value"
        maxlength="30"
        @change="this.change"
        @blur="this.blur"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "tEditComment",
  data() {
    return {
      focus: true,
      value: "",
     
    };
  },
  methods: {
    changeFocus() {
      this.focus = false;
      this.$nextTick(() => {
        this.$refs.inputRef.focus();
      });
    },
    change() {},
    blur() {
      this.focus = true;
      if (this.value.trim() !== "") {
        this.$emit('update:editTitle',this.value)
      }
    },
  },
  props: {
    editTitle: {
      type: String,
      default: () => "",
    },
  },
};
</script>

<style lang="less" scoped>
.input-title-container {
  display: flex;
  justify-content: space-between;
  color: #3d4757;
  input {
    outline: none;
    width: 100%;
    border: none;
    letter-spacing: 0;
    font-size: 20px !important;
    padding: 0;
    box-sizing: border-box;
    background-color: initial;
    font-weight: 400;
    color: #3d4757;
  }

  .input-title-value {
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    margin: 0;
  }
  input,
  .input-title-value {
    font-size: 20px !important;
    font-weight: 700;
    line-height: 26px;
  }
  .el-icon-edit {
    line-height: 50px; 
    color: #5198e0;
    font-size: 18px; 
  }
}
</style>