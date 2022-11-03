<template>
  <div class="select">
    <el-form ref="form" :model="editForm" label-width="80px">
      <el-form-item label="题型:">
        {{ editForm.type.label }}
      </el-form-item>

      <el-form-item label="题干:">
        <el-input type="textarea" v-model="editForm.content" :value="editForm.content"></el-input>
      </el-form-item>

      <template v-if="editForm.type.value == 1 || editForm.type.value == 2">
        <el-form-item label="选项:">
        </el-form-item>
        <el-form-item label="A">
          <el-input v-model="editForm.A"></el-input>
        </el-form-item>
        <el-form-item label="B">
          <el-input v-model="editForm.B"></el-input>
        </el-form-item>
        <el-form-item label="C">
          <el-input v-model="editForm.C"></el-input>
        </el-form-item>
        <el-form-item label="D">
          <el-input v-model="editForm.D"></el-input>
        </el-form-item>
      </template>

      <el-form-item label="答案解析:">
        <el-input type="textarea" v-model="editForm.analysis"></el-input>
      </el-form-item>
      <el-form-item label="知识点联系:" label-width="100px">
        <Tree :operation="false" :show-checkbox="true" />
      </el-form-item>
      <el-form-item label="难度">
        <el-select v-model="editForm.difficulty" placeholder="难度">
          <el-option v-for="item in difficultyOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
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
      // form: {
      //   type: '选择题',
      //   content: '',
      //   A: '',
      //   B: '',
      //   C: '',
      //   D: '',
      //   analysis: '',
      //   difficultyValue: ''
      // }
    }
  },
  computed: {
    editForm() {
      return this.$store.state.tTopic.currentTopicEditData
    }
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      this.$router.push({ path: '/teacher/topic' })
    },
    cancelHandleClick() {
      this.$router.push({ path: '/teacher/topic' })
    }
  }
}
</script>

<style lang="less" scoped>

</style>