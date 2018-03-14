<template>
  <div>
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
    <div>
        <el-button type="primary" @click='submit()'>注册</el-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
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
    methods:{
        submit(){
            for( let i in this.param ){
                if(!this.param[i]){
                    this.$message('请填写完整信息')
                    return;
                }
            }
            let params = {
                url:'/register',
                param:this.param
            }
            this.$getApi.post(params)
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
    }
}
</script>

