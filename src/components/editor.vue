<template>
    <div class="quill-wrap">
        <quill-editor 
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption">
        </quill-editor>
    </div>
</template>

<script>

import { quillEditor,Quill } from 'vue-quill-editor';
import ImageDrop from './ImageDrop.js';

Quill.register('modules/imageDrop', ImageDrop);
var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['image', 'video']
    ]
export default {
    props:{
        placeholder:{type:String, default:'请输入内容'},
        value:{type:[String,Number], default:''}
    },
    data () {
      return {
        content: '',
        editorOption: {
          placeholder:this.placeholder,
          modules:{
            imageDrop:true,
            toolbar: toolbarOptions
          }
          // imageResize: {}
        },
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
    components: {
        quillEditor
    }
}
</script>

<style>

</style>
