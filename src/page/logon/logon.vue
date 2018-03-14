<template>
  <div class="logonWrap">
    <div class="content">
      <el-input v-model="userName" placeholder="请输入用户名"></el-input>
      <el-input v-model="pwd" placeholder="请输入密码" :disabled='userName?false:true'></el-input>
      <el-button type="primary" @click='logon()' plain>登录</el-button>
      <router-link to="/register">
        <el-button type="primary" @click='logon()' plain>注册</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import test from '../test.vue';
  import editor from '../../components/editor'
  export default{
    data(){
      return {
        userName:'',
        pwd:'',
        respone:'',
        errMsg:''
      }
    },
    created(){
    },
    mounted(){
    },
    methods:{
      logon(){
        if( !this.pwd ){ return }
        var self = this;
        var params = {
            url:'/logon',
            param:{
              user:this.userName,
              pwd:this.pwd
          }
        }
        this.$getApi.post(params)
          .then(( data )=>{
            console.log(data);
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
      test,
      editor
    }
  }
</script>
<style lang='scss' scoped>
.logonWrap{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background:url('/icon/joker.jpg');
  .content{
    width: 300px;
    height: 300px;
    background: #ffffff;
    border-radius: 20px;
    @include center;
  }
}
</style>
