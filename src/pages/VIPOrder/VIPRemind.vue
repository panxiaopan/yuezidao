<template>
  <el-row class="VipRmind">
         <el-col :span='24'>
             <div class="CurrentPage">VIP管理<i class="el-icon-arrow-right"></i>今日提醒</div>
          </el-col>
          <el-col :span="24">
                   <el-form :inline="true"   :model="TodyValidateForm" ref="breedValidateForm"    label-width="100px" class="demo-ruleForm">
                            <el-form-item style="display:block" label="状态">
                                  <el-radio-group   v-model="pregnantStatus" @change="changeAdd" >
                                    <el-radio label="1" border>怀孕中</el-radio>
                                    <el-radio label="2" border>宝宝出生了</el-radio>
                                 </el-radio-group>
                            </el-form-item>
                             <div v-if="toggle==1">
                                <el-form-item
                                    label="设置怀孕周数"   
                                >
                                    <el-input   v-model="TodyValidateForm.pregnancyWeeks" auto-complete="off" placeholder="怀孕周数"></el-input>
                                </el-form-item>
                                <el-form-item label="天数">
                                    <el-input  v-model="TodyValidateForm.birthDays" auto-complete="off" placeholder="怀孕天数"></el-input>
                                </el-form-item>
                            </div>
                            <div v-if="toggle==2">
                                <el-form-item label="设置出生天数">
                                        <el-input v-model="TodyValidateForm.birthDays" auto-complete="off"></el-input>
                                </el-form-item>
                            </div>
                         <div>
                             <el-form-item 
                             label="类别"
                             >
                              <el-select v-model="SelectType">
                                   <el-option label="待办事项" value="1" ></el-option> 
                                   <el-option label="每日亲子互动" value="3" ></el-option> 
                                   <el-option label="每日小贴事" value="2" ></el-option> 
                              </el-select>
                             </el-form-item>
                         </div>
                         <div>
                         <el-form-item
                         label="*标题">
                              <el-input v-model="headline"></el-input>
                         </el-form-item>
                         </div>                      
                   </el-form>
                    <div style="padding-left:74px"> 
                      <div style="height:40px;line-height:40px;color:#c0c4cc">*下面二选一即可</div>
                    <el-radio-group v-model="selectlink" >
                        <div style="margin-bottom:20px">
                            <el-radio label="1">跳转连接</el-radio>
                               <span>
                                 <el-input v-model="jumpLink"  style="display:inline-block;width:200px;margin-left:20px" disabled="disabled" ></el-input>
                                 <el-button type="primary" size="small" style="margin-left:60px"  @click="SelectCloudlist">选择</el-button>
                               </span>
                         </div> 
                        <div><el-radio label="2">编辑内容</el-radio></div>
                    </el-radio-group> 
                     <div style="margin-top:10px;" >
                         <div style="color:#c0c4cc;margin-bottom:10px">内容主图</div>
                          <el-upload
                                    :action="actionurl"
                                    :show-file-list="false"
                                    :limit='1'
                                    :on-success="Goodsuploadsuccesss"
                                    >
                                    <img v-if="commoditylurl" :src="commoditylurl" class="avatar">
                                    <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
                         </el-upload>   
                     </div>
                       <div style="margin-top:20px" >
                            <iframe :src="iframehtml" ref="mybox" style="width:1100px;height:620px;" id="ueditor" name="frmRpt"></iframe>
                        </div> 
                    </div>
                   <div ><el-button style="float:right;margin-right:100px; " type="primary"  @click="SubmitVIPRemind"  >提交</el-button> </div> 
          </el-col>
          <el-col :span="24">
               <el-dialog
                    title="云课堂列表"
                    :visible.sync="CloudDialogVisible"
                    width="60%"
                   >
                  <el-table
                     :data="ClodlistData"
                      style="width: 100%"
                      border
                      highlight-current-row
                     @current-change="handleCurrentChange"
                      >
                   <el-table-column
                     type="index"
                     width="55">
                    </el-table-column> 
                    <el-table-column
                      label="主图"
                      width="100">
                        <template slot-scope="scope">
                          <span v-if="ClodlistData[scope.$index].classroomType==1"><img :src="`${baseUrl}/common/fileOut?url=${ClodlistData[scope.$index].url}`" style="dispaly:inline-block;width:40px;height:40px"></span>
                          <span v-if="ClodlistData[scope.$index].classroomType==2" >
                           <video  :src="`${baseUrl}/common/fileOut?url=${ClodlistData[scope.$index].url}`"  width="40" height="40" >
                          </video>
                        </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="课程名称"
                     prop="title"
                     width="120">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="所属专家">
                    </el-table-column>
                    <el-table-column
                    width="180"
                      prop="idx"
                      label="课程ID">
                    </el-table-column>
                   <el-table-column
                      label="课程分类">
                     <template slot-scope="scope" >
                          <span v-if="ClodlistData[scope.$index].category==1">亲子教育</span>
                          <span v-if="ClodlistData[scope.$index].category==2">宝宝护理</span>
                          <span v-if="ClodlistData[scope.$index].category==3">妈妈护理</span>
                     </template>
                    </el-table-column>
                    <el-table-column
                      label="课程性质">
                       <template slot-scope="scope">
                             <span v-if="ClodlistData[scope.$index].classroomType==1">图文</span>  
                             <span v-if="ClodlistData[scope.$index].classroomType==2">视频</span>  
                       </template>

                    </el-table-column>
                    <el-table-column
                      prop="state"
                      label="上下架">
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      label="价格">
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
                    <span slot="footer" class="dialog-footer">
                       <el-button @click="CloudDialogVisible = false"  size=small>取 消</el-button>
                        <el-button size="small"   type="primary" @click="SelectCloudidx">确 定</el-button>
                    </span>
             </el-dialog>         
          </el-col>
  </el-row>
