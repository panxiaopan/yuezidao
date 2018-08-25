<template>
  <el-row class="Feedback">
    <el-col :span="24">
      <div class="CurrentPage">消息管理
        <i class="el-icon-arrow-right"></i>问题反馈
      </div>
    </el-col>
    <el-col :span="24">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-date-picker v-model="TimeData" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="timestamp" range-separator="至" :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="createrId" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="feedbackStatus" placeholder="选择处理状态">
            <el-option label="已处理" value="1"></el-option>
            <el-option label="未处理" value="0"></el-option>
            <el-option label="不用处理" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <button class='search-btn' icon='el-icon-plus' @click="onSubmit">
            <i class='search-btn-icon'></i>
          </button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-table :data="FeedbacktableData" stripe border style="width: 100%">
        <el-table-column prop="name" label="妈妈昵称" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机号">
        </el-table-column>
        <el-table-column prop="wechat" label="微信号">
        </el-table-column>
        <el-table-column prop="feedbackContent" label="问题反馈">
        </el-table-column>
        <el-table-column prop="replyContent" label="回复内容">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope='scope'>
            <span v-if="FeedbacktableData[scope.$index].feedbackStatus==0">未处理</span>
            <span v-if="FeedbacktableData[scope.$index].feedbackStatus==1">已处理</span>
            <span v-if="FeedbacktableData[scope.$index].feedbackStatus==2">不用处理</span>
          </template>
        </el-table-column>
        <el-table-column label="反馈时间">
          <template slot-scope="scope">
            {{timeFormattershowsecod(FeedbacktableData[scope.$index].createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="处理时间">
          <template slot-scope="scope">
            {{timeFormattershowsecod(FeedbacktableData[scope.$index].updateTime)}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button :class="FeedbacktableData[scope.$index].feedbackStatus==0 ? 'classNO' : 'classyes'" size="mini"
                       @click="replypression(scope.$index, scope.row)">
              {{FeedbacktableData[scope.$index].feedbackStatus==0 ? '回复' : '查看'}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="myPagination">
        <el-pagination layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize'
                       @current-change='pageIndexChange'>
        </el-pagination>
      </div>
    </el-col>
    <el-dialog title="问题反馈回复" :visible.sync="PackageVisible" width="30%" center>
      <el-form :model="predestinationValidateForm" ref="predestinationValidateForm" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="反馈图片">
             <span v-for="item in  Feedbackpic" :key="item">
                        <img @mouseover="Eventhover($event)" @mouseout="EventOut($event)"
                             :src="`${baseUrl}/common/fileOut?url=`+item"
                             :class="{'imgfeeda': istrue,'imgfeed-b':!istrue }">
                  </span>
        </el-form-item>

        <el-form-item label="反馈内容">
          <div>{{ userMessage }}</div>
        </el-form-item>
        <el-form-item label="回复内容" prop="content" :rules="[
                            { required: true, message: '不能为空'},
                            ]">
          <!-- <el-input v-model="predestinationValidateForm.predestination" ></el-input> -->
          <!--  <textarea  cols="30"></textarea> -->
          <textarea v-model="predestinationValidateForm.content" style="width:300px;height:100px"></textarea>
        </el-form-item>

        <el-form-item>
          <!--   <span slot="footer" class="dialog-footer"> -->
          <el-button type="primary" style="float:right" size="small"
                     @click="submitFormday('predestinationValidateForm')">提交
          </el-button>
          <!--    </span> -->
        </el-form-item>
      </el-form>
    </el-dialog>

  </el-row>
</template>
<script>
  import {baseUrl} from '../../../static/baseUrl'
  import {feedbacklist, feedbackhandle} from '@/api/api'
  import {timeFormattershowsecod} from '@/assets/js/common'
  import qs from 'qs'

  export default {
    data () {
      return {
        baseUrl,
        timeFormattershowsecod,
        TimeData: [],
        createrId: '', //创建人的ID
        pageNo: 1,
        pageSize: 10,
        FeedbacktableData: [],
        PackageVisible: false,
        predestinationValidateForm: {
          content: ''
        },
        editID: null,
        totalNumber: null,
        feedbackStatus: '',
        userMessage: '',  // 用户的问题,用于回复显示在输入下边
        Feedbackpic: [],//问题反馈图片,
        istrue: true,

      }
    },
    methods: {
      onSubmit () {
        //查询
        this.getfeedlist()
      },
      getfeedlist () {
        //获取列表
        /*       var mysession = sessionStorage.getItem("sesstion");     */
        var parms = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          name: this.createrId,
          feedbackStatus: this.feedbackStatus,
          inStartTime: this.TimeData[0] == undefined ? '' : this.TimeData[0],
          inEndTime: this.TimeData[1] == undefined ? '' : this.TimeData[1]
        }

        console.log(parms)
        feedbacklist(parms).then(res => {
          console.log('问题反馈')
          console.log(res)
          if (res.data.code == 1001) {
            this.FeedbacktableData = res.data.data.items
            this.totalNumber = res.data.data.totalNum
          }
        })
      },
      replypression (index) {
        this.PackageVisible = true
        console.log(index)
        console.log(this.FeedbacktableData[index])
        this.Feedbackpic = this.FeedbacktableData[index].feedbackImg.split(',')
        this.editID = this.FeedbacktableData[index].id
        this.userMessage = this.FeedbacktableData[index].feedbackContent
        if (this.FeedbacktableData[index].feedbackStatus == 1) {
          this.predestinationValidateForm.content = this.FeedbacktableData[index].replyContent
        } else {
          this.predestinationValidateForm.content = ''
        }
        console.log('------')
        console.log(this.Feedbackpic)

      },
      submitFormday () {
        var mysession = sessionStorage.getItem('sesstion')
        var parms = {
          id: this.editID,
          content: this.predestinationValidateForm.content
        }
        console.log(parms)
        this.$refs['predestinationValidateForm'].validate(valid => {
          if (valid) {
            feedbackhandle(qs.stringify(parms), mysession).then(res => {
              if (res.data.code == 1001) {
                this.$message({
                  type: 'success',
                  message: '回复成功'
                })
                this.PackageVisible = false
                this.getfeedlist()
              }
            })
          }
        })
      },

      pageIndexChange (index) {
        console.log(index)
        this.pageNo = index
        this.getfeedlist()
      }
    },
    mounted () {
      this.getfeedlist() //
    }
  }
</script>
<style lang="scss" scoped>
  .Feedback {
    .classNO {
      background: #41bcc8;
      color: #fff;
    }
    .classyes {
      background: #dbdbdb;
      // color:#fff;
    }
    .imgfeeda {
      display: inline-block;
      width: 60px;
      height: 60px;
      vertical-align: middle
    }
    .imgfeedb {
      display: inline-block;
      width: 100px;
      height: 100px;
      vertical-align: middle
    }

  }

</style>


