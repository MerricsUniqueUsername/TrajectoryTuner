<template>

  <!-- Game -->
  <div class="game">

    <!-- Graph -->
    <Graph ref="graph" />

    <!-- Input -->
    <div class="type">
      <div style="font-size: 24px">f(x) = </div>
      <MathLive ref="input" @input="updateStart()" />  
      <!-- <input autocomplete="off" type="text" @input="updateStart()" v-model="expression"> -->

      <!-- Launch button -->
      <div class="launch" @click="launch()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-rocket" viewBox="0 0 16 16">
          <path d="M8 8c.828 0 1.5-.895 1.5-2S8.828 4 8 4s-1.5.895-1.5 2S7.172 8 8 8"/>
          <path d="M11.953 8.81c-.195-3.388-.968-5.507-1.777-6.819C9.707 1.233 9.23.751 8.857.454a3.5 3.5 0 0 0-.463-.315A2 2 0 0 0 8.25.064.55.55 0 0 0 8 0a.55.55 0 0 0-.266.073 2 2 0 0 0-.142.08 4 4 0 0 0-.459.33c-.37.308-.844.803-1.31 1.57-.805 1.322-1.577 3.433-1.774 6.756l-1.497 1.826-.004.005A2.5 2.5 0 0 0 2 12.202V15.5a.5.5 0 0 0 .9.3l1.125-1.5c.166-.222.42-.4.752-.57.214-.108.414-.192.625-.281l.198-.084c.7.428 1.55.635 2.4.635s1.7-.207 2.4-.635q.1.044.196.083c.213.09.413.174.627.282.332.17.586.348.752.57l1.125 1.5a.5.5 0 0 0 .9-.3v-3.298a2.5 2.5 0 0 0-.548-1.562zM12 10.445v.055c0 .866-.284 1.585-.75 2.14.146.064.292.13.425.199.39.197.8.46 1.1.86L13 14v-1.798a1.5 1.5 0 0 0-.327-.935zM4.75 12.64C4.284 12.085 4 11.366 4 10.5v-.054l-.673.82a1.5 1.5 0 0 0-.327.936V14l.225-.3c.3-.4.71-.664 1.1-.861.133-.068.279-.135.425-.199M8.009 1.073q.096.06.226.163c.284.226.683.621 1.09 1.28C10.137 3.836 11 6.237 11 10.5c0 .858-.374 1.48-.943 1.893C9.517 12.786 8.781 13 8 13s-1.517-.214-2.057-.607C5.373 11.979 5 11.358 5 10.5c0-4.182.86-6.586 1.677-7.928.409-.67.81-1.082 1.096-1.32q.136-.113.236-.18Z"/>
          <path d="M9.479 14.361c-.48.093-.98.139-1.479.139s-.999-.046-1.479-.139L7.6 15.8a.5.5 0 0 0 .8 0z"/>
        </svg>
      </div>
    </div>

  </div>
</template>

<script>
import Graph from './components/Graph.vue'
import MathLive from './components/MathLive.vue'

export default {
  name: 'App',
  components: {
    Graph,
    MathLive,
  },
  data() {
    return {

      // Expression given by player
      expression: '',
    }
  },
  methods: {

    // Get expression
    getExpression() {
      this.expression = this.$refs.input.convertedExpression;
    },

    // Run launch function in grid component, passing in expression
    launch() {
      this.getExpression();
      this.$refs.graph.launch(this.expression);
    },

    // Run update start function in grid component, passing in expression
    updateStart() {
      this.getExpression();
      this.$refs.graph.updateStart(this.expression);
    }
  }

}
</script>

<style>

  .navbar {
    width: 100%;
    height: 50px;
    display: flex;
    color: rgba(255, 255, 255, 0.733);
  }
  .navbar .half {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .launch {
    color: white;
    background-color: #3642af;
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
    font-size: 18px;
    font-weight: bold;
    position: relative;
    overflow: hidden;
  }

  .launch:hover {
    background: linear-gradient(45deg, #f56d01, #ff9e00);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 30px #ff9e00;
    transform: scale(1.1) rotate(10deg);
  }

  @keyframes rocket-hover {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      transform: translate(-50%, -50%) scale(1.2) rotate(45deg);
    }
  }


  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 50px);
    font-family: Arial, sans-serif;
  }

  .type{
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .type * {
    height: fit-content;
  }

</style>