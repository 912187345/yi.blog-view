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
            console.log(item);
        },
        deleteBlog(item){
            console.log(item);
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
    comments:{
        blogListItem
    }
}
</script>

<style>

</style>
