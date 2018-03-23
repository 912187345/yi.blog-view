<template>
  <div class="blog-list">
    <ul>
        <template v-for='item in mesList'>
            <blogListItem
                :key="item.blogId"
                :title="item.title"
                :user="item.user"
                :date="item.date"
                :commentsLength="item.commentsLength"
                @click='goDetail(item)'>
            </blogListItem>
        </template>
    </ul>
  </div>
</template>

<script>
import messageBoard from '../messageBoard/messageBoard'
import blogListItem from '../../components/blogListItem'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            text:''
        }
    },
    computed:{
        ...mapState({
            mesList:'blogList'
        })
    },
    methods:{
        goDetail(item){
            this.$router.push({name:'blogDetail',params:{blogId:item.blogId}})
        },
    },
    mounted(){
        let params = {
            url:'/get-blog'
        }
        this.$getApi.post(params)
        .then((data)=>{
            if( data.status = 'success' ){
                
                this.$store.commit('setBlogList',data.data);
            } else {

                this.$notify.error({
                    title: '错误',
                    message: data.data
                });
            }
        })
    },
    components:{
        messageBoard,
        blogListItem
    }
}
</script>

<style lang='scss' scoped>
.blog-list{
    @include blogList;
}
</style>
