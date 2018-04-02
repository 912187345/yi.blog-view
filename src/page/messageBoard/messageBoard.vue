<template>
    <div @click="clickBoard($event)" class="mes-board clearfix">
        <el-input
            type="textarea"
            :rows="3"
            :placeholder="placeholder"
            v-model="text"
            :value="value"
            resize='none'
            @focus='focus'
            clearable>
        </el-input>
        <el-button type="primary" v-if="showBtn" @click="$emit('configBtn')">{{leftBtn}}</el-button>
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
    mounted(){
        document.addEventListener('click',this.closeBtn)
    },
    data(){
      return {
        text:'',
        showBtn:false
      }
    },
    methods:{
        focus(){
            this.showBtn = true;
        },
        closeBtn(){
            this.showBtn = false;
        },
        clickBoard(e){
            e.stopPropagation();
        }   
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
    },
    destroyed(){
        document.removeEventListener('click',this.closeBtn);
    }
}
</script>

<style lang='scss' scoped>
.mes-board{
    background: #f8f9fa;
    border: 1px solid #f1f1f1;
    padding: 14px;
    border-radius: 6px;
    >button{
        float: right;
        margin-top: 10px;
    }
    textarea{
        resize: none;
    }
}
</style>
