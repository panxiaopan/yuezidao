<template>
    <el-row>
        <el-col :span='24'>
            <div class="CurrentPage">订单管理
                <i class="el-icon-arrow-right"></i>云课堂</div>
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
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <button class='search-btn' @click="Seeabout">
                        <i class='search-btn-icon'></i>
                    </button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-table border :data="ColudisttableData" style="width: 100%">
                <el-table-column prop="id" label="订单编号" width="180">
                </el-table-column>
                <el-table-column prop="name" label="下单时间" width="180">
                    <template slot-scope="scope">
                        {{timeFormattershowsecod(ColudisttableData[scope.$index].createTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="课程性质">
                    <template slot-scope="scope">
                        <span v-if="ColudisttableData[scope.$index].itemType==1">图文</span>
                        <span v-if="ColudisttableData[scope.$index].itemType==2">视频</span>
                    </template>

                </el-table-column>
                <el-table-column prop="courseName" label="课程名称" width="240">
                </el-table-column>
                <el-table-column prop="userName" width="220px" label="用户姓名">
                </el-table-column>
                <el-table-column prop="phone" label="用户电话">
                </el-table-column>
                <el-table-column prop="orderPrice" label="订单金额">
                </el-table-column>
                <el-table-column prop="realAmount" label="实付金额">
                </el-table-column>
                <el-table-column prop="integrationConsume" label="使用积分"  width="100">
                </el-table-column>
                <el-table-column prop="integrationOffsetAmount" label="积分优惠"   width="100">
                </el-table-column>
                <el-table-column label="订单状态">
                    <template slot-scope="scope">
                        <span v-if="ColudisttableData[scope.$index].orderStatus==0">未支付</span>
                        <span v-if="ColudisttableData[scope.$index].orderStatus==1">已支付</span>
                        <span v-if="ColudisttableData[scope.$index].orderStatus==2">已作废</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="myPagination">
                <el-pagination  layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChangepRcod'>
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { classroomorderlist } from "@/api/api";
import { timeFormattershowsecod } from "@/assets/js/common";
export default {
  data() {
    return {
      timeFormattershowsecod,
      Seachtime: [],
      payState: "",
      pageNo: 1,
      pageSize: 10,
      totalNumber: null,
      ColudisttableData: [],
      mysession: ""
    };
  },
  methods: {
    getlistVistlist() {
      var parms = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        startTime: this.Seachtime[0],
        endTime: this.Seachtime[1],
        orderStatus: this.payState
      };
      classroomorderlist(parms, this.mysession).then(res => {
        console.log("----云课堂---");
        console.log(res);
        if (res.data.code == 1001) {
          this.ColudisttableData = res.data.data.items;
          this.totalNumber = res.data.data.totalNum;
        }
      });
    },
    pageIndexChangepRcod(index) {
      this.pageNo = index;
      this.getlistVistlist();
    },
    Seeabout() {
      this.getlistVistlist();
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getlistVistlist();
  }
};
</script>

