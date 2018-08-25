<template>
  <el-row class="CloudClassroom">
    <el-col :span='24'>
      <div class="CurrentPage">云课堂
        <i class="el-icon-arrow-right"></i>云课堂列表
        <i class="el-icon-arrow-right"></i>新增</div>
    </el-col>
    <el-col :span='24'>
      <el-form :model="CloudValidateForm" :rules="ColudRulues" ref="CloudValidateForm" label-width="100px" class="Colud-ruleForm">
        <div class="BlogInfo">基础信息</div>
        <el-form-item label="商品编号">
          <el-input v-model="goodsid" placeholder="无需填写商品编号" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="CloudValidateForm.title"></el-input>
        </el-form-item>
        <el-form-item label="推荐描述" prop="MessageInfo">
          <textarea v-model="CloudValidateForm.MessageInfo" style="width:300px;height:80px;" class="goods-desc" maxlength="40"
           placeholder="输入字数不能超过40个字"></textarea>
        </el-form-item>
        <div class="BlogInfo">规格/价格设置</div>
        <el-form-item label="商品售价:">
          <table cellpadding="0" cellspacing="0" class="tableborder">
            <thead class="thd_bg">
              <tr>
                <th>课程分类</th>
                <th>课程性质</th>
                <th>专家属性</th>
                <th>销售价(元)</th>
              </tr>
            </thead>
            <tbody class="tbd_bg tbodywidth">
              <tr>
                <td>
                  <el-select v-model="category" placeholder="选择课程">
                    <el-option label="宝宝护理" value="2"></el-option>
                    <el-option label="亲子教育" value="1"></el-option>
                    <el-option label="妈妈护理" value="3"></el-option>
                  </el-select>
                </td>
                <!--                                 <td>
                                  <el-select v-model="feeRule" placeholder="选择课程属性">
                                        <el-option label="免费" value="0"></el-option>
                                        <el-option label="收费" value="1" ></el-option>
                                   </el-select>
                                </td> -->
                <td>
                  <el-select v-model="classroomType" placeholder="选择课程性质" @change="changevalue">
                    <el-option label="图文" value="1"></el-option>
                    <el-option label="视频" value="2"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select v-model="expertPro" @change="changeexpert">
                    <el-option label="专家" value="专家"></el-option>
                    <el-option label="自编" value="自编"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input type="number" min="0" v-model="price"></el-input>
                </td>
              </tr>
            </tbody>
          </table>
        </el-form-item>
        <el-form-item label="选择专家">
          <el-select v-model="expertidx" placeholder="请选择专家">
            <el-option v-for="item in expertdata" :key="item.idx" :label="item.name" :value="item.idx">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传视频" v-show="videoshow" style="display:inline-block">
          <el-upload class="avatar-uploader" :action="CommodityImages" :show-file-list="false" :on-success="handleAvatarSuccess">
            <video controls width="320" height="140" class="avatar" style="border:1px solid ">
              <!--    <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
              <source v-if="imageUrl" :src="imageUrl">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </video>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品主图" v-show="Imgshow" style="display:inline-block; vertical-align: top;">
          <el-upload class="avatar-uploader" :action="CommodityImages" :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!--  <div>此处只能添加视频添加图片文章在下面编辑器添加</div> -->
        <el-form-item label="商品描述">
          <div>
            <iframe :src="iframehtml" ref="mybox" style="width:1100px;height:620px;" id="righticon" name="frmRpt"></iframe>
          </div>
        </el-form-item>
        <el-form-item style="display:block; text-align: center">
          <el-button type="primary" @click="SubmitCloud ">
            发布
          </el-button>
        </el-form-item>

      </el-form>

    </el-col>
  </el-row>
