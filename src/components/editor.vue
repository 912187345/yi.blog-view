<template>
    <div>
        <quill-editor 
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
        </quill-editor>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
    props:{
        placeholder:{type:String, default:'请输入内容'},
        value:{type:[String,Number], default:''}
    },
    data () {
      return {
        content: '',
        editorOption: {
          placeholder:this.placeholder
        }
      }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      onEditorBlur(quill) {
        // console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        // console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        // console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        // console.log('editor change!', quill, html, text)
        // this.content = html
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    watch:{
        content(nV,oV){
            this.$emit('input',nV);
        },
        value(nV){
            this.content = nV;
        }
    },
    mounted() {
      // console.log('this is current quill instance object', this.editor)
    },
    components: {
        quillEditor
    }
}
</script>

<style>

</style>
