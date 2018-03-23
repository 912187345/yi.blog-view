<template>
    <div id="top" class="top">
        <template v-if="userToken !== 'undefined' && userToken">
            <div @click="logout">
                退出
            </div>
            <div @click="goSetting">
                设置
            </div>
            <div @click="goMyBlog">
                我的博客
            </div>
            <el-tooltip class="item" effect="dark" content="可以自定义头像哦~" placement="bottom">
                <div class="header" 
                    :style="{backgroundImage:`url(${userInfo.headImg})`}"
                     @click="goSetting"
                ></div>
            </el-tooltip>
        </template>
        <template v-else>
            <div class="register" @click="goRegister"> 
                注册
            </div>
            <div class="logon" @click="logon">
                登录
            </div>
        </template>
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
            userInfo:'userInfo',
            userToken:'userToken'
        })
    },
    methods:{
        logout(){
            this.$confirm('是否退出登录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                this.$store.commit('setUserInfo',{});
                this.$router.push({name:'blogList'});
            })
        },
        goSetting(){
            this.$router.push({name:'setting'})
        },
        goMyBlog(){
            this.$router.push({name:'myBlog'})
        },
        goRegister(){
            this.$router.push({name:'register'})
        },
        logon(){
            this.$router.push({name:'logon'})
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
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
}
</style>
