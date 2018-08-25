<template>
    <el-row>
        <el-col :span='24'>
            <div class="CurrentPage">订单管理
                <i class="el-icon-arrow-right"></i>月子餐</div>
        </el-col>
        <el-form :inline="true">
            <el-form-item>
                <div class="block">
                    <el-date-picker v-model="Seachtime" type="daterange" range-separator="至" value-format="timestamp" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item>
                <el-select v-model="payState" placeholder="请选择订单状态">
                    <el-option label="未支付" value="0"></el-option>
                    <el-option label="已支付" value="1"></el-option>
                    <el-option label="已作废" value="2"></el-option>
                    <el-option label="待配送" value="3"></el-option>
                    <el-option label="已配送" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <button class='search-btn' type="primary" size="small" @click="Seeabout">
                    <i class='search-btn-icon' ></i>
                </button>
            </el-form-item>
        </el-form>
        <el-col :span="24">
            <el-table :data="posttableData" stripe border class='nurse-table' style="width: 100%;">
                <el-table-column type='selection' ></el-table-column>
                <el-table-column prop="id" label="订单编号" width="160">
                </el-table-column>
                <el-table-column label='用户ID'  ></el-table-column>
                <el-table-column label="孕育状态" width="100">
                  <template slot-scope="scope">
                    <span v-if="posttableData[scope.$index].childbirthStatus==1">怀孕中</span>
                    <span v-if="posttableData[scope.$index].childbirthStatus==2">宝宝出生了</span>
                  </template>
                </el-table-column>
                <el-table-column label="预产期" prop="giveBabyTime" width="100">

                </el-table-column>
                <el-table-column width="155px" label="配送起止时间">
                    <template slot-scope="scope">
                        {{timeFormattershowsecod(posttableData[scope.$index].sendTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="总餐数" prop="" width="100">

                </el-table-column>
                <el-table-column label="剩余餐数" prop="" width="100">

                </el-table-column>
                <el-table-column prop="userName" label="联系人">
                </el-table-column>
                <el-table-column prop="phone" label="联系人电话" width="110">
                </el-table-column>
                <el-table-column prop="deliverAddress" label="收货地址" width="180">
                </el-table-column>
                <el-table-column prop="orderPrice" label="订单金额">
                </el-table-column>
                <el-table-column prop="realAmount" label="实付金额">
                </el-table-column>
                <el-table-column prop="integrationConsume" label="使用积分">
                </el-table-column>
                <el-table-column prop="integrationOffsetAmount" label="积分优惠">
                </el-table-column>
                <el-table-column prop="" label="哺乳方式">
                </el-table-column>
                <el-table-column prop="" label="饮食阶段">
                </el-table-column>
                <el-table-column prop="" label="饮食禁忌">
                </el-table-column>
                <el-table-column prop="orderStatus" label="订单状态">
                    <template slot-scope="scope">
                        <span v-if="posttableData[scope.$index].orderStatus==0">未支付</span>
                        <span v-if="posttableData[scope.$index].orderStatus==1">已支付</span>
                        <span v-if="posttableData[scope.$index].orderStatus==2">已作废</span>
                    </template>
                </el-table-column>
                <el-table-column label="下单时间" width="155">
                    <template slot-scope="scope">
                        {{timeFormattershowsecod(posttableData[scope.$index].createTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope"  >
                        <el-button type="primary" size="mini" >
                            查看详情
                        </el-button>
                        <el-button type="primary" size="mini" >
                            取消订单
                        </el-button>

                    </template>

                </el-table-column>
            </el-table>
            <el-dialog
            :visible.sync="sendMessageDialog"
             title='发送短信'
              >

            </el-dialog>
            <div class="myPagination">
                <el-pagination  layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChange'>
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { Monthorderlist } from "@/api/api";
import { timeFormattershowsecod } from "@/assets/js/common";
export default {
  data() {
    return {
      totalNumber: null,
      timeFormattershowsecod,
      payState: "",
      pageNo: 1,
      pageSize: 10,
      mysession: "",
      Seachtime: [],
      posttableData: [],
      sendMessageDialog: false,
    };
  },
  methods: {
    getlistMonthorderlist() {
      var parms = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        startTime: this.Seachtime[0],
        endTime: this.Seachtime[1],
        orderStatus: this.payState
      };
      Monthorderlist(parms, this.mysession).then(res => {
        console.log("-------");
        console.log(res);
        if (res.data.code == 1001) {
          this.posttableData = res.data.data.items;
          this.totalNumber = res.data.data.totalNum;
        }
      });
    },
    pageIndexChange(index) {
      this.pageNo = index;
      this.getlistMonthorderlist();
    },
    openSendMessage(){
        // 打开发送短信 弹窗
    },
    Seeabout() {
      //查询
      this.getlistMonthorderlist();
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getlistMonthorderlist();
  }
};
</script>

<style lang="scss" scoped>
  .el-button--mini {
    padding: 5px 5px !important;
  }

</style>

