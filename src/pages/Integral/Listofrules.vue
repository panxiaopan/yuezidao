<template>
    <el-row class="listofRule">
        <el-col :span='24'>
            <div class="CurrentPage">积分管理
                <i class="el-icon-arrow-right"></i>积分规则列表 </div>
        </el-col>
        <el-form :inline="true">
            <el-form-item>
                <el-date-picker v-model="SechTime" type="daterange" @change="changetime" start-placeholder="开始日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp" end-placeholder="结束日期" range-separator="至" :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <button class='search-btn' @click="Inquire">
                    <i class='search-btn-icon' ></i>
                </button>
            </el-form-item>

            <div style="float:right">
                <el-button icon='el-icon-plus' type="primary" size="mini" @click="Addlistfrules">新增</el-button>
            </div>
        </el-form>

        <el-col :span="24">
            <el-table :data="listoftableData" border style="width: 100%">
                <el-table-column type="index" label="序号" width="180">
                </el-table-column>
                <el-table-column label="商品类型" width="180">
                    <template slot-scope="scope">
                        <span v-if="listoftableData[scope.$index].productSort==1">远程智能监护</span>
                        <span v-if="listoftableData[scope.$index].productSort==2">预约上门</span>
                        <span v-if="listoftableData[scope.$index].productSort==3">月子餐</span>
                        <span v-if="listoftableData[scope.$index].productSort==4">到店服务</span>
                        <span v-if="listoftableData[scope.$index].productSort==5">云课堂</span>
                    </template>
                </el-table-column>
                <el-table-column prop="itemName" label="商品名称" >
                </el-table-column>
                <el-table-column prop="integrationLimit" label="积分上限" width="180">
                </el-table-column>
                <el-table-column label="积分开始时间" width="180">
                    <template slot-scope="scope">
                        {{timeFormattershow(listoftableData[scope.$index].effectiveStartTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="积分结束时间" width="180">
                    <template slot-scope="scope">
                        {{timeFormattershow(listoftableData[scope.$index].effectiveEndTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="180">
                    <template slot-scope="scope">
                        <span v-if="listoftableData[scope.$index].integrationStatus==1">启用</span>
                        <span v-else>停用</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
<!--                         <el-button size="mini" type="primary" @click="listruleDelete(scope.$index, scope.row)">
                            {{listoftableData[scope.$index].integrationStatus==1 ? '停用' : '启用'}}
                        </el-button> -->
                          <i class='my-icon ' @click="listruleDelete(scope.$index,scope.row)" :class="listoftableData[scope.$index].integrationStatus==1 ? 'kaisuo' : 'dongjie'" ></i>
                          <i class='my-icon edit' @click="listruleEdit(scope.$index, scope.row)" ></i>

<!--                         <el-button size="mini" type="primary" @click="listruleEdit(scope.$index, scope.row)">
                            编辑
                        </el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="myPagination">
                <el-pagination layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChange'>
                </el-pagination>
            </div>
        </el-col>
        <el-col :span="24">
            <el-dialog title="提示" :visible.sync="ListdialogVisible" width="40%">
                <el-form :inline="true" :model="ListformInline" :rules="rules" ref="ListformInline" label-width="100px" class="demo-form-inline">
                    <el-form-item label="商品类型" prop="GoodsType">
                        <el-select v-model="ListformInline.GoodsType" placeholder="活动区域" @change="changegoodtype">
                            <el-option label="远程智能" value="1"></el-option>
                            <el-option label="预约上门" value="2"></el-option>
                            <el-option label="月子餐" value="3"></el-option>
                            <el-option label="到店服务" value="4"></el-option>
                            <el-option label="云课堂" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择商品" prop="Goodsname">
                        <el-select v-model="ListformInline.Goodsname" placeholder="活动区域" @change="changegoodname">
                            <el-option v-for="item in GoodsData" :key="item.itemId" :label="item.itemName" :value="item.itemId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="upperlimit" label="积分上限" style="display:block">
                        <el-input v-model.number="ListformInline.upperlimit"></el-input>
                    </el-form-item>
                    <el-form-item prop="Dateline" label="生效日期">
                        <div class="block">
                            <el-date-picker v-model="ListformInline.Dateline" type="date" value-format="yyyy-MM-dd" placeholder="开始日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="结束日期">
                        <div class="block">
                            <el-date-picker v-model="ListformInline.Endtime" type="date" value-format="yyyy-MM-dd" placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click="ListSubmit">确 定</el-button>
                </span>
            </el-dialog>
        </el-col>
    </el-row>
</template>
<script>
import {
  getProductList,
  itemSetadd,
  itemSetList,
  stateChange,
  itemSetedit
} from "@/api/api";
import { timeFormattershow } from "@/assets/js/common";
import qs from "qs";
export default {
  data() {
    return {
      Addlistisadd: true,
      Editid: "",
      totalNumber: null,
      SechTime: "",
      timeFormattershow,
      itemName: "",
      listoftableData: [],
      GoodsData: [],
      mysession: "",
      ListdialogVisible: false,
      ListformInline: {
        GoodsType: "",
        Goodsname: "",
        upperlimit: "",
        Dateline: "",
        Endtime: ""
      },
      pageNo: 1,
      pageSize: 10,
      rules: {
        GoodsType: [
          { required: true, message: "选择商品类型", trigger: "blur" }
        ],
        Goodsname: [{ required: true, message: "选择商品", trigger: "blur" }],
        upperlimit: [
          { required: true, message: "输入最高使用积分", trigger: "blur" },
          {
            type: "number",
            required: true,
            message: "请输入数字",
            trigger: "blur"
          }
        ],
        Dateline: [{ required: true, message: "选择日期", trigger: "blur" }],
        Endtime: [{ required: true, message: "选择日期", trigger: "blur" }]
      }
    };
  },
  methods: {
    Addlistfrules() {
      //点击新增的饿时候
      this.ListdialogVisible = true;
      this.Addlistisadd = true;
    },
    ListSubmit() {
      //提交数据
      var parms = {
        itemName: this.itemName,
        productSort: this.ListformInline.GoodsType,
        itemId: this.ListformInline.Goodsname,
        integrationLimit: this.ListformInline.upperlimit,
        effectiveStartTime: this.ListformInline.Dateline,
        effectiveEndTime: this.ListformInline.Endtime
      };

      if (this.Addlistisadd) {
        this.$refs["ListformInline"].validate(valid => {
          if (valid) {
            itemSetadd(qs.stringify(parms), this.mysession).then(res => {
              console.log(parms);
              console.log(res);
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.$refs["ListformInline"].resetFields();
                this.ListdialogVisible = false;
                this.getitemSetList();
              }
            });
          }
        });
      } else {
        parms.id = this.Editid;
        itemSetedit(qs.stringify(parms), this.mysession).then(res => {
          if (res.data.code == 1001) {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.$refs["ListformInline"].resetFields();
            this.ListdialogVisible = false;
            this.getitemSetList();
          }
        });
      }
    },
    changegoodname(value) {
      //取label的名称发给后台
      console.log(value);
      let goodnameobj = {};
      goodnameobj = this.GoodsData.find(item => {
        return item.itemId === value;
      });
      this.itemName = goodnameobj.itemName;
    },
    changetime(value) {
      if (value === null) {
        console.log("==============dwdwd");
        this.SechTime = [];
      }
    },
    pageIndexChange(index) {
      this.pageNo = index;
      this.getitemSetList();
    },
    listruleEdit(index) {
      //编辑
      this.Addlistisadd = false;
      this.ListdialogVisible = true;
      console.log(this.listoftableData[index]);
      this.ListformInline.GoodsType = String(
        this.listoftableData[index].productSort
      );
      this.changegoodtype(this.listoftableData[index].productSort);
      this.ListformInline.Goodsname = this.listoftableData[index].itemId;
      this.itemName = this.listoftableData[index].itemName;
      this.ListformInline.upperlimit = this.listoftableData[
        index
      ].integrationLimit;
      this.ListformInline.Dateline = timeFormattershow(
        this.listoftableData[index].effectiveStartTime
      );
      this.ListformInline.Endtime = timeFormattershow(
        this.listoftableData[index].effectiveEndTime
      );
      this.Editid = this.listoftableData[index].id;
    },
    listruleDelete(index) {
      //停用启用
      console.log(this.listoftableData[index]);
      var parms = {
        id: this.listoftableData[index].id,

        integrationStatus:
          this.listoftableData[index].integrationStatus == 1 ? "0" : "1"
      };
      console.log(parms);
      stateChange(qs.stringify(parms), this.mysession).then(res => {
        console.log(res);
        if (res.data.code == 1001) {
          this.getitemSetList();
        }
      });
    },
    changegoodtype(value) {
      var parms = {
        productSort: value
      };
      getProductList(parms, this.mysession).then(res => {
        //下拉选择商品的请求列表
        console.log("+==");
        console.log(res);
        this.GoodsData = [];
        if (res.data.code == 1001) {
          this.GoodsData = res.data.data;
        }
      });
    },
    Inquire() {
      //查询
      this.getitemSetList();
    },

    getitemSetList() {
      var parms = {
        inStartTime: this.SechTime[0],
        inEndTime: this.SechTime[1],
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      itemSetList(parms, this.mysession).then(res => {
        console.log("====");
        console.log(parms);
        console.log(res);
        if (res.data.code == 1001) {
          this.listoftableData = res.data.data.items;
          this.totalNumber = res.data.data.totalNum;
        }
      });
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getitemSetList();
  }
};
</script>
<style lang="scss" scoped>
</style>


