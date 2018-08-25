<template>
    <el-row>
      <el-col :span='24'>
          <div class="CurrentPage">用户管理<i class="el-icon-arrow-right"></i>用户数据监测</div>
      </el-col>
         <el-col :span="24">
                <el-form :inline="true">
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
                         <el-input  v-model="Username" placeholder="用户名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <button  class='search-btn' @click="Seeabout"  >
                            <i class='search-btn-icon' ></i>
                        </button>
                    </el-form-item>
                </el-form>
        </el-col>
        <el-col :span="24">
                   <el-table
                        :data="MonitortableData"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="puerperaMonitorInfo.userName"
                            label="用户昵称"
                            width="150">
                        </el-table-column>
                        <el-table-column label="宝宝昵称" prop="babyName">

                        </el-table-column>


                        <el-table-column
                            prop="exteriorInfo.weight"
                            label="婴儿体重(kg)"
                            width="120"> 
                        </el-table-column>
                        <el-table-column
                            width="120px"
                            prop="exteriorInfo.temperature"
                            label="婴儿体温(°C)">
                        </el-table-column>
                        <el-table-column 
                           prop="feedInfo.abdomen"
                            width="100px" 
                            label="腹部">
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="exteriorInfo.heartRate"
                             label="婴儿心率(°C)">
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="feedInfo.milkPowderCount"
                             label="奶粉次数">
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="feedInfo.milkPowderAmount"
                             label="奶粉量">
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="feedInfo.breastMilkCount"
                             label="母乳次数">
                        </el-table-column>
                      <el-table-column
                             width="120px"
                             label="大便情况">
                        <template slot-scope="scope">
                            <img :src="`${baseUrl}/common/fileOut?url=${MonitortableData[scope.$index].feedInfo.shitStatus}`" style="dispaly:inline-block;width:40px;height:40px">
                        </template>
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="feedInfo.shitCount"
                             label="大便次数">
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="feedInfo.urineStatus"
                             label="小便情况">
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="feedInfo.urineCount"
                             label="小便次数">
                        </el-table-column>
                      <el-table-column
                             width="120px"
                             prop="feedInfo.sleepCount"
                             label="睡眠次数">
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="feedInfo.sleepTime"
                             label="睡眠时间">
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="feedInfo.cry"
                             label="哭声">
                        </el-table-column>
                      <el-table-column
                             width="120px"
                             prop="feedInfo.activityStatus"
                             label="活动力">
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="feedInfo.breathStatus"
                             label="呼吸情况">
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="feedInfo.umbilical "
                             label="脐带">
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="feedInfo.skin "
                             label="皮肤">
                        </el-table-column>
                       <el-table-column
                             width="120px"
                             prop="jaundiceInfo.jaundiceVal"
                             label="黄疸情况">
                        </el-table-column>
<!--                        <el-table-column
                             width="120px"
                             label="黄疸照片">
                        <template slot-scope="scope">
                            <img :src="`${baseUrl}/common/fileOut?url=${MonitortableData[scope.$index].jaundiceInfo.picUrl}`" style="dispaly:inline-block;width:40px;height:40px">
                        </template>
                        </el-table-column> -->
                         <el-table-column
                             width="120px"
                             prop="puerperaMonitorInfo.temperature "
                             label="(妈妈)体温">
                        </el-table-column>   
                         <el-table-column
                             width="120px"
                             prop="puerperaMonitorInfo.appetite "
                             label="(妈妈)食欲">
                        </el-table-column> 
                         <el-table-column
                             width="120px"
                             prop="puerperaMonitorInfo.uterusBottom"
                             label="宫底">
                        </el-table-column> 
                         <el-table-column
                             width="120px"
                             prop="puerperaMonitorInfo.edemaStatus"
                             label="下肢水肿情况">
                        </el-table-column> 
                         <el-table-column
                             width="120px"
                             prop="puerperaMonitorInfo.woundStatus"
                             label="(妈妈)伤口">
                        </el-table-column>   
                         <el-table-column
                             width="120px"
                             prop="puerperaMonitorInfo.papilla"
                             label="(妈妈)乳头">
                        </el-table-column>  
                         <el-table-column
                             width="120px"
                             prop="puerperaMonitorInfo.breast"
                             label="(妈妈)乳房">
                         </el-table-column>   
                         <el-table-column
                             width="120px"
                             prop="puerperaMonitorInfo.hemorrhoidsStatus"
                             label="痔疮情况">
                        </el-table-column> 
                        <el-table-column
                             width="120px"
                             prop="puerperaMonitorInfo.colour"
                             label="恶露颜色">
                         </el-table-column> 
                        <el-table-column
                             width="120px"
                             prop="puerperaMonitorInfo.properties"
                             label="恶露性状">
                         </el-table-column> 
                        <el-table-column
                             width="120px"
                             prop="puerperaMonitorInfo.smell "
                             label="恶露气味">
                         </el-table-column> 
                        <el-table-column
                             width="120px"
                             prop="puerperaMonitorInfo.shit"
                             label="大便次数">
                         </el-table-column> 
                        <el-table-column
                             width="160px"
                             label="监测时间">
                            <template slot-scope="scope">
                               {{timeFormattershowsecod(MonitortableData[scope.$index].createTime)}}
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
    </el-row>
</template>
<script>
import {timeFormattershowsecod} from '@/assets/js/common'
import {usermonitorlist} from "@/api/api"
import {baseUrl} from '../../../static/baseUrl' 
import qs from 'qs'
export default {
    data(){
        return{
            timeFormattershowsecod,
              baseUrl,
              Seachtime:[],
              Username:'',
              pageNo:1,
              pageSize:10,
              mysession:'',
              MonitortableData:[],  
              totalNumber:null,
        }
    },
    methods:{
           getusermonitorlist(){
               var parms={
                        userName:this.Username,
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                        starttime:this.Seachtime[0],
                        endtime:this.Seachtime[1]
               }
             usermonitorlist(qs.stringify(parms),this.mysession).then(res=>{
                    console.log("======")
                    console.log(res)
                    if(res.data.code==1001){
                            
                           this.MonitortableData=res.data.data.items
                           this.totalNumber=res.data.data.totalNum
                    }
              })
           },
           pageIndexChangepRcod(index){
                    this.pageNo=index
                    this.getusermonitorlist()
           },
         Seeabout(){//查询
              this.getusermonitorlist()
         }
    },
    mounted(){
           this.mysession = sessionStorage.getItem("sesstion");
           this.getusermonitorlist()
    }
}
</script>

