<template>
    <el-row>
     <el-col :span='24'>
            <div class="CurrentPage">结算管理<i class="el-icon-arrow-right"></i>
                 押金退还列表
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
                <el-select v-model="foregiftStatus" placeholder="请选择">
                    <el-option label="未退还"  value="0"></el-option>
                    <el-option label="已退还"  value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <!--<el-button type="primary" size="small"  @click="Seeabout"  >查询</el-button>-->
              <button class='search-btn' @click="Seeabout">
                <i class='search-btn-icon' ></i>
              </button>
            </el-form-item>
    </el-form>
      <el-col :span="24">
               <el-table
                :data="BondtableData"
                border
                style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号码"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="orderId"
                        label="订单编号">
                    </el-table-column>
                    <el-table-column label="订单时间">
                        <template slot-scope="scope">
                            <span>{{timeFormattershowsecod(BondtableData[scope.$index].orderTime)}}</span>
                       </template>
                    </el-table-column>
                     <el-table-column label="押金金额" prop="foregift">
                    </el-table-column>
                     <el-table-column label="产品名称" prop="itemName">
                    </el-table-column>
                     <el-table-column label="退还状态">
                          <template slot-scope="scope">
                             <span v-if="BondtableData[scope.$index].foregiftStatus==0">未退还</span>
                             <span v-if="BondtableData[scope.$index].foregiftStatus==1">已退还</span>
                         </template>
                    </el-table-column>
                     <el-table-column label="退还时间">
                         <template slot-scope="scope">
                            <span>{{timeFormattershowsecod(BondtableData[scope.$index].refundTime)}}</span>
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
     </el-col>
    </el-row>
</template>
<script>
import {refundForegiftlist} from "@/api/api"
import {timeFormattershowsecod,} from '@/assets/js/common'
export default {
    data(){
        return{
            timeFormattershowsecod,
            mysession:'',
            Seachtime:[],
            foregiftStatus:'',
            pageNo:1,
            pageSize:10,
            totalNumber:null,
            BondtableData:[],
        }
    },
    methods:{

          getrefundForegiftlist(){
              var parms={
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                        startTime:this.Seachtime[0],
                        endTime:this.Seachtime[1],
                        foregiftStatus:this.foregiftStatus
              }
             refundForegiftlist(parms,this.mysession).then(res=>{
                     console.log("---押金退还-----")
                     console.log(res)
                     if(res.data.code==1001){
                         this.BondtableData=res.data.data.items
                         this.totalNumber=res.data.data.totalNum
                     }
             })

          },
        pageIndexChangepRcod(index){
              this.pageNo=index
              this.getrefundForegiftlist()
        },
        Seeabout(){
             this.getrefundForegiftlist()
        },
    },
    mounted(){
            this.mysession = sessionStorage.getItem("sesstion");
            this.getrefundForegiftlist()
    }
}
</script>
