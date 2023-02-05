<template>
  <div class="top-bar">
    <template v-for="(item, index) in navBarData">
      <div class="title" @click="itemClick(index)">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    navBarData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
/*  给他router-link添加active router-link-active  */
.router-link-active {
  border-bottom: 3px solid #4498ee;
}

.top-bar {
  height: 46px;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #fff;
  font-size: 16px;
  font-weight: 500;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  .title {
    padding: 2px 0;

    a {
      color: #000 !important;
    }

    &:hover {
      border-bottom: 3px solid #4498ee;
    }
  }
}
</style>
