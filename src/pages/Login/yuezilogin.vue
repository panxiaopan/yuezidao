<template>
  <el-row>
    <el-col :span='24'>
      <div class="CurrentPage">月子岛
        <i class="el-icon-arrow-right"></i>整体管理运营</div>
    </el-col>
    <el-col :span="24">
      <el-col :span='24' style="margin-bottom: 70px;">
        <el-col :span='6' class='border-right text-center'>
          <div class="Userblock">
            <div class="messagedata">
              <span class="userdata">门店数</span>
              <div class="todaydata">{{clubCount}}</div>
            </div>
          </div>
        </el-col>
        <el-col :span='6' class='border-right text-center'>
          <div class="Userblock">
            <div class="messagedata">
              <span class="userdata">新增用户数</span>
              <div class="todaydata">{{userCount}}</div>
            </div>
          </div>
        </el-col>
        <el-col :span='6' class='border-right text-center'>
          <div class="Userblock">
            <div class="messagedata">
              <span class="userdata">昨日营业额</span>
              <div class="todaydata">{{turnoverAmount}}</div>
            </div>
          </div>
        </el-col>
        <el-col :span='6' class='border-right text-center'>
          <div class="Userblock">
            <div class="messagedata">
              <span class="userdata">昨日问诊数</span>
              <div class="todaydata">{{classroomAmount}}</div>
            </div>
          </div>
        </el-col>
      </el-col>

      <el-col :span="24">
        <el-form :model="ClubValidateForm" :inline="true">
          <el-form-item style='width: 140px' class='not-right-border'>
            <el-select v-model="ClubValidateForm.provinceId" @change="changeprovice" placeholder="请选择省" class="province">
              <el-option v-for="item in provincedata" :key="item.name" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item><el-form-item style='width: 140px' class='not-left-border not-right-border'>
            <el-select v-model="ClubValidateForm.cityId" @change="changecity" placeholder="请选择市" class="province">
              <el-option v-for="item in towndata" :key="item.name" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item><el-form-item style='width: 140px' class='not-left-border'>
            <el-select v-model="ClubID" placeholder="请选择门店">
              <el-option v-for="item in ClubData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class='search-content'>
            <div class="block" style="margin-bottom:40px">
              <el-date-picker v-model="valuetime"
                              type="daterange"
                              align="right"
                              unlink-panels
                              :clearable="false"
                              value-format="timestamp"
                              range-separator="至" start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :picker-options="pickerOptions2">
              </el-date-picker>
            </div>

          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" class="marginTop-40">
        <div style="display:inline-block;width:100%" class='chart-border'>
          <el-col :span='24' style='font-size: 16px' class='charts-title'>
            <span>营业流水</span>
          </el-col>
          <ve-line :extend='lineExtend' :data="LineData" :legend-visible='false' :colors='yinyeeLineColor'></ve-line>
        </div>
        <div style="display:inline-block;width:100%;" class='chart-border'>
          <el-col :span='24' style='font-size: 16px' class='charts-title'>
            <span>新增用户数</span>
          </el-col>
          <ve-histogram :extend='lineExtend' :data="histogrsmdata" :legend-visible='false' :colors='yinyeeLineColor'></ve-histogram>
        </div>

        <div style="margin-top:40px;overflow-y:auto;">
          <!-- <el-table
                             border
                            :data="UsertableData"
                            style="width: 100%">
                            <el-table-column
                                prop="clubName"
                                label="商家名称"
                                width="400">
                            </el-table-column>
                            <el-table-column
                                prop="addUserCount"
                                label="新增用户"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="orderAmount"
                                label="订单金额">
                            </el-table-column>
                            <el-table-column
                                prop="addUserRatio"
                                label="新增用户占比">
                            </el-table-column>
                            <el-table-column
                                prop="orderAmountRatio"
                                label="订单金额占比">
                            </el-table-column>


                        </el-table> -->
          <el-col :span='24' style='font-size: 16px' class='charts-title'>
            <span>门店排名</span>
            <button @click='chooseTurnover' class='bar-charts-btn' :class="avtiveBtn ? 'active' : ''">营业额</button>
            <button @click='chooseUserNum' class='bar-charts-btn' :class="!avtiveBtn ? 'active' : ''">用户数</button>
          </el-col>
          <el-col :span='24' style='width: 100%;height: 300px'>
            <ve-bar  v-if='avtiveBtn' width='100%' :legend-visible='false' height='100%' :colors='yinyeeLineColor' :extend='chartExtend' :data='turnoverData' :settings='barChartsSet' />
            <ve-bar  v-if='!avtiveBtn' width='100%' :legend-visible='false' height='100%' :data='turnoverData' :colors='yinyeeLineColor' :extend='chartExtend' :settings='userNumSet' />
          </el-col>
        </div>

      </el-col>

    </el-col>

  </el-row>
