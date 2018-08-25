<template>
       <el-row  class="Assistedform" >
            <el-form :model="Assistedform" :rules="rules"  ref="Assistedform"    label-width="200px" >
                 <el-form-item label="辅食食谱名称"  prop="name" >
                       <el-input  style="width:220px;"   v-model="Assistedform.name" ></el-input>
                 </el-form-item>
                  <el-form-item label="辅食材料" prop="title">
                       <el-input style="width:220px;" v-model="Assistedform.title"   ></el-input>
                  </el-form-item>
                 <el-form-item label="适龄阶段"  prop="stage" >
                         <el-select v-model="Assistedform.stage" placeholder="选择适龄阶段">
                            <el-option v-for="item in agegradesdata" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                 </el-form-item>
                 <el-form-item  label="辅食主图"  prop="picUrl" >
                          <el-upload
                                    :action="actionurl"
                                    :show-file-list="false"
                                    :limit='1'
                                    :on-success="Goodsuploadsuccesss"
                                    >
                                    <img v-if="commoditylurl" :src="commoditylurl" class="avatar">
                                    <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
                         </el-upload>
                         <span class="picturedescription">尺寸240*180</span>
                 </el-form-item>
                 <el-form-item label="辅食内容">
                         <div>
                            <iframe :src="iframehtml" ref="mybox" style="width:1100px;height:625px;" id="righticon" name="frmRpt"></iframe>
                        </div>
                 </el-form-item>
                  <div style="text-align: center">
                     <el-button type="primary" @click="submitdata()" >提交</el-button>

                  </div>

           </el-form>
      </el-row>
</template>
<script>
import {iframe} from "../../../static/iframe"
import {baseUrl} from '../../../static/baseUrl'
import {auxiliaryFoodarticleadd,auxiliaryFoodarticleedit} from'@/api/api'
import qs from 'qs'
export default {
    data(){
        return{
             EditID:'',//编辑发送的ID
             Editlist:null,
             mysession:'',
             actionurl: baseUrl+"/common/uploadFile",
            commoditylurl:'',
            isAdd:"",
            iframehtml:iframe+'/ueditor/index.html',
             Assistedform:{
                   name:'',
                   stage:'',
                   picUrl:'',
                   title:'',
             },
             rules:{
                name:[
                       { required: true, message: '辅食食谱名称', trigger: 'blur' },
                ],
                stage:[
                       { required: true, message: '选择合适的阶段', trigger: 'blur' },
                ],
               picUrl:[
                     { required: true, message: '选择辅食主图', trigger: 'blur' },
               ],
               title:[
                      { required: true, message: '填写辅食材料', trigger: 'blur' },
               ]


             },
             agegradesdata:[
                 {label:"6月",value:"6"},
                 {label:"7月",value:"7"},
                  {label:"8月",value:"8"},
                   {label:"9月",value:"9"},
                    {label:"10月",value:"10"},
                     {label:"11月",value:"11"},
                      {label:"12月",value:"12"},
                       {label:"13月",value:"13"},
                        {label:"14月",value:"14"},
                         {label:"15月",value:"15"},
                          {label:"16月",value:"16"},
                           {label:"17月",value:"17"},
                            {label:"18月",value:"18"},
                             {label:"19月",value:"19"},
                              {label:"20月",value:"20"},
                               {label:"21月",value:"21"},
                                {label:"22月",value:"22"},
                                 {label:"23月",value:"23"},
                                  {label:"24月",value:"24"},
                                   {label:"25月",value:"25"},
                                    {label:"26月",value:"26"},
                                     {label:"27月",value:"27"},
                                      {label:"28月",value:"28"},
                                       {label:"29月",value:"29"},
                                        {label:"30月",value:"30"},
                                         {label:"31月",value:"31"},
                                          {label:"32月",value:"32"},
                                           {label:"33月",value:"33"},
                                            {label:"34月",value:"34"},
                                             {label:"35月",value:"35"},
                                              {label:"36月",value:"36"},
             ],
        }
    },
      methods:{
         submitdata(){
              this.Assistedform.content=this.$refs.mybox.contentWindow.getContent2ParentPage()
                 var parms=this.Assistedform
                if(this.isAdd){
                this.$refs['Assistedform'].validate((valid)=>{
                      if(valid){
                          console.log(parms)
                          console.log(this.mysession)
                        auxiliaryFoodarticleadd(qs.stringify(parms),this.mysession).then(res=>{
                            console.log(this.mysession)
                              console.log(res)
                                if(res.data.code==1001){
                                    this.successgono()
                                    console.log(res)
                                   }
                             })
                          }
              })
                }else{
                         console.log("编辑")
                           parms.idx= this.EditID
                     auxiliaryFoodarticleedit(parms,this.mysession).then(res=>{
                             if(res.data.code==1001){
                                    this.successgono()
                                    console.log(res)
                                   }
                         })
                }
         },
        successgono(){
            this.$confirm('成功, 是否继续?', '提示', {
                            confirmButtonText: '继续添加',
                            cancelButtonText: '返回页面',
                            type: 'warning'
                        }).then(() => {
                            window.location.reload()  //如果继续添加就在当前页面
                            }).catch(() => {
                            this.$router.push("/Assistedfood")
                });
        },
      Goodsuploadsuccesss(res,file){//主商品展示图片
                 this.commoditylurl=""
                 this.commoditylurl=file.url
                if(res.code ==1001){
                    this.Assistedform.picUrl=res.data[0].fileUrl
                }
            },
           geteditlsit(){//得到编辑的
                  console.log(this.Editlist)
                   this.EditID=this.Editlist.idx
                   this.Assistedform.name=this.Editlist.name
                   this.Assistedform.picUrl=this.Editlist.picUrl
                   this.commoditylurl=`${baseUrl}/common/fileOut?url=${this.Editlist.picUrl}`
                   this.Assistedform.stage=this.Editlist.stage
                   this.$refs.mybox.contentWindow.setContent2Page(this.Editlist.content)
           }
      },
      mounted(){
           this.mysession = sessionStorage.getItem("sesstion");
           this.isAdd=this.$route.params.AssisistisAdd
           this.Editlist=this.$route.params.edidcontent
          if(this.isAdd==false){
             setTimeout(()=>{
                   this.geteditlsit()
              },500)
          }

      }
}
</script>
<style lang="scss" scoped >
      .Assistedform{
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
                border: 1px solid #8c939d
            }
            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
      }
</style>

