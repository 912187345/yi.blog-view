<template>
    <div>
        <el-input
            type="textarea"
            :rows="3"
            :placeholder="placeholder"
            v-model="text"
            :value="value"
            clearable>
        </el-input>
        <el-button type="primary" round @click="$emit('configBtn')">{{leftBtn}}</el-button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import top from '../myself/top'
export default {
    props:{
       placeholder:{type:[String], default:'请输入内容'},
       leftBtn:{ type:[String], default:'发送内容'},
       value:{type:[String,Number], default:''}
    },
    data(){
      return {
        text:''
      }
    },
    methods:{
        
    },
    watch:{
        'text':{
            handler(nV,oV){
                this.$emit('input',nV);
            },
            deep:true
        },
        'value':{
            handler(nV,oV){
                this.text = nV;
            },
            deep:true
        }
    }
}
</script>

<style>
.blog-list{
    list-style: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
}
.blog-list > li:hover{
    color: blue;
}
</style>
