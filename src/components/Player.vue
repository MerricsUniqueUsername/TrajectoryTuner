<template>
  <div>
    <!-- Render the player -->
    <div :style="{ left: computedX, bottom: computedY }" class="player"></div>

    <!-- Render the trail -->
    <div
      v-for="(pos, index) in trail"
      :key="index"
      :style="{ left: pos.x, bottom: pos.y, transform: `rotate(${pos.angle}rad)`, backgroundColor: pos.bg }"
      class="trail"
    ></div>
  </div>
</template>

<script>
import { inject } from 'vue';
import * as math from 'mathjs';

export default {
  name: "Player",
  props: {
    gridSize: {
      type: Number,
      required: true,
    },
    fuel: {
      type: Number,
      default: 100,
    }
  },
  data() {
    return {
      x: 0,
      y: 0,
      animationSpeed: 0.1,
      expression: null,
      dead: true,
      trail: [], // To store past positions
      derivative: 0,
      hue: 180,
    };
  },
  methods: {
    followTrajectory(expression, speed) {
      if (!this.dead) return; // Don't do anything if game is going

      this.animationSpeed = speed;
      this.trail = []
      this.hue = 180;
      this.updateStart(expression); // Update starting position based on expression
      this.expression = expression;
      this.dead = false;
      requestAnimationFrame(this.animation);
    },
    updateStart(expression) {
      try {
        this.dead = true;
        this.x = 0;
        this.y = math.evaluate(expression, { x: this.x });
        this.trail = []; // Clear the trail when starting a new trajectory
      } catch (error) {
        this.x = 0;
        this.y = 0;
        return;
      }
    },
    animation(timestamp) {
      this.checkDead();

      // Change trajectory if there is fuel
      if(this.fuel > 0)
        var derivative = math.derivative(this.expression, 'x').evaluate({ x: this.x });

      // If no fuel left, continue trajectory
      else
        var derivative = this.derivative

      
      const ySpd = math.sin(math.atan(derivative));
      const xSpd = math.cos(math.atan(derivative));
      this.x += xSpd * this.animationSpeed;
      this.y += ySpd * this.animationSpeed;
      this.derivative = derivative; // Update the derivative for the next frame
      this.hue += 1; // Increase the hue for color transitions

      this.updateTrail(); // Add the current position to the trail

      if (!this.dead) requestAnimationFrame(this.animation);

      this.collectCoins();
    },
    checkDead() {
      const x = this.x;
      const y = this.y;

      // Check if outside bounds
      if (x < 0 || x > this.gridSize || y > this.gridSize || y < 0) {
        this.dead = true;
        this.$emit("leave");
      }
    },
    collectCoins() {
      this.$emit('updatePos', this.x, this.y);
    },
    updateTrail() {
      // Add the current position to the trail
      this.trail.push({
        x: (this.x / this.gridSize) * 100 + '%',
        y: (this.y / this.gridSize) * 100 + '%',
        angle: -math.atan(this.derivative),
        bg: "hsl(" + this.hue + ", 70%, 50%)",
      });
    },
  },
  inject: ['gridSize'],
  computed: {
    computedX() {
      return (this.x / this.gridSize * 100) + '%';
    },
    computedY() {
      return (this.y / this.gridSize * 100) + '%';
    },
  },
};
</script>

<style>
.player {
  position: absolute;
  width: 6%;
  aspect-ratio: 1;
  z-index: 1000;

  background-color: rgb(146, 146, 146);
  border-radius: 50%;

  /* Translate */
  transform: translate(-50%, 50%);
}

.trail {
  position: absolute;
  width: 2%;
  height: 0.5%;
  background-color: rgb(224, 224, 224);
  z-index: 999;
  transform: translate(-50%, 50%);
  border-radius: 3px;
}
</style>
