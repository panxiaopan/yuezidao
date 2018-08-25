<template>
    <el-row class="PagePackage">
        <el-col :span='24'>
            <div class="CurrentPage">页面编辑
                <i class="el-icon-arrow-right"></i>页面套餐编辑管理
            </div>
        </el-col>
        <el-col :span="24">
            <el-form style='margin-bottom: 20px;' >
                <el-radio-group v-model="sortId" size="medium" @change="changetype">
                    <el-radio-button label="1">住院照护</el-radio-button>
                    <el-radio-button label="2">上门到家</el-radio-button>
                    <el-radio-button label="3">预约到店</el-radio-button>
                    <el-radio-button label="4">住店尊享</el-radio-button>
                </el-radio-group>
            </el-form>
            <el-form :inline="true">
                <el-form-item>
                    <el-button class='stand-up-btn' type="text" size="mini" @click="Putaway">上架</el-button>
                    <el-button class='stand-up-btn' type="text" size="mini" @click="OutofStock">下架</el-button>
                </el-form-item>
                <div style="float:right">
                    <el-form-item>
                        <el-button icon='el-icon-plus' type="primary" size="small" @click="PagePackageAdd">新增</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-col>
        <el-col :span="24" style="margin-top:40px">
            <el-table :data="pagetableData" @selection-change="handleSelectionChange" border style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="sortName" label="分类" width="180">
                </el-table-column>
                <el-table-column prop="name" label="logo" width="180">
                    <template slot-scope="scope">
                        <img style="width:50px;height:50px" :src="`${baseUrl}/common/fileOut?url=${pagetableData[scope.$index].logo}`">
                    </template>
                </el-table-column>
                <el-table-column prop="priceDesc" label="价格">
                </el-table-column>
                <el-table-column prop="productDesc" label="商品描述">
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span v-if="pagetableData[scope.$index].state==0">未上架</span>
                        <span v-if="pagetableData[scope.$index].state==1">上架</span>
                        <span v-if="pagetableData[scope.$index].state==2">下架</span>
                    </template>
                </el-table-column>
                <el-table-column width="200px" prop="address" label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" type="primary" @click="pageEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <!-- <el-button size="mini" type="danger" @click="pageDelete(scope.$index, scope.row)">删除</el-button> -->
                        <i class='my-icon edit' @click="pageEdit(scope.$index, scope.row)" ></i>
                        <i class='my-icon delete' @click="pageDelete(scope.$index, scope.row)" ></i>
                    </template>
                </el-table-column>
            </el-table>
            <div class="myPagination">
                <el-pagination  layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChange'>
                </el-pagination>
            </div>
        </el-col>
        <el-col :span="24">
            <el-dialog :title="SelsectType" @close="closeSeletype" :visible.sync="PagepackdialogVisible" width="30%">
                <el-form :model="pageValidateForm" ref="pageValidateForm" :rules="pagerules" label-width="100px">
                    <el-form-item label="分类名称" prop="sortName">
                        <el-input v-model="pageValidateForm.sortName"></el-input>
                    </el-form-item>
                    <el-form-item label="价格描述" prop="priceDesc">
                        <el-input v-model="pageValidateForm.priceDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述" prop="productDesc">
                        <el-input v-model="pageValidateForm.productDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="logo图片">
                        <!-- <el-input v-model="pageValidateForm.productDesc"></el-input>  -->
                        <el-upload class="avatar-uploader" :action="actionurl" :show-file-list="false" :on-success="PagepackSuccess">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="选择商品ID" prop="productId">
                        <el-input style="width:220px" v-model="pageValidateForm.productId" readonly="readonly"></el-input>
                        <el-button size="small" type="primary" @click="SelectProductid">选择</el-button>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click="pageSubmit">确 定</el-button>
                </span>
            </el-dialog>
        </el-col>
        <el-col :span="24">
            <el-dialog :visible.sync="ProduVisible" width="60%">
                <el-table :data="MerchantableData" highlight-current-row border @current-change="produCurrentChange" style="width: 100%">
                    <el-table-column label="商品主图" width="180">
                        <template slot-scope="scope">
                            <img style="width:50px;height:50px" :src="`${baseUrl}/common/fileOut?url=${MerchantableData[scope.$index].itemImg}`">
                        </template>
                    </el-table-column>
                    <el-table-column prop="itemName" label="商品名称" width="180">
                    </el-table-column>
                    <el-table-column label="价格">
                        <template slot-scope="scope">
                            <span>{{MerchantableData[scope.$index].minPrice}}</span>/
                            <span>{{MerchantableData[scope.$index].dayCountName}}</span>
                            <span v-if="MerchantableData[scope.$index].type==3">月</span>
                            <span v-if="MerchantableData[scope.$index].type==2">天</span>
                            <span v-if="MerchantableData[scope.$index].type==1">次</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="上下架状态">
                        <template slot-scope="scope">
                            <span v-if="MerchantableData[scope.$index].state==0">未上架</span>
                            <span v-if="MerchantableData[scope.$index].state==1">上架</span>
                            <span v-if="MerchantableData[scope.$index].state==2">下架</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品性质">
                        <template slot-scope="scope">
                            <span v-if="MerchantableData[scope.$index].sortId==1">住院照护</span>
                            <span v-if="MerchantableData[scope.$index].sortId==2">上门到家</span>
                            <span v-if="MerchantableData[scope.$index].sortId==3">预约到店</span>
                            <span v-if="MerchantableData[scope.$index].sortId==4">住店尊享</span>
                        </template>
                    </el-table-column>
                    <!--                         <el-table-column
                           label="创建时间">
                             <template slot-scope="scope">
                             </template>
                        </el-table-column> -->
                </el-table>
                <div class="myPagination">
                    <el-pagination  layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChangepRcod'>
                    </el-pagination>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="ProduVisible = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="submitidshow">确 定</el-button>
                </span>
            </el-dialog>
        </el-col>
    </el-row>
