<template>
  <el-row class="Homeage">
     <el-col :span='24'>
          <div class="CurrentPage">商家<i class="el-icon-arrow-right"></i>首页
     </div>
   </el-col>
   <el-col :span="24" style='margin-bottom: 70px;' >
     <el-col :span='8' class='text-center border-right'  >
       <div class="Userblock">
              <div class="messagedata">
                   <span class="userdata">新增用户数</span>
                    <div class="todaydata">{{userTotalCount}} </div>
              </div>
         </div>
     </el-col>
    <el-col :span='8' class='text-center border-right' > 
          <div class="Userblock">
              <div class="messagedata">
                   <span class="userdata">昨日营业额</span>
                    <div class="todaydata">{{turnoverAmount}} </div>
              </div>
         </div>
    </el-col>
    <el-col :span='8' class='text-center' >
          <div class="Userblock">
              <div class="messagedata">
                   <span class="userdata">昨日订单数</span>
                    <div class="todaydata">{{orderTotalCount}} </div>
              </div>
         </div>
    </el-col>
   </el-col>
  <!-- <el-col :span="24">
      <div style="height:40px;background:#f2f2f2; line-height:40px; padding-left:20px">订单状态显示</div>
       
       <el-col :span="12">
       <div style="height:240px; display:inline-block">
           <div class="ordermessage"> 
               <div class="ordermessagetop">
                  <i class="fa  fa-envelope-o fa-2x"></i>
                  <span style="font-size:18px">订单详情</span>
               </div>
               <div class="ordername">上门服务:{{nursingUpOrderCount}}</div>
               <div class="ordername">月子餐:{{monthMealOrderCount}}</div>
               <div class="ordername">预约到店:{{nursingDownOrderCount}}</div>
               <div class="ordername">远程智能:{{bespeakOrderCount}}</div>
               <div class="ordername">云课堂:{{classroomOrderCount}}</div>
           </div>
       </div>
         <div style="height:240px; display:inline-block">
           <div class="ordermessage"> 
               <div class="ordermessagetop">
                  <i class="fa  fa-envelope-o fa-2x"></i>
                  <span style="font-size:18px">订单状态</span>
               </div>
               <div class="ordername">待服务订单:{{waitForServiceOrderCount}}</div>
               <div class="ordername">服务中订单:{{inServiceCount}}</div>
               <div class="ordername">已完成订单:{{finishOrderCount}}</div>
           </div>
       </div>
         <div style="height:240px; display:inline-block">
           <div class="ordermessage"> 
               <div class="ordermessagetop">
                  <i class="fa  fa-envelope-o fa-2x"></i>
                  <span style="font-size:18px">售后</span>
               </div>
               <div class="ordername">退款:{{refundCount}}</div>
           </div>
       </div>
      </el-col>
  </el-col>-->
      
   <el-col :span="24">
          <div class="block" >
            <el-form>
              <el-form-item label='' >
                <el-date-picker
                 v-model="valuetime"
                 type="daterange"
                 align="right"
                 unlink-panels
                 :clearable="false"
                 value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changetime"
                :picker-options="pickerOptions2">
                </el-date-picker>
                
              </el-form-item>
            </el-form>
              
            </div> 
              <!-- <div style="width:100%; display:inline-block">
                 <ve-line :data="chartDataline">
                 </ve-line>
              </div>   -->
               <!-- <div style="width:100%;display:inline-block">
                       <ve-pie :data="chartDatapie"></ve-pie>    
               </div> -->
               <div class='' >
                 <div class='charts-title' >营业额</div>
                <ve-line 
                height='300px'
                :colors='["#12D3DD"]'
                :legend-visible='false'
                :extend="lineExtend"
                :data="turnoverChart"
                ></ve-line>
             </div>
             <div class='' style='margin-top: 20px' >
               <div class='charts-title' >新增用户数</div>
                <ve-line 
                height='300px'
                :colors='["#12D3DD"]'
                :data="chartDatahistogram"
                :legend-visible='false'
                :extend="lineExtend"
                ></ve-line>
             </div>
             <div class='' style='margin-top: 20px' >
               <div class='charts-title' >
                 订单分析
                 <button @click='chooseTurnover' class='bar-charts-btn' :class="activeBtn ? 'active' : ''" >营业额</button>
                  <button @click='chooseUserNum' class='bar-charts-btn' :class="!activeBtn ? 'active' : ''">订单数</button>
                </div>
                <ve-bar 
                v-if='activeBtn'
                height='300px'
                :data="barChartData"
                :colors='["#12D3DD"]'
                :settings='turnoverSet'
                :extend='chartExtend'
                :legend-visible='false'
                ></ve-bar>
                <ve-bar 
                v-if='!activeBtn'
                height='300px'
                :data="barChartData"
                :colors='["#12D3DD"]'
                :extend='chartExtend'
                :settings='orderNumSet'
                :legend-visible='false'
                ></ve-bar>
             </div>
   </el-col> 
   <el-col :span="24" style='margin-top: 20px' >
     <div class='charts-title'  >上门工单人员分配情况</div>
           <el-table
            :data="waiterDispatchList"
            height="250"
            style="width: 100%">
            <el-table-column
              prop="waiterName"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="position"
              label="职务">
            </el-table-column>
            <el-table-column
              prop="orderCount"
              label="上门订单数">
            </el-table-column>
          </el-table>
      </el-col> 
  </el-row>
