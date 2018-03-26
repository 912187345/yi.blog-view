<template>
    <div class="blog-detail">
        <h1 class="title">
            {{ blog.title }}
        </h1>
        <detail-content :content="blog.content"></detail-content>
        <div>
            发表时间：<span>{{ blog.date }}</span>
        </div>
        <div>
            <div class="comments-title">评论</div>
                <ul class="comments-list">
                    <li v-for="(item,j) in blog.comments" class="comments-item" :key="item.id">
                        <div class="headImg">
                            <headImg
                                :src="item.commentsUser.headImg"
                                :w="'35px'"
                            ></headImg>
                        </div>
                        <div class="content">
                            <div class="userName">
                                {{ item.commentsUser.username }}
                            </div>
                            <div class="comments-content">
                                {{ item.commentsContent }}
                            </div>
                            <div class="date">
                                <div class="comments-date">
                                    发布时间：{{ item.commentsDate }}
                                </div>
                                <span>{{ item.replycomments.length }}条评论</span>
                                <div class="reply-icon">
                                    <img src="/icon/reply.svg">
                                </div>
                            </div>
                            <div class="btnWrap">
                                <a href="javascript:;" @click="reply(item,'replyMsg',j)">回复</a>
                                <a href="javasctipt:;" 
                                    v-if="userToken === item.commentsToken" 
                                    @click="deleteComments(item)">
                                删除</a>
                            </div>
                            <ul class="reply-wrap">
                                <li v-for="(replyItem) in item.replycomments" :key="replyItem.commentId">
                                    {{ replyItem.fromUser.username }} 回复 {{ replyItem.toUser.username }} : {{ replyItem.replyText }}
                                    时间: {{ replyItem.replyDate }} <a href="javascript:;" @click="reply(replyItem,'reply',j)">回复</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
        </div>
        <messageBoard
            v-if="false"
            placeholder="请输入评论内容"
            leftBtn="评论"
            v-model="text"
            @configBtn="sendComments()">
        </messageBoard>
    </div>

</template>

<script>
import messageBoard from '../messageBoard/messageBoard';
import detailContent from './detailContent';
import headImg from '../../components/headImg'
import {mapState,mapActions} from 'vuex';
export default {
    data(){
        return {
            id:this.$route.params.blogId,
            text:'',
            blog:{}
        }
    },
    computed:{
        ...mapState(['userToken','userInfo'])
    },
    created(){
        if( !this.id ){
            return this.$router.go(-1);
        }
        this.getBlogById(this.id);
    },
    methods:{
        sendComments(){
            if( !this.text ){
                return  alert('输入内容啊哥~')
            }
            let params = {
                url:'/blog-comments',
                param:{
                    text:this.text,
                    blogId:this.blog.blogId,
                    commentsName:this.$store.state.userInfo.username
                }
            }
            this.$getApi.post(params)
            .then((data)=>{
                if(data.status === 'success'){
                    this.blog.comments.push(data.data);
                }
            })
        },
        reply(item,type,index){
            this.$prompt('请输入您要回复的内容', '回复内容', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '请输入内容'
            }).then(({value})=>{
                let toName = item.commentsName ? item.commentsName:item.toName;
                let toToken = item.commentsToken ? item.commentsToken:item.toToken;
                let fromName = this.userInfo.username;
                let fromToken = this.userToken;
                let commentsId = item.id?item.id:item.commentsId;

                let params = {
                    url:'/reply-comments',
                    param:{
                        toToken:toToken,
                        fromToken:fromToken,
                        text:value,
                        commentsId:commentsId,
                        toName:toName,
                        fromName:fromName,
                        blogId:this.blog.blogId
                    }
                }
                this.$getApi.post(params)
                .then(rst=>{
                    if( rst.status === 'success' ){
                        if(!this.blog.comments[index].replycomments){
                            this.blog.comments[index].replycomments = [];
                        }
                        if( type === 'reply' ){
                            // let
                        }
                        this.blog.comments[index].replycomments.push(params.param);
                    }
                })
            }).catch((err) => {

                this.$message({ 
                    type: 'info',
                    message: err
                });       
            });
            
        },
        deleteComments(item){
            console.log(item);
            let params = {
                url:'/delete-comments',
                param:{
                    commentsId:item.id
                }
            }
            this.$getApi.post(params)
            .then(data=>{
                console.log(data);
                if( data.status === 'success' ){
                    this.blog.comments.forEach((ele, index) => {
                        if( ele.id === item.id ){
                            return this.blog.comments.splice(index, 1);                            
                        }
                    });
                }else{
                    this.$notify.error({
                        title: '错误',
                        message: '删除失败，请稍后重试'
                    });
                }
            },err=>{
                console.log(err);
            })
        },
        getBlogById(id){
            let params = {
                url:'/get-blog-by-id',
                param:{
                    id:id
                }
            }
            this.$getApi.post(params)
            .then((data)=>{
                console.log(data);
                if(data.status === 'success'){
                    this.blog = data.data;
                }
            })
        }
    },
    components:{
        messageBoard,
        detailContent,
        headImg
    }
}
</script>

<style lang='scss'>
.blog-detail{
    h1.title{
        margin-bottom: 30px;
    }
    @include blogList(750px);
    padding: 20px;
    .ql-container.ql-snow{
        border: none;
        .ql-editor{
            padding: 0;
        }
    }
}
.comments-title{
    text-align: center;
    color: #666666;
}
.comments-item{
    position: relative;
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #999;
    .content{
        margin-left: 10px;
        font-size: 15px;
        flex: 1;
    }
    .userName{
        font-size: 17px;
        color: #000000;
        font-weight: bolder;
        padding: 4px 0 6px;
    }
    .comments-content{
        color: #333;
        padding-bottom: 10px;
    }
    .btnWrap{
        position: absolute;
        right: 10px;
        top: 10px;
        >a{
            color: #666666;
        }
    }
    .date{
        display: flex;
        align-items:center;
        flex-direction: row-reverse;
        .reply-icon{
            width: 18px;
            height: 18px;
            margin-right: 4px;
        }
        .comments-date{
            margin-left: 26px;
        }
    }
    .reply-wrap{
        border: 1px solid #333;
    }
}
.ql-editor{
    img{
        width: 96%;
        margin: 0 auto;
    }
}
</style>
