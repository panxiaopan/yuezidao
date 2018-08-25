<template>
    <el-row >
       <el-col :span='24'>
           <div class="CurrentPage">用户管理<i class="el-icon-arrow-right"></i>用户列表</div>
            <el-form :inline="true">
                  <el-form-item>
                      <el-input v-model="name" placeholder="用户名称"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-select  v-model="childbirthStatus">
                        <el-option  label="怀孕中" value="1"></el-option>
                         <el-option label="已分娩" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                    <el-form-item>
                            <div class="block">
                                <el-date-picker
                                v-model="Seachtime"
                                type="daterange"
                                range-separator="至"
                                value-format="timestamp"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                    </el-form-item>
                    <el-form-item>
                        <button class='search-btn'  @click="Seeabout"  >
                            <i class='search-btn-icon' ></i>
                        </button>
                    </el-form-item>
         </el-form>
        <el-col :span="24">
                 <el-table
                    :data="UsertableData"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="用户ID"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="用户名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号">
                    </el-table-column>
                     <el-table-column
                        prop="integration"
                        label="积分值">
                    </el-table-column>
                     <el-table-column
                        prop="phone"
                        label="孕育状态">
                     <template slot-scope="scope">
                          <span v-if="UsertableData[scope.$index].childbirthStatus==1">怀孕中</span>
                          <span v-if="UsertableData[scope.$index].childbirthStatus==2">已分娩</span>
                     </template>
                    </el-table-column>
                    <el-table-column label="预产日期/分娩日期">
                               <template slot-scope="scope">
                                    <span v-if="UsertableData[scope.$index].childbirthStatus==1">{{timeFormattershow(UsertableData[scope.$index].giveBabyTime)}}</span>
                                     <span v-if="UsertableData[scope.$index].childbirthStatus==2">{{timeFormattershow(UsertableData[scope.$index].childbirthTime)}}</span>

                               </template>
                    </el-table-column>
                     <el-table-column
                        prop="phone"
                        label="用户等级">
                      <template slot-scope="scope">
                          <span v-if="UsertableData[scope.$index].userType==1">普通用户</span>
                          <span v-if="UsertableData[scope.$index].userType==2">VIP用户</span>
                      </template>
                    </el-table-column>
                     <el-table-column
                        prop="phone"
                        label="注册时间">
                     <template slot-scope="scope">
                         <span>{{timeFormattershowsecod(UsertableData[scope.$index].createTime)}}</span>
                     </template>
                    </el-table-column>
                    <el-table-column label="操作">
                           <template slot-scope="scope">
                                 <i class="my-iconpan  detailspic"  @click="Detailslook(scope.$index,scope.row)"></i>
                           </template>
                    </el-table-column>
            </el-table>
                  <div class="myPagination">
                        <el-pagination
                                layout="prev, pager, next,  total"
                                :total="totalNumber"
                                :page-size='pageSize'
                                @current-change='pageIndexChangepRcod'>
                       </el-pagination>
                 </div>
        </el-col>
          <el-dialog
                :title="username +'的信息'"
                :visible.sync="dialogVisible"
                 width="540px"
                 center
                >
                <div class="messageborder">妈妈信息</div>
                <div  class="leftmessagege   messagemother">
                   <div class="contentmessage"><span class="namemess">头像:</span><img :src="motherheadphoto"  style="width:60px;height:60px"></div>
                    <div class="contentmessage"><span class="namemess">联系电话:</span> <span class="mothercontent">{{motherphone}}</span>    </div>
                    <div class="contentmessage"><span class="namemess">用户ID:</span> <span class="mothercontent" >{{motherid}}</span> </div>
                    <div class="contentmessage"><span class="namemess">状态:</span> <span class="mothercontent" >{{motherStatus}}</span> </div>

                </div>
                <div class="rightmessage  messagemother">
                     <div  class="contentmessage"><span class="namemess">积分值:</span> <span class="mothercontent" >{{integration}}</span> </div>
                     <div class="contentmessage"><span class="namemess">地址:</span> <span class="mothercontent" > {{motheradress}}</span> </div>
                     <div class="contentmessage"><span class="namemess">所属会所:</span> <span class="mothercontent" > </span> </div>
                     <div class="contentmessage"><span class="namemess">{{childbirthproduction}}日期:</span> <span class="mothercontent" >{{timeFormattershow(childbirthproductiondata)}} </span> </div>
                </div>
                 <div class="messageborder">宝宝信息</div>
                   <div v-show="babashow"  v-for="item in babydata" :key="item.id">
                   <div  class="leftmessagege   messagemother">
                   <div  class="contentmessage"><span class="namemess">宝宝昵称:</span> <span class="mothercontent" >{{item.nickname}}</span> </div>
                    <div  class="contentmessage"><span class="namemess">宝宝ID:</span> <span class="mothercontent" >{{item.id}}</span></div>
                    <div  class="contentmessage"><span class="namemess">宝宝体重:</span> <span class="mothercontent" >{{item.weight}}</span></div>
                    <div  class="contentmessage"><span class="namemess">宝宝头围:</span> <span class="mothercontent" >{{item.headCircumference}}CM</span></div>
                 </div>
                 <div class="rightmessage  messagemother">
                      <div class="contentmessage"><span class="namemess">宝宝性别:</span> <span class="mothercontent" >{{item.sex==1 ? '男' :'女'}}</span></div>
                     <div  class="contentmessage"><span class="namemess">宝宝血型:</span> <span class="mothercontent" >{{item.bloodType}}</span> </div>
                     <div  class="contentmessage"><span class="namemess">宝宝身高:</span> <span class="mothercontent" >{{item.height}}CM</span> </div>
                 </div>
                 </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false" type="primary">关闭</el-button>
                </span>
             </el-dialog>


        </el-col>
    </el-row>
