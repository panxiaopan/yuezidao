<template>
    <el-row>
        <el-col :span='24'>
            <div class="CurrentPage">订单管理
                <i class="el-icon-arrow-right"></i>上门服务</div>
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
                        <i class='search-btn-icon' ></i>
                    </button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-table :data="posttableData" stripe border >
                <el-table-column type='selection' ></el-table-column>
                <el-table-column prop="id" label="订单编号" width="160">
                </el-table-column>
                <el-table-column label="下单时间" width="155px">
                    <template slot-scope="scope">
                        {{timeFormattershowsecod(posttableData[scope.$index].createTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="预约时间" width="155px">
                    <template slot-scope="scope">
                        {{timeFormattershowsecod(posttableData[scope.$index].bespeakStartTime)}}
                    </template>
                </el-table-column>
                <el-table-column prop="itemName" label="预约项目" width="100px">
                </el-table-column>
 <!--                <el-table-column prop="" label="用户ID">
                </el-table-column> -->
                <el-table-column prop="userName" label="联系人">
                </el-table-column>
                <el-table-column prop="phone" label="联系人电话" width="110">
                </el-table-column>
                <el-table-column prop="userAddress" label="上门地址" width="200px">
                </el-table-column>
                <el-table-column prop="orderPrice" label="订单金额">
                </el-table-column>
                <el-table-column prop="realAmount" label="实付金额">
                </el-table-column>
                <el-table-column prop="integrationConsume" label="使用积分">
                </el-table-column>
                <el-table-column prop="integrationOffsetAmount" label="积分优惠">
                </el-table-column>
                <el-table-column label="订单状态">
                    <template slot-scope="scope">
                        <span v-if="posttableData[scope.$index].orderStatus==0">未支付</span>
                        <span v-if="posttableData[scope.$index].orderStatus==1">已支付</span>
                        <span v-if="posttableData[scope.$index].orderStatus==2">已作废</span>
                    </template>
                </el-table-column>
                <el-table-column prop="waiterName" label="服务人员">
                </el-table-column>
                <el-table-column label="工单分配">
                    <template slot-scope="scope">
                        <span v-if="posttableData[scope.$index].dispatchStatus==0">未分配</span>
                        <span v-if="posttableData[scope.$index].dispatchStatus==1">已分配</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120"   >
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="Vistperson(scope.$index, scope.row)">
                            分配上门人员
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="myPagination">
                <el-pagination layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChangepRcod'>
                </el-pagination>
            </div>
            <el-dialog title="分配人员" :visible.sync="RemotedialogVisible" width="30%">
                <el-select v-model="Selectperson" placeholder="请选择">
                    <el-option v-for="item in DropManagementData" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click="Allotsub">确 定</el-button>
                </span>
            </el-dialog>
        </el-col>
    </el-row>
</template>
<script>
import { VistList, waiterlist, dispatchadd } from "@/api/api";
import { timeFormattershowsecod } from "@/assets/js/common";
import qs from "qs";
export default {
  data() {
    return {
      timeFormattershowsecod,
      payState: "",
      pageNo: 1,
      pageSize: 10,
      totalNumber: null,
      Seachtime: [],
      posttableData: [],
      RemotedialogVisible: false,
      DropManagementData: [],
      Selectperson: "",
      Rometableid: "",
      itemSort: ""
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
        itemSort: 1
      };
      VistList(parms, this.mysession).then(res => {
        console.log("----syhangmen---");
        console.log(res);
        if (res.data.code == 1001) {
          this.posttableData = res.data.data.items;
          this.totalNumber = res.data.data.totalNum;
        }
      });
    },
    pageIndexChangepRcod(index) {
      this.pageNo = index;
      this.getlistVistlist();
    },
    getwaiterlist() {
      //服务获取当前列表

      var parms = {
        pageNo: 1,
        pageSize: 1000
      };
      waiterlist(parms, this.mysession).then(res => {
        console.log("-------服务人员------");
        console.log(res);
        if (res.data.code == 1001) {
          this.DropManagementData = res.data.data.items;
        }
      });
    },

    Vistperson(index) {
      this.RemotedialogVisible = true;
      console.log(this.posttableData[index]);
      this.itemSort = this.posttableData[index].itemSort;
      this.Rometableid = this.posttableData[index].id;
    },

    Seeabout() {
      this.getlistVistlist();
    },
    Allotsub() {
      var parms = {
        waiterId: this.Selectperson,
        orderId: this.Rometableid
        /*   productSort:this.itemSort */
      };

      console.log(parms);
      dispatchadd(qs.stringify(parms), this.mysession).then(res => {
        console.log("==fshanmeng==");
        console.log(parms);
        console.log(res);
        if (res.data.code == 1001) {
          this.$message({
            type: "success",
            message: "分配成功"
          });
          this.RemotedialogVisible = false;
        }
      });
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getlistVistlist();
    this.getwaiterlist();
  }
};
</script>

<style lang="scss" scoped>
  .el-button--mini {
    padding: 5px 5px !important;
  }

</style>
