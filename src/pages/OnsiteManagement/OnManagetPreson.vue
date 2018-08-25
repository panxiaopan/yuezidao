<template>
    <el-row class="DropManagement">
        <el-col :span='24'>
            <div class="CurrentPage">用户管理
                <i class="el-icon-arrow-right"></i>服务人员管理 </div>
        </el-col>
        <el-col :span="24">
            <el-form :inline="true" :model="DropManagementFrom" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="DropManagementFrom.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="DropManagementFrom.post" placeholder="职务"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="DropManagementFrom.regionName" placeholder="请选择区域">
                        <el-option v-for="item in optionscity" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <button class='search-btn' @click="onSubmit">
                        <i class='search-btn-icon' ></i>
                    </button>
                </el-form-item>
                <div style="float:right">
                    <el-form-item>
                        <el-button icon='el-icon-plus' type="primary" size="mini" @click="DropManagementAdd">新增</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-dialog title="提示" :visible.sync="onManagetdialogVisible" width="30%">
                <el-form :model="VisitMessage" ref="VisitMessage" :rules="Visitrules" class="demo-form-inline" label-width="80px">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="VisitMessage.name" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="phone">
                        <el-input v-model="VisitMessage.phone" placeholder="手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="职务" prop="post">
                        <el-input v-model="VisitMessage.post" placeholder="职务"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="VisitMessage.sex" placeholder="请选择性别">
                            <el-option label="女" value="0"></el-option>
                            <el-option label="男" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区域" prop="regionId">
                        <el-select v-model="VisitMessage.regionId" placeholder="请选择区域">
                            <el-option v-for="item in optionscity" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="简介">
                        <textarea v-model="VisitMessage.summary" name="" id="" cols="30" rows="10"></textarea>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="onManagetdialogVisible = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="Summit">确 定</el-button>
                </span>
            </el-dialog>
        </el-col>
        <el-col :span="24">
            <el-table :data="DropManagementData" border style="width:100%">
                <el-table-column label="姓名" prop="name" width="180">
                </el-table-column>
                <el-table-column prop="phone" label="电话" width="180">
                </el-table-column>
                <el-table-column prop="post" label="职务">
                </el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="scope">
                        <span v-if="DropManagementData[scope.$index].sex==1">男</span>
                        <span v-else>女</span>
                    </template>
                </el-table-column>
                <el-table-column prop="regionName" label="区域">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" size="mini" @click="OnManageEdit(scope.$index,scope.row)">
                            编辑
                        </el-button>
                        <el-button type="danger" size="mini" @click="OnManageDel(scope.$index,scope.row)">
                            删除
                        </el-button> -->
                        <i class='my-icon edit' @click="OnManageEdit(scope.$index,scope.row)" ></i>
                        <i class='my-icon delete' @click="OnManageDel(scope.$index,scope.row)" ></i>
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
  getcity,
  waiterlist,
  waiteradd,
  waiterdel,
  waiterget,
  waiteredit
} from "@/api/api";
import qs from "qs";
export default {
  data() {
    return {
      DropManagementFrom: {
        name: "",
        post: "",
        regionName: ""
      },
      optionscity: [],
      DropManagementData: [],
      mysession: null,
      pageNo: 1,
      pageSize: 10,
      onManagetdialogVisible: false,
      VisitMessage: {
        name: "",
        phone: "",
        post: "",
        sex: "",
        regionId: "",
        summary: ""
      },
      totalNumber: null,
      EditId: null,
      VisitisAdd: true
    };
  },
  computed: {
    Visitrules() {
      return {
        name: [{ required: true, message: "输入名字", trigger: "blur" }],
        phone: [
          { required: true, message: "输入法人联系电话", trigger: "blur" },
          { pattern: /^1[34578]\d{9}$/, message: "您的手机号码输入错误" }
        ],
        post: [{ required: true, message: "填写职务", trigger: "blur" }],
        sex: [{ required: true, message: "选择性别", trigger: "blur" }],
        regionId: [{ required: true, message: "选择区域", trigger: "blur" }]
      };
    }
  },
  methods: {
    onSubmit() {
      //查询
      this.getwaiterlist();
    },
    getgetcity() {
      //获区当前创建的市的区
      let params = {
        parentId: sessionStorage.getItem("cityId")
      };
      getcity(params).then(res => {
        console.log(res);
        if (res.code == 1001) {
          this.optionscity = res.data;
        }
      });
    },
    OnManageEdit(index) {
      //编辑详情
      this.onManagetdialogVisible = true;
      this.VisitisAdd = false;
      var params = {
        id: this.DropManagementData[index].id
      };
      waiterget(params, this.mysession).then(res => {
        this.VisitMessage.name = res.data.data.name;
        this.VisitMessage.phone = res.data.data.phone;
        this.VisitMessage.sex = String(res.data.data.sex);
        this.VisitMessage.post = res.data.data.post;
        this.VisitMessage.regionId = String(res.data.data.regionId);
        this.VisitMessage.summary = res.data.data.summary;
        this.EditId = res.data.data.id;
      });
    },
    OnManageDel(index) {
      //删除
      var parms = {
        id: this.DropManagementData[index].id
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          waiterdel(qs.stringify(parms), this.mysession).then(res => {
            console.log(res);
            if (res.data.code == 1001) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getwaiterlist();
            }
          });
        })
        .catch(() => {
          /*             this.$message({
                type: 'info',
                message: '已取消删除'
              });  */
        });
    },
    DropManagementAdd() {
      //新增
      this.onManagetdialogVisible = true;
      this.VisitisAdd = true;
    },

    Summit() {
      //提交个人信息
      var parms = this.VisitMessage;
      if (this.VisitisAdd) {
        this.$refs["VisitMessage"].validate(valid => {
          if (valid) {
            waiteradd(qs.stringify(parms), this.mysession).then(res => {
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "创建成功"
                });
                this.$refs["VisitMessage"].resetFields();
                this.onManagetdialogVisible = false;
                this.getwaiterlist();
              }
            });
          }
        });
      } else {
        parms.id = this.EditId;
        this.$refs["VisitMessage"].validate(valid => {
          if (valid) {
            waiteredit(qs.stringify(parms), this.mysession).then(res => {
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "编辑成功"
                });
                this.$refs["VisitMessage"].resetFields();
                this.onManagetdialogVisible = false;
                this.getwaiterlist();
              }
            });
          }
        });
      }
    },
    pageIndexChange(index) {
      this.pageNo = index;
      this.getwaiterlist();
    },
    getwaiterlist() {
      //获取当前列表
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: this.DropManagementFrom.name,
        post: this.DropManagementFrom.post,
        regionName: this.DropManagementFrom.regionName
      };
      waiterlist(parms, mysession).then(res => {
        console.log("-------------");
        console.log(res);
        if (res.data.code == 1001) {
          this.DropManagementData = res.data.data.items;
          this.totalNumber = res.data.data.totalNum;
        }
      });
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getgetcity();
    this.getwaiterlist();
  }
};
</script>
 <style lang="scss" scoped>
.DropManagement {
}
</style>