</template>
<script>
import{bespeakApiuserlist,getByMomByUserId} from "@/api/api"
import {timeFormattershowsecod,timeFormattershow} from '@/assets/js/common'
export default {
    data(){
        return{
             timeFormattershow,
             timeFormattershowsecod,
             Seachtime:[],
             name:"",
             mysession:'',
             childbirthStatus:'',
             UsertableData:[],
             totalNumber:null,
              pageNo:1,
              pageSize:10,
              dialogVisible:false,
              username:"",
              motherheadphoto:"",//妈妈头像
              motherphone:'',//妈妈电话
              motherid:'',//用户id
              motheradress:'',//地址
              integration:'',//积分值
              motherStatus:'',//怀孕状态/
              childbirthproduction:"",//分娩和预产期
              childbirthproductiondata:"",//分娩预产时间
               babyName:"",//
               babytype:'',//血型
               babyid:'',//宝宝id
               badyhight:'',//宝宝身高
               babysex:'',//性别
               babayweight:"",//宝宝体重
               headerbaby:"",//
               babashow:false,
               babydata:[],//宝宝信息数组
        }
    },
    methods:{
            getbespeakApiuserlist(){//列表
                   var parms={
                        name:this.name,
                        childbirthStatus:this.childbirthStatus,
                        inStartTime:this.Seachtime[0],
                        inEndTime:this.Seachtime[1],
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                   }
              bespeakApiuserlist(parms,this.mysession).then(res=>{
                       console.log("---用户列表---")
                       console.log(res)
                       if(res.data.code==1001){
                           this.UsertableData=res.data.data.items
                           this.totalNumber=res.data.data.totalNum

                       }
                })
            },
          pageIndexChangepRcod(index){
                   this.pageNo=index
                   this.getbespeakApiuserlist()
          },
          Detailslook(index){//xiangqing
              this.dialogVisible=true
              console.log(this.UsertableData[index])
              this.username=this.UsertableData[index].name
            if(this.UsertableData[index].photoUrl==null){//判断用户有没有自己上传图片,自己上传就用自己的,没有上传就默认用户的微信头像
                 this.motherheadphoto=this.UsertableData[index].wechatPhotoUrl
             }else if(this.UsertableData[index].photoUrl !== null){
                   this.motherheadphoto=`${baseUrl}/common/fileOut?url=${this.UsertableData[index].photoUrl}`
             }
             this.motherphone=this.UsertableData[index].phone
             this.motherid=this.UsertableData[index].id
             this.motheradress=this.UsertableData[index].address
             this.integration=this.UsertableData[index].integration
             if(this.UsertableData[index].childbirthStatus==1){
                  this.motherStatus="怀孕中"
                  this.childbirthproduction="预产"
                  this.childbirthproductiondata=this.UsertableData[index].giveBabyTime
                  this.babashow=false

             } else if(this.UsertableData[index].childbirthStatus==2){
                  this.motherStatus="宝宝出生了"
                  this.childbirthproduction="分娩"
                  this.childbirthproductiondata=this.UsertableData[index].childbirthTime;
                  this.babashow=true
             }
             var parms={
                   userId:this.UsertableData[index].id
              }
              getByMomByUserId(parms,this.mysession).then(res=>{
                     if(res.data.code==1001){
                        this.babydata=res.data.data
                     }
                       console.log("宝宝详情")
                       console.log(parms)
                       console.log(res)
              })
             // console.log(this.UsertableData[index])
          },


          Seeabout(){//查询
                this.getbespeakApiuserlist()
          }
    },
    mounted(){
          this.mysession = sessionStorage.getItem("sesstion");
          this.getbespeakApiuserlist()
    }
}
</script>
<style scoped>
       .messagemother{
            width:240px;
            display: inline-block;
         /*   // border: 1px solid red; */

            vertical-align: top;
      }
      .namemess{
           display: inline-block;
            line-height: 60px;
            height: 60px;
            line-height: 60px;
            vertical-align: top;
            padding: 0px 20px;
      }
      .contentmessage{
          height: 60px;
      }
      .mothercontent{
          line-height: 60px;
      }
      .messageborder{
          font-size: 16px;
          height: 20px;
          border-bottom: 1px solid black;
          margin-bottom: 10px;
      }
      .DetailsPic{
            background: url()
      }
</style>


