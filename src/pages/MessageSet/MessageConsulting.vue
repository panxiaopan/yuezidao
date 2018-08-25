<template>
    <el-row class="MessageConsult">
        <el-col :span='24'>
            <div class="CurrentPage">消息管理
                <i class="el-icon-arrow-right"></i>留言咨询</div>
        </el-col>
        <el-col :span="24">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <div class="block">
                        <el-date-picker v-model="valuetime" type="daterange" range-separator="至" start-placeholder="开始日期" value-format="timestamp" end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <button class='search-btn' @click="onSubmit">
                        <i class='search-btn-icon' ></i>
                    </button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-table border :data="MessagetableData" style="width: 100%">
                <el-table-column prop="userName" label="用户昵称" width="180">
                </el-table-column>
                <el-table-column prop="content" label="留言咨询" width="180">
                </el-table-column>
                <el-table-column label="咨询图片">
                    <template slot-scope="scope">
                        <!--<span v-for="item in MessagetableData[scope.$index].picUrlArray" :key="item.id">-->
                            <!--<img v-if='item !== ""' :src="`${baseUrl}/common/fileOut?url=`+item" class="photos">-->
                        <!--</span>-->
                      <img :src="`${baseUrl}/common/fileOut?url=`+item"
                           v-if= 'item !== ""'
                           v-for="item in MessagetableData[scope.$index].picUrlArray"
                           :key="item.id" alt="" class="photos" @click="showBigPhoto(`${baseUrl}/common/fileOut?url=`+item)">
                    </template>

                </el-table-column>
                <el-table-column   label="时间">
                      <template  slot-scope="scope">
                          {{timeFormattershowsecod(MessagetableData[scope.$index].askTime)}}
                      </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span v-if="MessagetableData[scope.$index].status==0">未查看</span>
                        <span v-if="MessagetableData[scope.$index].status==1">待回复</span>
                        <span v-if="MessagetableData[scope.$index].status==2">已回复</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="Messagehandlereply(scope.$index,scope.row)">回复</el-button>
                        <el-button size="mini" type="primary" @click="Messagehandlelook(scope.$index,scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="myPagination">
                <el-pagination  layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChange'>
                </el-pagination>
            </div>
        </el-col>
        <el-col :span="24">
            <el-dialog title="回复" :visible.sync="replydialogVisible" width="30%">
                <el-form :model="replyValidateForm" ref="replyValidateForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="咨询图片">
                  <span  v-for="item in probiempicarry"  :key="item">
                        <img  :src="`${baseUrl}/common/fileOut?url=`+item" class="photos">
                  </span>
                </el-form-item>

                  <el-form-item label='留言内容:'  >
                        <div>{{ userMessage }}</div>
                    </el-form-item>
                    <el-form-item label="回复内容:" prop="replycontent" :rules="[
                         {required: true, message: '不能为空'},
                        ]">
                        <textarea v-model="replyValidateForm.replycontent" name="" id="" cols="30" rows="10"></textarea>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" size="mini" @click="replysubmit">确 定</el-button>
                </span>
            </el-dialog>
        </el-col>
        <el-col :span="24">
            <el-dialog title="详情" :visible.sync="DetailsDialog" width="30%">
                <div>咨询图片:
                     <span  v-for="item in probiempicarry"  :key="item">
                        <img :src="`${baseUrl}/common/fileOut?url=`+item" class="photos">
                      </span>
                </div>
                  <hr>

                 <div>用户昵称:
                    <span>{{UserName}}</span>
                </div>
                <hr>
                <div style="margin-bottom:20px">咨询内容
                    <div style="float:right">{{timeFormattershowsecod(Asktime)}}</div>
                </div>
                <span>{{Askcontent}}</span>
                <hr>
                <div style="margin-bottom:20px">回复
                    <div style="float:right">{{timeFormattershowsecod(replyTime)}}</div>
                </div>
                <span>{{repContentlook}}</span>
            </el-dialog>
        </el-col>
      <el-col :span="24">
        <el-dialog :visible.sync="bigPhotosDialog" width="40%" custom-class="big-photos-dialog" :show-close="false">
            <div>
              <img src="https://yuezidao.cn/common/fileOut?url=group1:M00/00/14/wKgBkltagaOAa7WeAAF3j_8FXMM014.jpg" class="photo" alt="">
            </div>
        </el-dialog>
      </el-col>
    </el-row>
