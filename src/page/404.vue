<template>
  <div class="err-wrap">
      <img src="/icon/404.svg" class="errIcon">
      <div class="text">您要找的页面不见了~</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.err-wrap{
    background: #ffffff;
    @include blogList;
    border-radius: 8px;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text{
        font-size: 26px;
        margin-left: 20px;
    }
    .errIcon{
        width: 200px;
    }
}
</style>
