<template>
    <el-row>
        <el-col :span='24'>
          <div class="CurrentPage">结算管理<i class="el-icon-arrow-right"></i>提成结算列表
     </div>
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
                   <el-input v-model="waiterName" placeholder="服务人员名称">
                   </el-input>
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
                    border
                    :data="CommissiontableData"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="人员ID"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="waiterName"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="orderAmount"
                        label="服务订单数">
                    </el-table-column>
                    <el-table-column
                        prop="orderCount"
                        label="订单金额">
                    </el-table-column>
                       <el-table-column
                        prop="profitAmount"
                        label="提成金额">
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
import{profitStatislist} from '@/api/api'
export default {
    data(){
        return{
            Seachtime:[],
            pageNo:1,
            pageSize:10,
            waiterName:'',
            CommissiontableData:[],
            totalNumber:null,
            mysession:"",
        }
    },
   methods:{
          getprofitStatislist(){
                    var parms={
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                        startTime:this.Seachtime[0],
                        endTime:this.Seachtime[1],
                        waiterName:this.waiterName
                    }
               profitStatislist(parms,this.mysession ).then(res=>{
                        console.log("提成列表")
                         console.log(res)
                        if(res.data.code==1001){
                           this.CommissiontableData=res.data.data.items
                           this.totalNumber=res.data.data.totalNum
                        }

               })
          },
       pageIndexChangepRcod(index){
             this.pageNo=index
             this.getprofitStatislist()

       },

        Seeabout(){
             this.getprofitStatislist()
        },
    },
    mounted(){
        this.mysession = sessionStorage.getItem("sesstion");
        this.getprofitStatislist()
    }
}
</script>