</template>
<script>
import { baseUrl } from "../../../static/baseUrl";
import { themeasksearch, themeaskupdate } from "@/api/api";
import { timeFormattershowsecod } from "@/assets/js/common";
import qs from "qs";
export default {
  data() {
    return {
      baseUrl,
      timeFormattershowsecod,
      valuetime: "",
      userName: null,
      mysession: "",
      MessagetableData: [],
      pageNo: 1,
      pageSize: 5,
      totalNumber: null,
      replydialogVisible: false,
      replyValidateForm: {
        replycontent: ""
      },
      DetailsDialog: false,
      replyid: "",
      UserName: "",
      Asktime: "",
      Askcontent: "",
      replyTime: "",
      repContentlook: "",
      userMessage: '',  // 问诊问题
      probiempicarry:[],//问题反馈图片
      bigPhotosDialog: false
    };
  },
  methods: {
    getMessagelist() {
      var parms = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userName: this.userName,
        startTime: this.valuetime[0],
        endTime: this.valuetime[1]
      };
      console.log(this.mysession);
      themeasksearch(qs.stringify(parms), this.mysession).then(res => {
        console.log("-liuyan--");
        console.log(res);
        if (res.data.code == 1001) {
          this.MessagetableData = res.data.data.items;
          this.totalNumber = res.data.data.totalNum;
        }
      });
    },
    pageIndexChange(index) {
      this.pageNo = index;
      this.getMessagelist();
    },
    replysubmit() {
      //提交内容
      var parms = {
        idx: this.replyid,
        replay: this.replyValidateForm.replycontent
      };
      this.$refs["replyValidateForm"].validate(valid => {
        themeaskupdate(qs.stringify(parms), this.mysession).then(res => {
          console.log(res);
          if (res.data.code == 1001) {
            this.$message({
              type: "success",
              message: "回复成功"
            });
            this.replyValidateForm.replycontent = null
            this.replydialogVisible = false
          }
        });
      });
    },
    Messagehandlereply(index) {
      console.log(this.MessagetableData[index]);
      this.probiempicarry=this.MessagetableData[index].picUrlArray;
      this.replydialogVisible = true;
      this.replyid = this.MessagetableData[index].idx;
      this.userMessage = this.MessagetableData[index].content;
    },
    Messagehandlelook(index) {
      //查看
     //  this.probiempicarry=[]
       console.log("查看详情")
       console.log(this.MessagetableData[index])
      this.probiempicarry=this.MessagetableData[index].picUrlArray
      console.log(this.probiempicarry)
      this.DetailsDialog = true;
      this.UserName = this.MessagetableData[index].userName;
      this.Asktime = this.MessagetableData[index].askTime;
      this.Askcontent = this.MessagetableData[index].content;
      this.replyTime = this.MessagetableData[index].replayTime;
      this.repContentlook = this.MessagetableData[index].replay;
    },
    onSubmit() {
      //查询
      this.getMessagelist();
    },
    showBigPhoto (url) {
      this.bigPhotosDialog = true;
    },
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getMessagelist();
  }
};
</script>
<style lang="scss" scoped>
  .photos {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 5px;
    vertical-align: middle;
    cursor: pointer;
  }

  .big-photos-dialog {
    .el-dialog__header {
      display: none !important;
    }
    .el-dialog__body {
      padding: 0;
      .photo {
        width: 640px;
        height: 640px;
      }
    }

  }
</style>


