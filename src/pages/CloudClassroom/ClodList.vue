<template>
    <el-row class="CloudClassroomList">
        <el-col :span='24'>
            <div class="CurrentPage">云课堂
                <i class="el-icon-arrow-right"></i>课程列表</div>
        </el-col>
        <el-col :span="24">
            <el-form :inline="true" class="demo-form-inline form-not-margin-bottom">
                <el-form-item>
                    <el-input v-model="title" placeholder="课程名称"></el-input>
                </el-form-item>
                <!--                   <el-form-item>
                        <el-input v-model="classroomNumber" placeholder="课程编码"></el-input>
                    </el-form-item> -->
                <el-form-item>
                    <el-select v-model="category" placeholder="选择课程分类">
                        <el-option label="妈妈护理" value="3"></el-option>
                        <el-option label="宝宝护理" value="2"></el-option>
                        <el-option label="亲子教育" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="classroomType" placeholder='请选择课程性质' >
                        <el-option label="视频" value="2"></el-option>
                        <el-option label="图文" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="state" placeholder='请选择状态' >
                        <el-option label="上架" value="1"></el-option>
                        <el-option label="下架" value="2"></el-option>
                        <!-- <el-option label="未上架" value="0"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <button class='search-btn' @click="onSubmitSeach">
                        <i class='search-btn-icon'></i>
                    </button>
                </el-form-item>
                <br/>
                <el-form-item style="margin-left:40px">
                    <el-button class='stand-up-btn' size="mini" type="text" @click="NewStock">
                        上架
                    </el-button>
                    <el-button class='stand-up-btn' size="mini" type="text" @click="PullShelves">
                        下架
                    </el-button>
                </el-form-item>
                <div style="float:right; display:inline-block;">
                    <el-form-item>
                        <el-button size="small" icon='el-icon-plus' type="primary" @click="Newgoodsadd">
                            新增
                        </el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-col>
        <el-col :span='24' style='margin-top: 10px;'>
            <el-table :data="ClodlistData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="idx" label="课程ID">
                </el-table-column>
                <el-table-column label="课程主图" width="120">
                    <template slot-scope="scope">
                        <span v-if="ClodlistData[scope.$index].classroomType==1"><img :src="`${baseUrl}/common/fileOut?url=${ClodlistData[scope.$index].url}`" style="dispaly:inline-block;width:40px;height:40px"></span>
                        <span v-if="ClodlistData[scope.$index].classroomType==2">
                            <video :src="`${baseUrl}/common/fileOut?url=${ClodlistData[scope.$index].url}`" width="40" height="40">
                            </video>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="课程名称" prop="title" width="280">
                </el-table-column>
                <el-table-column prop="name" label="所属专家">
                </el-table-column>
                <el-table-column label="课程分类">
                    <template slot-scope="scope">
                        <span v-if="ClodlistData[scope.$index].category==1">亲子教育</span>
                        <span v-if="ClodlistData[scope.$index].category==2">宝宝护理</span>
                        <span v-if="ClodlistData[scope.$index].category==3">妈妈护理</span>
                    </template>
                </el-table-column>
                <el-table-column label="课程性质">
                    <template slot-scope="scope">
                        <span v-if="ClodlistData[scope.$index].classroomType==1">图文</span>
                        <span v-if="ClodlistData[scope.$index].classroomType==2">视频</span>
                    </template>

                </el-table-column>
                <el-table-column prop="price" label="价格">
                </el-table-column>
                <el-table-column prop="state" label="上下架">
                    <template slot-scope="scope">
                        <span v-if="ClodlistData[scope.$index].state==0">未上架</span>
                        <span v-if="ClodlistData[scope.$index].state==1">上架</span>
                        <span v-if="ClodlistData[scope.$index].state==2">下架</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建日期">
                    <template slot-scope="scope">
                        {{timeFormattershow(ClodlistData[scope.$index].createTime)}}
                    </template>
                </el-table-column>
                <el-table-column width="120" label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
                            编辑
                        </el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button> -->
                        <i class='my-icon edit' @click="handleEdit(scope.$index, scope.row)" ></i>
                        <i class='my-icon delete' @click="handleDelete(scope.$index, scope.row)" ></i>
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
import { timeFormattershow } from "@/assets/js/common";
import { CloudclasssearchBack, Cloudclasssdel, Cloudclassup } from "@/api/api";
import qs from "qs";
import { baseUrl } from "../../../static/baseUrl";
export default {
  data() {
    return {
      timeFormattershow,
      baseUrl,
      state: "",
      classroomType: "",
      category: "",
      classroomNumber: "",
      title: "",
      pageNo: 1,
      pageSize: 10,
      ClodlistData: [],
      totalNumber: null,
      multipleSelection: [],
      CloudAddisadd: ""
    };
  },
  methods: {
    onSubmitSeach() {
      //查询
      this.getClodList();
    },
    getClodList() {
      //列表显示
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        state: this.state,
        classroomType: this.classroomType,
        category: this.category,
        classroomNumber: this.classroomNumber,
        title: this.title,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      CloudclasssearchBack(qs.stringify(parms), mysession).then(res => {
        console.log("---liebiaode----");
        console.log(res);
        this.ClodlistData = [];
        if (res.data.code == 1001) {
          this.totalNumber = res.data.data.totalNum;
          //    this.ClodlistData=res.data.data.items
          res.data.data.items.forEach((item, index) => {
            this.ClodlistData.push(item);
          });
        }
      });
    },
    pageIndexChange(index) {
      //翻页
      this.pageNo = index;
      this.getClodList();
    },
    NewStock() {
      //新品上架
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        idx: this.idList,
        status: 1
        //  console.log(parms)
      };

      console.log(parms);
      Cloudclassup(parms, mysession).then(res => {
        if (res.data.code == 1001) {
          this.$message({
            type: "success",
            message: "上架成功"
          });
          this.getClodList();
        }
      });
    },
    PullShelves() {
      //商品下架
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        idx: this.idList,
        status: 2
        //  console.log(parms)
      };
      Cloudclassup(parms, mysession).then(res => {
        if (res.data.code == 1001) {
          this.$message({
            type: "success",
            message: "下架成功"
          });
          this.getClodList();
        }
      });
    },
    handleSelectionChange(val) {
      //选中的产品
      this.idList = [];
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.idList.push(this.multipleSelection[i].idx);
      }
    },
    handleEdit(index) {
      //列表编辑
      this.CloudAddisadd = false;
      this.$router.push({
        name: "CloudAdd",
        params: {
          id: this.ClodlistData[index],
          CloudAddisadd: this.CloudAddisadd
        }
      });
      // console.log(this.ClodlistData[index].idx)
    },
    Newgoodsadd() {
      //新增商品,
      this.$router.push("/CloudAdd");
    },
    handleDelete(index) {
      //商品删除
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        idx: this.ClodlistData[index].idx
      };
      this.$confirm("确定删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Cloudclasssdel(qs.stringify(parms), mysession).then(res => {
          if (res.data.code == 1001) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.getClodList();
          }
        });
      });
    }
  },
  mounted() {
    this.getClodList();
  }
};
</script>
<style lang="scss" scoped>
.CloudClassroomList {
}
</style>
