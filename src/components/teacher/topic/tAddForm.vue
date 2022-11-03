<template>
  <div class="select">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="题干:">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>

      <template v-if="typeValue == 1 || typeValue == 2">
        <el-form-item label="选项:">
        </el-form-item>
        <el-form-item label="A">
          <el-input v-model="form.A"></el-input>
        </el-form-item>
        <el-form-item label="B">
          <el-input v-model="form.B"></el-input>
        </el-form-item>
        <el-form-item label="C">
          <el-input v-model="form.C"></el-input>
        </el-form-item>
        <el-form-item label="D">
          <el-input v-model="form.D"></el-input>
        </el-form-item>
      </template>

      <el-form-item label="答案解析:">
        <el-input type="textarea" v-model="form.analysis"></el-input>
      </el-form-item>

      <el-form-item label="知识点联系:" label-width="100px">
        <Tree class="tree" :operation="false" :show-checkbox="true" />
      </el-form-item>

      <el-form-item label="难度">
        <el-select v-model="form.difficultyValue" placeholder="难度">
          <el-option v-for="item in difficultyOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancelHandleClick">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tree from '../knowledge/tree.vue';

export default {
  components: { Tree },
  props: {
    typeValue: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      difficultyOptions: [{
        value: '1',
        label: '简单'
      },
      {
        value: '2',
        label: '中等'
      },
      {
        value: '3',
        label: '困难'
      }
      ],
      form: {
        content: '',
        A: '',
        B: '',
        C: '',
        D: '',
        analysis: '',
        difficultyValue: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      this.$router.push({ path: '/teacher/topic' })
    },
    cancelHandleClick() {
      this.$router.push({ path: '/teacher/topic' })
    }
  }
}
</script>

<style lang="less" scoped>
.select {

  .tree {
    width: 300px;
    border: 1px solid #fff;
  }
}
</style>