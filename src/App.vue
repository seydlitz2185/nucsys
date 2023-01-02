<script setup>
  
import { ref, computed ,provide,nextTick} from 'vue'
import HelloThere from "./components/HelloThere.vue";
import "vue-router";
import { useOsTheme, darkTheme } from "naive-ui";
import { useRoute, useRouter } from 'vue-router';

const theme=computed(() => {const osThemeRef = useOsTheme();return osThemeRef.value === "dark" ? darkTheme : null});
const routes = useRoute;
const router = useRouter;



</script>

<template>
  <n-loading-bar-provider>
  <n-dialog-provider>
    <n-config-provider :theme="theme" >
    <n-message-provider>
    <HelloThere class="obiwan"/>
</n-message-provider>
</n-config-provider>
</n-dialog-provider>
</n-loading-bar-provider>
</template>

<style scoped>

@media (min-width: 200px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
.obiwan{
  position:absolute;
top:0;
right:0;
bottom:0;
left:0;
}

  }

</style>
