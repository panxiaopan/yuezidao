<template>
    <el-row class="ActiveList">
        <el-col :span='24'>
            <div class="CurrentPage">活动管理
                <i class="el-icon-arrow-right"></i>活动管理列表</div>
        </el-col>
        <el-col :span="24">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="activeID" placeholder="活动名称"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-select v-model="month" placeholder="选择活动月份">
                        <el-option v-for=" item in Selectmonth " :key="item.value" :value="item.value" :label="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-select v-model="week" placeholder="选择活动周">
                        <el-option v-for=" item in SelectWeeck" :key="item.value" :value="item.value" :label="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <button class='search-btn' type="primary" size="small" @click="onSubmitSecsh">
                      <i class='search-btn-icon' ></i>
                    </button>
                </el-form-item>
                <div style="display:inline-block;float:right">
                    <el-form-item>
                        <el-button icon='el-icon-plus' type="primary" size="small" @click="PostActivity">
                            新增活动
                        </el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-table :data="AvtivetableData" border style="width: 100%">
                <el-table-column prop="month" label="月份" width="80">
                </el-table-column>
                <el-table-column prop="week" label="周次" width="80">
                </el-table-column>
                <el-table-column prop="startTime" label="活动时间" width="160">
                </el-table-column>

                <el-table-column prop="name" label="活动名称" width="220">
                </el-table-column>
                <el-table-column prop="address" label="地址">

                </el-table-column>


                <el-table-column label="活动类型" width="120">
                    <template slot-scope="scope">
                        <span v-if="AvtivetableData[scope.$index].type==1">教学视频</span>
                        <span v-else>线下活动</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="160">
                    <template slot-scope="scope">
                        {{timeFormattershow(AvtivetableData[scope.$index].createTime)}}
                    </template>

                </el-table-column>


                <el-table-column width="200px" label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
        <el-dialog title="活动信息" :visible.sync="ActiveDialogVisible" width="30%" center>
            <el-form :model="ActiveruleForm" :rules="rules" ref="ActiveruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ActiveruleForm.name" style="width:217px"></el-input>
                </el-form-item>
                <el-form-item label="活动类型" prop="type">
                    <el-select v-model="ActiveruleForm.type" placeholder="请选择活动类型">
                        <el-option label="教学视频" value="1"></el-option>
                        <el-option label="线下活动" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间" prop="startTime">
                    <el-date-picker @change="changetimevalue" v-model="ActiveruleForm.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm" placeholder="选择日期时间" default-time="14:00:00">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="活动地址">
                    <el-input v-model="ActiveruleForm.address" style="width:217px"></el-input>
                </el-form-item>

                <el-form-item label="发布月份" prop="month">
                    <el-select v-model="ActiveruleForm.month" placeholder="选择活动月份">
                        <el-option v-for=" item in Selectmonth " :key="item.value" :value="item.value" :label="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发布周数" prop="week">
                    <el-select v-model="ActiveruleForm.week" placeholder="选择活动月份">
                        <el-option v-for=" item in SelectWeeck" :key="item.value" :value="item.value" :label="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动介绍">
                    <textarea v-model="ActiveruleForm.describe" cols="30" rows="10"></textarea>
                </el-form-item>
                <el-form-item :label="ActiveruleForm.type === '1' ? '上传视频' : '上传图片'">
                    <el-upload class="avatar-uploader" :action='addpng' :show-file-list="false" :on-error='handleError' :on-success="handleAvatarSuccess">
                        <video v-if="imageUrl && ActiveruleForm.type === '1'" :src="imageUrl" class="avatar" controls="controls"></video>
                        <img v-else-if="ActiveruleForm.type === '2'" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="ActiveDialogVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="ActiveSubutton">确 定</el-button>
            </span>
        </el-dialog>
    </el-row>

