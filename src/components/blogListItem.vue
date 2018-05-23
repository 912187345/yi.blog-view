<template>
    <li class="blog-list-item" @click.stop="$emit('click')">
        <h3>
            {{ title }}
        </h3>
        <div class="content clearfix">
            <div class="user">
                <span class="headImg" :style="{backgroundImage:`url(${userHeadImg})`}">
                </span>
                <span>{{ username }}</span>
            </div>
            <div class="rightContent fr">
                <div class="date">
                <span>发布时间:</span>
                <span>{{ date }}</span>
            </div>
            <div class="comment marRight20">
                <img src="/icon/comment.png" class="icon" alt="">
                <span>{{ commentsLength }}</span>
            </div>
            <div class="collection marRight20">
                <img src="/icon/hart_cdcdcd.svg" class="icon" alt="">
                <span>{{ collectionLength || 0 }}</span>
            </div>
            </div>
            
            <div class="edit" v-if='edit === true'>
                <span @click.stop="$emit('edit')" class="editBtn">修改</span>
                <span @click.stop="$emit('delete')" class="deleteBtn">删除</span>
            </div>
        </div>
    </li>
</template>

<script>
import headImg from './headImg'
export default {
    props:['title','username','userHeadImg','date','commentsLength','edit','collectionLength'],
    components:{
        headImg
    }
}
</script>

<style lang="scss" scoped>
.blog-list-item{
    background: #ffffff;
    perspective:1000;
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
        transform: translate3d(-2px,-2px,5px);
    }
    >h3{
        font-size: 20px;
    }
    .icon{
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
        .fr{
            float: right;
        }
        .marRight20{
            margin-right: 20px;
        }
        >div>span{
            display: inline-block;
            vertical-align: middle;
        }
        .headImg{
            @include headCR;
            width: 40px;
            height: 40px;
            margin-right: 14px;
        }
    }
    .edit{
        position: absolute;
        right: 36px;
        top: 20px;
        .editBtn{
            margin-right: 20px;
        }
        >span{
            &:hover{
                transform: scale3d(1.1,1.1,1.1)
            }
        }
    }
    .rightContent{
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        margin-top: 8px;
    }
}


</style>
