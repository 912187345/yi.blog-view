<template>
    <div class="scroll">
        <li v-for='(con,index) in list' :key="index">{{ con }}</li>
    </div>
</template>

<script>
export default {
    props:['list']
}
</script>

<style>
    .scroll{
        width: 150px;
        height: 200px;
        overflow: auto;
        border: 1px solid #000000;
    }
</style>
