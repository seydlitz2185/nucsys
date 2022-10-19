<script setup>
import { defineComponent, ref } from "vue";
import{useMessage}from 'naive-ui';
const message = useMessage();
const page= ref(1);
function handleClose () {
        message.warning('你尝试关闭，但并没有这个功能')
      }
</script>
<template>
      <n-button strong secondary type="primary">
        <router-link to="/HomePage/marketpost">下单</router-link>
    </n-button>
    <n-divider />
    <routerView></routerView>
    <n-grid cols="1 600:4 600:4" :x-gap="24" :y-gap="24">
      <n-gi>
  <n-card
    title="📖 如何成功"
    embedded
    closable
    @close="handleClose"
    :bordered="false"
  >
    如果你年轻的时候不 996，你什么时候可以 996？
  </n-card>
      </n-gi>
      <n-gi>
  <n-card
    title="📖 如何成功"
    embedded
    closable
    @close="handleClose"
    :bordered="false"
  >
    如果你年轻的时候不 996，你什么时候可以 996？
  </n-card>
      </n-gi>
      <n-gi>
  <n-card
    title="📖 如何成功"
    embedded
    closable
    @close="handleClose"
    :bordered="false"
  >
    如果你年轻的时候不 996，你什么时候可以 996？
  </n-card>
      </n-gi>
      <n-gi>
  <n-card
    title="📖 如何成功"
    embedded
    closable
    @close="handleClose"
    :bordered="false"
  >
    如果你年轻的时候不 996，你什么时候可以 996？
  </n-card>
      </n-gi>
      <n-gi>
  <n-card
    title="📖 如何成功"
    embedded
    closable
    @close="handleClose"
    :bordered="false"
  >
    如果你年轻的时候不 996，你什么时候可以 996？
  </n-card>
      </n-gi>
      <n-gi>

  <n-card
    title="📖 如何成功"
    embedded
    closable
    @close="handleClose"
    :bordered="false"
  >
  如果你年轻的时候不 996，你什么时候可以 996？
  </n-card>

   </n-gi>
  <n-gi>
  <n-card
    title="📖 如何成功"
    embedded
    closable
    @close="handleClose"
    :bordered="false"
  >
  如果你年轻的时候不 996，你什么时候可以 996？
  </n-card>

      </n-gi>
      <n-gi>

  <n-card
    title="📖 如何成功"
    embedded
    closable
    @close="handleClose"
    :bordered="false"
  >
  如果你年轻的时候不 996，你什么时候可以 996？
  </n-card>
      </n-gi>
    </n-grid>
    <n-space>
    <n-pagination 
    v-model:page="page" 
    :page-count="100" 
    size="small"
    show-quick-jumper/>
  </n-space>

  </template>
  
  <style scoped>
  .light-green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.12);
  }
  .green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.24);
  }
  .n-card {
  max-width: 500px;
}
  </style>