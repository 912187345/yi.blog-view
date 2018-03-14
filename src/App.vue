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
        showbol:false
      }
    },
    created(){
    },
    watch:{
      $route(to,from){
        console.log(from);
        let notShow = ['logon','register']
        if( notShow.indexOf(to.name) !== -1){
          this.showbol = false;
        }else{
          this.showbol = true;
        }
      }
    },
    components:{
      top
    }
  }
</script>