</template>
<script>
import { dataStatisorderCount, orderAmount } from "@/api/api";
import { timeFormattershow, SevenDay, dateToMs } from "@/assets/js/common";
export default {
  data() {
    return {
      timeFormattershow,
      refundCount: "", //退款数
      userTotalCount: "", //用户数
      turnoverAmount: "", //昨日营业流水额
      orderTotalCount: "", //订单总数
      questionAskCount: "", //留言咨询数
      nursingUpOrderCount: "", //上门服务订单数
      monthMealOrderCount: "", //月子餐订单数
      nursingDownOrderCount: "", //预约到店订单数
      bespeakOrderCount: "", //远程监护订单数
      classroomOrderCount: "", //云课堂订单数
      waitForServiceOrderCount: "", //待服务订单数
      finishOrderCount: "", //已完成订单数
      inServiceCount: "", //服务中订单数
      waitForVisitCount: "", //待回访数
      finishVisitCount: "", //已回访数
      waiterDispatchList: [], //上门工单人员分配情况列表
      mysession: "",
      valuetime: [
        dateToMs(new Date(SevenDay(new Date()))),
        dateToMs(new Date())
      ],
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      chartDataline: {
        columns: ["日期", "订单数"],
        rows: []
      },
      chartDatapie: {
        columns: ["订单", "占比"],
        rows: []
      },
      turnoverChart: {
        columns: ["date", "营业额"],
        rows: []
      },
      chartDatahistogram: {
        columns: ["日期", "新增用户"],
        rows: []
      },
      activeBtn: true, // true 为营业额, false为订单
      barChartData: {
        columns: ["name", "营业额", "订单数"],
        rows: [
          { name: "智护套餐", 营业额: 100, 订单数: 5 },
          { name: "月子餐", 营业额: 800, 订单数: 3 },
          { name: "住院照护", 营业额: 1200, 订单数: 4 },
          { name: "上门到家", 营业额: 1600, 订单数: 5 },
          { name: "预约到店", 营业额: 1800, 订单数: 5 },
          { name: "住店尊享", 营业额: 2000, 订单数: 5 },
          { name: "月嫂", 营业额: 8000, 订单数: 6 },
          { name: "护士", 营业额: 10000, 订单数: 10 }
        ]
      },
      turnoverSet: {
        metrics: ["营业额"],
        dataOrder: {
          label: "营业额",
          order: "desc"
        },
      },
      orderNumSet: {
        metrics: ["订单数"],
        dataOrder: {
          label: "订单数",
          order: "desc"
        }
      },
      lineExtend: {
        yAxis:{
          show: true,
          splitLine: {
            lineStyle:{
              color: '#f5f5f5'
            }
          }
        },
      },
      chartExtend: {
        barWidth: 10,
        
        xAxis:{
          show: true,
          splitLine: {
            lineStyle:{
              color: '#f5f5f5'
            }
          }
        },
      }
    };
  },
  methods: {
    getdataStatisorderCount() {
      //获取列表
      dataStatisorderCount(this.mysession).then(res => {
        console.log("=上面的=");
        console.log(res);
        if (res.data.code == 1001) {
          this.userTotalCount = res.data.data.userTotalCount;
          this.turnoverAmount = res.data.data.turnoverAmount;
          this.orderTotalCount = res.data.data.orderTotalCount;
          this.questionAskCount = res.data.data.questionAskCount;
          this.nursingUpOrderCount = res.data.data.nursingUpOrderCount;
          this.monthMealOrderCount = res.data.data.monthMealOrderCount;
          this.nursingDownOrderCount = res.data.data.nursingDownOrderCount;
          this.bespeakOrderCount = res.data.data.bespeakOrderCount;
          this.classroomOrderCount = res.data.data.classroomOrderCount;
          this.waitForServiceOrderCount =
            res.data.data.waitForServiceOrderCount;

          this.finishOrderCount = res.data.data.finishOrderCount;
          this.refundCount = res.data.data.refundCount;
          this.waiterDispatchList = res.data.data.waiterDispatchList;
        }
      });
    },
    getorderAmount() {
      var parms = {
        startTime: this.valuetime[0],
        endTime: this.valuetime[1]
      };

      orderAmount(parms, this.mysession).then(res => {
        console.log("下面的");
        console.log(res);
        console.log(parms);
        if (res.data.code == 1001) {
          //  this.chartDataline.rows=res.data.data.orderAmountList
          this.chartDataline.rows.push({});
          for (var i = 0; i < res.data.data.orderAmountList.length; i++) {
            this.chartDataline.rows.push({
              日期: timeFormattershow(
                res.data.data.orderAmountList[i].orderTime
              ),
              订单数: res.data.data.orderAmountList[i].orderAmount
            });
          }
          this.chartDatapie.rows = [
            { 订单: "远程监护", 占比: res.data.data.bespeakProportion },
            { 订单: "预约上门", 占比: res.data.data.nursingUpProportion },
            { 订单: "预约到店", 占比: res.data.data.nursingDownProportion },
            { 订单: "月子餐", 占比: res.data.data.monthMealProportion }
          ];
        }
        for (var k = 0; k < res.data.data.userCountList.length; k++) {
          this.chartDatahistogram.rows.push({
            日期: timeFormattershow(
              res.data.data.userCountList[k].registerTime
            ),
            新增用户: res.data.data.userCountList[k].userCount
          });
        }
        let turnoverList = res.data.data.orderAmountList;
        for (let item of turnoverList) {
          this.turnoverChart.rows.push({
            date: timeFormattershow(item.orderTime),
            营业额: item.orderAmount
          });
        }
      });
    },
    changetime(value) {
      console.log(value);
      this.getorderAmount();
    },
    searchData() {
      //点击搜索
      this.getorderAmount();
    },
    chooseTurnover() {
      // 点击营业额
      this.activeBtn = true;
    },
    chooseUserNum() {
      // 点击订单数
      this.activeBtn = false;
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getdataStatisorderCount();
    this.getorderAmount();
  }
};
</script>
<style lang="scss"   scoped>
.Homeage {
  .Userblock {
    margin: 20px 40px;
    display: inline-block;
    height: 60px;
    // border: 1px solid #eeeeee;
    width: 200px;
    border-radius: 4px;
    .messageicon {
      text-align: center;
    }
    .messagedata {
      text-align: center;
      height: 80px;
      .userdata {
        display: inline-block;
        margin-top: 10px;
        font-size: 14px;
      }
      .todaydata {
        margin-top: 10px;
        height: 40px;
        font-size: 24px;
      }
    }
  }
  .ordermessage {
    display: inline-block;
    width: 200px;
    height: 220px;
    border: 1px solid #f2f2f2;
    text-align: center;
    line-height: 60px;
    vertical-align: top;
  }
  .ordermessagetop {
    height: 60px;
    border-bottom: 1px solid #f2f2f2;
  }
  .ordername {
    height: 30px;
    line-height: 30px;
  }
}
.search-btn {
  display: inline-block;
  width: 45px;
  height: 38px;
  margin-left: 10px;
  border: 1px solid #12D3DD;
  border-radius: 5px;
  vertical-align: middle;
  cursor: pointer;
  background: #12D3DD url("../../assets/img/search2.png") no-repeat center;
}
.chart-border {
  border: 1px solid #ccc;
}
.charts-title {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  background-color: #f5f5f5;
}
.bar-charts-btn {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
}
.bar-charts-btn.active {
  background-color: #12D3DD;
  color: #fff;
}
</style>

