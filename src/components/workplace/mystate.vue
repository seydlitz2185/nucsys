<script setup>
import { defineComponent,ref,toRef } from "vue";

const UserValue=ref({
  mystate:{
      myOrders:125,
      myProxyPick:22,
      myOrdering:36,
      myProxyPicking:12,
      allOrders:2346,
  }
});


</script>
<template>
   <n-grid cols="1 200:5 200:5">
      <n-gi>
        <n-statistic label="我的订单" value="125 集" />
      </n-gi>
      
      <n-gi>
        <n-statistic label="我的代取" value="22 位" />
      </n-gi>
      <n-gi>
        <n-statistic label="正在进行中的订单" value="36 次" />
      </n-gi>
      <n-gi>
        <n-statistic label="正在进行中的代取" value="83 个" />
      </n-gi>
      <n-gi>
        <n-statistic label="当前总代取数" value="2,346 个" />
      </n-gi>
    </n-grid>
   
  </template>
  
