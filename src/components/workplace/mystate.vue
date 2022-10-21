<script setup>
import { defineComponent,ref,toRef } from "vue";
import { useRouter, useRoute ,onBeforeRouteUpdate} from 'vue-router';
const router = useRouter();
const routes = useRoute();
const UserValue=ref({
  mystate:{
      myOrders:125,
      myProxyPick:22,
      myOrdering:36,
      myProxyPicking:12,
      allOrders:2346,
  }
});

function gotoOrders(){
  router.push({name:"myorders",});
}

function gotoProxyPicks(){
  router.push({name:"myproxypicks",});
}
</script>
<template>
   <n-grid :cols="2" :x-gap="480" :y-gap="240">
      <n-gi w>
        <n-button text>
        <n-statistic label="我的订单" value="12" @click="gotoOrders" />
      </n-button>
      </n-gi>
      
      <n-gi>
        <n-button text>
        <n-statistic label="我的代取" value="22" @click="gotoProxyPicks" />
      </n-button>
      </n-gi>
      <n-gi>
        <n-button text>
        <n-statistic label="总订单" value="36" />
      </n-button>
      </n-gi>
      <n-gi>
        <n-button text>
        <n-statistic label="正在进行中的代取" value="23" />
      </n-button>
      </n-gi>
    </n-grid>
    <n-divider />
       
    

  </template>
  
