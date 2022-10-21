<script setup>
</script>

<template>
<n-breadcrumb>
    <n-breadcrumb-item>
      <n-button   tertiary  type="primary">
        <router-link to="/HomePage/myorders/mydining">未被接受的食堂订单</router-link>
    </n-button>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-button  tertiary type="primary">
        <router-link to="/HomePage/myorders/mydiningorder">正在进行的食堂订单</router-link>
    </n-button>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-button   tertiary  type="primary">
        <router-link to="/HomePage/myorders/mydining">未被接受的超市订单</router-link>
    </n-button>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-button  tertiary type="primary">
        <router-link to="/HomePage/myorders/mydiningorder">正在进行的超市订单</router-link>
    </n-button>
    </n-breadcrumb-item> <n-breadcrumb-item>
      <n-button   tertiary  type="primary">
        <router-link to="/HomePage/myorders/mydining">未被接受的快递订单</router-link>
    </n-button>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-button  tertiary type="primary">
        <router-link to="/HomePage/myorders/mydiningorder">正在进行的快递订单</router-link>
    </n-button>
    </n-breadcrumb-item>
  </n-breadcrumb>

  
      <div class="wrapper">
      <router-view ></router-view>
    </div>

</template>