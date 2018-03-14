<template>
    <div>
        <div>
            id: <span>{{ blog.blogId }}</span>
        </div>
        <div>
            标题：<span>{{ blog.title }}</span>
        </div>
        <div>
            内容：<div v-html="blog.content">
                </div>
        </div>
        <div>
            发表时间：<span>{{ blog.date }}</span>
        </div>
        <div>
            评论：
                <ul>
                    <li v-for="(item,j) in blog.comments" :key="item.id">
                        作者：{{ item.commentsName }}  
                        内容：{{ item.commentsContent }}
                        <a href="javascript:;" @click="reply(item,'replyMsg',j)">回复</a> 
                        <a href="javasctipt:;" 
                            v-if="userToken === item.commentsToken" 
                            @click="deleteComments(item)">
                        删除</a>
                        <ul>
                            <li v-for="(replyItem,i) in item.replycomments" :key="replyItem.commentId">
                                {{ replyItem.fromName }} 回复 {{ replyItem.toName }} : {{ replyItem.replyText }}
                                时间: {{ replyItem.replyDate }} <a href="javascript:;" @click="reply(replyItem,'reply',i)">回复</a>
                            </li>
                        </ul>
                    </li>
                </ul>
        </div>
        <messageBoard
            placeholder="请输入评论内容"
            leftBtn="评论"
            v-model="text"
            @configBtn="sendComments()">
        </messageBoard>
    </div>

</template>

<script>
import messageBoard from '../messageBoard/messageBoard';
import {mapState,mapActions} from 'vuex';
export default {
    data(){
        return {
            id:this.$route.query.blogId,
            text:'',
            blog:{}
        }
    },
    computed:{
        ...mapState(['userToken','userInfo'])
    },
    created(){
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
        reply(item,index){
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

                        console.log(this.blog);
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
                if(data.status === 'success'){
                    this.blog = data.data;
                }
            })
        }
    },
    components:{
        messageBoard
    }
}
</script>

<style lang='scss'>

</style>
