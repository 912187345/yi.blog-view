<template>
  <div>
      <div>
          <input type="text" name="" id="" placeholder="请输入标题">
      </div>
      <editor v-model="content"></editor>
  </div>
</template>

<script>
import editor from '../../components/editor'
export default {
    data(){
        return {
            content:''
        }
    },
    watch:{
        content(nV){
            console.log(nV)
        }
    },
    components:{
        editor
    }
}
</script>

<style>

</style>
