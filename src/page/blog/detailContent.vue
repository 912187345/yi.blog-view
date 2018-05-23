<template>
  <div class="ql-container ql-snow">
      <div class="ql-editor" v-html="content">
      </div>
  </div>
</template>

<script>
export default {
    props:['content']
}
</script>

<style>
.ql-snow .ql-editor img{
    width: auto;
}
</style>
