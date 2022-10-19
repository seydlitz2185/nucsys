<script setup>
</script>

<template>
    
    <n-message-provider>
    <n-card
    v-model:title= store.grids[pageId].diningName
    embedded
    closable
    hoverable
    @close="handleClose"
    :bordered="false"
    :segmented="{
      content: true,
    }"
  >
    <n-skeleton v-if="loading" />
    <div  v-else>
      <div>{{timestampToTime(store.grids[pageId].diningTime)}}</div>
    <n-dynamic-tags :closable="false" v-model:value="store.grids[pageId].diningTags" :max="0" :type="primary"/>
    </div>
  <template #action >
    <n-skeleton v-if="loading" />
    <n-grid  v-else :cols="2" :x-gap="24" item-responsive="true">
        <n-form-item-gi>
      </n-form-item-gi>
    <n-form-item-gi>
      <n-button  type="primary" quaternary  @click="detail">
      详情
    </n-button>
    <n-button  type="primary" quaternary  @click="order">
      接单
    </n-button>
        </n-form-item-gi>
      </n-grid>

    </template>
  </n-card>
</n-message-provider>

</template>