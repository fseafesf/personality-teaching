<template>
  <div class="edit">
    <el-form
      ref="form"
      :model="pointDetail"
      :rules="rules"
      label-width="100px"
      v-if="pointDetail"
    >
      <el-form-item label="知识点名称:" prop="name">
        <el-input v-model="pointDetail.name"></el-input>
      </el-form-item>

      <el-form-item label="难度" prop="level">
        <el-select
          placeholder="难度"
          v-model="pointDetail.level"
          :value="questionLevel(pointDetail?.level)"
        >
          <el-option
            v-for="item in levelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="知识点内容:"
        prop="context"
        v-if="pointDetail?.context"
      >
        <!-- 富文本编辑器 -->
        <PtEditor v-model="pointDetail.context" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="cancelHandleClick">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { questionLevel } from '@/utils/questLevel'
import { updatePoint } from '@/services'
import { HTMLDecode } from '@/utils/htmlUtil'
import PtEditor from '@/components/common/PtEditor.vue'

export default {
  components: { PtEditor },
  data() {
    return {
      questionLevel,
      HTMLDecode, // 将结果加密的HTML标签内容解密展示的方法
      levelOptions: this.$store.state.levelOptions,
      form: undefined,
      rules: {
        name: [
          { required: true, max: 30, message: '请输入30字以内的知识点名称' }
        ],
        context: [{ required: true, message: '请输入知识点内容' }],
        level: [{ required: true, message: '请选择难度' }]
      }
    }
  },
  mounted() {
    this.$store.dispatch('PointByIdActive', this.$route.params.id)
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const { knp_id, parent_knp_id, level, name, context, create_user } =
            this.pointDetail

          // 发请求更新
          updatePoint(
            knp_id,
            parent_knp_id,
            level,
            name,
            context,
            create_user
          ).then((res) => {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.$router.push({ path: '/teacher/knowledge/tree' })
            this.$store.dispatch('PointByIdActive', knp_id)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancelHandleClick() {
      this.$router.push({ path: '/teacher/knowledge/tree' })
    }
  },
  computed: {
    pointDetail: function () {
      // context是经过HTMLEncode加密过的 需要通过HTMLDecode解密
      const form = {
        ...this.$store.state.tKnowledge.pointDetail.info,
        context: HTMLDecode(
          this.$store.state.tKnowledge.pointDetail.info?.context
        )
      }
      this.form = form

      return form
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
}
</style>