</template>
<script>
import {
  activityAdd,
  activitylist,
  activitydel,
  activityedit
} from "@/api/api";
import qs from "qs";
import { timeFormattershow } from "@/assets/js/common";
import { baseUrl } from "../../../static/baseUrl";
export default {
  data() {
    return {
      timeFormattershow,
      addpng: baseUrl + "/common/uploadFile",
      ActiveruleForm: {
        name: "",
        type: "",
        startTime: "",
        month: "",
        week: "",
        describe: "",
        url: "",
        address: ""
      },
      ActiveDialogVisible: false,
      activeID: "",
      month: "",
      week: "",
      Selectmonth: [
        {
          value: "1",
          label: "第1个月"
        },
        {
          value: "2",
          label: "第2个月"
        },
        {
          value: "3",
          label: "第3个月"
        },
        {
          value: "4",
          label: "第4个月"
        },
        {
          value: "5",
          label: "第5个月"
        },
        {
          value: "6",
          label: "第6个月"
        },
        {
          value: "7",
          label: "第7个月"
        },
        {
          value: "8",
          label: "第8个月"
        },
        {
          value: "9",
          label: "第9个月"
        },
        {
          value: "10",
          label: "第10个月"
        },
        {
          value: "11",
          label: "第11个月"
        },
        {
          value: "12",
          label: "第12个月"
        }
      ],
      SelectWeeck: [
        {
          value: "1",
          label: "第一周"
        },
        {
          value: "2",
          label: "第二周"
        },
        {
          value: "3",
          label: "第三周"
        },
        {
          value: "4",
          label: "第四周"
        },
        {
          value: "5",
          label: "第五周"
        }
      ],
      imageUrl: "",
      ActiveisAdd: true,
      pageNo: 1,
      pageSize: 10,
      AvtivetableData: [],
      totalNumber: null,
      Proid: null
    };
  },
  computed: {
    rules() {
      return {
        name: [{ required: true, message: "输入活动名次", trigger: "blur" }],
        type: [{ required: true, message: "选择活动类型", trigger: "blur" }]
      };
    }
  },
  methods: {
    onSubmitSecsh() {
      //查询
      this.Getactivitylist();
    },
    PostActivity() {
      //活动新增
      this.ActiveDialogVisible = true;
      this.ActiveisAdd = true;
    },
    changetimevalue(value) {
      //选择时间
      console.log("------------");
      console.log(value);
    },
    handleError(err) {
        console.log('上传失败')
        console.log(err)
    },
    handleAvatarSuccess(res, file) {
      //视频上传
      console.log('res')
      console.log(res)
      console.log('file')
      console.log(file)
      // 图片  res.data[0].fileUrl
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      if (res.code == 1001) {
        this.ActiveruleForm.url = res.data[0].fileUrl;
      }
    },
    handleEdit(index) {
      //编辑
      this.ActiveisAdd = false;
      this.ActiveDialogVisible = true;
      this.ActiveruleForm.name = this.AvtivetableData[index].name;
      this.ActiveruleForm.type = String(this.AvtivetableData[index].type);
      this.ActiveruleForm.startTime = this.AvtivetableData[index].startTime;

      console.log(this.AvtivetableData[index]);
       this.ActiveruleForm.address=this.AvtivetableData[index].address
      this.ActiveruleForm.month = String(this.AvtivetableData[index].month);
      this.ActiveruleForm.week = String(this.AvtivetableData[index].week);
      this.ActiveruleForm.describe = this.AvtivetableData[index].describe;
      this.ActiveruleForm.url = this.AvtivetableData[index].url;
      this.imageUrl = `${baseUrl}/common/fileOut?url=${
        this.AvtivetableData[index].url
      }`;
      this.Proid = this.AvtivetableData[index].idx;
    },
    handleDelete(index) {
      //删除
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        idx: this.AvtivetableData[index].idx
      };

      this.$confirm("此操作将删除该条, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        activitydel(qs.stringify(parms), mysession).then(res => {
          if (res.data.code == 1001) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
          }
          this.Getactivitylist();
        });
      });
    },
    Getactivitylist() {
      //获取列表
      this.AvtivetableData = [];
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        month: this.month,
        week: this.week,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name:this.activeID
      };
      activitylist(parms, mysession).then(res => {
        if (res.data.code == 1001) {
          console.log("列表")
          console.log(res)

          this.totalNumber = res.data.data.totalNum;
          this.AvtivetableData = res.data.data.items;
        }
      });
    },
    pageIndexChange(index) {
      //翻页
      this.pageNo = index;
      this.Getactivitylist();
    },
    ActiveSubutton() {
      //点击提交
    //   if (this.ActiveruleForm.type == 2) {
    //     this.ActiveruleForm.url = "";
    //   }
      var mysession = sessionStorage.getItem("sesstion");
      var parms = this.ActiveruleForm;
      if (this.ActiveisAdd) {
        console.log("=zengjia=");
        console.log(parms);
        this.$refs["ActiveruleForm"].validate(vaild => {
          if (vaild) {
              console.log('增加')
              console.log(parms)
            activityAdd(qs.stringify(parms), mysession).then(res => {
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.$refs["ActiveruleForm"].resetFields();
                this.ActiveDialogVisible = false;
                this.Getactivitylist();
              }
            });
          }
        });
      } else {
        //编辑
        this.ActiveruleForm.idx = this.Proid;
        var parmsedit = this.ActiveruleForm;
        this.$refs["ActiveruleForm"].validate(vaild => {
          if (vaild) {
              console.log('编辑')
              console.log(parmsedit)
            activityedit(qs.stringify(parmsedit), mysession).then(res => {
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "编辑成功"
                });
                this.$refs["ActiveruleForm"].resetFields();
                this.ActiveDialogVisible = false;
                this.Getactivitylist();
              }
            });
          }
        });
      }
    }
  },
  mounted() {
    this.Getactivitylist();
  }
};
</script>
<style  lang="scss" scoped>
.ActiveList {
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

