<template>
    <el-row>
          <el-col :span='24'>
               <div class="CurrentPage">数据统计<i class="el-icon-arrow-right"></i>订单数据</div>
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
                    <!--<el-form-item>
                            <el-select v-model="payState" placeholder="请选择订单状态">
                                    <el-option label="未支付" value="0"></el-option>
                                    <el-option label="已支付" value="1"></el-option>
                                    <el-option label="已作废" value="2"></el-option>
                            </el-select>
                    </el-form-item>-->
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
                    :data="OrdertableData"
                    border
                    style="width: 100%">
                    <el-table-column
                        label="统计时间"
                        width="180">
                         <template slot-scope="scope">
                            {{timeFormattershowsecod(OrdertableData[scope.$index].createTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="远程监护订单数/金额"
                        width="180">
                        <template slot-scope="scope">
                           <span>{{OrdertableData[scope.$index].bespeakOrderCount}}</span>
                           /<span>{{OrdertableData[scope.$index].bespeakOrderAmount}}</span>
                        </template>

                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="预约上门订单数/金额">
                         <template slot-scope="scope">
                           <span>{{OrdertableData[scope.$index].nursingOrderUpCount}}</span>
                           /<span>{{OrdertableData[scope.$index].nursingOrderUpAmount}}</span>
                        </template>
                    </el-table-column>
                     <el-table-column
                          prop="address"
                          label="月子餐订单数/金额">
                         <template slot-scope="scope">
                           <span>{{OrdertableData[scope.$index].monthMealOrderCount}}</span>
                           /<span>{{OrdertableData[scope.$index].monthMealOrderAmount }}</span>
                        </template>
                    </el-table-column>
                     <el-table-column
                          prop="address"
                          label="预约到店数/金额">
                         <template slot-scope="scope">
                           <span>{{OrdertableData[scope.$index].nursingOrderDownCount}}</span>
                           /<span>{{OrdertableData[scope.$index].nursingOrderDownAmount}}</span>
                        </template>
                    </el-table-column>
                     <el-table-column
                          prop="address"
                          label="云课堂数/金额">
                         <template slot-scope="scope">
                           <span>{{OrdertableData[scope.$index].classroomOrderCount}}</span>
                           /<span>{{OrdertableData[scope.$index].classroomOrderAmount}}</span>
                        </template>
                    </el-table-column>
                     <el-table-column
                          prop="monthMealDepositIn"
                          label="押金收取">
                    </el-table-column>
                     <el-table-column
                          prop="monthMealDepositOut"
                          label="押金退还">
                    </el-table-column>
                     <el-table-column
                          prop="totalAmount"
                          label="总金额">
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
import {orderDataStatislist} from "@/api/api"
import {timeFormattershowsecod,} from '@/assets/js/common'
export default {
    data(){
        return{
             timeFormattershowsecod,
             OrdertableData:[],
             Seachtime:[],
             payState:'',
             pageNo:1,
             pageSize:10,
             totalNumber:null,
        }

    },
     methods:{

            getorderDataStatislist(){
                 var parms={
                       pageNo:this.pageNo,
                       pageSize:this.pageSize,
                       startTime:this.Seachtime[0],
                       endTime:this.Seachtime[1],
                       orderStatus:this.payState,
                 }
               orderDataStatislist(parms).then(res=>{
                     console.log("订单数据")
                      console.log(res)
                      if(res.data.code==1001){
                          this.OrdertableData=res.data.data.items
                          this.totalNumber=res.data.data.totalNum
                      }
               })
            },
            pageIndexChangepRcod(index){
                   this.pageNo=index
                   this.getorderDataStatislist()
            },



           Seeabout(){//查询
              this.getorderDataStatislist()
           }
     },
     mounted(){
         this.getorderDataStatislist()

    }
}
</script>
