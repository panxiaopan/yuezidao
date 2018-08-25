<template>
    <el-row>
        <el-col  :span="24">
            <div class="CurrentPage">结算管理<i class="el-icon-arrow-right"></i>
                 订单结算列表
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
                    <el-input v-model="clubName" placeholder="会所名称"></el-input>
            </el-form-item>
            <el-form-item>
                <!--<el-button type="primary" size="small"  @click="Seeabout">查询</el-button>-->
              <button class='search-btn' @click="Seeabout">
                <i class='search-btn-icon' ></i>
              </button>
            </el-form-item>
        </el-form>
           <el-table
             border
            :data="OrderDatatableData"
            style="width: 100%">
            <el-table-column
                prop="clubName"
                label="会所名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="orderCount"
                label="完成订单数"
                width="180">
            </el-table-column>
            <el-table-column
                prop="orderAmount"
                label="订单金额">
            </el-table-column>
            <el-table-column
                prop="actualAmount"
                label="实付金额">
            </el-table-column>
            <el-table-column
                prop="discountAmount"
                label="优惠金额">
            </el-table-column>
            <el-table-column
                prop="yzdProfitAmount"
                label="月子岛收取金额">
            </el-table-column>
            <el-table-column
                prop="classroomAmount"
                label="云课堂金额">
            </el-table-column>
              <el-table-column
                prop="clubProfitAmount"
                label="会所提成金额">
            </el-table-column>
                <el-table-column
                prop="yzdprofitTotalAmount"
                label="月子岛结算总额">
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
 import{settlementlist} from "@/api/api"
export default {
    data(){
        return{
            Seachtime:[],
            clubName:'',
            Seachtime:[],
            pageNo:1,
            pageSize:10,
            totalNumber:null,
            mysession:'',
            OrderDatatableData:[],
        }
    },
    methods:{

          getsettlementlist(){//列表
                 var parms ={
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                        startTime:this.Seachtime[0],
                        endTime:this.Seachtime[1],
                        clubName:this.clubName
                 }
             settlementlist(parms,this.mysession).then(res=>{
                      console.log("=====")
                      console.log(res)
                      if(res.data.code==1001){
                           this.OrderDatatableData=res.data.data
                           this.totalNumber=res.data.data.totalNum
                      }
             })

          },
        pageIndexChangepRcod(index){
              this.pageNo=index
              this.getsettlementlist()

        },


        Seeabout(){//查询
            this.getsettlementlist()
        }
    },
    mounted(){
          this.mysession = sessionStorage.getItem("sesstion");
          this.getsettlementlist()
    }
}
</script>

