<template>
    <el-row class="Technocracy">
        <el-col :span='24'>
            <div class="CurrentPage">云课堂
                <i class="el-icon-arrow-right"></i>专家管理</div>
        </el-col>
        <el-col :span="24">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="ExpertsName" placeholder="专家姓名" @keyup.enter.native="getexpert()"></el-input>
                </el-form-item>
                <el-form-item>
                    <button class='search-btn' @click="SeachExpert">
                        <i class='search-btn-icon' ></i>
                    </button>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-button type="primary" icon='el-icon-plus' size="small" @click="ProfessorAdd">专家新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span='24'>
            <el-table v-loading="loading" :data="EXperttableData" border style="width: 100%">
                <el-table-column label="专家ID" prop="idx" width="180">
                </el-table-column>
                <el-table-column label="专家姓名" prop="name" width="160">
                </el-table-column>
                <el-table-column label="专家头像"  width="100">
                    <template slot-scope="scope">
                        <img :src="EXperttableData[scope.$index].ecpertimg" style="display:inline-block;width:40px;height:40px">
                    </template>
                </el-table-column>
                <el-table-column label="职位" prop="position"  width="160">
                </el-table-column>
                <el-table-column prop="company" label="工作单位"  width="260">
                </el-table-column>
                <el-table-column prop="introduction" label="专家介绍">
                </el-table-column>
                <el-table-column label="操作" width="140">
                    <template slot-scope="scope">
                        <i class='my-icon edit' @click="editExpert(scope.$index, scope.row)"></i>
                        <i class='my-icon delete' @click="DelectExpert(scope.$index, scope.row)"></i>
                    </template>
                </el-table-column>
            </el-table>
            <div class="myPagination">
                <el-pagination layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChange'>
                </el-pagination>
            </div>
        </el-col>
        <el-dialog @close="ExpertaddClose" title="专家信息" :visible.sync="ExpertsNameDialogVisible" width="30%" center>
            <el-form :model="ExpertsValidateForm" :rules="ExertsRules" ref="ExpertsValidateForm" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="name" label="专家姓名">
                    <el-input v-model="ExpertsValidateForm.name"></el-input>
                </el-form-item>
                <el-form-item label="专家头像" prop="headPhoto">
                    <el-upload class="avatar-uploader" :action="actionurl" :show-file-list="false" :on-success="expertSuccess">
                        <img v-if="expertimageUrl" :src="expertimageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="position" label="工作职位">
                    <el-input v-model="ExpertsValidateForm.position"></el-input>
                </el-form-item>
                <el-form-item label="工作单位" prop="company">
                    <el-input v-model="ExpertsValidateForm.company"></el-input>
                </el-form-item>
                <el-form-item label="专家简介" prop="introduction">
                    <textarea v-model="ExpertsValidateForm.introduction" cols="50" rows="10"></textarea>
                </el-form-item>
                <div style="text-align:center">
                    <el-button @click="ExpertsNameDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="SubmitExpert">提交</el-button>
                </div>
            </el-form>
        </el-dialog>
    </el-row>
