<template>
  
</template>

<script>
import { useRoute } from 'vue-router'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router';
import {backendURL} from '../App.vue'

export default {
  data() {
    return {
      router: useRouter(),
    }
  },
  methods: {
    async getLevel(level) {
      const cookie = Cookies.get('token');
        if(!cookie) {
          return;
        }
        let results = await fetch(backendURL + "/graphql",{
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: `
            query {
              getLevel(jwt: "${cookie}", level: ${level}) {
                gridSize
                fuel
                animationSpeed
                coinCount
                coins {
                  x
                  y
                  bad
                }
              }
            }
            `
          })
        });
      let data_json = await results.json();
      console.log(data_json.data);
      let result = {
        gridSize: data_json.data.getLevel.gridSize,
        originalFuel: data_json.data.getLevel.fuel,
        animationSpeed: data_json.data.getLevel.animationSpeed,
        coinCount: data_json.data.getLevel.coinCount,
        level: data_json.data.getLevel.coins.map((coin) => {
          return [coin.x, coin.y, false, coin.bad];
        }),
      };
      return result;
    }
  }
}
</script>

<style>

</style>