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
        <div class="more-wrap">
            <get-more-btn @getMore="getList" v-if="blogList.length > 10"></get-more-btn>
            <i class="el-icon-loading loading" v-if="loading"></i>
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
            blogList:[],
            loading:false
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
            this.loading = true;
            this.$getApi.post(params)
            .then((data)=>{
                this.loading = false;
                if( data.status === 'success' ){
                    this.blogList = this.blogList.concat(data.data)
                } else {

                    this.$message({
                        message: '获取列表失败，请稍后重试',
                        type: 'warning'
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
    .more-wrap{
        text-align: center;
        .loading{
            font-size: 30px;
        }
    }
}
</style>
