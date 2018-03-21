<template>
    <li class="blog-list-item" @click="$emit('click')">
        <h3>
            {{ title }}
        </h3>
        <div class="content clearfix">
            <div class="user">
                <span class="headImg" :style="{backgroundImage:`url(${user.headImg})`}">
                </span>
                <span>{{ user.username }}</span>
            </div>
            <div class="date">
                <span>发布时间:</span>
                <span>{{ date }}</span>
            </div>
            <div class="comment">
                <img src="/icon/comment.png" class="commentIcon" alt="">
                <span>{{ commentsLength }}</span>
            </div>
            <div class="edit" v-if='edit === true'>
                <span @click="$emit('edit')">修改</span>
                <span @click="$emit('delete')">删除</span>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props:['title','user','date','commentsLength','edit']
}
</script>

<style lang="scss" scoped>
.blog-list-item{
    position: relative;
    cursor: pointer;
    padding: 16px;
    border: 1px solid skyblue;
    border-radius: 6px;
    margin-bottom: 10px;
    transition: 0.2s;
    box-shadow: 0px 0px 10px 0px skyblue inset;
    &:hover{
        color: #ffffff;
        background: skyblue;   
        border-color: skyblue; 
    }
    >h3{
        font-size: 20px;
    }
    .commentIcon{
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
    }
    .content{
        margin-top: 20px;
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
        .headImg{
            @include headCR;
            width: 30px;
            height: 30px;
        }
    }
}


</style>
