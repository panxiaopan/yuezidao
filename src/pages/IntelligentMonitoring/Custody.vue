<template>
    <el-row class="LongDistance">
        <el-col :span='24'>
            <div class="CurrentPage">商品管理
                <i class="el-icon-arrow-right"></i>智护套餐</div>
        </el-col>
        <el-col :span="24">
            <el-form :inline="true" class='form-not-margin-bottom' >
                <el-form-item>
                    <el-input v-model="itemName" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="Selectstate" placeholder="请选择状态">
                        <el-option label="上架" value="1"></el-option>
                        <el-option label="下架" value="2"></el-option>
                        <!-- <el-option label="未上架" value="0"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <button class='search-btn' @click="Seachconcent">
                      <i class='search-btn-icon' ></i>
                    </button>
                </el-form-item>
                <br/>
                <el-form-item v-if="isSuperAdmin">
                    <el-button class='stand-up-btn' type="text" size="mini" @click="headblock">上架</el-button>
                    <el-button class='stand-up-btn' type="text" size="mini" @click="SoldOut">下架</el-button>
                </el-form-item>

                <div style="float:right">
                    <el-button size="small" icon='el-icon-plus' type="primary" @click="CustodyAdd">新增</el-button>
                </div>
            </el-form>
        </el-col>
        <el-col :span="24" style='margin-top: 10px;' >
            <el-table border :data="CustodytableData" @selection-change="handleSelectionChange" style="width: 100%">
                <el-table-column width="60" type="selection">
                </el-table-column>
                <el-table-column label="商品编号" prop="id">

                </el-table-column>


                <el-table-column label="商品封面图" width="180">
                    <template slot-scope="scope">
                        <img :src="`${baseUrl}/common/fileOut?url=${CustodytableData[scope.$index].itemPic}`" style="dispaly:inline-block;width:40px;height:40px">
                    </template>
                </el-table-column>
                <el-table-column prop="itemName" label="商品名称">
                </el-table-column>
                <el-table-column label="市场价(元)" prop="marketPrice"></el-table-column>
                <el-table-column label="销售价(元)">
                    <template slot-scope='scope'>
                        <span v-if="CustodytableData[scope.$index].minPrice==CustodytableData[scope.$index].maxPrice">{{CustodytableData[scope.$index].minPrice}}</span>
                        <span v-else>{{CustodytableData[scope.$index].minPrice}}~{{CustodytableData[scope.$index].maxPrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="180">
                    <template slot-scope="scope">
                        <span v-if="CustodytableData[scope.$index].state==0">未上架</span>
                        <span v-if="CustodytableData[scope.$index].state==1">上架</span>
                        <span v-if="CustodytableData[scope.$index].state==2">下架</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="创建时间">
                    <template slot-scope="scope">
                        {{timeFormattershow(CustodytableData[scope.$index].createTime)}}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" type="primary" @click="CushandleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <!-- <el-button size="mini" type="danger" @click="CushandleDelete(scope.$index, scope.row)">删除</el-button> -->
                        <i class='my-icon edit' @click="CushandleEdit(scope.$index, scope.row)" ></i>
                        <i class='my-icon delete' @click="CushandleDelete(scope.$index, scope.row)" ></i>
                    </template>
                </el-table-column>
            </el-table>
            <div class="myPagination">
                <el-pagination  layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChange'>
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import {
  bespeakApiitemlist,
  bespeakstateChange,
  bespeakstateitemdel
} from "@/api/api";
import qs from "qs";
import { baseUrl } from "../../../static/baseUrl";
import { timeFormattershow } from "@/assets/js/common";
export default {
  data() {
    return {
      timeFormattershow,
      Selectstate: "",
      SmartisAdd: true, //新增的时候判断是新增还是编辑.
      CustodytableData: [],
      itemName: "", //商品名称
      pageNo: 1,
      pageSize: 10,
      idList: [],
      totalNumber: null,
      baseUrl,
      CustodyisAdd: true,
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
    CustodyAdd() {
      //点击新增
      this.SmartisAdd = true;
      this.CustodyisAdd = true;
      /* this.$router.push('/Remote') */
      this.$router.push({
        name: "Remote",
        params: { CustodyisAdd: this.CustodyisAdd }
      });
    },
    pageIndexChange(index) {
      //翻页
      this.pageNo = index;
      this.getitemlist();
    },
    headblock() {
      //上架
      var parms = {
        state: 1,
        idList: this.idList
      };
      bespeakstateChange(parms, this.mysession).then(res => {
        console.log("==上架===");
        console.log(res);
        if (res.data.code == 1001) {
          this.getitemlist();
        }
      });
    },
    SoldOut() {
      //下架
      var parms = {
        state: 2,
        idList: this.idList
      };
      bespeakstateChange(parms, this.mysession).then(res => {
        console.log(res);
        console.log(parms);
        if (res.data.code == 1001) {
          this.getitemlist();
        }
      });
    },
    Seachconcent(){
      this.getitemlist()
    },
    getitemlist() {
      //获取列表
      var parms = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        itemName: this.itemName,
        state: this.Selectstate
      };
      console.log(parms);
      bespeakApiitemlist(parms, this.mysession).then(res => {
        console.log(res);
        if (res.data.code == 1001) {
          this.CustodytableData = res.data.data.items;
          this.totalNumber = res.data.data.totalNum;
        }
      });
    },
    handleSelectionChange(val) {
      //选中
      this.idList = [];
      this.multipleSelection = val;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.idList.push(this.multipleSelection[i].id);
      }
    },
    CushandleEdit(index) {
      //编辑
      console.log(this.CustodytableData[index]);
      this.CustodyisAdd = false;
      this.$router.push({
        name: "Remote",
        params: {
          CustodyisAdd: this.CustodyisAdd,
          id: this.CustodytableData[index].id
        }
      });
    },
    CushandleDelete(index) {
      //删除
      console.log(this.CustodytableData[index].id);
      var parms = {
        id: this.CustodytableData[index].id
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          bespeakstateitemdel(qs.stringify(parms), this.mysession).then(res => {
            console.log("删除");
            console.log(res);
            if (res.data.code == 1001) {
              this.$message({
                type: "success",
                meaasge: "删除成功"
              });
              this.getitemlist();
            }
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getitemlist();
  }
};
</script>
<style lang="scss" scoped>
.LongDistance {
}
</style>
