<template>
  <div class="knowledge-contact">
    <div class="contact-content">
      <div class="contact-left">
        <Tree :show-checkbox="true" :operation="false" :defaultChecked="defaultChecked" @checkedClick="checkedClick">
        </Tree>
      </div>
      <div class="contact-middle">
        <el-button type="primary" @click="addConnetHandler">增加依赖</el-button>
      </div>
      <div class="contact-right">
        <Tree :operation="false" @nodeClick="nodeClick"></Tree>
      </div>
      <div class="contact-result">
        <div class="default" v-if="!pointConnect.knowledge_connection_list?.length">
          请勾选左边的知识点树给中间的知识点树中的知识点添加依赖
        </div>
        <div class="connect" v-else>
          <div class="title">
            {{ pointConnect.info.name }}
          </div>
          <div class="list">
            <div v-for="(item, index) in pointConnect.knowledge_connection_list" :key="item.id">
              {{ item.p_knp_id == '' ? '请勾选左边的知识点树给中间的知识点树中的知识点添加依赖' : item.p_knp_id }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import Tree from "components/teacher/knowledge/tree.vue";
import { getPointById, updatePointConnect } from "@/services";

export default {
  name: "contact",
  data() {
    return {
      currentId: '',
      p_knp_id: '',
      pointDetail: {}
    };
  },
  components: {
    Tree,
  },
  methods: {
    nodeClick(data) {
      if (data.id == this.currentId) return
      this.currentId = data.id
      getPointById(data.id).then(res => {
        res ? this.pointDetail = res.data : ''
      })
    },
    checkedClick(data, checked) {
      this.p_knp_id = data
    },
    addConnetHandler() {
      console.log('ok')
      updatePointConnect(this.currentId, this.p_knp_id).then(res => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        getPointById(this.currentId).then(res => {
          res ? this.pointDetail = res.data : ''
        })
      })
    }
  },
  computed: {
    pointConnect: function () {
      return this.pointDetail
    },
    defaultChecked: function () {
      const checkedArr = []
      this.pointDetail.knowledge_connection_list?.forEach(item => {
        checkedArr.push(item.p_knp_id)
      });
      return checkedArr
    }
  },
};
</script>

<style lang="less" scoped>
.knowledge-contact {
  margin-top: 10px;
  overflow: auto;

  .contact-content {
    display: flex;
    gap: 15px;
    justify-content: space-between;
    align-items: center;


    .contact-left,
    .contact-right,
    .contact-result {
      width: 350px;
      min-height: 84vh;
      background: #fff;
      border-radius: 5px;
    }

    .contact-result {
      box-sizing: border-box;
      padding: 10px;
      font-size: 18px;
      font-weight: 700;
      color: #4498EE;

      .list {
        color: #000;
        display: flex;
        flex-direction: column;

        div {
          margin: 10px 0 0 10px;
        }
      }
    }
  }
}
</style>