</template>
<script>
import {
  nursingApinursitemlist,
  navigationaddResidence,
  navigationgetList,
  navigationstateChange,
  navigationdel,
  navigationstateupdate
} from "@/api/api";
import qs from "qs";
import { baseUrl } from "../../../static/baseUrl";
import { timeFormattershowsecod } from "@/assets/js/common";
export default {
  data() {
    return {
      baseUrl,
      actionurl: baseUrl + "/common/uploadFile",
      mysession: null,
      totalNumber: null,
      ProduVisible: false, //选择商品的弹框
      imageUrl: "", //上传时候图片显示的
      pageNo: 1,
      pageSize: 10,
      sortId: 1,
      PagepackdialogVisible: false,
      pageValidateForm: {
        sortName: "",
        priceDesc: "",
        productDesc: "",
        productId: ""
      },
      MerchantableData: [],
      SelsectType: "住院照护",
      Acceptdata: null,
      pagetableData: [],
      idList: [],
      EditisAdd: true,
      procude: null
    };
  },
  computed: {
    pagerules() {
      return {
        sortName: [
          { required: true, message: "填写分类名称", trigger: "blur" }
        ],
        priceDesc: [
          { required: true, message: "填写价格描述", trigger: "blur" }
        ],
        productDesc: [
          { required: true, message: "填写产品描述", trigger: "blur" }
        ],
        productId: [{ required: true, message: "选择商品", trigger: "blur" }]
      };
    }
  },
  methods: {
    changetype(value) {
      //改变选中的类型值
      switch (String(value)) {
        case "1":
          this.SelsectType = "住院照护";
          this.getnavigationgetList();
          break;
        case "2":
          this.SelsectType = "上门到家";
          this.getnavigationgetList();
          break;
        case "3":
          this.SelsectType = "预约到店";
          this.getnavigationgetList();
          break;
        case "4":
          this.SelsectType = "住店尊享";
          this.getnavigationgetList();
      }
    },
    PagePackageAdd() {
      //增加
      this.PagepackdialogVisible = true;
      this.EditisAdd = true;
    },
    getnursingApinursitemlist() {
      //弹框商品列表
      this.MerchantableData = [];
      var params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sortId: this.sortId
      };
      nursingApinursitemlist(params, this.mysession).then(res => {
        if (res.data.code == 1001) {
          this.MerchantableData = res.data.data.items;
          this.totalNumber = res.data.data.totalNum;
        }
      });
    },
    closeSeletype() {
      //关闭的时候清空
      this.pageValidateForm.sortName = "";
      this.pageValidateForm.priceDesc = "";
      this.pageValidateForm.productDesc = "";
      this.pageValidateForm.productId = "";
      this.imageUrl = false;
    },
    produCurrentChange(value) {
      //获取当前选中商品的Id
      this.Acceptdata = value;
    },
    submitidshow() {
      //确定按钮
      this.pageValidateForm.productId = this.Acceptdata.id;
      this.ProduVisible = false;
    },
    getnavigationgetList() {
      //页面分类显示列表
      this.pagetableData = [];
      var parms = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sortId: this.sortId
      };
      navigationgetList(parms, this.mysession).then(res => {
        if (res.data.code == 1001) {
          this.pagetableData = res.data.data.items;
          this.totalNumber = res.data.data.totalNum;
        }
      });
    },
    handleSelectionChange(val) {
      //选中的
      this.idList = [];
      this.multipleSelection = val;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.idList.push(this.multipleSelection[i].id);
      }
    },
    Putaway() {
      //上架
      var parms = {
        state: 1,
        idList: this.idList
      };
      navigationstateChange(parms, this.mysession).then(res => {
        console.log(res);
        if (res.data.code == 1001) {
          this.$message({
            type: "success",
            message: "上架成功"
          });
          this.getnavigationgetList();
        }
      });
    },
    OutofStock() {
      //下架
      var parms = {
        state: 2,
        idList: this.idList
      };
      navigationstateChange(parms, this.mysession).then(res => {
        if (res.data.code == 1001) {
          this.$message({
            type: "success",
            message: "下架成功"
          });
          this.getnavigationgetList();
        }
      });
    },
    pageEdit(index) {
      //编辑
      this.EditisAdd = false;
      this.PagepackdialogVisible = true;
      console.log(this.pagetableData[index]);
      this.pageValidateForm.sortName = this.pagetableData[index].sortName;
      (this.pageValidateForm.priceDesc = this.pagetableData[index].priceDesc),
        (this.pageValidateForm.productDesc = this.pagetableData[
          index
        ].productDesc),
        (this.pageValidateForm.productId = this.pagetableData[index].productId);
      this.pageValidateForm.logo = this.pagetableData[index].logo;
      this.imageUrl = `${baseUrl}/common/fileOut?url=${
        this.pagetableData[index].logo
      }`;
      this.procude = this.pagetableData[index].id;
    },
    pageDelete(index) {
      //删除
      var parms = {
        id: this.pagetableData[index].id
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          navigationdel(qs.stringify(parms), this.mysession).then(res => {
            /*       console.log(res) */
            if (res.data.code == 1001) {
              this.getnavigationgetList();
            }
          });
        })
        .catch(() => {
          /*  this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });   */
        });
    },
    PagepackSuccess(res, file) {
      //上传图片
      this.imageUrl = file.url; //成功后显示的图片
      if (res.code == 1001) {
        this.pageValidateForm.logo = res.data[0].fileUrl;
      }
    },
    SelectProductid() {
      //选择商品的id
      this.getnursingApinursitemlist();
      this.ProduVisible = true;
    },
    pageIndexChange(index) {
      //页面翻页
      this.pageNo = index;
      this.getnavigationgetList();
    },
    pageIndexChangepRcod(index) {
      //商品翻页.
      this.pageNo = index;
      this.getnursingApinursitemlist();
    },
    pageSubmit() {
      //提交选中的信息
      this.pageValidateForm.sortId = this.sortId;
      var parms = this.pageValidateForm;
      if (this.EditisAdd) {
        this.$refs["pageValidateForm"].validate(valid => {
          navigationaddResidence(qs.stringify(parms), this.mysession).then(
            res => {
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "新增成功"
                });
                this.PagepackdialogVisible = false;
                this.getnavigationgetList();
              }
            }
          );
        });
      } else {
        parms.id = this.procude;
        this.$refs["pageValidateForm"].validate(valid => {
          navigationstateupdate(qs.stringify(parms), this.mysession).then(
            res => {
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                this.PagepackdialogVisible = false;
                this.getnavigationgetList();
              }
            }
          );
        });
      }
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getnavigationgetList();
  }
};
</script>
<style  lang="scss" scoped>
.PagePackage {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px solid #8c939d;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>


