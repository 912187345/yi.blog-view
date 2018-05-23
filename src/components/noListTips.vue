<template>
    <div class="tips">
        <img :src="imgSrc" v-if='imgSrc' :alt="imgSrc">
        {{ content }}
    </div>
</template>

<script>
export default {
    props:['content','imgSrc']
}
</script>

<style lang='scss' scoped>
.tips{
        background: #ffffff;
        text-align: center;
        font-size: 20px;
        display: flex;
        justify-content:center;
        align-items: center;
        height: 400px;
        >img{
            width: 60px;
            height: 60px;
            margin-right: 16px;
        }
    }
</style>
