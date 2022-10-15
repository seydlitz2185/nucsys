<script setup>

</script>

<template>
    <n-card 
    class="obiwan"
      :size="small"
    :segmented="{
      content: true,
      footer: 'soft'
    }">
    <template #header >

      <n-space>
        <n-button-group>
      <n-button round strong secondary  type="primary">
        <router-link to="/">欢迎</router-link>
    </n-button>
      <n-button strong secondary type="primary">
        <router-link to="/Regist">开始</router-link>
    </n-button>
      
      <n-button round strong secondary  type="primary">
        <router-link to="/AboutUs">关于我们</router-link>
    </n-button>
  </n-button-group>
  </n-space>
    </template>
    <template #default class="default">

      <router-view ></router-view>

  </template>
  <template #footer>
  “Bad programmers worry about the code.
   Good programmers worry about data structures
    and their relationships.”
― Linus Torvalds
  </template>
</n-card>
</template>

<style>
@media (min-width: 512px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }


.router-link-active {
  text-decoration: none;
  color: cadetblue;
}
a{
  text-decoration: none;
  color: green;
}


}

</style>