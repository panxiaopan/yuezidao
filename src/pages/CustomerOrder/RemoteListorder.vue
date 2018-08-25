<template>
    <el-row>
        <el-col :span='24'>
            <div class="CurrentPage">订单管理
                <i class="el-icon-arrow-right"></i>智护套餐</div>
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
                    
                </el-select>
            </el-form-item>
            <el-form-item>
                <button class='search-btn' @click="Seeabout">
                    <i class='search-btn-icon'></i>
                </button>
            </el-form-item>
        </el-form>
        <el-col :span="24">
            <el-table :data="RometableData" stripe border class='nurse-table' style="width: 100%">
                <el-table-column prop="id" label="订单编号" width="180">
                </el-table-column>
                <!-- <el-table-column prop="" label="订单来源" width="180">
                </el-table-column> -->
                <el-table-column label="下单时间" width="160">
                    <template slot-scope="scope">
                        {{ timeFormattershowsecod(RometableData[scope.$index].createTime)}}
                    </template>
                </el-table-column>
                <el-table-column width="200" label="服务时间">
                    <template slot-scope="scope">
                        {{ timeFormattershowsecod(RometableData[scope.$index].serviceTime)}}
                    </template>

                </el-table-column>
                <el-table-column label="孕育状态" prop="childbirthStatus" width="100">
                </el-table-column>
                <el-table-column label="预产期"  width="100">
                      <template slot-scope="scope">
                        {{ timeFormattershow(RometableData[scope.$index].giveBabyTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="用户ID" prop="" width="100">

                </el-table-column>
                <el-table-column label="联系人" prop="userName" width="100">

                </el-table-column>
                <template label="地址" prop="userAddress">

                </template>

                <el-table-column prop="orderPrice" label="订单金额(元)" width="140">

                </el-table-column>
                <el-table-column prop="realAmount" label="实付金额">

                </el-table-column>

                <el-table-column prop="integrationConsume" label="使用积分">

                </el-table-column>
                <el-table-column prop="integrationOffsetAmount" label="积分优惠">

                </el-table-column>
                <el-table-column label="订单规格">

                </el-table-column>
                <el-table-column label="订单状态">
                    <template slot-scope="scope">
                        <span v-if="RometableData[scope.$index].orderStatus== 0"> 未支付 </span>
                        <span v-if="RometableData[scope.$index].orderStatus== 1"> 已支付 </span>
                        <span v-if="RometableData[scope.$index].orderStatus== 2"> 已作废 </span>
                    </template>
                </el-table-column>
                <el-table-column prop="waiterName" label="服务人员">
                </el-table-column>
                <el-table-column label="工单状态">
                    <template slot-scope="scope">
                        <span v-if="RometableData[scope.$index].dispatchStatus==0">未分配</span>
                        <span v-if="RometableData[scope.$index].dispatchStatus==1">已分配</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="100">
                    <template slot-scope="scope"   >
<!--                         <el-button type="primary" size="mini" @click="lookDetails(scope.$index, scope.row)">
                            查看详情
                        </el-button> -->
                        <el-button size="mini" type="primary" @click="Distribute(scope.$index, scope.row)">
                            分配人员
                        </el-button>
                        <el-button type="primary" size="mini" >
                            取消订单
                        </el-button>

                    </template>

                </el-table-column>
            </el-table>
                <div class="myPagination">
                    <el-pagination  layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChangepRcod'>
                    </el-pagination>
                </div>


            <el-dialog title="提示" :visible.sync="RemotedialogVisible" width="30%">
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
import { orderlist, waiterlist, dispatchadd } from "@/api/api";
import { timeFormattershowsecod,timeFormattershow } from "@/assets/js/common";
import qs from "qs";
export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      totalNumber:null,
      timeFormattershow,
      timeFormattershowsecod,
      mysession: "",
      Seachtime: [],
      payState: "",
      RometableData: [],
      DropManagementData: [],
      RemotedialogVisible: false,
      Selectperson: "",
      Rometableid: ""
    };
  },
  methods: {
    getorderlist() {
      var parms = {
         pageNo: this.pageNo,
         pageSize: this.pageSize,    
         startTime: this.Seachtime[0],
         endTime: this.Seachtime[1],
         orderStatus: this.payState
      };
      orderlist(parms, this.mysession).then(res => {
        console.log("-----远程-----");
        console.log(res);
        if (res.data.code == 1001) {
          this.RometableData = res.data.data.items;
          this.totalNumber=res.data.data.totalNum
        }
      });
    },
    Seeabout() {
      this.getorderlist();
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
    Allotsub(index) {
      //分配人员
      var parms = {
        waiterId: this.Selectperson,
        orderId: this.Rometableid,
        productSort: 1
      };
      dispatchadd(qs.stringify(parms), this.mysession).then(res => {
        console.log("==fasog==");
        console.log(parms);
        console.log(res);
      });
    },
    pageIndexChangepRcod(){//翻页
         this.getorderlist()
    },


    lookDetails(index) {},

    Distribute(index) {
      //分配人员
      this.RemotedialogVisible = true;
      this.Rometableid = this.RometableData[index].id;
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getorderlist();
    this.getwaiterlist();
  }
};
</script>
<style lang="scss">

</style>