</template>
<script>
import { expertList, Cloudclassroomadd, Cloudclassedit } from "@/api/api";
import qs from "qs";
import { baseUrl } from "../../../static/baseUrl";
import { iframe } from "../../../static/iframe";
export default {
  data() {
    return {
      iframehtml: iframe + "/ueditor/index.html",
      CloudValidateForm: {
        //
        title: "",
        MessageInfo: ""
      },
      classroomType: "",
      expertPro: "", //专家属性
      category: "",
      price: "",
      expertdata: [], //专家下载列表
      CommodityImages: baseUrl + "/common/uploadFile",
      imageUrl: "", //图片上传的路径,后台
      expertidx: null,
      url: "",
      CloudisADD: true,
      goodsid: "",
      videoshow: true,
      Imgshow: true,
      PROCode: null,
      CloudAddisadd: ""
    };
  },
  computed: {
    ColudRulues() {
      return {
        title: [{ required: true, message: "输入商品名称", trigger: "blur" }],
        MessageInfo: [{ required: true, message: "推荐描述", trigger: "blur" }]
      };
    }
  },
  /*     watch:{
           'expertPro':function(newValue, oldValue){
               this.expertidx=''
           }
    }, */

  methods: {
    getexport() {
      var parms = {
        pageNo: 1,
        pageSize: 500
      };
      expertList(qs.stringify(parms)).then(res => {
        console.log("zhuanjaide ");
        console.log(res);

        if ((res.data.code = 1001)) {
          this.expertdata = res.data.data.items;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      //图片上传,
      this.imageUrl = file.url;
      if (res.code == 1001) {
        this.url = res.data[0].fileUrl;
      }
    },
    SubmitCloud() {
      //提交按验证
      var mysession = sessionStorage.getItem("sesstion");
      var parms = {
        title: this.CloudValidateForm.title,
        url: this.url,
        category: this.category,
        price: Number(this.price),
        expertPro: this.expertPro,
        recommend: this.CloudValidateForm.MessageInfo,
        content: this.$refs.mybox.contentWindow.getContent2ParentPage(),
        classroomType: this.classroomType,
        expertidx: this.expertidx
      };
      if (this.CloudAddisadd == false) {
        parms.idx = this.goodsid;
        this.$refs["CloudValidateForm"].validate(valid => {
          Cloudclassedit(qs.stringify(parms), mysession).then(res => {
            console.log("bianji");
            console.log(res);
            console.log(parms);
            if (res.data.code == 1001) {
              this.successgono();
            }
          });
        });
      } else {
        this.$refs["CloudValidateForm"].validate(valid => {
          Cloudclassroomadd(qs.stringify(parms), mysession).then(res => {
            console.log("xinzeng");
            console.log(res);
            if (res.data.code == 1001) {
              this.successgono();
            }
          });
        });
      }
    },
    successgono() {
      this.$confirm("成功, 是否继续?", "提示", {
        confirmButtonText: "继续添加",
        cancelButtonText: "返回页面",
        type: "warning"
      })
        .then(() => {
          window.location.reload(); //如果继续添加就在当前页面
        })
        .catch(() => {
          this.$router.push("/ClodList");
        });
    },
    changeexpert(value) {
      //改变专家
      console.log("zhuanjia");
      console.log(value);
      /*  if(value=='zib') */
      if (value == "自编") {
        this.expertidx = null;
      }
    },
    changevalue(val) {
      //改变视频和图片的上传
      if (val == 1) {
        this.videoshow = false;
        this.Imgshow = true;
      } else {
        this.videoshow = true;
        this.Imgshow = false;
      }
    },
    getCloudDetails() {
      console.log("bianjidedede");
      console.log(this.PROCode);

      // this.getexport()
      this.CloudisADD = false;
      var _this = this;
      this.goodsid = this.PROCode.idx;
      this.CloudValidateForm.title = this.PROCode.title;
      this.CloudValidateForm.MessageInfo = this.PROCode.recommend;
      this.category = String(this.PROCode.category);
      this.classroomType = String(this.PROCode.classroomType);
      this.expertPro = this.PROCode.expertPro;
      this.price = this.PROCode.price;
      this.expertidx = this.PROCode.expertidx;
      if (this.PROCode.classroomType == 1) {
        this.videoshow = false;
        this.url = this.PROCode.url;
        this.imageUrl = `${baseUrl}/common/fileOut?url=${this.PROCode.url}`;
      } else if (this.PROCode.classroomType == 2) {
        this.Imgshow = false;
        this.url = this.PROCode.url;
        this.imageUrl = `${baseUrl}/common/fileOut?url=${this.PROCode.url}`;
      }
      _this.$refs.mybox.contentWindow.setContent2Page(this.PROCode.content); //编辑器内容
    }
  },
  mounted() {
    this.getexport();
    this.PROCode = this.$route.params.id;
    this.CloudAddisadd = this.$route.params.CloudAddisadd;
    if (this.CloudAddisadd == false) {
      setTimeout(() => {
        this.getCloudDetails();
      }, 500);
    }
  }
};
</script>
<style lang="scss" scoped>
.CloudClassroom {
  .el-form-item {
    .el-input {
      width: 300px;
    }
  }
  .tableborder {
    border: 1px solid #d7d7d7;
    width: 652px;
  }
  .thd_bg {
    height: 32px;
    tr {
      height: 32px;

      th {
        border-right: 1px solid #dcdfe6;
        border-bottom: 1px solid #dcdfe6;
        font-family: Microsoft YaHei;
        font-weight: 500;
        font-size: 14px;
        color: #666;
      }
    }
  }
  .tbd_bg {
    height: 26px;
    tr {
      height: 26px;
      text-align: center;
      td {
        border-right: 1px solid #dcdfe6;
        border-bottom: 1px solid #dcdfe6;
        font-family: Microsoft YaHei;
        font-weight: 500;
        font-size: 14px;
        color: #666;
      }
    }
  }
  .tbodywidth {
    .el-input {
      width: 120px;
    }
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
    border: 1px solid #8c939d;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

