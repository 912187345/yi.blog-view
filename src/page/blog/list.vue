<template>
  <div class="blog-list">
      <el-card class="box-card">
        <ul>
            <li class="item" v-for='item in mesList' :key="item.token" @click='goDetail(item)'>
                <h3>{{ item.title }}</h3>
                <div>
                    <span>发布者</span>
                </div>
            </li>
        </ul>
      </el-card>
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
            this.$router.push({name:'blogDetail',query:{blogId:item.blogId}})
        },
    },
    mounted(){
        let params = {
            url:'/get-blog'
        }
        this.$getApi.post(params)
        .then((data)=>{

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
        padding: 20px;
    }
    .item{
        cursor: pointer;
        transition: 0.2s;
        &:hover{
            color: #ffffff;
            background: skyblue;    
        }
    }

}
</style>
