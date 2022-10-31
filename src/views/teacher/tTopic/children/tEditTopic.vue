<template>
  <div class="edit-topic">
    <tEditForm />
  </div>
</template>

<script>
import tEditForm from '@/components/teacher/topic/tEditForm.vue';

export default {
  components: { tEditForm },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.edit-topic {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
}
</style>