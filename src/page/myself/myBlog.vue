<template>
  <ul>
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
            alert('delete');
            let params = {
                url:'/delete-blog',
                param:{
                    blogId:item.blogId
                }
            }
            this.$getApi.post(params)
            .then((rst)=>{
                console.log(rst);
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

<style>

</style>
