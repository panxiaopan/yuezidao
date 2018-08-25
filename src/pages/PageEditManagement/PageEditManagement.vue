<template>
    <el-row class="Pageediting">
        <el-col :span="24">
           <div class="CurrentPage">页面编辑<i class="el-icon-arrow-right"></i>主页面</div> 
        </el-col>
         <el-col :span="24">
               <el-table
                    :data="PagetableData"
                    border
                    style="width: 100%">
                        <el-table-column
                            label="分类"
                            prop="name"
                            width="180">
                        </el-table-column>
                         <el-table-column label="封面图">
                                <template slot-scope="scope">
                                      <img  style="width:100px;height:50px"  :src="`${baseUrl}/common/fileOut?url=${PagetableData[scope.$index].picUrl}`" alt="">  
                                </template>
                        </el-table-column>                      
                         <el-table-column 
                         prop="size"
                         label="尺寸要求(需自行修剪)">
                        </el-table-column>     
                        <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                     size="mini"
                                     type="primary"
                                    @click="handleEdit(scope.$index, scope.row)">更换图片</el-button>
                                </template>
                        </el-table-column>
                </el-table>
                 
                <el-dialog
                    title="图片上传"
                    :visible.sync="PageDialogVisible"
                    width="15%"
                    center>
                     <el-upload
                        class="avatar-uploader"
                        :action="actionurl"
                        :show-file-list="false"
                        :on-success="pageAvatarSuccess"
                         >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                     <span slot="footer" class="dialog-footer">
                    
                        <el-button type="primary" @click="submitPage">确 定</el-button>
                    </span>
                </el-dialog>

        </el-col>
    </el-row>
</template>
<script>
  import {broadcastadd,broadcastget} from "@/api/api"
  import {baseUrl} from '../../../static/baseUrl' 
  import qs from "qs"
export default {
    data(){
        return{
            baseUrl,
             actionurl: baseUrl+"/common/uploadFile",
             imageUrl:'',
             PageDialogVisible:false,
             sort:'',
             PagetableData:[
                      {
                          name:"首页",
                          picUrl:"",
                          size:"750*260"
                      },
                     {
                          name:"住院照护",
                          picUrl:'',
                          size:"690*220"
                      },
                      {
                          name:"上门到家", 
                          picUrl:'',
                          size:"690*220"  
                      }, 
                       {
                          name:"预约到店",
                          picUrl:'',
                          size:"690*220"
                       }, 
                        {
                          name:"住店尊享",
                          picUrl:'',
                          size:"690*220"
                       }, 
                        {
                          name:"智护套餐",
                          picUrl:'',
                          size:"690*220"
                        },                          
                         {
                          name:"月子餐",
                          picUrl:'',
                          size:"690*220"
                        }, 
                      {
                          name:"专护人员",
                          picUrl:'',
                          size:"690*220"
                        },  
                       {
                          name:"早幼教",
                          picUrl:'',
                          size:"690*220"
                        },   
                        
                       
             ],
        }
    },
    methods:{
           handleEdit(index){   //更换图片  
                this.PageDialogVisible=true
                this.sort=index+1
           },
        submitPage(){
                  var mysession = sessionStorage.getItem("sesstion");
               var parms ={
                        picUrl:this.picUrl,
                        sort:this.sort
                    }
            broadcastadd(qs.stringify(parms),mysession).then(res=>{
                    console.log(res)
                   if(res.data.code==1001){
                       this.$message({
                           type:"success",
                           message:'更改成功'
                       })
                       this.getbroadcastget()
                        this.PageDialogVisible=false
                   }
                   
            }) 
        },
         pageAvatarSuccess(res, file){//成功
           this.imageUrl = URL.createObjectURL(file.raw);
             console.log(res)
             this.picUrl=res.data[0].fileUrl
         },
        getbroadcastget(){//列表
             var mysession = sessionStorage.getItem("sesstion");
           broadcastget(mysession).then(res=>{
                res.data.data.items.forEach((item,index)=>{
                        switch(String(item.sort)){
                            case "1":
                            this.PagetableData[0].picUrl=item.picUrl
                            break ;
                            case "2":
                            this.PagetableData[1].picUrl=item.picUrl
                            break ;
                            case "3":
                            this.PagetableData[2].picUrl=item.picUrl
                             break ;
                             case "4":
                             this.PagetableData[3].picUrl=item.picUrl
                             break ;
                             case "5":
                             this.PagetableData[4].picUrl=item.picUrl
                            break ;
                            case　"6":
                            this.PagetableData[5].picUrl=item.picUrl
                             break ;
                            case "7":
                            this.PagetableData[6].picUrl=item.picUrl
                            break ;
                            case '8':
                            this.PagetableData[7].picUrl=item.picUrl
                              break ;
                            case '9':
                             this.PagetableData[8].picUrl=item.picUrl
                               break ;
                        }
                   })
            })
        },
    },
    mounted(){
            this.getbroadcastget()
    },
}
</script>
<style lang="scss"scoped>
       .Pageediting{
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
                border: 1px  solid #8c939d;
            }
            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
       }
</style>


