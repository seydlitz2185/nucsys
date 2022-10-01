<script setup>
import { ref, computed } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Regist from './components/Regist.vue';
import 'amfe-flexible';
import 'amfe-flexible/index.js';
import Search from './components/Search.vue';
import Login from './components/Login.vue';
import AboutUs from './components/AboutUs.vue';
import Home from './components/Home.vue';
import "vue-router";

const routes = {
  '/': Home,
  '/Regist': Regist,
  '/Login': Login,
  '/Search':Search,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || AboutUs
})
</script>

<template>
  <header>
    <img alt="logo" class="logo" src="./assets/images/nucleus.png" width="100" height="100" />
    <div class="wrapper">
      <HelloWorld msg="核检测系统" />
      <a href="#/">Home</a> |  
      <a href="#/Regist">Regist</a> |
      <a href="#/Login">Already have an account?</a> |
      <a href="#/Search">Search</a> ｜ 
      <a href="#/AboutUs">About Us</a>
      <component :is="currentView" /> 
    </div>

  </header>

  <main>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
