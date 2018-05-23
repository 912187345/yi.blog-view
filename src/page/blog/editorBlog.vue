<template>
  <div class="createBlog clearfix" v-loading.fullscreen.lock="commitLoading">
      <div class="title">
          <el-input v-model="title" placeholder="请输入标题"></el-input>
      </div>
      <editor v-model="content" class="main"></editor>
      <el-button type="primary" class="configBtn" @click="sendBolg()">提交</el-button>
  </div>
</template>

<script>
import editor from '../../components/editor';
import {mapActions} from 'vuex';
export default {
    data(){
        return {
            content:'',
            title:'',
            edit:this.$route.params.edit || false,
            commitLoading:false
        }
    },
    created(){
        if( this.edit === true ){
            this.getBlogById();
        }
    },
    methods:{
        ...mapActions({addBlog:'addBlog',get_blog_by_id:'getBlogById'}),
        sendBolg(){
            if( !this.content || !this.title ){
                return this.$message('请输入标题和内容');
            };
            let params = {
                param:{
                    text:this.content,
                    title:this.title
                }
            }
            if( this.edit === true ){
                params.type = 'edit';
                params.param.blogId = this.$route.params.blogId;
            }
            this.commitLoading = true;
            this.addBlog(params)
            .then(data=>{
                this.commitLoading = false;
                if( data.status === 'success' ){
                    if( this.edit === true ){
                        var blogId = this.$route.params.blogId;
                    }else{
                        var blogId = data.data.blogId
                    }
                    this.$router.push({name:'blogDetail',params:{blogId:blogId}});
                }else{
                    this.commitLoading = false;
                    this.$message('提交失败，请稍后重试');
                }
            })
            .catch(err=>{
                this.commitLoading = false;
                this.$message('提交失败，请稍后重试');
            })
        },
        getBlogById(){
            let params = {
                    id:this.$route.params.blogId                
                }
            this.get_blog_by_id(params)
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
    },
    watch:{
        '$route'(nV){
            if( nV.name === 'createBlog' ){
                this.title = '';
                this.content = '';
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.createBlog{
    @include blogList;
    padding: 14px;
    border-radius: 6px;
    border:1px solid #ebeef5;
    box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    .title{
        margin-bottom: 10px;
    }
    .configBtn{
        float: right;;
    }
    .main{
        margin-bottom: 10px;
    }
}
</style>
<style lang='scss'>
.ql-editor{
    min-height: 400px;
    img{
        width:auto;
        display:inline-block;
    }
}
</style>

