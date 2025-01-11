<template>

  <!-- Load levels -->
  <Levels ref="levels" />

  <!-- Data shown on top of grid -->
  <p style="margin-bottom: 0;">Fuel: <span style="opacity: 0.6">{{ Math.max(parseInt(fuel), 0) }}</span></p>
  <p :class="{win : win}" style="margin-top: 2px; font-size: 16px;">{{ coins }} / {{ coinCount }} <span @click="nextLevel()" v-if="win" class="next" style="margin-left: 15px; color: white;">Next Level</span></p>

  <!-- Error message -->
  <div class="error" ref="error" v-if="showError">
    <div class="error-box">
      <h2 style="margin: auto; margin-top: 18px; width: 80%; height: fit-content; border-bottom: 1px white solid;">Error</h2>
      <div>
        <p style="color: rgb(200, 200, 200); font-size: 16px">
          {{ errorMessage.reason }}
          <br> 
          <span v-html="errorMessage.suggestion"></span>
          <br><br>
          <span v-show="errorMessage.showF0" style="color: white">f(0) = <span>{{ $refs.player?.y ? parseFloat($refs.player.y.toFixed(2)) : 0 }}</span></span>
        </p>

        <div class="closeButton" style="margin: 20px" @click="showError = false">Close</div>
      </div>
    </div>
  </div>

  <!-- Anything inside of the graph -->
  <div class="graph">


    <!-- Player -->
    <Player ref="player" :gridSize="this.gridSize" :fuel="fuel" @leave="leave" @updatePos="checkPlayerPos" />

    <!-- Display coins -->
    <div v-for="(coin, index) in level" :key="coin" :ref="'coin-' + index">
      <Coin :gridSize="this.gridSize" :x="coin[0]" :y="coin[1]" :taken="coin[2]" :deadly="coin[3]" />
    </div>

    <!-- Warning gradients -->
    <div class="top-warning" :class="{ warn: tooHigh }"></div>
    <div class="bottom-warning" :class="{ warn: tooLow }"></div>
    
    <!-- Grid -->
    <div ref="grid" class="row" v-for="i in gridSize" :key="i">
      <div class="col" v-for="j in gridSize" :key="j">
        <Cell :x="i" :y="j" />
      </div>
    </div>

  </div>
  
</template>

<script>
import Cell from './Cell.vue'
import Player from './Player.vue'
import Coin from './Coin.vue'
import Levels from './Levels.vue'
import Dialog from 'primevue/dialog';
import * as math from 'mathjs'

