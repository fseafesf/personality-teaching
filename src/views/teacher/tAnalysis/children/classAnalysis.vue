<template>
  <div class="class">
    <div class="left">
      <ul>
        <li v-for="cls in $store.state.tClass.classList" :key="cls.class_id">
          <router-link class="className" :to = "{
            name: 'classAnalysisDetail',
            query: {
              id: cls.class_id,
              className: cls.name
            }
          }"
          @click.native.prevent = "getClassId(cls.class_id)">
            {{ cls.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "classAnalysis",
  data() {
    return {
      keyword: ""
    }
  },
  mounted() {
    this.getClassInfoActions()
    // console.log(this.$route.query.id)
  },
  methods: {
    ...mapActions(['getClassInfoActions']),
    getClassId(val) {   // 获取班级id
      console.log("-------------",val)
    }
  },
};
</script>

<style lang="less" scoped>
.class {
  display: flex;
  width: 100%;
  margin-top: 10px;
  .left {
    width: 180px;
    min-height: calc(100vh - 120px);
    margin-right: 10px;
    border-radius: 10px;
    background-color: #fff;
    li {
      // width: 100%;
      border-radius: 4px;
      .className {
        display: inline-block;
        width: 160px;
        height: 100%;
        padding: 10px 0 10px 20px;
        color: #000;
      }
      .className.router-link-exact-active.router-link-active {
        background-color: rgb(207, 236, 247);
        border-radius: 4px;
      }
    }
    li:hover {
      background-color: rgb(233, 242, 244);
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