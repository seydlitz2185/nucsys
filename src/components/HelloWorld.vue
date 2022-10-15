<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <n-card>
    <img alt="logo" class="logo" src="../assets/images/hamburger-48.png" width="48" height="48" />
    <n-gradient-text  type="warning">
      {{ msg }}</n-gradient-text>
  </n-card>
  </div>
</template>

<style scoped>


.greetings {
  text-align: center;
  font-size: 1.2rem;
}
.n-gradient-text {
  font-size: 24px;
  align-items: center;
  vertical-align: 45%;
}

.logo{
  vertical-align: 25%;
}
@media (min-width: 1024px) {

}
</style>
