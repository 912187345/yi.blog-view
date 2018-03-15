<template>
  <div>
      <div>
          <el-input v-model="title" placeholder="请输入标题"></el-input>
      </div>
      <editor v-model="content"></editor>
      <el-button type="primary" @click="sendBolg()">提交</el-button>
  </div>
</template>

<script>
import editor from '../../components/editor'
export default {
    data(){
        return {
            content:'',
            title:''
        }
    },
    methods:{
        sendBolg(){
            if( !this.content || !this.title ){
                return this.$message('请输入标题和内容');
            };
            let params = {
                url:'/add-blog',
                param:{
                    text:this.content,
                    title:this.title
                }
            }
            this.$getApi.post(params)
            .then(data=>{
                if( data.status === 'success' ){
                    let blog = {
                        title:this.title,
                        content:this.content
                    }
                    this.$router.push({name:'blogDetail',query:{blogId:data.data.blogId}});
                }else{
                    this.$message('提交失败，请稍后重试');
                }
            },err=>{
                this.$message('提交失败，请稍后重试');
            })
        }
    },
    components:{
        editor
    },
    destroyed(){
        this.content = '';
        this.title = '';
    }
}
</script>

<style>

</style>
