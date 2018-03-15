<template>
    <div>
        <router-link to="/editorBlog">
            写博客
        </router-link>
        <div>
            name:{{ userInfo.username }}
        </div>
        <a href="javascript:;" @click="logout">退出登录</a>
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

<style>

</style>
