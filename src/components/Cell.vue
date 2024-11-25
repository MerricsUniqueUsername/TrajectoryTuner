<template>
  <div class="cell">
  </div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

  .cell {
    display: flex;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    border: rgba(226, 226, 226, 0.322) solid 0.33px;
  }

</style>