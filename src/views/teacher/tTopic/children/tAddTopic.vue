<template>
  <div class="add-topic">
    <div class="add-content">
      <tAddForm />
    </div>
  </div>
</template>

<script >
import tAddForm from '@/components/teacher/topic/tAddForm.vue';

export default {
  components: { tAddForm },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.add-topic {
  .topic-type {
    height: 46px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px;

    .type {
      margin-left: 20px;
    }

    .el-select {
      width: 100px;
    }
  }

  .add-content {
    margin-top: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
  }
}
</style>