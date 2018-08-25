<template>
    <el-row>
        <el-col :span='24'>
            <div class="CurrentPage">订单管理
                <i class="el-icon-arrow-right"></i>到店服务</div>
        </el-col>
        <el-col :span="24">
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
                    <button class='search-btn' @click="Seeabout">
                        <i class='search-btn-icon'></i>
                    </button>
                </el-form-item>
            </el-form>
            <el-col :span="24">
                <el-table border :data="ToStoretableData" class='nurse-table' style="width: 100%">
                    <el-table-column type='selection'></el-table-column>
                    <el-table-column prop="id" label="订单编号" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="下单时间" width="155">
                        <template slot-scope="scope">
                            {{timeFormattershowsecod(ToStoretableData[scope.$index].createTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="预约时间" width="155">
                        <template slot-scope="scope">
                            {{timeFormattershowsecod(ToStoretableData[scope.$index].bespeakStartTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="预约项目">
                    </el-table-column>
                    <el-table-column prop="userName" label="用户姓名">
                    </el-table-column>
                    <el-table-column prop="phone" label="用户电话" width="130px">
                    </el-table-column>
                    <el-table-column prop="orderPrice" label="订单金额">
                    </el-table-column>
                    <el-table-column prop="realAmount" label="实付金额">
                    </el-table-column>
                    <el-table-column prop="integrationConsume" label="使用积分">
                    </el-table-column>
                    <el-table-column prop="integrationOffsetAmount" label="积分优惠">
                    </el-table-column>
                    <el-table-column prop="" label="标签名称">
                    </el-table-column>
                    <el-table-column label="支付状态">
                        <template slot-scope="scope">
                            <span v-if="ToStoretableData[scope.$index].orderStatus==0">未支付</span>
                            <span v-if="ToStoretableData[scope.$index].orderStatus==1">已支付</span>
                            <span v-if="ToStoretableData[scope.$index].orderStatus==2">已作废</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini">
                                查看详情
                            </el-button>
                            <el-button type="primary" size="mini">
                                取消订单
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <div class="myPagination">
                    <el-pagination  layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChangepRcod'>
                    </el-pagination>
                </div>
            </el-col>
        </el-col>
    </el-row>
</template>
<script>
import { VistList } from "@/api/api";
import { timeFormattershowsecod } from "@/assets/js/common";
export default {
  data() {
    return {
      Seachtime: [],
      payState: "",
      mysession: "",
      ToStoretableData: [],
      pageNo: 1,
      pageSize: 10,
      totalNumber: null,
      timeFormattershowsecod
    };
  },
  methods: {
    getlistVistlist() {
      var parms = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        startTime: this.Seachtime[0],
        endTime: this.Seachtime[1],
        orderStatus: this.payState,
        itemSort: 2
      };
      VistList(parms, this.mysession).then(res => {
        console.log("----到店服务---");
        console.log(res);
        if (res.data.code == 1001) {
          this.ToStoretableData = res.data.data.items;
          this.totalNumber = res.data.data.totalNum;
        }
      });
    },
    pageIndexChangepRcod(index) {
      //翻页
      this.pageNo = index;
      this.getlistVistlist();
    },

    Seeabout() {
      //查询
      this.getlistVistlist();
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    console.log(this.mysession);
    this.getlistVistlist();
  }
};
</script>

<style lang="scss" scoped>
  .el-button--mini {
    padding: 5px 5px !important;
  }

</style>
