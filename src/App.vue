<template>
  <div id="app">
    <top v-if='showbol'></top>
    <router-view/>
  </div>
</template>
<script>
  import top from './page/myself/top'
  export default {
    data(){
      return {
        showbol:true
      }
    },
    components:{
      top
    }
  }
</script>
