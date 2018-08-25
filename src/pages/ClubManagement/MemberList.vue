<template>
    <el-row class="ConventionClub">
        <el-col :span='24'>
            <div class="CurrentPage">门店管理
                <i class="el-icon-arrow-right"></i>门店列表</div>
        </el-col>
        <el-col :span='24'>
            <el-form :inline="true" class="demo-inline">
                <el-form-item  style='width: 140px' >
                    <el-input v-model="Vendorname" placeholder="门店名称" @keyup.enter.native="getclublist()"></el-input>
                </el-form-item><el-form-item style='width: 140px'  >
                    <el-input v-model="accounting" placeholder="账号" @keyup.enter.native="getclublist()"></el-input>
                </el-form-item><el-form-item style='width: 140px'  >
                    <el-select v-model="cooperationStatus" placeholder="选择合作状态">
                        <el-option label="合作中" value="0"></el-option>
                        <el-option label="已冻结" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <button class='search-btn' @click="SeachClub">
                        <i class='search-btn-icon' ></i>
                    </button>
                </el-form-item>
                <div style="display:inline-block;float:right; margin-right:30px">
                    <el-form-item>
                        <el-button type="primary" icon='el-icon-plus' size='medium' @click="AddClub">新增门店</el-button>
                    </el-form-item>
                    <!--                              <el-form-item>
                                <el-button type="primary" size='medium'>导出数据</el-button>
                            </el-form-item>   -->
                </div>
            </el-form>
        </el-col>
        <el-col :span='24'>
            <el-table v-loading="loading" :data="ClubtableData" border style="width: 100%">
                <el-table-column label="门店ID" type="index" width="65">
                </el-table-column>
                <el-table-column prop="name" label="门店名称" width="180">
                </el-table-column>
                <el-table-column prop="name" label="账号" width="180">
                </el-table-column>
                 <el-table-column prop="companyName" label="所属公司" width="200">
                </el-table-column>
                <el-table-column prop="address" label="门店地址"  width="300">
                </el-table-column>
                <el-table-column prop="createTime" label="入驻时间" >
                    <!--                   <template slot-scope="scope">
                        {{timeFormattershow(this.ClubtableData[scope.$index].createTime)}}

                  </template> -->
                </el-table-column>
                <el-table-column label="结算模式" width="100">
                    <template slot-scope="scope">
                        <span v-if="ClubtableData[scope.$index].settlementMode==1">现结</span>
                        <span v-if="ClubtableData[scope.$index].settlementMode==2">半月结</span>
                        <span v-if="ClubtableData[scope.$index].settlementMode==3">月结</span>
                        <span v-if="ClubtableData[scope.$index].settlementMode==4">周结</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="chargePerson" label="店长">
                </el-table-column>
                <el-table-column prop="chargePhone" label="店长电话" >
                </el-table-column>
                <el-table-column prop="companyPhone" label="门店电话" >
                </el-table-column>
                <el-table-column label="合作状态" width="100">
                    <template slot-scope="scope">
                        <!--<span v-if="ClubtableData[scope.$index].cooperationStatus==1">待审核</span>
                       <span v-if="ClubtableData[scope.$index].cooperationStatus==2">审核不通过</span>
                       <span v-if="ClubtableData[scope.$index].cooperationStatus==3">合作中</span>
                       <span v-if="ClubtableData[scope.$index].cooperationStatus==4">已到期</span>
                       <span v-if="ClubtableData[scope.$index].cooperationStatus==5">已冻结</span> -->
                        <span v-if="ClubtableData[scope.$index].businessmanStatus==0">合作中</span>
                        <span v-if="ClubtableData[scope.$index].businessmanStatus==1">已冻结</span>
                    </template>
                </el-table-column>
                <el-table-column width="160" label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" size="mini" @click="blocking(scope.$index,scope.row)">
                            {{ClubtableData[scope.$index].businessmanStatus==1 ? "解冻":'冻结'}}
                        </el-button>
                        <el-button type="primary" size="mini" @click="ClubEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="ClubDelete(scope.$index, scope.row)" >删除</el-button> -->
                        <i class='my-icon' @click="blocking(scope.$index,scope.row)" :class="ClubtableData[scope.$index].businessmanStatus==1 ? 'kaisuo' : 'dongjie'" ></i>
                        <i class='my-icon edit' @click="ClubEdit(scope.$index, scope.row)" ></i>
                        <i class='my-icon delete' @click="ClubDelete(scope.$index, scope.row)" ></i>
                    </template>
                </el-table-column>
            </el-table>
            <div class="myPagination">
                <el-pagination layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChange'>
                </el-pagination>
            </div>
        </el-col>
        <el-col :span='24'>
            <el-dialog title="门店信息" :visible.sync="ClubDialogVisible" width="740px" @close="ClubtableClose" center>
                <el-form :model="ClubValidateForm" ref="ClubValidateForm" :rules="rules" label-width="110px" class="ClubdemoruleForm" :inline="true">

                    <div class="BusinessInformation">账户信息</div>
                    <el-form-item label="登录账号" class="Clubwidth" prop="accounts">
                        <el-input v-model="ClubValidateForm.accounts"  :disabled="accountdisabled"></el-input>
                    </el-form-item>
                    <!--                <el-form-item
                    label="登录密码"
                    class="Clubwidth"
                    prop="passwd"
                  >
                    <el-input  v-model="ClubValidateForm.passwd"  ></el-input>
                </el-form-item>  -->


                    <div class="BusinessInformation">微信公众号信息</div>
                    <el-form-item label="公众号名称" class="Clubwidth" prop="wechatName">
                        <el-input v-model="ClubValidateForm.wechatName"></el-input>
                    </el-form-item>
                    <el-form-item label="微信公众号" class="Clubwidth" prop="wechat">
                        <el-input v-model="ClubValidateForm.wechat"></el-input>
                    </el-form-item>
                    <el-form-item label="微信支付账号" class="Clubwidth" prop="payAccount">
                        <el-input v-model="ClubValidateForm.payAccount"></el-input>
                    </el-form-item>
                    <el-form-item label="结算周期" class="Clubwidth" prop="settlementMode">
                        <el-select v-model="ClubValidateForm.settlementMode" placeholder="选择结算周期" style="width:202px">
                            <el-option label="现结" value='1'></el-option>
                            <el-option label="半月结" value='2'></el-option>
                            <el-option label="月结" value='3'></el-option>
                            <el-option label="周结" value='4'></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="BusinessInformation">门店信息</div>
                    <el-form-item label="门店名称" class="Clubwidth" prop="name">
                        <el-input v-model="ClubValidateForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="门店电话" class="Clubwidth" prop="companyPhone">
                        <el-input v-model="ClubValidateForm.companyPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="店长" class="Clubwidth" prop="chargePerson">
                        <el-input v-model="ClubValidateForm.chargePerson"></el-input>
                    </el-form-item>
                    <el-form-item label="店长电话" class="Clubwidth" prop="chargePhone">
                        <el-input v-model="ClubValidateForm.chargePhone"></el-input>
                    </el-form-item>
                    <el-form-item label="店长邮箱" class="Clubwidth" style="display:block" prop="chargeMail">
                        <el-input v-model="ClubValidateForm.chargeMail"></el-input>
                    </el-form-item>
                    <el-form-item prop="provinceId" label="门店地址">
                        <el-select v-model="ClubValidateForm.provinceId" @change="changeprovice" placeholder="请选择省" class="province">
                            <el-option v-for="item in provincedata" :key="item.name" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="cityId">
                        <el-select v-model="ClubValidateForm.cityId" @change="changecity" placeholder="请选择市" class="province">
                            <el-option v-for="item in towndata" :key="item.name" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="areaId">
                        <el-select v-model="ClubValidateForm.areaId" placeholder="请选择区" class="province">
                            <el-option v-for="item in  districtdata" :key="item.name" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="display:block" label="详情地址" prop="address">
                        <textarea style="width:400px;height:60px;display:block;;" v-model="ClubValidateForm.address" placeholder="请输入详细地址">
                        </textarea>
                    </el-form-item>
                    <!-- <div class="BusinessInformation">公司信息</div> -->
                    <el-form-item label='所属公司' style='width: 530px' class='companyName' >
                        <el-input v-model='ClubValidateForm.companyName' ></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="营业执照" prop='businessLicenseUrl'>
                        <el-upload list-type="picture-card" :limit='1' :on-preview="BusineessPictureCardPreview" :action="addpng" :on-success="BusinessSuccess">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogBusinessImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item>
                        <img v-bind:src="BusinessUrl" style="width:148px;height:148px;cursor: pointer;" v-show="ShowimgVisible" @click="Margnify">
                    </el-form-item>
                    <el-form-item label="开户许可证" prop="permitCertificateUrl">
                        <el-upload list-type="picture-card" :on-preview="licensePictureCardPreview" :action="addpng" :limit='1' :on-success="licensesuccess">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="liencedialogVisible">
                            <img width="100%" :src="licenseurl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item>
                        <img v-bind:src="lienceurlshow" alt="" v-show="lienceVisible" style="width:148px;height:148px;cursor: pointer;" @click="enlargement">
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="ClubDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="Clubmessagesubmit">确 定</el-button>
                </span>
            </el-dialog>
        </el-col>
    </el-row>
