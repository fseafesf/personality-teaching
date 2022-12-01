<template>
  <div class="home">
    <div class="personal">
      <div class="info">
        <div>姓名：xxx</div>
        <div>学号：xxx</div>
      </div>
      <div class="avatar">
        <el-avatar :size="100" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
      </div>
    </div>
    <div class="class-wrapper">
      <div class="title">我的班级</div>
      <div class="class-item">
        <template v-for="(item, index) in 5">
          <sClassItem @click.native="handlerClick" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import sClassItem from '@/components/student/sMine/sClassItem'

export default {
  name: "sMine",
  components: { sClassItem },
  mounted() {
  },
  methods: {
    handlerClick() {
      this.$router.push('/student/class')
    },
  }
}

</script>

<style lang="less" scoped>
.home {
  margin-top: 10px;

  .personal {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    justify-content: space-between;

    .info {
      font-size: 18px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  .class-wrapper {
    margin-top: 10px;
    background: #fff;
    border-radius: 5px;
    padding: 20px;
    min-height: 68vh;

    .title {
      font-size: 20px;
      font-weight: 700;
      color: #4498EE;
    }

    .class-item {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
  }
}
</style>