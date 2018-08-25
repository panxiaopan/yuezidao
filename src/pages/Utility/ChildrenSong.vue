<template>
    <el-row class="ChildrenSong">
        <el-col :span='24'>
            <div class="CurrentPage">实用工具<i class="el-icon-arrow-right"></i>儿歌列表</div>
        </el-col>
        <el-col :span="24" >
                 <el-form :inline="true">
                        <!--<el-form-item>
                             <el-input v-model="keyword" placeholder="关键词" ></el-input>
                        </el-form-item>
                        <el-form-item >
                             <el-button type="primary" size="small" @click="Seachsong"  >查询</el-button>
                        </el-form-item>-->
                        <el-form-item>
                              <el-radio-group v-model="type"   size="small" @change="changetype">
                                    <el-radio-button label="1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;儿歌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-radio-button>
                                    <el-radio-button label="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;故事&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-radio-button>
                                </el-radio-group>
                        </el-form-item>
                         <div style="float:right;display:inline-block"  >
                        <el-form-item>
                           <el-button type="primary" size="small"  @click="Addsong">新增</el-button>
                        </el-form-item>
                        </div>
                 </el-form>
        </el-col>
        <el-col :span="24">
              <el-table
                    :data="ChildrentableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    label="序号"
                    width="100">
                    </el-table-column>
                    <el-table-column
                       prop="title"
                       label="音频分类"
                       >
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="歌曲名称">
                    </el-table-column>
                   <el-table-column
                      label="创建时间">
                    <template slot-scope="scope">
                         {{timeFormattershowsecod(ChildrentableData[scope.$index].createTime)}}
                    </template>
                    </el-table-column>
                   <el-table-column
                      prop="address"
                      label="操作">
                             <template slot-scope="scope">
                                 <i class='my-icon edit' @click="ChildrenEdit(scope.$index, scope.row)" ></i>
                                 <i class='my-icon delete' @click="ChildrenDelete(scope.$index, scope.row)" ></i>
                             </template>
                    </el-table-column>
            </el-table>
            <div class="myPagination">
                    <el-pagination
                        layout="prev, pager, next,  total"
                        :total="totalNumber"
                        :page-size='pageSize'
                        @current-change='pageIndexChange'>
                    </el-pagination>
            </div>
        </el-col>
        <el-col :span="24">
              <el-dialog
                  title="增加"
                 :visible.sync="ChildrenDialogVisible"
                 width="30%"
                   @close="closeTypedialogVisible"
                >
               <el-form :model="formsong" class="demo-form-inline" label-width="100px">
                    <el-form-item label="标题">
                       <el-select v-model="formsong.songtype"  placeholder="请选择">
                                <el-option
                                    v-for="item in Sonetypedata"
                                    :key="item.idx"
                                    :label="item.title"
                                    :value="item.idx">
                                </el-option>
                        </el-select>
                         <el-button type="primary" size="small" @click="addtype" >添加类型</el-button>
                    </el-form-item>
                    <el-form-item label="上传音频">
                            <el-upload
                            :action="actionurl"
                            :show-file-list="false"
                            :on-success="VioceSuccess"
                            :before-upload="beforeAvatarUpload"
                            >
                             <span v-if="Viocename !==null" style="border:1px solid;display:inline-block;height:40px;width:320px"  >{{Viocename}}</span>
                             <i v-else  class="el-icon-plus " style="width:120px;border:1px solid #8c939d;height:38px;line-height:38px"></i>
                            </el-upload>
                    </el-form-item>
                     <el-form-item label="试听">
                         <audio :src="musicurl" controls></audio>
                     </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="SongAddsub"  size="mini" >确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                  :visible.sync="TypedialogVisible"
                  width="30%"
                >
                <el-form  :model="typeform"  class="typeform" >
                     <el-form-item label="音频类型">
                         <el-input v-model="typeform.title" ></el-input>
                    </el-form-item>
                    <el-form-item label="类型表述"  >
                         <el-input v-model="typeform.name"  ></el-input>
                    </el-form-item>
                    <el-form-item label="音乐背景图片"  >
                      <el-upload
                            class="avatar-uploader"
                            :action="actionurl"
                            :show-file-list="false"
                            :on-success="pageAvatarSuccess"
                            >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitype" size="mini" >确 定</el-button>
                </span>
            </el-dialog>
        </el-col>

    </el-row>
