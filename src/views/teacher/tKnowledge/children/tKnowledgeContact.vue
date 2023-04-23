<template>
  <div class="knowledge-contact">
    <div class="contact-content">
      <!-- 左边知识点树 -->
      <div class="contact-left">
        <tTree
          :show-checkbox="true"
          :operation="false"
          :defaultChecked="defaultChecked"
          @checkedClick="checkedClick"
        >
        </tTree>
      </div>

      <!-- 添加依赖 -->
      <div class="contact-middle">
        <el-button type="primary" @click="addConnetHandler">增加依赖</el-button>
      </div>

      <!-- 右边知识点树 -->
      <div class="contact-right">
        <tTree :operation="false" @nodeClick="nodeClick"></tTree>
      </div>

      <!-- 知识点信息展示 -->
      <div class="contact-result">
        <div
          class="default"
          v-if="!pointConnect.knowledge_connection_list?.length"
        >
          请勾选左边的知识点给中间的知识点添加依赖
        </div>
        <div class="connect" v-else>
          <div class="title">{{ pointConnect.info.name }}的前驱知识点</div>
          <div class="list">
            <div
              v-for="(item, index) in pointConnect.knowledge_connection_list"
              :key="item.id"
            >
              {{
                item.p_knp_id == ''
                  ? '请勾选左边的知识点给中间的知识点添加依赖'
                  : '· ' + item.p_name
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tTree from 'components/teacher/knowledge/tTree.vue'
import { getPointById, updatePointConnect } from '@/services'

export default {
  name: 'contact',
  data() {
    return {
      currentId: '', // 当前知识点id
      p_knp_id: '', // 知识点id
      pointDetail: {} // 知识点详情
    }
  },
  components: {
    tTree
  },
  methods: {
    // 点击知识点发请求知识点详情
    nodeClick(data) {
      if (data.id == this.currentId) return
      this.currentId = data.id
      getPointById(data.id).then((res) => {
        res ? (this.pointDetail = res.data) : ''
      })
    },

    // 勾选知识点
    checkedClick(data, checked) {
      this.p_knp_id = data
    },

    // 添加知识点
    addConnetHandler() {
      updatePointConnect(this.currentId, this.p_knp_id).then((res) => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        getPointById(this.currentId).then((res) => {
          res ? (this.pointDetail = res.data) : ''
        })
      })
    }
  },
  computed: {
    pointConnect: function () {
      return this.pointDetail
    },

    // 获取知识点详情中有联系的知识点 赋值给tTree组件勾选
    defaultChecked: function () {
      const checkedArr = []
      this.pointDetail.knowledge_connection_list?.forEach((item) => {
        checkedArr.push(item.p_knp_id)
      })
      return checkedArr
    }
  }
}
</script>

<style lang="less" scoped>
.knowledge-contact {
  margin-top: 10px;
  overflow: auto;

  .contact-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    min-height: 84vh;

    .contact-middle {
      margin: auto;
    }

    .contact-left,
    .contact-right,
    .contact-result {
      width: 350px;
      background: #fff;
      border-radius: 5px;
      margin-bottom: 20px;
    }

    .contact-result {
      box-sizing: border-box;
      padding: 10px;
      font-size: 18px;
      font-weight: 700;
      color: #4498ee;

      .list {
        font-size: 16px;
        color: var(--primary-color);
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
