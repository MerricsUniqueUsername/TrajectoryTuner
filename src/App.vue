<template>

  <!-- Game -->
    <router-view></router-view>
</template>

<script>
import Game from './Game.vue'
import Login from './Login.vue'
import Signup from './Signup.vue'

export const backendURL = "http://localhost:4000";
export default {
  name: 'App',

}
</script>

<style>

</style>