</template>
<script>
import {
  dataStatisorderCountyzd,
  getcity,
  getbusinessman,
  dorderAmountyzd
} from "@/api/api";
import { timeFormattershow,SevenDay, dateToMs} from "@/assets/js/common";
export default {
  data() {
    return {
      UsertableData: [],
      valuetime: [
        dateToMs(new Date(SevenDay(new Date()))),
        dateToMs(new Date())
      ],
      ClubID: "",
      ClubData: [],
      mysession: "",
      clubCount: "", //门店数
      userCount: "", //用户数
      turnoverAmount: "", //昨日营业流水额
      classroomAmount: "", //昨日问诊数
      provincedata: [], //省
      towndata: [], //市
      ClubValidateForm: {
        provinceId: "",
        cityId: ""
      },
      histogrsmdata: {
        columns: ["日期", "新增用户数"],
        rows: []
      },
      LineData: {
        columns: ["日期", "营业流水"],
        rows: []
      },
      yinyeeLineColor: ["#12D3DD"],
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
      avtiveBtn: true, // 营业额和用户按钮 true 为营业额
      turnoverData: {
        columns: ["name", "营业额", "用户数"],
        rows: []
      }, // 营业额数据 排行
      barChartsSet: {
        metrics: ["营业额"],
        dataOrder: {
          label: "营业额",
          order: "desc"
        }
      },
      userNumSet: {
        metrics: ["用户数"],
        dataOrder: {
          label: "用户数",
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
      },
      userNumberData: {} // 用户数 排行
    };
  },
  methods: {
    getdataStatisorderCountyzd() {
      dataStatisorderCountyzd(this.mysession).then(res => {
        console.log(res);
        if (res.data.code == 1001) {
          this.clubCount = res.data.data.clubCount;
          this.userCount = res.data.data.userCount;
          this.turnoverAmount = res.data.data.turnoverAmount;
          this.classroomAmount = res.data.data.askCount;
        }
      });
    },
    Provincecity() {
      //省
      getcity().then(res => {
        console.log("所有的省");
        console.log(res);

        if (res.code == 1001) {
          this.provincedata = res.data;
        }
      });
    },
    changeprovice(province) {
      //市
      this.towndata = [];
      let params = {
        parentId: province
      };
      getcity(params).then(res => {

        console.log(res);
        if (res.code == 1001) {
          this.towndata = res.data;
        }
      });
    },
    changecity(province) {
      //商家
      console.log(province);
      let params = {
        parentId: province,
        pageSize: 500
      };

      console.log(params);
      console.log("13213");

      getbusinessman(params).then(res => {
        console.log(res);

        if (res.code == 1001) {
          this.ClubData = res.data.items;
        }
      });
    },
    getdorderAmountyzd() {
      //下部分
      var params = {
        startTime: this.valuetime[0],
        endTime: this.valuetime[1],
        clubId: this.ClubID
      };

      dorderAmountyzd(params, this.mysession).then(res => {
        console.log("----图-----");
        console.log(params);
        console.log(res);
        if (res.data.code == 1001) {
          for (var i = 0; i < res.data.data.addUserCountList.length; i++) {
            this.histogrsmdata.rows.push({
              日期: timeFormattershow(
                res.data.data.addUserCountList[i].registerTime
              ),
              新增用户数: res.data.data.addUserCountList[i].userCount
            });
          }
          for (var k = 0; k < res.data.data.clubInfoList.length; k++) {
            this.LineData.rows.push({
              日期: timeFormattershow(res.data.data.clubInfoList[k].orderTime),
              营业流水: res.data.data.clubInfoList[k].orderAmount
            });
          }
          this.UsertableData = res.data.data.clubInfoList;
          this.formatBarCharts();
        }
      });
    },
    searchData() {
      // 点击搜索按钮
      this.getdorderAmountyzd();
    },
    chooseTurnover() {
      // 点击营业额
      this.avtiveBtn = true;
    },
    chooseUserNum() {
      // 点击用户数
      this.avtiveBtn = false;
    },
    formatBarCharts() {
      // 把数据转换成 charts 可用数据
      console.log("barCharts");
      console.log(this.UsertableData);

      //   for (let item of this.UsertableData) {
      for (let i = 0; i < 3; i++) {
        console.log(i);
        this.turnoverData.rows.push({
          name: i,
          营业额: Number(1) / 3,
          用户数: Number(1) / 3
        });
      }
      console.log(this.turnoverData);
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getdataStatisorderCountyzd();
    this.Provincecity();
    this.getdorderAmountyzd();
  }
};
</script>
<style  lang="scss" scoped>
.Userblock {
  margin: 20px 40px;
  display: inline-block;
  height: 60px;
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
.search-content {
  .search-btn {
    display: inline-block;
    width: 50px;
    height: 50px;
    vertical-align: middle;
    background: url("../../../static/img/search.png") no-repeat;
  }
}
.bar-charts-btn {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
}
.bar-charts-btn.active {
  background-color: #12d3dd;
  color: #fff;
}
.charts-title {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  background-color: #f5f5f5;
}
</style>
<style lang="scss">
.not-right-border .el-input__inner {
    border-radius: 4px 0 0 4px;
    border-right: none;
}
.el-form--inline .not-right-border {
  margin-right: 0;
}
.not-left-border {
  .el-input__inner {
    border-radius: 0 4px 4px 0;
  }
  margin-right: 0;
}
.not-left-border.not-right-border {
  .el-input__inner {
    border-radius: 0;
  }

}
.search-content {
  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 230px;
  }

    .el-date-editor .el-range__close-icon {
      width: 0;
    }

}
.marginTop-40 {
  margin-top: -40px;
}
</style>



