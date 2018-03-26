<template>
  <div id="app">
    <div id="bg" :style="{ backgroundImage:`url(${userInfo.background})` }"></div>
    <top v-if='showbol'></top>
    <router-view/>
  </div>
</template>
<script>
  import top from './page/myself/top'
  import {mapState} from 'vuex'
  export default {
    computed:{
      ...mapState({
            userInfo:'userInfo'
        })
    },
    data(){
      return {
        showbol:false,
        notShow:['logon','register']
      }
    },
    created(){
      if( this.notShow.indexOf(this.$route.name) !== -1){
          this.showbol = false;
        }else{
          this.showbol = true;
        }
    },
    watch:{
      $route(to,from){
        if( this.notShow.indexOf(to.name) !== -1){
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
<style lang="scss" scoped>
#bg{
  position: fixed;
  z-index: -1;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
}
</style>
