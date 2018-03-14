<template>
  <div>
        <top></top>
        <ul class="blog-list">
            <li v-for='item in mesList' :key="item.token" @click='goDetail(item)'>
                博客标题&nbsp;&nbsp;&nbsp;{{ item.title }}
            </li>
        </ul>
        <messageBoard 
            v-model="text"
            @configBtn="sendBolg()">
        </messageBoard>
  </div>
</template>

<script>
import messageBoard from '../messageBoard/messageBoard'
import top from '../myself/top'
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
        sendBolg(){
            if( !this.text ){ return };
            this.$prompt('请输入博客标题', '最后一步', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '请输入标题'
            }).then(({ value }) => {

               let params = {
                    url:'/add-blog',
                    param:{
                        text:this.text,
                        title:value
                    }
                }
                this.$getApi.post(params)
                .then(data=>{
                    this.$store.commit('setBlogList',data.data);
                    this.text = '';
                },err=>{
                    console.log(err);
                })     
            }).catch(() => {

                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
            
        }
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
        messageBoard,
        top
    }
}
</script>

<style>

</style>
