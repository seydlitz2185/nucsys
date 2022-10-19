<script setup>
</script>

<template>
      <n-message-provider>
     <n-grid cols="1 400:4 400:4" :x-gap="24" :y-gap="24" item-responsive="true" >
      <n-gi>
        <diningGrid :msg=0 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=1 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=2 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=3 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=4 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=5 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=6 />
      </n-gi>
      <n-gi>
        <diningGrid :msg=7 />
      </n-gi>
    </n-grid>
    <n-divider />
    <n-space>
    <n-pagination 
    class="pagination"
    v-model:page="page" 
    :page-count="100" 
    size="large"
    @click="getPageParam"
    show-quick-jumper/>
  </n-space>
  </n-message-provider>
</template>