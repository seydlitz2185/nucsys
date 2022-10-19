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
        <n-statistic label="我的订单" value="12" />
      </n-gi>
      
      <n-gi>
        <n-statistic label="我的代取" value="22" />
      </n-gi>
      <n-gi>
        <n-statistic label="总订单" value="36" />
      </n-gi>
      <n-gi>
        <n-statistic label="正在进行中的代取" value="23" />
      </n-gi>
    </n-grid>
    <n-divider />
       
    
<n-breadcrumb>
    <n-breadcrumb-item>
      <n-button   tertiary  type="primary">
        <router-link to="/HomePage/mystate/mydiningorder">我的吃饭订单</router-link>
    </n-button>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-button  tertiary type="primary">
        <router-link to="/HomePage/mystate/mydining">我的吃饭代取</router-link>
    </n-button>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
    </n-breadcrumb-item>
  </n-breadcrumb>

  
      <div class="wrapper">
      <router-view ></router-view>
    </div>
  </template>
  
