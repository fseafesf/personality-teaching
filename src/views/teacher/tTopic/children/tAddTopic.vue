<template>
  <div class="add-topic">
    <div class="topic-type">
      <div class="type">题型: </div>
      <el-select class="search-item" v-model="typeValue" placeholder="题型" size="small">
        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="add-content">
      <tAddForm :type-value="typeValue" />
    </div>
  </div>
</template>

<script >
import tAddForm from '@/components/teacher/topic/tAddForm.vue';

export default {
  components: { tAddForm },
  data() {
    return {
      typeOptions: [
        {
          value: '1',
          label: '单选题'
        },
        {
          value: '2',
          label: '多选题'
        },
        {
          value: '3',
          label: '判断题'
        },
        {
          value: '4',
          label: '填空题'
        },
        {
          value: '5',
          label: '简答题'
        }
      ],
      typeValue: '1'
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