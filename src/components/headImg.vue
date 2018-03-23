<template>
  <div class="headerImg" 
    :style="{backgroundImage:`url(${src})`,width:w,height:w}"
    ></div>
</template>

<script>
export default {
    props:{
        src:{
            type:String
        },
        w:{
            type:String,
            default:'60px'
        }
    }
}
</script>

<style lang="scss" scoped>
.headerImg{
    @include headCR;
}
</style>
