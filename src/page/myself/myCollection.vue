<template>
    <div class="myCollection">
        <template v-for='item in list'>
            <blogListItem
                :key="item.blogId"
                :title="item.title"
                :username="item.username"
                :userHeadImg="item.userHeadImg"
                :date="item.date"
                :commentsLength="item.commentsLength"
                :collectionLength='item.collectionLength'
                @click='goDetail(item)'>
            </blogListItem>
        </template>
        <template v-if='showNone'>
            <tips 
                content='还没有收藏的文章~'
            />
        </template>
        <div class="more-wrap">
            <get-more-btn @getMore="getList" v-if="list.length > 10"></get-more-btn>
            <i class="el-icon-loading loading" v-if="loading"></i>
        </div>
    </div>
</template>

<script>
import blogListItem from '../../components/blogListItem';
import getMoreBtn from '../../components/getMoreBtn';
import tips from '../../components/noListTips';
import {mapActions} from 'vuex'
export default {
    mounted(){
        this.getCollection()
        .then(data=>{
            console.log('collection',data);
        })
    },
    methods:{
        ...mapActions({getCollection:'getCollection'}),
        getList(){
            this.loading = true;
            let param = {
                offset:this.list.length,
                limit:this.list.length+10
            }
            this.getCollection(param)
            .then(data=>{
                this.loading = false;
                if( data.status === 'success' ){
                    this.list = this.list.concat(data.data);
                    if( this.list.length === 0 ){
                        this.showNone = true;
                    }
                } else {
                    this.$message({
                        message: '获取列表失败，请稍后重试',
                        type: 'warning'
                    });
                }
            })
            .catch(err=>{
                this.loading = false;
                this.$message({
                    message: '获取列表失败，请稍后重试',
                    type: 'warning'
                });
            })
        },
        goDetail(item){
            this.$router.push({name:'blogDetail',params:{blogId:item.blogId}})
        }
    },
    data(){
        return {
            list:[],
            loading:false,
            showNone:false
        }
    },
    created(){
        this.getList();
    },
    components:{
        blogListItem,
        getMoreBtn,
        tips
    }
}
</script>

<style lang="scss">
.myCollection{
    @include blogList;
    background: none;
    .tips{
        background: #ffffff;
        text-align: center;
        font-size: 20px;
        display: flex;
        justify-content:center;
        align-items: center;
        height: 400px;
        >img{
            width: 60px;
            height: 60px;
            margin-right: 16px;
        }
    }
}
</style>
