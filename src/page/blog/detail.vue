<template>
    <div class="blog-detail"  v-loading="detailLoading">
        <div class="hart" @click="collection()">
            <i class="hartIcon" :style="{backgroundImage:`url(/icon/hart_gray.svg)`}"></i>
            <i class="hartIcon" :class="{ active:!blog.collection.collectionBol }" :style="{backgroundImage:`url(/icon/hart_active.svg)`}"></i>
            <div class="num">{{this.blog.collection.collectionNum}}</div>
        </div>
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
        <detail-content :content="blog.content" />
        <div class="lastupdateTime" v-if="blog.date !== blog.updateTime">最后更新时间：{{ blog.updateTime }}</div>
        <div>
            <div class="comments-title">评论</div>
                <messageBoard
                    v-loading="commentsLoading"
                    placeholder="请输入评论内容"
                    leftBtn="评论"
                    v-model="text"
                    @configBtn="sendComments()" 
                />
                <comments
                    :comments='blog.comments'
                    :userToken='userToken'
                    @deleteComments='deleteComments'
                    @reply='reply'
                />
        </div>
    </div>
</template>

<script>
import messageBoard from '../messageBoard/messageBoard';
import detailContent from './detailContent';
import headImg from '../../components/headImg';
import comments from '../../components/comments';
import {mapState,mapActions} from 'vuex';
export default {
    data(){
        return {
            id:this.$route.params.blogId,
            text:'',
            blog:{
                user:{},
                collection:{}
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
        ...mapActions({
                get_blog_by_id:'getBlogById',
                blogComments:'blogComments',
                delete_comments:'deleteComments',
                replyComments:'replyComments',
                service_collection:'collection'
            }),
        sendComments(){
            if( !this.text ){
                return  alert('输入内容啊哥~')
            }
            let params = {
                param:{
                    text:this.text,
                    blogId:this.blog.blogId,
                    commentsName:this.$store.state.userInfo.username
                }
            }
            this.commentsLoading = true;
            this.blogComments(params)
            .then((data)=>{
                this.commentsLoading = false;
                if(data.status === 'success'){
                    this.text = '';
                    let comments = data.data;
                    comments.commentsUser = {
                        headImg:this.$store.state.userInfo.headImg,
                        username:this.$store.state.userInfo.username
                    }
                    comments.commentsDate = data.data.commentsDate;
                    comments.replycomments=[]
                    this.blog.comments.push(comments);
                }else{
                    this.commentsLoading = false;
                    this.$message('提交失败，请稍后重试'); 
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
                    param:{
                        toToken:toToken,
                        fromToken:fromToken,
                        text:value,
                        commentsId:commentsId,
                        blogId:this.blog.blogId
                    }
                }
                this.replyComments(params)
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
                param:{
                    commentsId:item.id
                }
            }
            this.delete_comments(params)
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
                    id:id
                }
            this.detailLoading = true;
            this.get_blog_by_id(params)
            .then((data)=>{
                this.detailLoading = false;
                if(data.status === 'success'){
                    this.blog = data.data;
                }
            })
        },
        collection(){
            if( this.userToken === undefined ){ return }
            if( this.blog.collection.collectionBol ){
                this.blog.collection.collectionNum--;
                this.service_collection({type:'cancel',blogId:this.blog.blogId})
                .then(data=>{})
            }else{
                this.blog.collection.collectionNum++;
                this.service_collection({type:'add',blogId:this.blog.blogId})
                .then(data=>{})
            }
            this.blog.collection.collectionBol = !this.blog.collection.collectionBol;
        }
    },
    components:{
        messageBoard,
        detailContent,
        headImg,
        comments
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
            margin-bottom: 10px;
            padding-bottom: 10px;
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
    .lastupdateTime{
        text-align: right;
        font-size: 15px;
        color: #999;
        margin-top: 10px;
    }
    .hart{
        position: fixed;
        top: 260px;
        left: 70px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: #ebeef5;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid #dbdbdb;
        .active{
            opacity: 0;
        }
        >.hartIcon{
            display: block;
            width: 22px;
            height: 22px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            @include center;
        }
        .num{
            font-size: 10px;
            color: #ffffff;
            padding: 1px 6px;
            border-radius: 8px;
            background: #707070;
            text-align: center;
            position: absolute;
            right: -10px;
            top: -8px;
        }
    }
    .hart:hover > .active{
        opacity: 1;
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
            margin-left: 6px;
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
</style>
