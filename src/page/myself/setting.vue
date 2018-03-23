<template>
    <div class="settingWrap">
        <el-upload
            class="upload-demo"
            drag
            action="/api/upload-head-image"
            :file-list="fileList"
            :data="uploadParams"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :limit="1"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
import {mapState} from 'vuex'
 export default {
    data() {
      return {
        fileList: [],
      };
    },
    computed:{
        ...mapState(['userToken']),
        uploadParams(){
            return {
                token:this.userToken
            }
        }
    },
    methods: {
        uploadSuccess(res,file){
            console.log(res);
            if( res.status === 'success' ){
                this.$store.commit('setUserHead',res.data.headImg);
                this.$message({
                    message: '上传头像成功~',
                    type: 'success'
                });
            }else{
                this.$message('上传失败，请稍后重试');
            }
        },
        uploadError(){
            this.$message('上传失败，请稍后重试');
        }
    }
  }
</script>

<style lang='scss'>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.settingWrap{
    width: $centerW;
    margin: 0 auto;
}
</style>
