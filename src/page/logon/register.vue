<template>
  <div class="register-wrap">
    <div class="content">
        <el-input v-model="param.userName" placeholder="请输入用户名"></el-input>
        <el-input v-model="param.pwd" placeholder="请输入密码"></el-input>
        <el-input v-model="param.email" placeholder="请输入邮箱地址"></el-input>
        <el-select v-model="param.sex" placeholder="请选择性别">
            <el-option
                :value='"boy"'
                :label='"男"'>
            </el-option>
            <el-option
                :value='"girl"'
                :label='"女"'>
            </el-option>
        </el-select>
        <div class="btnWrap">
            <el-button type="primary" @click='submit()' plain>确认</el-button>
        </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import {mapActions} from 'vuex';
export default {
    data(){
        return{
            param:{
                userName:'',
                pwd:'',
                email:'',
                sex:''
            }
        }
    },
    mounted(){
        document.addEventListener('keydown',this.submit)
    },
    methods:{
        ...mapActions({register:'register'}),
        submit(event){
            if( event && event.keyCode !== 13 ){ return }
            for( let i in this.param ){
                if(!this.param[i]){
                    this.$message('请填写完整信息')
                    return;
                }
            }
            if( !(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(this.param.email)) ){
                this.$message('请输入正确的邮箱');
                return;
            }
            this.register(this.param)
            .then(data=>{
                if( data.status === 'success' ){

                    this.$store.commit('setUserInfo',data.data);
                    this.$router.push({name:'blogList'});
                }else{
                    this.$message(data.errMsg);
                }
            },err=>{
                this.$message('注册失败，请稍后重试')
            })
        }
    },
    destroyed(){
        document.removeEventListener('keydown',this.submit)
    }
}
</script>
<style lang="scss" scoped>
.register-wrap{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .content{
    width: 350px;
    height: 320px;
    padding: 0 30px;
    background: #ffffff;
    border-radius: 10px;
    position: relative;
    &>.el-input,&>.el-select{
        margin-top: 20px;
    }
    @include center;
  }
  .btnWrap{
    position: absolute;
    bottom: 30px;
    right: 30px;
  }
}
</style>