</template>
<script>
 import {CloudclasssearchBack,remindadd,remindedit} from "@/api/api"
 import qs from "qs"
 import {baseUrl} from '../../../static/baseUrl' 
 import {iframe} from "../../../static/iframe"
export default {
      data(){
           return{
               baseUrl,
               iframehtml:iframe+'/ueditor/index.html',
               actionurl: baseUrl+"/common/uploadFile",
               lastradio:null,
               totalNumber:null,
               CloudDialogVisible:false,
               jumpLink:'',//选中的idx
               selectlink:'',
               headline:'',
               SelectType:'3',
               pregnantStatus:"1",
               toggle:1,
               commoditylurl:"",
               TodyValidateForm:{
                   pregnancyWeeks:'',
                   birthDays:'',
               },
               ClodlistData:[],
               pageNo:1,
               pageSize:10,
               Currow:null,//选中的条数的id
               VIPitemImg:'',//编辑时候的图
               TodayAdd:null,
               TodayDetails:null,//点击详情的时候,跳过来接受参数
               TodayEditID:"",
           }
      },
      methods:{
           changeAdd(value){//选择
              this.toggle=value
              if(value=2){
                 this.TodyValidateForm.pregnancyWeeks ="";
              }
           },
      getClodList(){//列表显示
               var mysession = sessionStorage.getItem("sesstion");
               var parms={
                    pageNo:this.pageNo,
                    pageSize:this.pageSize
                  }
             CloudclasssearchBack(qs.stringify(parms),mysession).then(res=>{
                          this.ClodlistData=[]
                       if(res.data.code==1001){
                            this.totalNumber=res.data.data.totalNum
                       //    this.ClodlistData=res.data.data.items 
                          res.data.data.items.forEach((item,index)=>{
                                this.ClodlistData.push(item) 
                      })
                   }    
              })
           }, 
          pageIndexChange(index){//翻页
                 this.pageNo=index
                 this.getClodList()
                 
           },
           SelectCloudlist(){//点击选择弹框显示,选择对应的idx
                this.CloudDialogVisible=true;
           },
          SelectCloudidx(){//点击确定的时候id赋给页面的值
                  this.jumpLink= this.Currow.idx
                  this.CloudDialogVisible=false;
          },  
         handleCurrentChange(value) {//单选选中的一行拿到idx
            this.Currow=value
          },    
         Goodsuploadsuccesss(res,file){//主商品展示
                 this.commoditylurl=""
                this.commoditylurl=file.url
                if(res.code ==1001){
                  this.VIPitemImg= res.data[0].fileUrl
                }
          }, 
         SubmitVIPRemind(){//提交内容
               var mysession = sessionStorage.getItem("sesstion");  
               var parms={
                     pregnantStatus:this.pregnantStatus,
                     pregnancyWeeks:this.TodyValidateForm.pregnancyWeeks,
                     birthDays:this.TodyValidateForm.birthDays,
                     type:this.SelectType,
                     picUrl: this.VIPitemImg,
                     title:this.headline,
                     jumpLink:this.jumpLink,
                     editType:this.selectlink,
                     content:this.$refs.mybox.contentWindow.getContent2ParentPage()
               }
            if(this.TodayAdd==false){
                      parms.idx=this.TodayEditID  
                remindedit( qs.stringify(parms),mysession).then(res=>{
                        if(res.data.code==1001){
                            this.successgono()
                        }else{
                            this.$message({
                                type:'error',
                                message:'编辑失败,从新填写参数'
                            })
                        }
                     }) 
            }else{
              remindadd(qs.stringify(parms),mysession).then(res=>{
                         if(res.data.code==1001){
                            this.successgono()
                       }else{
                            this.$message({
                                type:"error",
                                message:"添加失败,从新填写参数"
                            })
                       }
                  }) 
             } 
           },
          successgono(){
                      this.$confirm('添加成功, 是否继续?', '提示', {
                                    confirmButtonText: '继续添加',
                                    cancelButtonText: '返回页面',
                                    type: 'warning'
                                    }).then(() => {
                                        window.location.reload()  //如果继续添加就在当前页面 
                                      }).catch(() => {
                                        this.$router.push("/VipOrder")        
                          });
                  },
          getTodayDetails(){//编辑得到详情的所有内容.--今日提醒
              console.log("详情")
              console.log(this.TodayDetails)


                 if(this.TodayDetails.pregnantStatus==1){
                       this.pregnantStatus="1"
                       this.toggle=1  
                       this.TodyValidateForm.pregnancyWeeks=this.TodayDetails.pregnancyWeeks
                       this.TodyValidateForm.birthDays=this.TodayDetails.birthDays
                }else  {
                       this.toggle=2
                       this.pregnantStatus="2";
                       this.TodyValidateForm.birthDays=this.TodayDetails.birthDays
                }
               
                 this.headline=this.TodayDetails.title;
                 this.SelectType=String(this.TodayDetails.type)
                 if(this.TodayDetails.editType==2){
                          this.selectlink="2"
                          this.commoditylurl=`${baseUrl}/fileOut?url=${this.TodayDetails.picUrl}`
                          this.VIPitemImg=this.TodayDetails.picUrl 
                          this.$refs.mybox.contentWindow.setContent2Page(this.TodayDetails.content)
                   }else{
                          this.jumpLink=this.TodayDetails.jumpLink
                           this.selectlink="1"
                   } 
                    this.TodayEditID=this.TodayDetails.idx//编辑的时候发一个idx
            },
      },
      mounted(){
           this.getClodList() 
           this.TodayAdd=this.$route.params.TodayAdd
           this.TodayDetails=this.$route.params.id//接受编辑时候带过来的参数
            if(this.TodayDetails !==undefined||null){
                 setTimeout(()=>{ //为了抓去编辑器显示
                     this.getTodayDetails()  
               },500) 
            }

      }
}
</script>
<style lang="scss" scoped>
       .VipRmind{
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
                border:1px solid #8c939d;
            }
            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
       }
</style>