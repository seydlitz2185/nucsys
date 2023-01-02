<script setup>
import HelloWorld from './HelloWorld.vue';
</script>
<template>
  <div class="kenobi">
  <n-loading-bar-provider>
  <n-message-provider>
    <n-notification-provider>
      <n-dialog-provider>
        <HelloWorld msg="校内代取系统" />
        <n-card
    title="这是一个代取系统"
    embedded
    :bordered="false"
  >
  可以用于南京农业大学校内师生代取快递、代买食堂饭菜和超市商品
  </n-card>
  <n-card>
  <n-carousel autoplay trigger="hover"  >
    <img
      class="carousel-img"
      src="../assets/images/njau.jpeg"
    >
    <img
      class="carousel-img"
      src="../assets/images/dining1.jpeg"
    >
    <img
      class="carousel-img"
      src="../assets/images/dining2.jpeg"
    >
    <img
      class="carousel-img"
      src="../assets/images/dining3.jpeg"
    >
    <img
      class="carousel-img"
      src="../assets/images/diningn.jpeg"
    >
    <img
      class="carousel-img"
      src="../assets/images/dining5.jpeg"
    >
    <img
      class="carousel-img"
      src="../assets/images/diningj.jpeg"
    >
    <img
      class="carousel-img"
      src="../assets/images/express1.jpeg"
    >
    <img
      class="carousel-img"
      src="../assets/images/express2.jpeg"
    >
    <img
      class="carousel-img"
      src="../assets/images/market.jpeg"
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
      max-height: 480px;
      object-fit: cover;
    }

.kenobi{
  align-items: center;

}
</style>