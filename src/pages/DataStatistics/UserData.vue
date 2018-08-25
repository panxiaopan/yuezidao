<template>
    <el-row>
          <el-col :span='24'>
               <div class="CurrentPage">数据统计<i class="el-icon-arrow-right"></i>用户数据</div>
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
                        <!--<el-button type="primary" size="small"  @click="Seeabout"  >查询</el-button>-->
                      <button class='search-btn' @click="Seeabout">
                        <i class='search-btn-icon' ></i>
                      </button>
                    </el-form-item>
                </el-form>
        </el-col>
        <el-col :span="24">
               <el-table
                    :data="UsertableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    label="日期"
                    width="180">
                    <template slot-scope="scope">
                            {{timeFormattershowsecod(UsertableData[scope.$index].createTime)}}
                     </template>
                    </el-table-column>
                    <el-table-column
                    prop="userCount"
                    label="用户"
                    width="180">
                    </el-table-column>
                    <el-table-column
                      prop="addUserCount"
                      label="新用户">
                    </el-table-column>
                    <el-table-column
                      prop="vipUserCount"
                      label="VIP用户数">
                    </el-table-column>
                     <el-table-column
                      prop="payUserCount"
                      label="付费用户数">
                    </el-table-column>
                     <el-table-column
                      prop="questionFeedbackCount"
                      label="问题反馈数">
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
import{userDataStatislist}from'@/api/api'
import {timeFormattershowsecod} from '@/assets/js/common'
export default {
    data(){
        return{
             Seachtime:[],
             UsertableData:[],
             pageNo:this.pageNo,
             pageSize:this.pageSize,
             timeFormattershowsecod,
             totalNumber:null,
        }
    },
    methods:{
            getUserList(){
                 var parms={
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                        startTime:this.Seachtime[0],
                        endTime:this.Seachtime[1],
                    }
                 userDataStatislist(parms).then(res=>{
                       console.log("用户数据")
                       console.log(res)
                       if(res.data.code==1001){
                           this.UsertableData=res.data.data.items
                           this.totalNumber=res.data.data.totalNum
                       }

                 })
            },
           pageIndexChangepRcod(idnex){
                   this.pageNo=index
                   this.getUserList()
           },

           Seeabout(){
                 this.getUserList()
           }
    },
    mounted(){
          this.getUserList()
    }
}
</script>

