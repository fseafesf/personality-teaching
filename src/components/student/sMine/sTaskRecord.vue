<template>
  <div class="task-record" :class="[{ finished: finished }]">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: 'taskRecord',
  data() {
    return {
      finished: false
    }
  },
  props: {
    problem: {
      type: Object,
      default: () => ({
        type: 5
      })
    }
  }
}
</script>

<style>
</style>