</template>
 <script>
  import {baseUrl} from '../../../static/baseUrl'
  import {classroomApiadd,childrengetList,childrensongadd,childrensongsearch,childrensongdel,childrensongedit} from '@/api/api'
  import {timeFormattershowsecod} from '@/assets/js/common'
  import qs from 'qs'
 export default {
     data(){
         return{
               timeFormattershowsecod,
               baseUrl,
               actionurl: baseUrl+"/common/uploadFile",
               imageUrl:null,
               type:'1',
               AddsongisAdd:true,
               ChildrenDialogVisible:false,
               TypedialogVisible:false,
               songtype:'',
               formsong:{
                   songtype:'',
                   viocefileurl:'',
               },
             typeform:{//添加的类型
                  title:'',
                  name:'',
                  isParent:0,
              },
              Sonetypedata:[],//下拉数组的类型
              Viocename:null,
              keyword:'',
              pageNo:1,
              pageSize:10,
              ChildrentableData:[],
              totalNumber:null,
              musicurl:'',//显示音乐文件
              EditId:'',//编辑时候的id
              iSADD:true,//判断是新增还是编辑
         }
     },
     methods:{
            Addsong(){//添加儿歌
                  this.ChildrenDialogVisible=true
                  this.iSADD=true
            },
          pageAvatarSuccess(res, file){//成功图片
               this.imageUrl = URL.createObjectURL(file.raw);
               this.typeform.imageUrl=res.data[0].fileUrl
           },
          VioceSuccess(res,file){//音频

                console.log(res)
                console.log(file)
                if(res.code==1001){
                      this.formsong.viocefileurl=res.data[0].fileUrl
                      this.Viocename=res.data[0].fileName
                      // this.imageUrl = `${baseUrl}/common/fileOut?url=${this.PROCode.url}`;
                       this.musicurl=`${baseUrl}/common/fileOut?url=${res.data[0].fileUrl}`

                }
          },
          SongAddsub(){//提交
                  var parms={
                       name:this.Viocename,
                       url:this.formsong.viocefileurl,
                       isParent:this.formsong.songtype,
                       type:this.type
                  }


              if(this.Viocename==null){
                   this.$message({
                       type:'error',
                       message:"数据正在上传,显示文件名称后才可提交"
                   })
              }else{
                   if(this.iSADD){
                        childrensongadd(qs.stringify(parms),this.mysession).then(res =>{
                            console.log("======")
                            console.log(parms)
                            console.log(res)
                            if(res.data.code==1001){
                                this.$message({
                                        type:'success',
                                        message:'添加成功'
                                    })
                                this.ChildrenDialogVisible=false
                                this.getchildrensongsearch()
                            }
                            })
                   }else{
                       //  this.parms.idx= this.EditId
                          var parmsedit={
                                name:this.Viocename,
                                url:this.formsong.viocefileurl,
                                isParent:this.formsong.songtype,
                                type:this.type,
                                idx:this.EditId
                          }
                      childrensongedit(qs.stringify(parmsedit),this.mysession).then(res=>{
                                     console.log("编辑")
                                     console.log(res)
                                     console.log()
                                     if(res.data.code==1001){
                                         this.$message({
                                             type:"success",
                                             message:'编辑成功'
                                         })
                                      this.ChildrenDialogVisible=false
                                     // this.getchildrensongsearch()
                                     }
                         })
                    }
               }
           },
          closeTypedialogVisible(){//关闭的时候清空原来的值
                 this.formsong.songtype='';
                 this.Viocename=null;
                 this.musicurl='';
          },
          addtype(){
                 this.TypedialogVisible=true;
            },
          submitype(){//提交规格,
                 this.typeform.type=this.type
                 var parms= this.typeform
                 classroomApiadd(qs.stringify(parms),this.mysession).then(res =>{
                            console.log(parms)
                            if(res.data.code==1001){
                                  this.$message({
                                      type:"success",
                                      message:'添加成功'
                                  })
                                 this.TypedialogVisible=false;
                                 this.changetype()
                            }
                     })
           },
           changetype(){//切换类型的时候,下拉的类型也在切换
                   var parms={
                          type:this.type
                     }
                childrengetList(parms,this.mysession).then(res=>{
                            if(res.data.code == 1001){
                                  this.Sonetypedata=res.data.data.items
                                  console.log("xialadebia")
                                  console.log(this.Sonetypedata)
                            }
                   })
                   this.getchildrensongsearch()
           },
           getchildrensongsearch(){//列表显示
                 this.ChildrentableData=[]
               var parms={
                      keyWord:this.keyword,
                      type:this.type,
                      pageNo:this.pageNo,
                      pageSize:this.pageSize,
                 }
                 childrensongsearch(qs.stringify(parms),this.mysession).then(res=>{
                                    console.log("-liebiao")
                                    console.log(res)
                              if(res.data.code==1001){
                                    this.ChildrentableData=res.data.data.items
                                    this.totalNumber=res.data.data.totalNum
                              }
                   })
           },
          ChildrenEdit(index){//编辑的
                console.log("编辑")
                 this.ChildrenDialogVisible=true;
                console.log(this.ChildrentableData[index])
                 this.iSADD=false
                 this.EditId=this.ChildrentableData[index].idx
                 this.Viocename=this.ChildrentableData[index].name
                 this.type=this.ChildrentableData[index].type
                 this.formsong.songtype=this.ChildrentableData[index].isParent
                 this.musicurl=`${baseUrl}/common/fileOut?url=${this.ChildrentableData[index].url}`
                 this.formsong.viocefileurl=this.ChildrentableData[index].url
          },
          beforeAvatarUpload(file){
                 console.log(file)
                   const isJPG = file.type === "mp3";
                   console.log("geshi"  )
                   console.log(isJPG)

/*              if (!isJPG) {
                 this.$message.error('上传音频只能是 mp3 格式!');
                     }
               return isJPG */
          },

          ChildrenhandleEdit(index){
                     console.log(this.ChildrentableData[index])
                     this.ChildrenDialogVisible=true

          },
          ChildrenDelete(index){
                     var parms={
                         idx:this.ChildrentableData[index].idx
                     }
                     console.log(parms)
                   childrensongdel(qs.stringify(parms),this.mysession).then(res=>{
                           console.log(res)
                           if(res.data.code==1001){
                               this.$message({
                                   type:'success',
                                   message:'删除成功'
                               })
                              this.getchildrensongsearch()
                           }
                   })
          },
          Seachsong(){//查询
               this.getchildrensongsearch()
          },
          pageIndexChange(index){//翻页
               this.pageNo=index
               this.getchildrensongsearch()
          },

     },
     mounted(){
            this.mysession = sessionStorage.getItem("sesstion");
            this.changetype()
            this.getchildrensongsearch()
     }
 }
 </script>



<style lang="scss"   scoped>
      .ChildrenSong {
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
           .typeform{
               .el-input{
                   width: 220px;
               }
           }
      }

</style>

