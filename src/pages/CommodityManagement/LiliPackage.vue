<template>
    <el-row class="Lilipackage">
        <el-col :span='24'>
            <el-col :span='24'>
                <div class="CurrentPage">商品管理
                    <i class="el-icon-arrow-right"></i>月子套餐</div>
            </el-col>
            <el-col :span="24">
                <el-form :inline="true" class="demo-form-inline form-not-margin-bottom">
                    <el-form-item>
                        <el-input v-model="itemName" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="Rackingcondition" placeholder="请选择状态">
                            <el-option label="上架" value="1"></el-option>
                            <el-option label="下架" value="2"></el-option>
                            <!-- <el-option label="未上架" value="0"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <button class='search-btn'  @click="Seachbuttom">
                          <i class='search-btn-icon' ></i>
                        </button>
                    </el-form-item>
                    <br/>
                    <el-form-item v-if="isSuperAdmin">
                        <el-button type="text" class='stand-up-btn' size='mini' @click="PutaWay">
                            上架
                        </el-button>
                        <el-button type="text" class='stand-up-btn' size='mini' @click="OutOfStock">
                            下架
                        </el-button>
                    </el-form-item>

                    <div style="float:right;display:inline-block;margin-right:30px;">
                        <el-form-item>
                            <el-button type="primary" icon='el-icon-plus' size="small" @click="Goodsincrease">新增</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </el-col>
            <el-col :span="24" style='margin-top: 10px;' >
                <el-table border :data="Monthlyschedule" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="商品编号" prop="id">
                    </el-table-column>
                    <el-table-column label="商品封面图" width="120">
                        <template slot-scope="scope">
                            <img :src="Monthlyschedule[scope.$index].itemImg" style="dispaly:inline-block;width:40px;height:40px">
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" prop="itemName" >
                    </el-table-column>
                    <!--                     <el-table-column
                      label="商家ID"
                      prop="clubId"
                    >
                    </el-table-column> -->
                    <el-table-column label="市场价(元)" prop="marketPrice"></el-table-column>
                    <el-table-column label="销售价(元)">
                        <template slot-scope='scope'>
                            <span v-if="Monthlyschedule[scope.$index].minPrice==Monthlyschedule[scope.$index].maxPrice">{{Monthlyschedule[scope.$index].minPrice}}</span>
                            <span v-else>{{Monthlyschedule[scope.$index].minPrice}}~{{Monthlyschedule[scope.$index].maxPrice}}</span>
                        </template>
                    </el-table-column>
                    <!--                     <el-table-column
                       label="更新日期"
                      >
                    </el-table-column> -->
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span v-if="Monthlyschedule[scope.$index].state==0">未上架</span>
                            <span v-if="Monthlyschedule[scope.$index].state==1">上架</span>
                            <span v-if="Monthlyschedule[scope.$index].state==2">下架</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间">
                        <template slot-scope="scope">
                            {{timeFormattershow(Monthlyschedule[scope.$index].createTime)}}
                        </template>

                    </el-table-column>
                    <el-table-column label="操作" width="200px">
                        <template slot-scope="scope">
                            <i class='my-icon edit' @click="handleEdit(scope.$index, scope.row)" ></i>
                            <i class='my-icon delete' @click="handleDelete(scope.$index, scope.row)" ></i>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="myPagination">
                    <el-pagination  layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChange'>
                    </el-pagination>
                </div>
            </el-col>
        </el-col>
    </el-row>
</template>
<script>
import {
  itemgetItemList,
  itemgetstateChange,
  itemgetItemListdel
} from "@/api/api";
import VueUEditor from "vue-ueditor";
import { timeFormattershow } from "@/assets/js/common";
import qs from "qs";
import { baseUrl } from "../../../static/baseUrl";
export default {
  data() {
    return {
      timeFormattershow,
      baseUrl,
      MerchantID: "",
      Merchantname: "",
      Rackingcondition: "",
      pageNo: 1,
      pageSize: 10,
      itemName: "",
      Monthlyschedule: [],
      pageurl: "",
      totalNumber: null,
      multipleSelection: [], //选中条数
      idList: [],
      HeadblockState: null,
      LilipackisAdd: true,
      isSuperAdmin: false
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
    Goodsincrease() {
      //商品新增按钮

      this.$router.push({ name: "addGoods" });
    },
    itemAssortlist() {
      //列表
      this.Monthlyschedule = [];
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        businessName: this.Merchantname,
        state: this.Rackingcondition,
        itemName: this.itemName,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      itemgetItemList(qs.stringify(parms), mysession).then(res => {
        console.log("--列表---");
        console.log(res);
        if (res.data.code == 1001) {
          console.log("--列表---");
          console.log(res);
          // this.Monthlyschedule=res.data.data.items
          res.data.data.items.forEach((item, index) => {
            this.Monthlyschedule.push(item);
            // this.Monthlyschedule[index].createTime=timeFormattershow(this.Monthlyschedule[index].createTime)
            this.Monthlyschedule[
              index
            ].itemImg = `${baseUrl}/common/fileOut?url=${
              this.Monthlyschedule[index].itemPic
            }`;
          });
          this.totalNumber = res.data.data.totalNum;
        }
      });
    },
    handleSelectionChange(val) {
      this.idList = [];
      this.multipleSelection = val;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.idList.push(this.multipleSelection[i].id);
      }
    },
    PutaWay() {
      //商品上架
      var mysession = sessionStorage.getItem("sesstion");
      this.HeadblockState = 1;
      var parms = {
        idList: this.idList,
        state: this.HeadblockState
      };
      itemgetstateChange(parms, mysession).then(res => {
        if (res.data.code == 1001) {
          this.$message({
            type: "success",
            message: "上架成功"
          });
          this.itemAssortlist();
        }
      });
    },
    OutOfStock() {
      //商品下架
      var mysession = sessionStorage.getItem("sesstion");
      this.HeadblockState = 2;
      var parms = {
        idList: this.idList,
        state: this.HeadblockState
      };
      itemgetstateChange(parms, mysession).then(res => {
        if (res.data.code == 1001) {
          this.$message({
            type: "info",
            message: "下架成功"
          });
          this.itemAssortlist();
        }
      });
    },
    handleEdit(index) {
      //编辑内容获取详情ID在详情页面传
      this.LilipackisAdd = false;
      this.$router.push({
        name: "addGoods",
        params: {
          id: this.Monthlyschedule[index].id,
          LilipackisAdd: this.LilipackisAdd
        }
      });
    },
    handleDelete(index) {
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        id: this.Monthlyschedule[index].id
      };
      this.$confirm("确定删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        itemgetItemListdel(qs.stringify(parms), mysession).then(res => {
          if (res.data.code == 1001) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.itemAssortlist();
          }
        });
      });
    },
    pageIndexChange(index) {
      //点击翻页
      this.pageNo = index;
      this.itemAssortlist();
    },

    Seachbuttom() {
      //查询商品
      this.itemAssortlist();
    }
  },
  mounted() {
    this.itemAssortlist();
    //   this.getlieifro()
  }
};
</script>
<style lang="scss" scoped>
.Lilipackage {
}
</style>
