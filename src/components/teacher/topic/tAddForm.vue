<template>
  <div class="add">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="题型: " prop="type">
        <div class="topic-type">
          <el-select class="search-item" v-model="form.type" placeholder="题型" @change="typeChangeHandler">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-form-item>

      <el-form-item label="题目名称:" prop="question_name">
        <el-input v-model="form.question_name"></el-input>
      </el-form-item>

      <el-form-item label="题干:" prop="context">
        <el-input type="textarea" :rows="4" v-model="form.context"></el-input>
      </el-form-item>

      <template v-if="form.type == 1 || form.type == 2">
        <el-form-item label="选项:">
        </el-form-item>
        <el-form-item label="A" prop="question_option_list[0].Context" :rules="[
          { required: true, message: '选项不能为空' },
        ]">
          <el-input v-model="form.question_option_list[0].Context"></el-input>
        </el-form-item>
        <el-form-item label="B" prop="question_option_list[1].Context" :rules="[
          { required: true, message: '选项不能为空' },
        ]">
          <el-input v-model="form.question_option_list[1].Context"></el-input>
        </el-form-item>
        <el-form-item label="C" prop="question_option_list[2].Context" :rules="[
          { required: true, message: '选项不能为空' },
        ]">
          <el-input v-model="form.question_option_list[2].Context"></el-input>
        </el-form-item>
        <el-form-item label="D" prop="question_option_list[3].Context" :rules="[
          { required: true, message: '选项不能为空' },
        ]">
          <el-input v-model="form.question_option_list[3].Context"></el-input>
        </el-form-item>
      </template>

      <el-form-item label="答案解析:" prop="answer">
        <el-input type="textarea" :rows="4" v-model="form.answer"></el-input>
      </el-form-item>

      <el-form-item label="知识点联系:">
        <Tree class="tree" @checkedClick="checkedClick" :operation="false" :show-checkbox="true" />
      </el-form-item>

      <el-form-item label="难度" prop="level">
        <el-select v-model="form.level" placeholder="难度">
          <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
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
  data() {
    return {
      typeOptions: this.$store.state.typeOptions,
      levelOptions: this.$store.state.levelOptions,

      form: {
        question_name: '',
        type: 1,
        level: '',
        create_user: '',
        question_option_list: [
          { Context: '' },
          { Context: '' },
          { Context: '' },
          { Context: '' },
        ],
        answer: '',
        context: '',
        knp_id: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择难度' },
        ],
        question_name: [
          { required: true, message: '请输入题目名称' },
        ],
        context: [
          { required: true, message: '请输入题目内容' },
        ],
        answer: [
          { required: true, message: '请输入答案解析' },
        ],
        level: [
          { required: true, message: '请选择难度' },
        ],
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('QuestionAddActive', this.form).then(res => {
            this.$message({
              type: 'success',
              message: '创建成功!'
            });
            this.$router.push({ path: '/teacher/topic' })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    cancelHandleClick() {
      this.$router.push({ path: '/teacher/topic' })
    },
    checkedClick(data, checked) {
      this.form.knp_id = data
    },
    typeChangeHandler() {
      this.$refs['form'].clearValidate();
    }
  }
}
</script>

<style lang="less" scoped>
.add {
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

  .tree {
    // width: 300px;
    border: 1px solid #fff;
  }
}
</style>