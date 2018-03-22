<template>
    <div id="top" class="top">
        <div>
            退出
        </div>
        <div @click="goSetting">
            设置
        </div>
        <div @click="goMyBlog">
            我的博客
        </div>
        <div class="header" :style="{backgroundImage:`url(${userInfo.headImg})`}">
        </div>
        <div class="writeBtn">
            <router-link to="/editorBlog">
                写博客
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState({
            userInfo:'userInfo'
        })
    },
    methods:{
        logout(){
            alert('退出成功');
        },
        goSetting(){
            this.$router.push({name:'setting'})
        },
        goMyBlog(){
            this.$router.push({name:'myBlog'})
        }
    }
}
</script>

<style lang='scss' scoped>
#top{
    display: flex;
    flex-direction: row-reverse;
    padding: 10px 30px;
    width: $centerW;
    margin: 0 auto;
    align-items:center;
}
.top{
    >div{
        margin-right: 10px;
        cursor: pointer;
    }
}
.writeBtn{
    margin-right: 20px;
    >a{   
        color: #999999;
    }
}
.header{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
}
</style>