</template>
<script>
import {
  clubdel,
  clubregister,
  clubEdit,
  getfilepng,
  getcity,
  getbusinessman,
  addregister,
  updateUserStatus
} from "@/api/api";
import { timeFormattershow } from "@/assets/js/common";
import { baseUrl } from "../../../static/baseUrl";
import qs from "qs";
export default {
  data() {
    return {
      accountdisabled:true,
      mysession: "",
      lienceurlshow: "",
      lienceVisible: false,
      liencedialogVisible: false,
      licenseurl: "",
      accounting: "", //账户
      Vendorname: "", //商家名称
      freezemode: "", //冻结状态
      cooperationStatus: "", //合作状态
      provincedata: [], //省
      towndata: [], //市
      districtdata: [], //区
      parentId: "", //省市连动
      ShowimgVisible: false,
      showimgsurl: "",
      culbid: "",
      isAdd: true,
      NameClub: "",
      pageNo: 1,
      pageSize: 10,
      ClubtableData: [],
      loading: false,
      totalNumber: null,
      ClubDialogVisible: false,
      dialogBusinessImageUrl: "",
      dialogVisible: false,
      BusinessUrl: "",
      addpng: baseUrl + "/common/uploadFile",
      ClubValidateForm: {
        name: "",
        address: "",
        accounts: "",
        provinceId: "", //省
        cityId: "", //市
        areaId: "", //区
        companyPhone: "",
        chargePerson: "",
        chargeMail: "",
        wechatName: "",
        wechat: "",
        payAccount: "",
        companyName: '', /// 公司名称
        businessLicenseUrl: "", //营业执照
        permitCertificateUrl: "", //许可证
        settlementMode: "" //选择周期
      }
    };
  },
  computed: {
    rules() {
      return {
        address: [{ required: true, message: "输入会所地址", trigger: "blur" }],
        name: [{ required: true, message: "输入商户名称", trigger: "blur" }],
        accounts: [
          { required: true, message: "输入登录账号", trigger: "blur" }
        ],
        /*                  passwd:[
                        { required: true, message: '输入登录密码', trigger: 'blur' },
                        { pattern:/^[a-zA-Z0-9_]{0,}$/,message:"不能输入中文"}
                  ], */
        provinceId: [{ required: true, message: "请选择省", trigger: "blur" }],
        cityId: [{ required: true, message: "请选择市", trigger: "blur" }],
        areaId: [{ required: true, message: "请选择区", trigger: "blur" }],
        companyPhone: [
          { required: true, message: "请输入公司电话", trigger: "blur" }
          //  {pattern:/^(\d{3}-)(\d{8})$|^(\d{4}-)(\d{7})$|^(\d{4}-)(\d{8})$/,message:'输入正确的电话'}
        ],
        chargePerson: [
          { required: true, message: "输入负责人姓名", trigger: "blur" }
        ],
        wechat: [
          { required: true, message: "输入公众号账号", trigger: "blur" },
          { pattern: /^[a-zA-Z0-9_]{0,}$/, message: "不能输入中文" }
        ],
        chargePhone: [
          { required: true, message: "输入法人联系电话", trigger: "blur" },
          { pattern: /^1[34578]\d{9}$/, message: "您的手机号码输入错误" }
        ],
        wechatName: [
          { required: true, message: "输入微信公众号名称", trigger: "blur" }
        ],
        chargeMail: [
          { required: true, message: "输入负责人邮箱", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确邮箱",
            trigger: "blur"
          }
        ],
        businessLicenseUrl: [
          { required: true, message: "上传营业执照", trigger: "blur" }
        ],
        permitCertificateUrl: [
          { required: true, message: "上传许可证", trigger: "blur" }
        ],
        payAccount: [
          { required: true, message: "输入支付账号", trigger: "blur" },
          { pattern: /^[a-zA-Z0-9_]{0,}$/, message: "不能输入中文" }
        ],
        settlementMode: [
          { required: true, message: "选择结算周期", trigger: "blur" }
        ]
      };
    }
  },
  methods: {
    getclublist() {
      //会所列表获取
      this.ClubtableData = [];
      this.loading = true;
      var parm = {
        accounts: this.accounting,
        name: this.Vendorname,
        businessmanStatus: this.cooperationStatus,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      getbusinessman(parm,this.mysession).then(res => {
        console.log("会所的列表");
        console.log(res);
        if (res.code == 1001) {
          this.loading = false;
          this.totalNumber = res.data.totalNum;
          res.data.items.forEach((item, index) => {
            this.ClubtableData.push(item);
            this.ClubtableData[index].createTime = timeFormattershow(
              this.ClubtableData[index].createTime
            );
          });
        }
      });
    },
    SeachClub() {
      //会所查询
      this.getclublist();
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
      this.ClubValidateForm.cityId = "";
      this.ClubValidateForm.areaId = "";
      getcity(params).then(res => {
        if (res.code == 1001) {
          this.towndata = res.data;
        }
      });
    },
    changecity(province) {
      //区
      let params = {
        parentId: province
      };
      this.ClubValidateForm.areaId = "";
      getcity(params).then(res => {
        if (res.code == 1001) {
          this.districtdata = res.data;
        }
      });
    },
    //编辑的时候显示插入的照片
    ClubEdit(index) {

          console.log(this.ClubtableData[index])

      this.accountdisabled=true;//不可编辑账户
      //会所编辑
      this.changeprovice(this.ClubtableData[index].provinceId);
      this.changecity(this.ClubtableData[index].cityId);
      this.ShowimgVisible = true;
      this.ClubValidateForm.companyName=this.ClubtableData[index].companyName;//所属公司
      this.BusinessUrl = `${baseUrl}/common/fileOut?url=${
        this.ClubtableData[index].businessLicenseUrl
      }`; //es6写法
      this.lienceurlshow = `${baseUrl}/common/fileOut?url=${
        this.ClubtableData[index].permitCertificateUrl
      }`;
      this.lienceVisible = true;
      this.isAdd = false;
      this.ClubDialogVisible = true;
      this.ClubValidateForm.name = this.ClubtableData[index].name;
      this.ClubValidateForm.address = this.ClubtableData[index].address;
      this.ClubValidateForm.accounts = this.ClubtableData[index].accounts;
      /* this.ClubValidateForm.passwd=this.ClubtableData[index].passwd  */
      this.ClubValidateForm.provinceId = String(
        this.ClubtableData[index].provinceId
      ); //省
      this.ClubValidateForm.cityId = String(this.ClubtableData[index].cityId); //市
      this.ClubValidateForm.areaId = String(this.ClubtableData[index].areaId); //区
      this.ClubValidateForm.companyPhone = this.ClubtableData[
        index
      ].companyPhone;
      this.ClubValidateForm.chargePhone = this.ClubtableData[index].chargePhone;
      this.ClubValidateForm.chargePerson = this.ClubtableData[
        index
      ].chargePerson;
      this.ClubValidateForm.chargeMail = this.ClubtableData[index].chargeMail;
      this.ClubValidateForm.wechatName = this.ClubtableData[index].wechatName;
      this.ClubValidateForm.wechat = this.ClubtableData[index].wechat;
      this.ClubValidateForm.payAccount = this.ClubtableData[index].payAccount;
      this.ClubValidateForm.businessLicenseUrl = this.ClubtableData[
        index
      ].businessLicenseUrl; //营业执照
      this.ClubValidateForm.permitCertificateUrl = this.ClubtableData[
        index
      ].permitCertificateUrl; //许可证
      this.ClubValidateForm.settlementMode = String(
        this.ClubtableData[index].settlementMode
      ); //选择周期
      this.culbid = this.ClubtableData[index].id;
      //  this.BusinessSuccess()
    },
    blocking(index) {
      //冻结
      console.log("dongjie");
      console.log(this.ClubtableData[index]);
      var parms = {
        id: this.ClubtableData[index].id,
        businessmanStatus: Number(
          this.ClubtableData[index].businessmanStatus == 0 ? "1" : "0"
        )
      };
      updateUserStatus(qs.stringify(parms), this.mysession).then(res => {
        console.log("---=-");
        console.log(parms);
        console.log(res);
        if (res.data.code == 1001) {
          this.getclublist();
        }
      });
    },
    ClubDelete(index) {
      //会所删除
      var parms = {
        id: this.ClubtableData[index].id
      };
      this.$confirm("此操作将删除该会所, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          clubdel(qs.stringify(parms)).then(res => {
            if (res.code == 1001) {
              this.getclublist();
            } else {
              this.$message({
                type: "error",
                message: "删除失败"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    pageIndexChange(index) {
      //点击翻页
      this.pageNo = index;
      this.getclublist();
    },
    handleRemove(file, fileList) {
      //删除
      console.log(file, fileList);
    },
    BusinessSuccess(file, fliesty) {
      //商户上传时候拿到URl
      this.ClubValidateForm.businessLicenseUrl = file.data[0].fileUrl;
      this.ShowimgVisible = false;
    },
    licensesuccess(file) {
      //上传成功后拿到许可证的url
      this.ClubValidateForm.permitCertificateUrl = file.data[0].fileUrl;
      this.lienceVisible = false;
      console.log(this.ClubValidateForm.permitCertificateUrl);
    },
    licensePictureCardPreview(file) {
      //
      //
      this.licenseurl = file.url;
      this.liencedialogVisible = true; //点击放大
    },

    Margnify() {
      //编辑的时候查看,图片放大的功能
      this.dialogBusinessImageUrl = this.BusinessUrl;
      this.dialogVisible = true;
    },
    enlargement() {
      //许可证查看放大
      this.licenseurl = this.lienceurlshow;
      this.liencedialogVisible = true;
    },

    ClubtableClose() {
      //关闭添加或者编辑的弹框,清空原来的值,
    },
    BusineessPictureCardPreview(file) {
      //商户营业执照上传显示找片
      this.dialogBusinessImageUrl = file.url;
      this.dialogVisible = true;
    },

    AddClub() {
      //点击新增会所
      this.ClubDialogVisible = true;
      this.isAdd = true;
      this.ShowimgVisible = false;
      this.accountdisabled=false;
    },
    Clubmessagesubmit() {
      //添加提交会所信息
      var parms = this.ClubValidateForm;
      if (this.isAdd) {
        this.$refs["ClubValidateForm"].validate(valid => {
          if (valid) {
            addregister(qs.stringify(parms)).then(res => {
              console.log(res);
              console.log(parms);

              if (res.code == 1001) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.$refs["ClubValidateForm"].resetFields();
                this.ClubDialogVisible = false; //关闭弹框
                this.getclublist();
              }
            });
          }
        });
      } else {
        //会所编辑信息
        this.ClubValidateForm.id = this.culbid;
        var parmse = this.ClubValidateForm;
        this.$refs["ClubValidateForm"].validate(valid => {
          if (valid) {
            clubEdit(qs.stringify(parmse)).then(res => {
              console.log(parmse);
              if (res.code == 1001) {
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                this.$refs["ClubValidateForm"].resetFields();
                this.ClubDialogVisible = false; //关闭弹窗
                this.getclublist();
              }
            });
          }
        });
      }
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getclublist();
    this.Provincecity();
  }
};
</script>
<style lang="scss" scoped>
.ConventionClub {
  .demo-inline {
    .el-form-item__label {
      font-size: 18px;
    }
  }
  .Clubwidth {
    width: 329px;
  }
  .BusinessInformation {
    font-weight: 900;
    font-size: 25px;
    height: 40px;
    border-bottom: 1px solid;
    margin-bottom: 20px;
  }
  .province {
    width: 130px;
    display: inline-block;
  }
  .Businessaddress {
    display: block;
    .el-form-item__content {
      width: 500px;
    }
  }

  .kaisuo, .dongjie {
    position: relative;
    top: 4px;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-size: cover;
  }




}
</style>
<style lang="scss">
.companyName .el-form-item__content {
      width: 406px;
  }
</style>





