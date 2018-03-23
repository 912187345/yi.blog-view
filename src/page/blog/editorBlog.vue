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
            title:'',
            edit:this.$route.params.edit || false
        }
    },
    created(){
        if( this.edit === true ){
            this.getBlogById();
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
            if( this.edit === true ){
                params.url = '/edit-blog';
                params.param.blogId = this.$route.params.blogId;
            }
            this.$getApi.post(params)
            .then(data=>{
                if( data.status === 'success' ){
                    if( this.edit === true ){
                        var blogId = this.$route.params.blogId;
                    }else{
                        var blogId = data.data.blogId
                    }
                    this.$router.push({name:'blogDetail',params:{blogId:data.data.blogId}});
                }else{
                    this.$message('提交失败，请稍后重试');
                }
            },err=>{
                this.$message('提交失败，请稍后重试');
            })
        },
        getBlogById(){
            let params = {
                url:'/get-blog-by-id',
                param:{
                    id:this.$route.params.blogId
                }
            }
            this.$getApi.post(params)
            .then((data)=>{
                if(data.status === 'success'){
                    this.content = data.data.content;
                    this.title = data.data.title;
                }
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
