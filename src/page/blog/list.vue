<template>
  <div class="blog-list">
    <ul>
        <li class="item" v-for='item in mesList' :key="item.blogId" @click='goDetail(item)'>
            <h3>{{ item.title }}</h3>
            <div class="content clearfix">
                <div class="user">
                    <span>作者:</span>
                    <span>{{ item.user.username }}</span>
                </div>
                <div class="date">
                    <span>发布时间:</span>
                    <span>{{ item.date }}</span>
                </div>
                <div class="comment">
                    <img src="/icon/comment.png" class="commentIcon" alt="">
                    <span>{{ item.commentsLength }}</span>
                </div>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import messageBoard from '../messageBoard/messageBoard'
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
            console.log(data);
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
        messageBoard
    }
}
</script>

<style lang='scss' scoped>
.blog-list{
    background: #ffffff;
    width: $centerW;
    margin: 0 auto;
    font-size: 16px;
    h3{
        font-size: 20px;
    }
    .item{
        position: relative;
        cursor: pointer;
        padding: 10px;
        border: 1px solid gray;
        border-radius: 6px;
        margin-bottom: 4px;
        transition: 0.2s;
        &:hover{
            color: #ffffff;
            background: skyblue;   
            border-color: skyblue; 
        }
    }
    .commentIcon{
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
    }
}
.content{
    margin-top: 10px;
    .user{
        float: left;
    }
    .comment,.date{
        float: right;
    }
    .comment{
        margin-right: 20px;
    }
    >div>span{
        display: inline-block;
        vertical-align: middle;
    }
}
</style>
