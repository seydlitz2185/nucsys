<script setup>
</script>

<template>
<n-breadcrumb>
    <n-breadcrumb-item>
      <n-button   tertiary  type="primary">
        <router-link to="/HomePage/myproxypicks/mydiningproxypicks">我的食堂代取</router-link>
    </n-button>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-button   tertiary  type="primary">
        <router-link to="/HomePage/myproxypicks/mydiningproxypicks">我的超市代取</router-link>
    </n-button>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-button   tertiary  type="primary">
        <router-link to="/HomePage/myproxypicks/mydiningproxypicks">我的快递代取</router-link>
    </n-button>
    </n-breadcrumb-item>
  </n-breadcrumb>

  
      <div class="wrapper">
      <router-view ></router-view>
    </div>

</template>