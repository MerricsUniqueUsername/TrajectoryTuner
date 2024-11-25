<template>
  <div class="coin" :class="{taken : taken, deadly: deadly}" :style="{ left: computedX, bottom: computedY }">
    <div class="label">({{ x }}, {{ y }})</div>
  </div>
</template>

<script>
export default {
  name: "Coin",
  props: {
    gridSize: {
      type: Number,
      required: true,
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    taken: {
      type: Boolean,
      default: false
    },
    deadly: {
      type: Boolean,
      default: false
    }
  },
  inject: ['gridSize'],
  computed: {
    computedX() {
      return (this.x / this.gridSize * 100) + '%';
    },
    computedY() {
      return (this.y / this.gridSize * 100) + '%';
    }
  }
    
}
</script>

<style scoped>
  .label {
    position: absolute;
    width: 50px;
    text-align: center;
    color: white;
    background-color: rgba(168, 171, 174, 0.458);
    border-radius: 8px;
    font-size: 12px;
    padding: 3px;
    margin-top: 15px;
    opacity: 0;
    transition: 0.3s ease;
  }
  .coin {
    width: 3%;
    aspect-ratio: 1;
    background-color: yellow;
    border-radius: 50%;
    position: absolute;
    transform: translate(-50%, 50%);
    cursor: pointer;
  }
  .coin:hover > .label {
    opacity: 1;
    transition: 0.3s ease;
  }
  .deadly {
    background-color: red;
  }
  .taken {
    display: none;
  }
</style>