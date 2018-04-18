<template>
  <div class="logon-wrap">
    <div class="content">
      <div class="title">
        <!-- 易.博客 -->
      </div>
      <div class="userName">
        <el-input v-model="userName" placeholder="请输入用户名"></el-input>
      </div>
      <el-input v-model="pwd" type="password" placeholder="请输入密码" :disabled='userName?false:true'></el-input>
      <div class="btnWrap">
        <el-button type="primary" @click='logon()' plain>登录</el-button>
        <router-link to="/register">
          <el-button type="primary" @click='logon()' plain>注册</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import editor from '../../components/editor'
  import {mapActions} from 'vuex'
  export default{
    data(){
      return {
        userName:'',
        pwd:'',
        respone:'',
        errMsg:''
      }
    },
    mounted(){
      document.addEventListener('keydown',this.logon)
    },
    methods:{
      ...mapActions({service_logon:'logon'}),
      logon(event){
        if( event && event.keyCode !== 13 ){ return }
        if( !this.pwd ){ return }
        var self = this;
        var param={
            user:this.userName,
            pwd:this.pwd
        }
        this.service_logon(param)
        .then(( data )=>{
          if(data.status === 'success'){

            this.$store.commit('setUserInfo',data.data);
            this.$router.push({name:'blogList'});
          }else{
            
            this.$notify.error({
              title: '错误',
              message: data.errMsg
            });
          }
        })
      }
    },
    components:{
      editor
    },
    destroyed(){
      document.removeEventListener('keydown',this.logon)
    }
  }
</script>
<style lang='scss' scoped>
.logon-wrap{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  
  .content{
    width: 350px;
    height: 300px;
    padding: 0 30px;
    background: #ffffff;
    border-radius: 10px;
    position: relative;
    .userName{
      margin: 20px 0 18px;
    }
    @include center;
  }
  .btnWrap{
    position: absolute;
    bottom: 30px;
    right: 30px;
    &>button{
      margin-right: 20px;
    }
  }
  .title{
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
  }
}
</style>
