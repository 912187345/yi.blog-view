<template>
    <div class="myBlog-list">
        <template v-for="item in myBlogList" v-if='myBlogList.length !== 0'>
            <blogListItem
                    :key="item.blogId"
                    :title="item.title"
                    :user="item.user"
                    :date="item.date"
                    :commentsLength="item.commentsLength"
                    :edit=true
                    @edit="editBlog(item)"
                    @delete="deleteBlog(item)"
                    @click='goDetail(item)'>
                </blogListItem>
        </template>
        <template v-if='showNone'>
            <div class="tips">
                <img src="/icon/notFind.svg" alt="">
                空空如也什么也木有~，快去写一个吧！
            </div>
        </template>
        <div class="more-wrap">
            <get-more-btn @getMore="getList" v-if="myBlogList.length > 10"></get-more-btn>
            <i class="el-icon-loading loading" v-if="loading"></i>
        </div>
    </div>
</template>

<script>
import blogListItem from '../../components/blogListItem'
import getMoreBtn from '../../components/getMoreBtn';
export default {
    methods:{
        editBlog(item){
            this.$router.push({name:'editorBlog',params:{blogId:item.blogId,edit:true}})
        },
        deleteBlog(item){
            this.$confirm('确定要删除此博客？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let params = {
                    url:'/delete-blog',
                    param:{
                        blogId:item.blogId
                    }
                }
                this.$getApi.post(params)
                .then((rst)=>{
                    if( rst.status === 'success' ){
                        for( let i = 0, len = this.myBlogList.length; i < len; i++ ){
                            if( item.blogId === this.myBlogList[i].blogId ){
                                this.myBlogList.splice(i,1);
                                break;
                            }
                        }
                    }
                })
            })
        },
        goDetail(item){
            this.$router.push({name:'blogDetail',params:{blogId:item.blogId}})
        },
        getList(){
            let params = {
                url:'/get-blog',
                param:{
                    myBlog:true,
                    offset:this.myBlogList.length,
                    limit:this.myBlogList.length+10
                }
            }
            this.loading = true;
            this.$getApi.post(params)
            .then(data=>{
                this.loading = false;
                if( data.status === 'success' ){

                    this.myBlogList = this.myBlogList.concat(data.data);
                    if( data.data && data.data.length === 0 ){
                        this.showNone = true;
                    }
                }else{
                    this.$message({
                        message: '获取列表失败，请稍后重试',
                        type: 'warning'
                    });
                }
            })
        }
    },
    data(){
        return{
            myBlogList:[],
            showNone:false,
            loading:true
        }
    },
    created(){
        this.getList();
    },
    components:{
        blogListItem,
        getMoreBtn
    }
}
</script>

<style lang="scss" scoped>
.myBlog-list{
    @include blogList;
    background: none;
    .tips{
        background: #ffffff;
        text-align: center;
        font-size: 20px;
        display: flex;
        justify-content:center;
        align-items: center;
        height: 400px;
        >img{
            width: 60px;
            height: 60px;
            margin-right: 16px;
        }
    }
    .more-wrap{
        text-align: center;
        .loading{
            font-size: 30px;
        }
    }
}
</style>
