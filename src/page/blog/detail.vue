<template>
    <div class="blog-detail"  v-loading="detailLoading">
        <h1 class="title">
            {{ blog.title }}
        </h1>
        <div class="userInfo">
            <div class="userHead" :style="{backgroundImage:`url(${blog.user.headImg})`}">
            </div>
            <div>
                <div>{{blog.user.username}}</div>
                <div class="date">{{ blog.date }}</div>
            </div>
        </div>
        <detail-content :content="blog.content"></detail-content>
        <div>
            <div class="comments-title">评论</div>
                <messageBoard
                    v-loading="commentsLoading"
                    placeholder="请输入评论内容"
                    leftBtn="评论"
                    v-model="text"
                    @configBtn="sendComments()">
                </messageBoard>
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
                                <a href="javascript:;" @click="reply(item,'replyMsg',j)">评论</a>
                                <a href="javasctipt:;" 
                                    v-if="userToken === item.commentsToken" 
                                    @click="deleteComments(item)">
                                删除</a>
                            </div>
                            <ul class="reply-wrap" v-show="item.replycomments.length !== 0">
                                <li v-for="replyItem in item.replycomments" :key="replyItem.commentId">
                                    <div class="headImg left" :style="{backgroundImage:`url(${replyItem.fromUser.headImg})`}">
                                    </div>
                                    <div class="right">
                                        <div class="reply-user">
                                            {{ replyItem.fromUser.username }}
                                            <template v-if="replyItem.toUser">&nbsp;回复&nbsp;&nbsp;
                                                <div class="headImg" :style="{backgroundImage:`url(${replyItem.toUser.headImg})`}">
                                                </div>
                                                {{ replyItem.toUser.username }}
                                            </template>
                                        </div>
                                        <div>
                                            <p class="reply-content"> {{ replyItem.replyText }} </p>
                                            <div class="reply-date">
                                            {{ replyItem.replyDate }} 
                                            </div>
                                        </div>
                                        <a href="javascript:;" class="replyBtn" @click="reply(replyItem,'reply',j)">回复</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
        </div>
        
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
            blog:{
                user:{}
            },
            detailLoading:true,
            commentsLoading:false
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
            this.commentsLoading = true;
            this.$getApi.post(params)
            .then((data)=>{
                this.commentsLoading = false;
                if(data.status === 'success'){
                    this.text = '';
                    let comments = data.data;
                    comments.commentsUser = {
                        headImg:this.$store.state.userInfo.headImg,
                        username:this.$store.state.userInfo.username
                    }
                    comments.commentsDate = data.data.date;
                    comments.replycomments=[]
                    this.blog.comments.push(comments);
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
                let toToken = item.commentsToken ? item.commentsToken:item.fromToken;
                let fromToken = this.userToken;
                let commentsId = item.id?item.id:item.commentsId;
                if(type === 'replyMsg'){
                    toToken = '';
                }
                let params = {
                    url:'/reply-comments',
                    param:{
                        toToken:toToken,
                        fromToken:fromToken,
                        text:value,
                        commentsId:commentsId,
                        blogId:this.blog.blogId
                    }
                }
                this.$getApi.post(params)
                .then(rst=>{
                    if( rst.status === 'success' ){
                        if(!this.blog.comments[index].replycomments){
                            this.blog.comments[index].replycomments = [];
                        }
                        let reply = rst.data;
                        reply.fromUser = {
                            headImg:this.$store.state.userInfo.headImg,
                            username:this.$store.state.userInfo.username,
                        };
                        if(type !== 'replyMsg'){
                            reply.toUser = {
                                headImg:item.fromUser.headImg,
                                username:item.fromUser.username,
                            };
                        }
                        this.blog.comments[index].replycomments.push(reply);
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
            let params = {
                url:'/delete-comments',
                param:{
                    commentsId:item.id
                }
            }
            this.$getApi.post(params)
            .then(data=>{
                if( data.status === 'success' ){
                    this.blog.comments.forEach((ele, index) => {
                        if( ele.id === item.id ){
                            return this.blog.comments.splice(index, 1);                            
                        }
                    });
                }else{
                    this.$message({
                        message: '删除失败，请稍后重试',
                        type: 'warning'
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
            this.detailLoading = true;
            this.$getApi.post(params)
            .then((data)=>{
                this.detailLoading = false;
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
    border-radius: 6px;
    border:1px solid #ebeef5;
    box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
    h1.title{
        margin-bottom: 20px;
    }
    @include blogList(750px);
    padding: 20px;
    .ql-container.ql-snow{
        border: none;
        font-size: 15px;
        .ql-editor{
            padding: 0;
        }
    }
    .userInfo{
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-bottom: 20px;
        .userHead{
            width: 40px;
            height: 40px;
            margin-right: 10px;
            @include headCR;
        }
        .date{
            font-size: 12px;
            color: #999;
        }
    }
    .reply-wrap{
        padding: 15px;
        border: 1px solid $gray;
        margin-top: 6px;
        >li{
            display: flex;
            position: relative;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom:1px solid $gray;
            &:last-child{
                border-bottom: none;
            }
            &:hover .replyBtn{
                display: block;
            }
            >div{
                width: 100%;
            }
        }
        .left.headImg{
            margin-right: 10px;
        }
        .headImg{
            @include headCR;
            width: 27px;
            height: 27px;
            margin-right: 4px;
        }
        .reply-user{
            display: flex;
            align-items: center;
        }
        .reply-date{
            font-size: 13px;
            color: #999;
            text-align: right;
        }
        .reply-content{
            padding: 4px 0;
        }
        .replyBtn{
            color: #999;
            position: absolute;
            right: 10px;
            top: 10px;
            display: none;
            &:hover{
                color: skyblue;
                text-decoration: underline;
            }
        }
    }
    .comments-list{
        margin-top: 36px;
    }
}
.comments-title{
    text-align: center;
    color: #666666;
    margin-bottom: 16px;
    margin-top: 20px;
}
.comments-item{
    position: relative;
    padding: 10px;
    display: flex;
    border-bottom: 1px solid $gray;
    &:last-child{
        border-bottom: none;
    }
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
}
.ql-editor{
    img{
        width: 96%;
        margin: 0 auto;
    }
}
</style>
