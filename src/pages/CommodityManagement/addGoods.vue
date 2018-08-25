<template>
    <el-row class="AddsGoods">
        <el-col :span='24'>
            <el-col :span='24'>
                <div class="CurrentPage">商品管理
                    <i class="el-icon-arrow-right"></i>月子餐新增</div>
            </el-col>
            <el-col :span="24">
                <el-form :inline="true" :model="MerchandiseMessage" :rules="commodityrules" ref="MerchandiseMessage"  label-width="120px" class="demo-form-inline">
                    <div class="Basicinformmation">基础信息</div>
<!--                     <el-form-item label="商品编号">
                        <el-input v-model="numeration" placeholder="商品编号无需输入" disabled="disabled"></el-input>
                    </el-form-item> -->
                    <el-form-item label="商品名称" prop="itemName">
                        <el-input v-model="MerchandiseMessage.itemName" placeholder="商品名称" style="width:373px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品概述" prop="itemDesc"  style="display:block">
                        <!-- <textarea  style="width:320px;height:35px;"></textarea> -->
                        <textarea  v-model="MerchandiseMessage.itemDesc"  name="" id="" class="goods-desc" cols="50" rows="10" maxlength="36"
                        placeholder="输入字数不能超过36个字"></textarea>
                    </el-form-item>
                    <div class="Basicinformmation">规格/价格设置</div>
                    <div class="list" style="margin-bottom:10px;">
                        <el-button @click="addday" size="mini">添加天数</el-button>
                        <el-button @click="Addline" size="mini">增加套餐规格</el-button>
                    </div>
                    <el-form-item>
                        <el-table :data="monthMealDaysPriceList" style="width: 100%" border>
                            <el-table-column label="套餐天数" width="200">
                                <template slot-scope="scope">
                                    <el-select v-model="monthMealDaysPriceList[scope.$index].daysCountId">
                                        <el-option v-for="item in Dayoption" :key="item.id" :value="item.id" :label="item.daysCountName">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column width="140" label="市场价(单位/元)">
                                <template slot-scope="scope">
                                    <el-input v-model="monthMealDaysPriceList[scope.$index].marketPrice"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column width="140" label="销售价(单位/元)">
                                <template slot-scope="scope">
                                    <el-input v-model="monthMealDaysPriceList[scope.$index].price"></el-input>
                                </template>
                            </el-table-column>
<!--                             <el-table-column width="140" label="库存">
                                <template slot-scope="scope">
                                    <el-input v-model="monthMealDaysPriceList[scope.$index].stock"></el-input>
                                </template>
                            </el-table-column> -->
                            <el-table-column width='220' label='操作'>
                                <template slot-scope="scope">
                                    <el-button size='mini' @click.native.prevent="deleteRow(scope.$index, monthMealDaysPriceList)">
                                        删除
                                    </el-button>
                                    <!--   <el-button  size="mini"    @click="editDay(scope.$index, scope.row)">
                                                修改天数
                                            </el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="库存数(单位/个)" prop='stock'>
                        <el-input v-model="MerchandiseMessage.stock"></el-input>
                    </el-form-item>
                    <div class="Basicinformmation">押金设置</div>
                    <div style="margin-bottom:10px">
                        <el-button @click="AddpackageType" size="mini" v-if="this.setemaloption.length<1 ">增加套餐类型</el-button>
                    </div>
                    <el-form-item>
                        <el-table border :data="setemaloption" style="width:600px;">
                            <el-table-column label="名称" prop="assortName">
                            </el-table-column>
                            <el-table-column label="展示图">
                                <template slot-scope="scope">
                                    <img :src="pageurl" style="dispaly:inline-block;width:60px;heght:60px">
                                </template>
                            </el-table-column>
                            <el-table-column width='140' label="销售价(单位/元)" prop="assortPrice">
                            </el-table-column>
                            <el-table-column label="操作" width="200">
                                <template slot-scope="scope">
                                    <el-button @click="editseteml(scope.$index, scope.row)" size="mini">
                                        编辑
                                    </el-button>

                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <div class="Basicinformmation">商品展示图</div>
                      <el-form-item   prop="itemPic"       label="商品封面图" style="margin-left:40px">
                        <el-upload :action="actionurl" :show-file-list="false" :limit='1' :on-success="Goodsuploadsuccessscontent">
                            <img v-if="commoditylurlcontent" :src="commoditylurlcontent" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span class="picturedescription">尺寸150*150</span>
                    </el-form-item>
                    <el-form-item    prop="itemImg" label="商品主图">
                        <el-upload :action="actionurl" :show-file-list="false" :limit='1' :on-success="Goodsuploadsuccesss">
                            <img v-if="commoditylurl" :src="commoditylurl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span class="picturedescription">尺寸750*420</span>
                    </el-form-item>
                    <div class="Basicinformmation">商品描述</div>
                    <el-form-item style="width:1200px;display:block">
                        <div>
                            <iframe :src="iframehtml" ref="mybox" style="width:1100px;height:625px;" id="ueditor" name="frmRpt"></iframe>
                        </div>
                    </el-form-item>
                    <el-form-item style="display:block; text-align: center">
                        <el-button type="primary" @click="SubmitConment">
                            发布
                        </el-button>
                    </el-form-item>
                </el-form>
                <el-dialog title="增加套餐可选天数" :visible.sync="PackageVisible" width="30%" center>
                    <el-form :model="predestinationValidateForm" ref="predestinationValidateForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="自定义天数" prop="predestination" :rules="[
                                        { required: true, message: '不能为空'},
                                        ]">
                            <el-input v-model="predestinationValidateForm.predestination"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitFormday('predestinationValidateForm')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <el-dialog title="增加套餐类型" width="30%" :visible.sync="ADDPackageTypeVisible" center>
                    <el-form :model="packageValidateForm" ref="packageValidateForm" :rules="pagerules" label-width="140px" class="demo-ruleForm">
                        <el-form-item label="套餐名称" prop="assortName">
                            <el-input v-model="packageValidateForm.assortName"></el-input>
                        </el-form-item>
                        <el-form-item label="展示图" prop="assortImg">
                            <el-upload :action="actionurl" :show-file-list="false" :limit="1" :on-success="setmealsuccess">
                                <img v-if="editsetmealurl" :src="editsetmealurl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item width=201 label="销售价(单位/元)" prop="assortPrice">
                            <el-input v-model="packageValidateForm.assortPrice"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="setmealsubmitForm('numberValidateForm')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </el-col>
        </el-col>
    </el-row>
