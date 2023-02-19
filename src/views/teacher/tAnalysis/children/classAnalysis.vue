<template>
  <div class="class">
    <div class="left">
      <el-dropdown>
        <span class="el-dropdown-link">
          选择班级<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="menu">
          <el-dropdown-item v-for="cls in classList" :key="cls.class_id">
            <router-link class="className" :to = "{
              name: 'classAnalysisDetail',
              query: {
                id: cls.class_id,
                className: cls.name
              }
            }"
            @click.native.prevent = "getClassId(cls.class_id)" style="color: #000">
              {{ cls.name }}
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="pointTree">
        <tTree
          :show-checkbox="true"
          :operation="false"
          @checkEvent = "checkEvent"
          :check-strictly = "true"
          v-if="$route.query.id"
        >
        </tTree>
      </div>
    </div>

    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import tTree from 'components/teacher/knowledge/tTree.vue'
import { getClassAPI } from '@/services/modules/teacher/tClass.js'
import { mapActions } from "vuex";
export default {
  name: "classAnalysis",
  data() {
    return {
      keyword: "",
      selected: "",
      getClassPage: {
        page_num: 1,
        page_size: 50
      },
      classList: [], // 存放班级列表
      getStudentPage: {
        page_num: 1,
        page_size: 200
      }
    }
  },
  components: { tTree },
  mounted() {
    this.getClassListFn()
    // console.log(this.$route.query.id)
  },
  methods: {
    ...mapActions(['getClassInfoActions']),
    getClassId(val) {   // 获取班级id
      this.class_id = val
    },
    // 获取已选中的节点数据
    checkEvent(data, b) {
      this.$store.state.tAnalysis.checkedPoints = b.checkedNodes
    },
    // 请求班级列表
    async getClassListFn() {
      const res = await getClassAPI(this.getClassPage)
      this.classList = res.data
    },
  },
};
</script>

<style lang="less" scoped>
.class {
  display: flex;
  width: 100%;
  margin-top: 10px;
  .left {
    width: 300px;
    min-height: calc(100vh - 120px);
    margin-right: 10px;
    padding: 10px 0 0 10px;
    border-radius: 10px;
    background-color: #fff;
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
      font-size: 16px;
    }
    .pointTree {
      margin-top: 20px;
    }
 
  }
  .right {
    flex: 1;
    padding-left: 10px;
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>