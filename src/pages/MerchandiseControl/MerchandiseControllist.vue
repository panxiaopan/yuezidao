<template>
    <el-row>
        <el-col :span='24'>
            <div class="CurrentPage">商品管理
                <i class="el-icon-arrow-right"></i>预约列表</div>
        </el-col>
        <el-col :span="24">
            <el-form label-width="100px" class="demo-ruleForm form-not-margin-bottom" :inline="true">
                <el-form-item>
                    <el-input v-model="itemName" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-form-item>
                        <el-select v-model="sortId" placeholder="请选择商品性质">
                            <el-option label="住院照护" value="1"></el-option>
                            <el-option label="上门到家" value="2"></el-option>
                            <el-option label="预约到店" value="3"></el-option>
                            <el-option label="住店尊享" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="stateSelect" placeholder="请选择状态">
                        <!-- <el-option label="未上架" value="0"></el-option> -->
                        <el-option label="上架" value="1"></el-option>
                        <el-option label="下架" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <button class='search-btn' @click="SeachState">
                        <i class='search-btn-icon' ></i>
                    </button>
                </el-form-item>
                <br/>
                <el-form-item v-if="isSuperAdmin">
                    <el-button type="text" class='stand-up-btn' size="mini" @click="Merchanupload">上架</el-button>

                    <el-button type="text" class='stand-up-btn' size="mini" @click="MerchaddSold">下架</el-button>
                </el-form-item>
                <div style="float:right">
                    <el-form-item>
                        <el-button type="primary" icon='el-icon-plus' size="small" @click="Merchadd">新增</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-col>
        <el-col :span="24" style='margin-top: 10px;' >
            <el-table :data="MerchantableData" tooltip-effect="dark" border @selection-change="MerchanSelectionChange" style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
               <el-table-column label="商品编号" prop="id">

               </el-table-column>


                <el-table-column label="商品封面图" width="180">
                    <template slot-scope="scope">
                        <img style="width:50px;height:50px" :src="`${baseUrl}/common/fileOut?url=${MerchantableData[scope.$index].itemPic}`">
                    </template>
                </el-table-column>
                <el-table-column prop="itemName" label="商品名称" width="180">
                </el-table-column>
                <el-table-column label="市场价(元)" prop="marketPrice"></el-table-column>
                <el-table-column label="销售价(元)">
                    <template slot-scope="scope">
                        <span>{{MerchantableData[scope.$index].minPrice}}</span>/
                        <span>{{MerchantableData[scope.$index].dayCountName}}</span>
                        <span v-if="MerchantableData[scope.$index].type==3">月</span>
                        <span v-if="MerchantableData[scope.$index].type==2">天</span>
                        <span v-if="MerchantableData[scope.$index].type==1">次</span>
                    </template>
                </el-table-column>
                <el-table-column label="商品性质">
                    <template slot-scope="scope">
                        <span v-if="MerchantableData[scope.$index].sortId==1">住院照护</span>
                        <span v-if="MerchantableData[scope.$index].sortId==2">上门到家</span>
                        <span v-if="MerchantableData[scope.$index].sortId==3">预约到店</span>
                        <span v-if="MerchantableData[scope.$index].sortId==4">住店尊享</span>
                        <span v-if="MerchantableData[scope.$index].sortId==5">专护人员</span>
                        <span v-if="MerchantableData[scope.$index].sortId==6">早幼教</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span v-if="MerchantableData[scope.$index].state==0">未上架</span>
                        <span v-if="MerchantableData[scope.$index].state==1">上架</span>
                        <span v-if="MerchantableData[scope.$index].state==2">下架</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间">

                    <template slot-scope="scope">
                        {{timeFormattershow(MerchantableData[scope.$index].createTime)}}
                    </template>

                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" type="primary" @click="MerchanhandleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <!-- <el-button size="mini" type="danger" @click="MerchanhandleDelete(scope.$index, scope.row)">删除</el-button> -->
                        <i class='my-icon edit' @click="MerchanhandleEdit(scope.$index, scope.row)" ></i>
                        <i class='my-icon delete' @click="MerchanhandleDelete(scope.$index, scope.row)" ></i>
                    </template>
                </el-table-column>
            </el-table>
            <div class="myPagination">
                <el-pagination layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChange'>
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import {
  nursingApinursitemlist,
  nursingApinursitemdel,
  nursingApinurstateChange
} from "@/api/api";
import { timeFormattershow } from "@/assets/js/common";
import qs from "qs";
import { baseUrl } from "../../../static/baseUrl";
export default {
  data() {
    return {
      timeFormattershow,
      baseUrl,
      itemName: "", //商品名称
      stateSelect: "", //上下架状态//页面收缩
      sortId: "", //商品性质
      pageNo: 1,
      pageSize: 10,
      MerchantableData: [],
      totalNumber: null,
      mysession: null,
      Selectdata: [],
      SelectID: [],
      state: null,
      SubscribeAdd: null,
      editSubdata: [],
      isSuperAdmin: false,
    };
  },
  created () {
    let roleName = sessionStorage.getItem('roleName');
    if ( roleName.indexOf('管理员') !== -1 || roleName.indexOf('店长') !== -1 ) {
      this.isSuperAdmin = true;
    } else {
      this.isSuperAdmin = false;
    }

  },
  methods: {
    Merchadd() {
      //点击新增跳转也面
      this.SubscribeAdd = true;
      this.$router.push({
        name: "MerchandiseControladd",
        params: { SubscribeAdd: this.SubscribeAdd }
      });
    },
    getnursingApinursitemlist() {
      this.MerchantableData = [];
      var mysession = sessionStorage.getItem("sesstion");
      var params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sortId: this.sortId,
        itemName: this.itemName,
        state: this.stateSelect,
        businessName: "",
        nursingItemId: ""
      };
      nursingApinursitemlist(params, mysession).then(res => {
        console.log("leibiao");
        console.log(res);

        if (res.data.code == 1001) {
          this.MerchantableData = res.data.data.items;
          this.totalNumber = res.data.data.totalNum;
        }
      });
    },
    MerchanhandleEdit(index) {
      //编辑
      this.SubscribeAdd = false;
      this.$router.push({
        name: "MerchandiseControladd",
        params: {
          SubscribeAdd: this.SubscribeAdd,
          id: this.MerchantableData[index].id
        }
      });
    },
    MerchanhandleDelete(index) {
      //删除
      var parms = {
        id: this.MerchantableData[index].id
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        nursingApinursitemdel(qs.stringify(parms), this.mysession).then(res => {
          if (res.data.code == 1001) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.getnursingApinursitemlist();
          }
        });
      });
    },
    pageIndexChange(index) {
      //翻页
      this.pageNo = index;
      this.getnursingApinursitemlist();
    },
    MerchanSelectionChange(value) {
      //选中的
      this.SelectID = [];
      this.Selectdata = value;
      for (var i = 0; i < this.Selectdata.length; i++) {
        this.SelectID.push(this.Selectdata[i].id);
      }
    },
    Merchanupload() {
      this.state = 1;
      var parms = {
        state: this.state,
        idList: this.SelectID
      };
      nursingApinurstateChange(parms, this.mysession).then(res => {
        if (res.data.code == 1001) {
          this.$message({
            type: "success",
            message: "上架成功"
          });
          this.getnursingApinursitemlist();
        }
      });
    },
    MerchaddSold() {
      //下架
      this.state = 2;
      var parms = {
        state: this.state,
        idList: this.SelectID
      };
      nursingApinurstateChange(parms, this.mysession).then(res => {
        if (res.data.code == 1001) {
          this.$message({
            type: "success",
            message: "下架成功"
          });
          this.getnursingApinursitemlist();
        }
      });
    },
    SeachState() {
      //查询条件
      this.getnursingApinursitemlist();
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getnursingApinursitemlist();
  }
};
</script>
<style lang="scss" scoped>
</style>



