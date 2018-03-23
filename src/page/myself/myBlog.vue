<template>
  <ul class="myBlog-list">
      <template v-for="item in myBlogList" v-if='myBlogList.length'>
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
      <template v-else>
          <div>
              你还没有写过东西~，快去写一个吧
          </div>
      </template>
  </ul>
</template>

<script>
import blogListItem from '../../components/blogListItem'
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
            myBlogList:[]
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
                }
            })
    },
    components:{
        blogListItem
    }
}
</script>

<style lang="scss" scoped>
.myBlog-list{
    @include blogList;
}
</style>