</template>
<script>
import {
  expertadd,
  expertList,
  expertListdel,
  expertListupdate
} from "@/api/api";
import qs from "qs";
import { baseUrl } from "../../../static/baseUrl";
export default {
  data() {
    return {
      exporyid: "",
      loading: false,
      totalNumber: null,
      pageNo: 1,
      pageSize: 10,
      Expertadd: true,
      ExpertsName: "",
      ExpertsNameDialogVisible: false,
      actionurl: baseUrl + "/common/uploadFile",
      EXperttableData: [], //专家列表
      expertimageUrl: "",
      ExpertsValidateForm: {
        name: "",
        headPhoto: "",
        position: "",
        company: "",
        introduction: ""
      }
    };
  },
  computed: {
    ExertsRules() {
      return {
        name: [{ required: true, message: "输入专家姓名", trigger: "blur" }],
        headPhoto: [
          { required: true, message: "上传专家头像", trigger: "blur" }
        ],
        position: [
          { required: true, message: "输入专家职位", trigger: "blur" }
        ],
        company: [{ required: true, message: "输入工作单位", trigger: "blur" }],
        introduction: [
          { required: true, message: "输入工作简介", trigger: "blur" }
        ]
      };
    }
  },
  methods: {
    expertSuccess(res, file) {
      //图片上传成功
      this.expertimageUrl = URL.createObjectURL(file.raw);
      if (res.code == 1001) {
        this.ExpertsValidateForm.headPhoto = res.data[0].fileUrl;
      }
    },
    ExpertaddClose() {
      //关闭弹窗
      (this.ExpertsValidateForm.name = ""),
        (this.ExpertsValidateForm.headPhoto = ""),
        (this.ExpertsValidateForm.position = ""),
        (this.ExpertsValidateForm.company = ""),
        (this.ExpertsValidateForm.introduction = ""),
        (this.expertimageUrl = "");
    },
    editExpert(index, row) {
      //编辑
      this.ExpertsNameDialogVisible = true;
      this.Expertadd = false;
      this.ExpertsValidateForm.name = this.EXperttableData[index].name;
      this.ExpertsValidateForm.headPhoto = this.EXperttableData[
        index
      ].headPhoto;
      this.ExpertsValidateForm.position = this.EXperttableData[index].position;
      this.ExpertsValidateForm.company = this.EXperttableData[index].company;
      this.ExpertsValidateForm.introduction = this.EXperttableData[
        index
      ].introduction;
      this.expertimageUrl = `${baseUrl}/common/fileOut?url=${
        this.EXperttableData[index].headPhoto
      }`;
      this.exporyid = this.EXperttableData[index].idx;
    },
    ProfessorAdd() {
      //专家新增按钮
      this.ExpertsNameDialogVisible = true;
      this.Expertadd = true;
    },
    SubmitExpert() {
      //提交专家信息
      var mysession = sessionStorage.getItem("sesstion");
      var parms = this.ExpertsValidateForm;
      if (this.Expertadd) {
        this.$refs["ExpertsValidateForm"].validate(valid => {
          if (valid) {
            expertadd(qs.stringify(parms), mysession).then(res => {
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.ExpertsNameDialogVisible = false;
                this.$refs["ExpertsValidateForm"].resetFields();
                this.getexpert();
              }
            });
          }
        });
      } else {
        this.ExpertsValidateForm.idx = this.exporyid;
        var parm = this.ExpertsValidateForm;
        this.$refs["ExpertsValidateForm"].validate(valid => {
          if (valid) {
            expertListupdate(qs.stringify(parm), mysession).then(res => {
              console.log(res);
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "编辑成功"
                });

                this.ExpertsNameDialogVisible = false;
                this.$refs["ExpertsValidateForm"].resetFields();
                this.getexpert();
              }
            });
          }
        });
      }
    },
    SeachExpert() {
      //查询
      this.getexpert();
    },
    getexpert() {
      //获取列表
      this.EXperttableData = [];
      this.loading = true;
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        name: this.ExpertsName,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      expertList(qs.stringify(parms), mysession).then(res => {
        console.log("-----------");
        console.log(res);
        if (res.data.code == 1001) {
          this.loading = false;
          this.totalNumber = res.data.data.totalNum;
          res.data.data.items.forEach((item, index) => {
            this.EXperttableData.push(item);
            this.EXperttableData[
              index
            ].ecpertimg = `${baseUrl}/common/fileOut?url=${
              this.EXperttableData[index].headPhoto
            }`;
          });
        } else {
          this.loading = false;
        }
      });
    },
    DelectExpert(index, row) {
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        idx: this.EXperttableData[index].idx
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          expertListdel(qs.stringify(parms), mysession).then(res => {
            if (res.data.code == 1001) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getexpert();
            } else {
              this.$message({
                type: "error",
                message: "删除失败"
              });
            }
          });
        })
        .catch(() => {
          /*                 this.$message({
                    type: 'info',
                    message: '已取消删除'
                });    */
        });

      console.log(parms);
      /*                  expertListdel(qs.stringify(parms),mysession).then(res=>{

                 })  */
    },
    pageIndexChange(index) {
      //翻页
      this.pageNo = index;
      console.log(index);
      this.getexpert();
    }
  },
  mounted() {
    this.getexpert();
  }
};
</script>
<style lang="scss" scoped>
.Technocracy {
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
    border: 1px solid #8c939d;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
