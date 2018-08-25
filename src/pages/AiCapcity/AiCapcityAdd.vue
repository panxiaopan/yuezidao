<template>
    <el-row  class="AriticleAdd">
           <el-col :span='24'>
                <div class="CurrentPage">Ai智能<i class="el-icon-arrow-right"></i>异常文章管理增加</div>
            </el-col>
             <el-form :model="AriticleForm" ref="AriticleForm"  :rules="rules"     class="Ariticleclass" label-width="200px" >
                  <el-form-item label="类别">
                           <el-radio v-model="AriticleForm.category" label="1">新生儿</el-radio>
                           <el-radio v-model="AriticleForm.category" label="2">产妇</el-radio>
                  </el-form-item>
                  <el-form-item  label="关键词" prop="keyWord">
                          <el-input v-model="AriticleForm.keyWord"></el-input>
                  </el-form-item>
                  <el-form-item  label="文章标题" prop="title">
                          <el-input v-model="AriticleForm.title"></el-input>
                  </el-form-item>
                  <el-form-item  label="文章主图" prop="url">
                        <el-upload
                              class="avatar-uploader"
                             :action="CommodityImages"
                             :show-file-list="false"
                             :on-success="handleAvatarSuccess"
                             >
                              <img v-if="imageUrl" :src="imageUrl" class="avatar">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                  </el-form-item>
                  <el-form-item label="文章内容" >
                           	<iframe :src="iframehtml" ref="mybox" style="width:1100px;height:620px;" id="righticon" name="frmRpt"></iframe>
                  </el-form-item>
                  <div style="float:right"><el-button type="primary"  @click="submitArticle">提交</el-button></div>
            </el-form>
    </el-row>
</template>
<script>
 import{articleadd,articleupdate} from '@/api/api'
 import qs from "qs"
 import {baseUrl} from '../../../static/baseUrl'
 import {iframe} from "../../../static/iframe"
export default {
    data(){
        return{
           AiCapcityisAddget:"",
           AriticleForm:{
                 category:'1',
                 keyWord:'',
                 title:''
           },
            CommodityImages:baseUrl+'/common/uploadFile',
            iframehtml:iframe+'/ueditor/index.html',
            imageUrl:"",
            mysession:"",
            getcontent:null,
            EditID:'',
        }
    },
     computed:{//计算属性.验证
          rules(){
              return{
                   keyWord:[
                         { required: true, message: "输入关键词", trigger: "blur" }
                   ],
                   title:[
                         { required: true, message: "输入文章标题", trigger: "blur" }
                   ],
                   url:[
                       { required: true, message: "上传文章主图", trigger: "blur" }
                   ]
              }
          }
     },
    methods:{
      handleAvatarSuccess(res, file) {//图片上传,
              this.imageUrl = file.url;
              console.log(res)
              if(res.code==1001){
                  this.AriticleForm.url=res.data[0].fileUrl
              }
         },
         submitArticle(){//提交数据
                this.AriticleForm.content = this.$refs.mybox.contentWindow.getContent2ParentPage()
                var parms=this.AriticleForm

              if(this.AiCapcityisAddget){
                    this.$refs['AriticleForm'].validate((valid) =>{
                        if(valid){
                            articleadd(qs.stringify(parms),this.mysession).then(res=>{
                                    console.log(res)
                                    if(res.data.code==1001){
                                            this.successgono()
                                        }
                                    })
                                }
                            })
              }else{
                      this.AriticleForm.idx=this.EditID
                    articleupdate(qs.stringify(parms),this.mysession).then(res=>{
                                if(res.data.code==1001){
                                     this.successgono()
                                }
                    })
              }
         },
        successgono(){
            this.$confirm('添加成功, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            window.location.reload()  //如果继续添加就在当前页面
                            }).catch(() => {
                            this.$router.push("/Article")
                });
        },
        getEditcontent(){
              console.log("--------------")
              console.log(this.getcontent)
               this.AriticleForm.category=String(this.getcontent.category)
               this.AriticleForm.keyWord=this.getcontent.keyWord
               this.AriticleForm.title=this.getcontent.title
               this.$refs.mybox.contentWindow.setContent2Page(this.getcontent.content)
               this.AriticleForm.url=this.getcontent.url
               this.imageUrl=`${baseUrl}/common/fileOut?url=${this.getcontent.url}`
               this.EditID=this.getcontent.idx
            /*    console.log() */
        },

    },
    mounted(){
          this.mysession = sessionStorage.getItem("sesstion");
          this.AiCapcityisAddget=this.$route.params.ArticleisAdd
          this.getcontent=this.$route.params.Aritclecontent
          if(this.AiCapcityisAddget !==true){
             setTimeout(()=>{
                      this.getEditcontent()
                },500)
          }
    },

}

</script>

<style lang="scss"  scoped>
      .AriticleAdd{
          .Ariticleclass{
              .el-input{
                  width: 200px;
              }
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
                     border: 1px solid #8c939d;
                }
                .avatar {
                    width: 178px;
                    height: 178px;
                    display: block;
                }
          }
      }
</style>
