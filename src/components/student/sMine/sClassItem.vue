<template>
  <div class="class bs">
    <div class="class-cover">
      <div class="class-name">数据结构</div>
    </div>
    <div class="class-info">
      <div class="class-teacher">
        教师
      </div>
      <div class="default-calss">
        班级: 默认班级
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="less" scoped>
.class {
  margin-top: 20px;
  box-sizing: border-box;
  width: 280px;
  padding: 10px;
  border-radius: 5px;

  .class-cover {
    background-color: #4498EE;
    height: 100px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .class-name {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }
  }

  .class-info {
    div {
      margin: 10px;
    }
  }

  &:hover {
    -webkit-box-shadow: 0 0 5px #4498EE;
    cursor: pointer;
  }
}
</style>