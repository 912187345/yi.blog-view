<template>
    <div id="top">
        <div class="top">
            <div class="githubIcon">
                <a href="https://github.com/912187345/yi.blog-view">
                    <img src="/icon/GitHub.svg" alt="github">
                </a>
            </div>
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
                <div class="writeImg">
                    <img src="/icon/writeBlog.svg" alt="">
                </div>
                <router-link to="/editorBlog">
                    写博客
                </router-link>
            </div>
            <div>
                <router-link to="/blogList">
                    首页
                </router-link>
            </div>
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
 background: #ffffff;
 margin-bottom: 20px;
}   
.top{
    display: flex;
    flex-direction: row-reverse;
    padding: 4px 30px;
    width: $centerW;
    margin: 0 auto;
    align-items:center;
    min-height: 60px;
    font-size: 18px;
    &>div{
        margin-right: 20px;
        cursor: pointer;
        >a{
            color: #333;
        }
    }
    .githubIcon{
        width: 24px;
    }
    .writeImg{
        display: inline-block;
        width: 20px;
        vertical-align: middle;
    }
}
.writeBtn{
    margin-right: 26px;
    font-weight: bolder;
    >a{   
        color: #043f61 !important;
    }
    &:hover{
        transform: scale(1.1);
    }
}
.header{
    width: 60px;
    height: 60px;
    @include headCR;
}
</style>
