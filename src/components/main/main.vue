<template>
  <div class="main-container">
      <layout></layout>
      <main-content></main-content>
  </div>
</template>

<script>
import Layout from '@/components/layout/layout'
import MainContent from '@/components/main-content/main-content'
export default {
  data () {
    return {
      mstg: 1
    }
  },
  components: {
    Layout,
    MainContent
  }
}
</script>

<style scoped lang="scss">
  .main-container{
    width:100%;
    height:100vh;
    background:#eee;
  }
</style>