</template>
<script>
import VueUEditor from "vue-ueditor";
import {
  daysCountadd,
  daysCountlist,
  itemAssortadd,
  itemAssortlist,
  itemAssortedit,
  itemitemall,
  itemgetitemInfo,
  itemgeedit
} from "@/api/api";
import qs from "qs";
import { baseUrl } from "../../../static/baseUrl";
import { iframe } from "../../../static/iframe";
export default {
  data() {
    return {
      iframehtml: iframe + "/ueditor/index.html",
      numeration: "",
      PROCode: null,
      NewgoodsAdd: true,
      price: "",
      commoditylurl: "",
      Addispackage: true,
      editsetmealurl: "",
      editimgshow: false,
      pageurl: "", //搭配套餐显示列表
      setemaloption: [], //套餐data
      setmealtype: "", //套餐价格
      packageValidateForm: {
        assortName: "",
        assortImg: "",
        assortPrice: ""
      },
      editpageid: "", //编辑id
      pageimageUrl: "", //商品图片展示
      ADDPackageTypeVisible: false, //套餐增加类型弹框
      Dayoption: [],
      dialogImageUrlshow: "", //上传后显示的
      GoodsVisibleimg: false,
      actionurl: baseUrl + "/common/uploadFile",
      input: "",
      PackageVisible: false,
      GoodsDialogVisible: false,
      MerchandiseMessage: {
        itemName: "",
        itemDesc: "",
        itemImg: "",
        itemPic:"",
/*         stock: "" */
        // itemAssortId:this.setemaloption.id
      },
      daysCountId: "",
      monthMealDaysPriceList: [],
      predestinationValidateForm: {
        predestination: ""
      },
      isADD: "",
      commoditylurlcontent:'',
     // actionurlcontent:'',
    };
  },
  computed: {
    //正则验证
    pagerules() {
      return {
        assortName: [
          { required: true, message: "输入套餐名称", trigger: "blur" }
        ],
        assortImg: [
          { required: true, message: "请选择上传图片", trigger: "blur" }
        ],
        assortPrice: [
          { required: true, message: "填写套餐价格", trigger: "blur" },
          {
            pattern: /^(\d|[1-9]\d+)(\.\d+)?$/,
            message: "输入数字",
            trigger: "blur"
          }
        ]
      };
    },
    commodityrules() {
      return {
        itemName: [
          {
            required: true,
            message: "输入商品名称",
            trigger: "blur"
          }
        ],
        itemDesc: [
          {
            required: true,
            message: "输入商品描述",
            trigger: "blur"
          },
          {
            required: true,
            message: "输入库存",
            trigger: "blur"
          }
        ],
        itemImg: [
          {
            required: true,
            message: "上传商品主图",
            trigger: "blur"
          }
        ],
       itemPic:[
           {
            required: true,
            message: "上传商品列表图",
            trigger: "blur"
          }
       ]
      };
    }
  },
       methods: {
          SubmitConment() {
            var mysession = sessionStorage.getItem("sesstion");
            this.MerchandiseMessage.itemAssortId = this.setemaloption[0].id;
            this.MerchandiseMessage.content = this.$refs.mybox.contentWindow.getContent2ParentPage();
            var parms = {
              monthMealItem: this.MerchandiseMessage,
              monthMealDaysPriceList: this.monthMealDaysPriceList
            };
            if (this.isADD == false) {
              //编辑
              this.MerchandiseMessage.assortId = this.setemaloption[0].id;
              this.MerchandiseMessage.id = this.numeration;
              //  this.MerchandiseMessage.content=this.$refs.mybox.contentWindow.getContent2ParentPage()
              var parmsedit = {
                monthMealItem: this.MerchandiseMessage,
                monthMealDaysPrice: this.monthMealDaysPriceList
              };
              this.$refs["MerchandiseMessage"].validate(valid => {
                console.log("bianjide============");
                 console.log(parmsedit);
                 itemgeedit(parmsedit, mysession).then(res => {
                  console.log(res);
                  if (res.data.code == 1001) {
                      this.successgono();
                        }
                    });
              });
            } else {
              // console.log(parmsedit)
              this.$refs["MerchandiseMessage"].validate(valid => {
                itemitemall(parms, mysession).then(res => {
                  console.log("xinzengdezhide");
                  console.log(parms);
                  console.log(res);
                  if (res.data.code == 1001) {
                    this.successgono();
                  }
                });
              });
            }
          },
          editDay(index) {
            console.log(this.monthMealDaysPriceList[index]);
          },

        successgono() {
          //添加成功后
          this.$confirm("添加成功, 是否继续?", "提示", {
            confirmButtonText: "继续添加",
            cancelButtonText: "返回首页",
            type: "warning"
          })
            .then(() => {
              window.location.reload(); //如果继续添加就在当前页面
            })
            .catch(() => {
              this.$router.push("/LiliPackage");
            });
        },
          deleteRow(index, rows) {
            //页面增加的删除
            rows.splice(index, 1);
          },
          Goodsincrease() {
            //商品新增按钮
            this.GoodsDialogVisible = true;
          },
          Addline() {
            //增加行
            this.monthMealDaysPriceList.push({});
          },
          Deleceprice() {
            //删除行
          },
          addday() {
            //添加下拉天数
            this.PackageVisible = true;
          },
        submitFormday(formName) {
          //天数提交
          var mysession = sessionStorage.getItem("sesstion");
          //   console.log(mysession)
          this.$refs[formName].validate(valid => {
            if (valid) {
              var parms = {
                daysCountName: this.predestinationValidateForm.predestination
              };
              console.log(parms);
              daysCountadd(qs.stringify(parms), mysession).then(res => {
                if (res.data.code == 1001) {
                  this.$message({
                    type: "success",
                    message: "添加成功"
                  });
                  this.PackageVisible = false; //隐藏
                  this.$refs["predestinationValidateForm"].resetFields();
                  this.getdaylist();
                } else {
                  this.$message({
                    type: "error",
                    message: "添加失败"
                  });
                }
              });
            } else {
              return false;
            }
          });
        },
    Detailsoage() {
      //点击想详情的时候跳转的页面新增
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        id: this.PROCode
      };
      var _this = this;
      this.NewgoodsAdd = false;
      itemgetitemInfo(qs.stringify(parms), mysession).then(res => {
            console.log("编辑的")
            console.log(res)


        if (res.data.code == 1001) {
          this.numeration = res.data.data.monthMealItem.id;
          this.MerchandiseMessage.itemName =
            res.data.data.monthMealItem.itemName;
          this.MerchandiseMessage.itemDesc =
            res.data.data.monthMealItem.itemDesc;
          this.commoditylurl = `${baseUrl}/common/fileOut?url=${
            res.data.data.monthMealItem.itemImg
          }`;//商品内容主图
           this.commoditylurlcontent=`${baseUrl}/common/fileOut?url=${
            res.data.data.monthMealItem.itemPic//商品列表主图
          }`
          this.MerchandiseMessage.itemPic=res.data.data.monthMealItem.itemPic
          this.MerchandiseMessage.itemImg = res.data.data.monthMealItem.itemImg;
          this.MerchandiseMessage.stock = res.data.data.monthMealItem.stock;
          this.monthMealDaysPriceList = res.data.data.monthMealDaysPrice;
          console.log(res.data.data.monthMealItem.content);

          _this.$refs.mybox.contentWindow.setContent2Page(
            res.data.data.monthMealItem.content
          );
        }
      });
    },
    getdaylist() {
      //列表天数显示
      var mysession = sessionStorage.getItem("sesstion");
      daysCountlist(mysession).then(res => {
        if (res.data.code == 1001) {
          this.Dayoption = res.data.data.items;
        }
      });
    },
    AddpackageType() {
      //增加套餐类型按钮
      this.ADDPackageTypeVisible = true;
    },
    setmealsuccess(res, file) {
      //上传套餐图片成功后
      //   console.log(file)
      this.packageValidateForm.assortImg = "";
      this.editsetmealurl = URL.createObjectURL(file.raw);
      if (res.code == 1001) {
        this.packageValidateForm.assortImg = res.data[0].fileUrl;
      }
      console.log(this.packageValidateForm.assortImg);
    },
    Goodsuploadsuccesss(res, file) {
      //主商品展示
      this.commoditylurl = URL.createObjectURL(file.raw);
      if (res.code == 1001) {
        this.MerchandiseMessage.itemImg = res.data[0].fileUrl;
      }
    },
    //商品封面图
    Goodsuploadsuccessscontent(res, file){
            console.log("======封面====")
            console.log(res)
            console.log(file)
            if(res.code == 1001){
                this.commoditylurlcontent=URL.createObjectURL(file.raw)
                this.MerchandiseMessage.itemPic=res.data[0].fileUrl
            }

    },




    setmealsubmitForm() {
      //tianshu
      //套餐提交表单
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        assortName: this.packageValidateForm.assortName,
        assortImg: this.packageValidateForm.assortImg,
        assortPrice: this.packageValidateForm.assortPrice
      };
      this.$refs["packageValidateForm"].validate(valid => {
        console.log("xinzeng");
        if (this.Addispackage) {
          if (valid) {
            itemAssortadd(qs.stringify(parms), mysession).then(res => {
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.$refs["packageValidateForm"].resetFields();
                this.ADDPackageTypeVisible = false; //关闭弹框

                this.getitemAssortlist();
              }
            });
          }
        } else {
          console.log("bianji");
          this.packageValidateForm.id = this.editpageid;
          var parmsedit = this.packageValidateForm;
          console.log(parmsedit);
          if (valid) {
            itemAssortedit(qs.stringify(parmsedit), mysession).then(res => {
              console.log(res);
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "编辑成功"
                });
                this.$refs["packageValidateForm"].resetFields();
                this.ADDPackageTypeVisible = false; //关闭弹框
                this.getitemAssortlist();
              }
            });
          }
        }
      });
    },
    getitemAssortlist() {
      //搭配套餐列表显示
      var mysession = sessionStorage.getItem("sesstion");
      itemAssortlist(mysession).then(res => {
        if (res.data.code == 1001) {
          this.setemaloption = res.data.data.items;
          this.pageurl = `${baseUrl}/common/fileOut?url=${
            this.setemaloption[0].assortImg
          }`;
        }
      });
    },
    editseteml(index) {
      //搭配套餐编辑
      this.ADDPackageTypeVisible = true;
      this.editimgshow = true;
      this.Addispackage = false; //判断编辑还是新增
      //   console.log(this.setemaloption[index])
      this.packageValidateForm.assortImg = this.setemaloption[index].assortImg;
      this.packageValidateForm.assortName = this.setemaloption[
        index
      ].assortName;
      this.packageValidateForm.assortPrice = this.setemaloption[
        index
      ].assortPrice;
      this.editsetmealurl = `${baseUrl}/common/fileOut?url=${
        this.setemaloption[index].assortImg
      }`;
      this.editpageid = this.setemaloption[index].id;
    }
  },
  mounted() {
    this.getdaylist();
    this.getitemAssortlist();
    this.PROCode = this.$route.params.id;
    this.isADD = this.$route.params.LilipackisAdd;
    if (this.$route.params.LilipackisAdd == false) {
      //如果不为空的时候就是从编辑页面跳转过来的,
      setTimeout(() => {
        this.Detailsoage();
      }, 500);
    }

    console.log("-------");
    console.log(this.$route.params.LilipackisAdd);
  },
  deactivated() {
    this.$destroy(true);
  }
};
</script>
<style lang="scss" scoped>
.AddsGoods {
  .Basicinformmation {
    height: 40px;
    font-weight: 900;
    font-size: 25px;
    border-bottom: 1px solid;
    margin-bottom: 20px;
  }
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.el-table th, .el-table td {
    padding: 0 !important;
}


</style>
<style>
.el-upload--text {
  border: 1px solid #8c939d;
  border-radius: 10px;
}
</style>
