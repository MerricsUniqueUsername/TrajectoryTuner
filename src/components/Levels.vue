<template>
  
</template>

<script>
export default {
  data() {
    return {

      levels: {

        10000000: {
          gridSize: 24,
          originalFuel: 1000,
          animationSpeed: 0.25,
          coinCount: 4,
          level: [

          ]
        },
        
        0: {
          gridSize: 6,
          originalFuel: 32,
          animationSpeed: 0.08,
          coinCount: 3,
          level: [
            [1, 3, false, false], // x, y, collected, deadly
            [3, 3, false, false],
            [5, 3, false, false],
          ]
        },

        1: {
          gridSize: 8,
          originalFuel: 100,
          animationSpeed: 0.12,
          coinCount: 3,
          level: [
            [2, 2, false, false], // x, y, collected, deadly
            [4, 4, false, false],
            [6, 6, false, false],
          ]
        },

        2: {
          gridSize: 12,
          originalFuel: 100,
          animationSpeed: 0.12,
          coinCount: 3,
          level: [
            [1, 2, false, false], // x, y, collected, deadly
            [3, 6, false, false],
            [5, 10, false, false],
          ]
        },

        // x/2 + 1
        3: {
          gridSize: 8,
          originalFuel: 32,
          animationSpeed: 0.08,
          coinCount: 3,
          level: [
            [2, 2, false, false],
            [4, 3, false, false],
            [6, 4, false, false],
          ]
        },

        // 8-x
        4: {
          gridSize: 8,
          originalFuel: 32,
          animationSpeed: 0.08,
          coinCount: 1,
          level: [
            [4, 6, false, true],
            [5, 5, false, true],
            [6, 4, false, true],
            [4, 4, false, false],
          ]
        },

        5: {
          gridSize: 6,
          originalFuel: 50,
          animationSpeed: 0.1,
          coinCount: 1,
          level: [
            [3, 3, false, false],
            [1, 3, false, true],
            [5, 3, false, true],
            [2, 2, false, true],
            [2, 4, false, true],
            [4, 4, false, true],
            [4, 2, false, true],
            [3, 5, false, true],
            [3, 1, false, true],
          ]
        },
        
        // x^2
        6: {
          gridSize: 6,
          originalFuel: 35,
          animationSpeed: 0.07,
          coinCount: 3,
          level: [
            [1, 1, false, false],
            [1.75, 3, false, false],
            [2.3, 5, false, false],
          ]
        },

        // 3x^0.52
        7: {
          gridSize: 12,
          originalFuel: 100,
          animationSpeed: 0.1,
          coinCount: 2,
          level: [
            [1, 3.5, false, false],
            [8, 8.5, false, true],
            [11, 11, false, false],
          ]
        },

        // 0.02x^5
        // (x^0.81+2.8)(.8x)-(.5x^2)(.8x)+1.8
        8: {
          gridSize: 6,
          originalFuel: 50,
          animationSpeed: 0.1,
          coinCount: 2,
          level: [
            [3, 3, false, false],
            [1, 3, false, true],
            [5, 3, false, true],
            [2, 2, false, true],
            [2, 4, false, true],
            [4, 4, false, true],
            [4, 2, false, true],
            [3, 5, false, false],
          ]
        },

        // 12-3x^0.5
        // 5.5+3.3cos(.39x)
        9: {
          gridSize: 12,
          originalFuel: 50,
          animationSpeed: 0.1,
          coinCount: 2,
          level: [
            [1, 8.5, false, false],
            [3, 5, false, true],
            [11, 1, false, false],
            [4, 6.5, false, true],
          ]
        },

        // sin(0.8x)+6
        10: {
          gridSize: 12,
          originalFuel: 100,
          animationSpeed: 0.13,
          coinCount: 2,
          level: [
            [2, 6, false, true],
            [4, 6, false, false],
            [6, 6, false, true],
            [8, 6, false, false],
            [10, 6, false, true],
          ]
        },

        // 3sin(0.1x^1.65)+6
        // 7+(.8x-1.8)*sin(.37x)
        11: {
          gridSize: 12,
          originalFuel: 100,
          animationSpeed: 0.13,
          coinCount: 3,
          level: [
            [2, 7, false, false],
            [5.5, 9, false, false],
            [10.5, 3, false, false],
            [2, 8, false, true],
            [5.5, 7.5, false, true],
            [10.5, 4, false, true],
          ]
        },

        // 3(0.3x-1)^5+3.3
        12: {
          gridSize: 7,
          originalFuel: 48,
          animationSpeed: 0.08,
          coinCount: 2,
          level: [
            [1, 2.5, false, false],
            [0, 4, false, true],
            [1, 4, false, true],
            [2, 4, false, true],
            [3, 4, false, true],
            [4, 4, false, true],
            [5, 4, false, true],
            [7, 4, false, true],

            [0, 3, false, true],
            [2, 3, false, true],
            [3, 3, false, true],
            [4, 3, false, true],
            [5, 3, false, true],
            [6, 3, false, true],
            [7, 3, false, true],
            [6, 4.5, false, false],
          ]
        },

        //4/(1+e^-(x-4)^2)
        //NOT sin(1.2x)+3.2
        13: {
          gridSize: 8,
          originalFuel: 50,
          animationSpeed: 0.1,
          coinCount: 3,
          level: [
            [1, 3.5, false, true],
            [1, 4.5, false, true],
            [.5, 3.5, false, true],
            [.5, 4.5, false, true],
            [1.5, 3.5, false, true],
            [1.5, 4.5, false, true],
            [3, 3, false, false],
            [4, 2, false, false],
            [5, 3, false, false],
            // [6, 4, false, false],

            // [6.25, 4.25, false, false],
            // [6.5, 4, false, false],
            // [6.75, 4.25, false, false],
            // [7, 4, false, false],

            [2, 1, false, true],
            [2, 1.5, false, true],
            [2, 2, false, true],
            [2, 2.5, false, true],
            [2, 3, false, true],
            [2, 3.5, false, true],
            [2, 4.5, false, true],
            [1, 3.5, false, true],
            [1, 4.5, false, true],
            [2, 5, false, true],
            [2, 5.5, false, true],
            [2, 6, false, true],
            [2, 6.5, false, true],
            [2, 0.5, false, true],
            [2, 0, false, true],
            [2, 7, false, true],
            [2, 7.5, false, true],
            [2, 8, false, true],

            [6, 1.5, false, true],
            [6, 2, false, true],
            [6, 2.5, false, true],
            [6, 3, false, true],
            [6, 3.5, false, true],
            [6, 4.5, false, true],
            [6, 5, false, true],
            [6, 5.5, false, true],
            [6, 6, false, true],
            [6, 6.5, false, true],
            [6, 0.5, false, true],
            [6, 0, false, true],
            [6, 7, false, true],
            [6, 7.5, false, true],
            [6, 8, false, true],
            [6, 1, false, true],
          ]
        },

        // 4sin(x/4)*cos(x)+6.2
        14: {
          gridSize: 12,
          originalFuel: 112,
          animationSpeed: 0.12,
          coinCount: 3,
          level: [
            [1, 7, false, false],
            [11, 6, false, false],
            [6.5, 10, false, false],

            [1, 6, false, true],
            [1, 5, false, true],
            [1, 4, false, true],
            [1, 3, false, true],
            [1, 2, false, true],
            [1, 1, false, true],
            [1, 0, false, true],

            [6.5, 9, false, true],
            [6.5, 8, false, true],
            [6.5, 7, false, true],
            [6.5, 6, false, true],
            [6.5, 5, false, true],
            [6.5, 4, false, true],
            [6.5, 3, false, true],
            [6.5, 2, false, true],
            [6.5, 1, false, true],
            [6.5, 0, false, true],

            [11, 5, false, true],
            [11, 4, false, true],
            [11, 3, false, true],
            [11, 2, false, true],
            [11, 1, false, true],
            [11, 0, false, true],

            [3.5, 4, false, true],
            [3.5, 5, false, true],
            [3.5, 6, false, true],
            [3.5, 7, false, true],
            [3.5, 8, false, true],
            [3.5, 9, false, true],
            [3.5, 10, false, true],
            [3.5, 11, false, true],
            [3.5, 12, false, true],

            [9, 5, false, true],
            [9, 6, false, true],
            [9, 7, false, true],
            [9, 8, false, true],
            [9, 9, false, true],
            [9, 10, false, true],
            [9, 11, false, true],
            [9, 12, false, true],
          ]
        },

        // 3sin(0.4x)^3+6
        15: {
          gridSize: 13,
          originalFuel: 85,
          animationSpeed: 0.12,
          coinCount: 4,
          level: [
            [9, 6, false, false],
            [10, 6, false, true],
            [7, 6, false, false],
            [6, 6, false, true],
            [2, 6, false, true],
            [4, 9, false, false],
            [12, 3, false, false],
          ]
        },

        // sin(3x)+x+1
        // sin(1.6x)+x
        16: {
          gridSize: 8,
          originalFuel: 70,
          animationSpeed: 0.08,
          coinCount: 4,
          level: [
            [1, 1, false, true],
            [2, 2, false, false],
            [3, 3, false, true],
            [4, 4, false, false],
            [5, 5, false, true],
            [6, 6, false, false],
            [7, 7, false, true],
          ]
        },
      }
    }
  },
  methods: {
    getLevel(level) {
      return this.levels[level]
    }
  }
}
</script>

<style>

</style>