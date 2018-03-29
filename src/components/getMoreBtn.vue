<template>
  <div class="getMore" @click="$emit('getMore')">
    查看更多
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.getMore{
  width: 200px;
  height: 40px;
  color: #ffffff;
  background: steelblue;
  line-height: 40px;
  margin: 0 auto;
  text-align: center;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
