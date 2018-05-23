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
                    :collectionLength='item.collectionLength'
                    @edit="editBlog(item)"
                    @delete="deleteBlog(item)"
                    @click='goDetail(item)'>
                </blogListItem>
        </template>
        <template v-if='showNone'>
            <tips
                content='空空如也什么也木有~，快去写一个吧！'
                imgSrc='/icon/notFind.svg'
            />
        </template>
        <div class="more-wrap">
            <get-more-btn @getMore="getList" v-if="myBlogList.length > 10"></get-more-btn>
            <i class="el-icon-loading loading" v-if="loading"></i>
        </div>
    </div>
</template>

<script>
import blogListItem from '../../components/blogListItem';
import getMoreBtn from '../../components/getMoreBtn';
import tips from '../../components/noListTips';
import {mapActions} from 'vuex'
export default {
    methods:{
        ...mapActions({getBlogList:'getBlogList',delBlog:'deleteBlog'}),
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
                    blogId:item.blogId
                }
                this.delBlog(params)
                .then((rst)=>{
                    if( rst.status === 'success' ){
                        for( let i = 0, len = this.myBlogList.length; i < len; i++ ){
                            if( item.blogId === this.myBlogList[i].blogId ){
                                this.myBlogList.splice(i,1);
                                if( this.myBlogList.length === 0 ){
                                    this.showNone = true;
                                }
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
                    myBlog:true,
                    offset:this.myBlogList.length,
                    limit:this.myBlogList.length+10
                }
            this.loading = true;
            this.getBlogList(params)
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
        getMoreBtn,
        tips
    }
}
</script>

<style lang="scss" scoped>
.myBlog-list{
    @include blogList;
    background: none;
    .more-wrap{
        text-align: center;
        .loading{
            font-size: 30px;
        }
    }
}
</style>
