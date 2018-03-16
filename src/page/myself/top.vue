<template>
    <div id="top">
        <div>
            设置
        </div>
        <div>
            我的博客
        </div>
        <div>
            退出
        </div>
        <div class="header">
            头像
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
    mounted(){
        // console.log( this.$store.state.userInfo )
    },
    methods:{
        logout(){
            alert('退出成功');
        }
    }
}
</script>

<style lang='scss'>
#top{
    display: flex;
    flex-direction: row-reverse;
    padding: 10px 30px;
    width: $centerW;
    margin: 0 auto;
}
.writeBtn{
    margin-right: 20px;
    >a{   
        color: #999999;
    }
}
</style>
