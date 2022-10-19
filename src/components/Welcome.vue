<script setup>
import HelloWorld from './HelloWorld.vue';
</script>
<template>
  <div class="kenobi">
  <n-loading-bar-provider>
  <n-message-provider>
    <n-notification-provider>
      <n-dialog-provider>
        <HelloWorld msg="校内跑腿/二手系统" />
        <n-card
    title="📖 如何成功"
    embedded
    :bordered="false"
  >
    如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有
    996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？
  </n-card>
  <n-card>
  <n-carousel autoplay trigger="hover"  >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    >
  </n-carousel>
</n-card>
      </n-dialog-provider>
    </n-notification-provider>
  </n-message-provider>
</n-loading-bar-provider>
</div>
</template>

<script>
  
  import { defineComponent } from 'vue'
  import { NButton } from 'naive-ui'

  export default defineComponent({
    components: {
      NButton
    }
  })
</script>
<style scoped>
.carousel-img {
      width: 100%;
      max-height: 280px;
      object-fit: cover;
    }

.kenobi{
  align-items: center;

}
</style>