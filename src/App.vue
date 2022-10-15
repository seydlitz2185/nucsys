<script setup>
  
import { ref, computed } from 'vue'
import HelloThere from "./components/HelloThere.vue";
import "vue-router";
import { useOsTheme, darkTheme } from "naive-ui";
import { useRoute, useRouter } from 'vue-router';

const theme=computed(() => {const osThemeRef = useOsTheme();return osThemeRef.value === "dark" ? darkTheme : null});
const routes = useRoute;
const router = useRouter;


</script>

<template>

    <n-config-provider :theme="theme" >
      <!--
    <n-card > 系统开发中，此页面仅为测试使用。
        这实际上是一个健康信息登记系统 </n-card>-->
    <n-message-provider>
    <HelloThere class="obiwan"/>
</n-message-provider>
</n-config-provider>
</template>

<style scoped>

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }




  }

</style>
