<template>
  <div>
        <ul class="blog-list">
            <li v-for='item in mesList' :key="item.token" @click='goDetail(item)'>
                博客标题&nbsp;&nbsp;&nbsp;{{ item.title }}
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

<style>

</style>
