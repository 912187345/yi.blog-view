<template>
  <div class="page">
      <scroll :list="list" ref="scroll"></scroll>
      <div @click="backTop()" class="back">back</div>
  </div>
</template>

<script>
import scroll from './scroll.vue';
export default {
    name:'test',
    data(){
        return {
            list:[]
        }
    },
    mounted(){
        for( var i = 0; i < 30;i++ ){
            this.list.push( i )
        }        
    },
    methods:{
        backTop(){
            console.log(this.$refs.scroll.$el)
            this.$refs.scroll.$el.scrollTop = 0;
        }
    },
    components:{
        scroll
    }
}
</script>

<style>
.page{
    position: relative;
    display: inline-block;
}
.back{
    position: absolute;
    right:10%;
    bottom: 10%;
    background: #000000;
    color: white;
}
</style>
