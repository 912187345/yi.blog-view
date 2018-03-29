<template>
  <div >
    <ul class="blog-list">
        <template v-for='item in blogList'>
            <blogListItem
                :key="item.blogId"
                :title="item.title"
                :username="item.username"
                :userHeadImg="item.userHeadImg"
                :date="item.date"
                :commentsLength="item.commentsLength"
                @click='goDetail(item)'>
            </blogListItem>
        </template>
        <div>
            <get-more-btn @getMore="getList" v-if="blogList.length >= 10"></get-more-btn>
        </div>
    </ul>
  </div>
</template>

<script>
import messageBoard from '../messageBoard/messageBoard'
import blogListItem from '../../components/blogListItem'
import getMoreBtn from '../../components/getMoreBtn';
import {mapState} from 'vuex'
export default {
    data(){
        return {
            text:'',
            blogList:[]
        }
    },
    created(){
        this.getList();
    },
    methods:{
        goDetail(item){
            this.$router.push({name:'blogDetail',params:{blogId:item.blogId}})
        },
        getList(){
            let params = {
                url:'/get-blog',
                param:{
                    offset:this.blogList.length,
                    limit:this.blogList.length+10
                }
            }
            this.$getApi.post(params)
            .then((data)=>{
                if( data.status = 'success' ){
                    this.blogList = this.blogList.concat(data.data)
                } else {

                    this.$notify.error({
                        title: '错误',
                        message: data.data
                    });
                }
            })
        }
    },
    components:{
        messageBoard,
        blogListItem,
        getMoreBtn
    }
}
</script>

<style lang='scss'>
.blog-list{
    @include blogList;
    background: none;
}
</style>
