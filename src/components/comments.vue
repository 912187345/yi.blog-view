<template>
    <ul class="comments-list">
        <li v-for="(item,j) in commentsList" class="comments-item" :key="item.id">
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
                        评论时间：{{ item.commentsDate }}
                    </div>
                    <span>{{ item.replycomments.length }}条回复</span>
                    <div class="reply-icon">
                        <img src="/icon/reply.svg">
                    </div>
                </div>
                <div class="btnWrap">
                    <a href="javascript:;" @click="$emit('reply',item,'replyMsg',j)">评论</a>
                    <a href="javasctipt:;" 
                        v-if="userToken === item.commentsToken" 
                        @click="$emit('deleteComments',item)">
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
                            <a href="javascript:;" class="replyBtn" @click="$emit('reply',replyItem,'reply',j)">回复</a>
                        </div>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</template>

<script>
import headImg from './headImg';
export default {
    props:['comments','userToken'],
    computed:{
        commentsList(){
            let comments = this.comments;
            if( !this.comments || !this.comments.length ){ return [] }
            comments.forEach((item,index)=>{
                if( item.replycomments && item.replycomments.length ){
                    item.replycomments.sort((a,b)=>{
                        let aTime = a.replyDate;
                        let bTime = b.replyDate;
                        return new Date(aTime).getTime() - new Date(bTime).getTime();
                    })
                }
            },this)
            return comments;
        }
    },
    components:{
        headImg
    }
}
</script>

<style>

</style>