export default {
  name: 'Graph',
  components: {
    Cell,
    Player,
    Coin,
    Dialog,
    Levels,
  },
  data() {
    return {
      tooHigh: false,
      tooLow: false,
      showError: false,
      errorMessage: {reason: '', suggestion: '', showF0: false},

      // Level data
      coins: 0,
      levelNum: 0,
      gridSize: 12,
      originalFuel: 215,
      fuel: 215,
      animationSpeed: 1,
      level: [],
      coinCount: 3,
      win: false,
    }
  },
  methods: {

    /**
     * Run this method when the player exits the bounds of the level
     */
    leave() {

      // Check if the player collected all the coins, if so, win
      if(this.coins == this.coinCount) {
        this.win = true;
      }
    },

    /**
     * Load next level
     */
    nextLevel() {
      this.levelNum++;
      this.loadLevel();
      this.updateStart();
      this.resetLevel();
    },

    /**
     * Load the current level
     */
    loadLevel() {

      // Get data for level
      const data = this.$refs.levels.getLevel(this.levelNum);
      this.win = false,
      
      // Load the data for the level
      this.gridSize = data.gridSize;
      this.level = data.level;
      this.originalFuel = data.originalFuel;
      this.fuel = data.originalFuel;
      this.animationSpeed = data.animationSpeed;
      this.coinCount = data.coinCount;
    },

    /**
     * Check if there is anything wrong with the expression
     * @param expression 
     */
    checkError(expression) {

      if(this.tooHigh) {
        this.showError = true;
        this.errorMessage.reason = "Y-Intercept too high";
        this.errorMessage.suggestion = `it must be between <strong>0</strong> and <strong>${this.gridSize}</strong>`;
        this.errorMessage.showF0 = true;
        return true;
      }
      else if(this.tooLow) {
        this.showError = true;
        this.errorMessage.reason = "Y-Intercept too low";
        this.errorMessage.suggestion = `it must be between <strong>0</strong> and <strong>${this.gridSize}</strong>`;
        this.errorMessage.showF0 = true;
        return true;
      }
      else if(expression.length == 0) {
        this.showError = true;
        this.errorMessage.reason = "Empty expression";
        this.errorMessage.suggestion = "Type something";
        this.errorMessage.showF0 = false;
        return true;
      }

      // Check valid
      try {
        math.evaluate(expression, {x: 1});
      } catch (e) {
          this.showError = true;
          this.errorMessage.reason = "Invalid expression";
          this.errorMessage.suggestion = "Please enter a valid mathematical expression";
          this.errorMessage.showF0 = false;
          return true;
      }
      return false;
    },

    /**
     * Check if a coin is collected when the player is at x, y
     * @param x 
     * @param y 
     */
    checkPlayerPos(x, y) {
      for (let coin of this.level) {

        // Get distance of player from coin
        const distance = Math.sqrt(Math.pow(coin[0] - x, 2) + Math.pow(coin[1] - y, 2));

        // Collect coin if player is within 0.3 units from the coin
        if (distance <= 0.3 && !coin[2]) {

          // Collect if not deadly
          if(!coin[3]) {
            coin[2] = true;
            this.coins++;
          }
          
          // Kill player if deadly
          else
            this.$refs.player.dead = true;
        }
      }

      // Reduce fuel
      if(this.fuel > 0)
        this.fuel -= 5 * this.animationSpeed;
    },

    /**
     * Reset level
     */
    resetLevel() {
      for(let coin of this.level) {
        this.win = false;
        this.coins = 0,
        coin[2] = false; // Reset collected status
      }
    },

    /**
     * Launch player with expression
     * @param expression 
     */
    launch(expression) {
      if(!this.$refs.player.dead) return; // Do nothing if game is playing

      // Make sure level is loaded and no coins are collected
      this.loadLevel();
      this.coins = 0;

      if(this.checkError(expression)) return; // Do nothing if expression causes errors
      this.fuel = this.originalFuel; // Reset fuel
      this.$refs.player.followTrajectory(expression, this.animationSpeed); // Make player follow trajectory
      this.resetLevel(); // Make sure level is reset
    },

    /**
     * Update the start position for the player
     * @param expression 
     */
    updateStart(expression) {
      this.$refs.player.updateStart(expression);
      this.$refs.player.trail = [];
      this.checkWarnings(expression);
      this.resetLevel();
    },

    /**
     * Check if expression is too high or too low without giving error message
     * @param expression 
     */
    checkWarnings(expression) {
      try {
        var xPos = math.evaluate(expression, {x : 0})
      }
      catch (error) {
        return;
      }
      
      // Too high
      if (xPos > this.gridSize) {
        this.tooHigh = true;
      } else {
        this.tooHigh = false;
      }
      
      // Too low
      if (xPos < 0) {
        this.tooLow = true;
      } else {
        this.tooLow = false;
      }
    },
  },
  provide() {
    return {
      gridSize: this.gridSize,
    }
  },
  mounted() {
    this.loadLevel();
  }
}
</script>

<style scoped>

  .next {
    background-color: rgb(11, 133, 86);
    padding: 3px;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 5px;
    transition: 0.3s ease;
    user-select: none;
    cursor: pointer;
  }
  .next:hover {
    background-color: rgb(60, 201, 128);
    transition: 0.3s ease;
  }

  .closeButton {
    cursor: pointer;
    background: rgba(26, 26, 26, 0.301);
    color: white;
    padding: 8px;
    border-radius: 5px;
    font-size: 18px;
    transition: 0.3s ease;
  }
  .closeButton:hover {
    transition: 0.3s ease;
    transform: scale(1.05);
  }

  .error {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;

    /* Glassy blur effect */
    background: rgba(8, 8, 8, 0.5);
    backdrop-filter: blur(2px);
  }
  .error-box {
    color: white;
    width: 350px;
    height: fit-content;
    border-radius: 7px;
    background: rgba(5, 5, 5, 0.925);
    backdrop-filter: blur(2px);
    text-align: center;
  }

  p {
    color: white;
    font-size: 28px;
  }

  .row {
    display: block;
    width: 100%;
    height: 100%;
  }

  .win {
    color: rgb(24, 221, 145);
  }

  .graph {
    display: flex;
    position: relative;
    border: 1px solid rgb(226, 226, 226);
    overflow: hidden;
    background-color: rgb(19, 19, 19);

    width: 450px;
    flex-shrink: 0;
    border-radius: 3px;
  }

  .top-warning {
    background: linear-gradient(to bottom, red, rgba(255, 166, 0, 0));
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30%;
    opacity: 0;
    transition: 0.3s ease;
    pointer-events: none;
  }
  .bottom-warning {
    background: linear-gradient(to top, red, rgba(255, 166, 0, 0));
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
    transition: 0.3s ease;
    opacity: 0;
    pointer-events: none;
  }

  .warn {
    transition: 0.3s ease;
    opacity: 0.55 !important;
  }

</style>