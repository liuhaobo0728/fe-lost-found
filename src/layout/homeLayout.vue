<template>
  <div>
    <fe-header></fe-header>
    <router-view></router-view>
  </div>
</template>

<script>
import FeHeader from "../components/home/header/header.vue";
export default {
  components: {
    FeHeader
  }
};
</script>

<style>
</style>
