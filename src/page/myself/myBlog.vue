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
        <div>
            <get-more-btn v-if="myBlogList.length >= 10"></get-more-btn>
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
                        for( let i = 0, len = this.myBlogList; i < len; i++ ){
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
        }
    },
    data(){
        return{
            myBlogList:[],
            showNone:false
        }
    },
    created(){
        let params = {
                url:'/get-blog',
                param:{
                    myBlog:true
                }
            }
            this.$getApi.post(params)
            .then(data=>{
                if( data.status === 'success' ){

                    this.myBlogList = data.data;
                    if( data.data && data.data.length === 0 ){
                        this.showNone = true;
                    }
                }
            })
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
        font-size: 18px;
    }
}
</style>
