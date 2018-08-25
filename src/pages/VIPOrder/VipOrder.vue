<template>
  <el-row calss="VIPorder">
    <el-col :span='24'>
      <div class="CurrentPage">VIP管理<i class="el-icon-arrow-right"></i>专定管理</div>
    </el-col>
    <el-col :span="24">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="pregnantStatusSelect" placeholder="选择状态">
            <el-option label="宝宝出生了" value="2"></el-option>
            <el-option label="怀孕中" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="day" placeholder='请输入周数/天数'></el-input>
        </el-form-item>
        <el-form-item>
          <!--<el-button type="primary" @click="onSubmitSeach" size="small">查询</el-button>-->
          <button class='search-btn' @click="onSubmitSeach">
            <i class='search-btn-icon'></i>
          </button>
        </el-form-item>
        <div style="dispaly:inline-block; float:right">
          <el-form-item>
            <el-button type="primary" size="small" @click="SubbuttonAdd">
              新增
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-col>
    <el-col :span="24">
      <div style="margin-bottom:20px">
        <el-radio-group v-model="SelectSate" size="medium" @change="changeSelect">
          <el-radio-button label="孕育记录"></el-radio-button>
          <el-radio-button label="今日提醒"></el-radio-button>
          <el-radio-button label="专定课程"></el-radio-button>
        </el-radio-group>
      </div>
    </el-col>
    <el-col :span="24" v-show="this.SelectSate=='孕育记录'">
      <el-table
        :data="gestatedata"
        border
        style="width: 100%">
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <span v-if="gestatedata[scope.$index].pregnantStatus==2">宝宝出生了</span>
            <span v-else>怀孕中</span>
          </template>
        </el-table-column>
        <el-table-column
          label="周数/天数"
          width="100">
          <template slot-scope="scope">
            <span v-if="gestatedata[scope.$index].pregnantStatus==2">{{scope.row.birthDays}}天</span>
            <span v-else>{{scope.row.pregnancyWeeks}}周{{scope.row.birthDays}}天</span>
          </template>
        </el-table-column>
        <el-table-column label="宝宝身高区间(单位/CM)" width="180px">
          <template slot-scope="scope">
            <span>{{scope.row.babyHeightMin}}</span> 一 <span>{{scope.row.babyHeightMax}}</span>
          </template>
        </el-table-column>
        <el-table-column label="宝宝体重区间(单位/KG)" width="180px">
          <template slot-scope="scope">
            <span>{{scope.row.babyWeightMin}}</span> 一 <span>{{scope.row.babyWeightMax}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="内容" width='649px' height='40'>-->
          <!--<template slot-scope="scope">-->
              <!--<span style="overflow: hidden;display:inline-block;width:649px;height:40px;text-align: left">-->
                  <!--【妈妈关注】{{scope.row.momAttention }} <br>-->
                  <!--【宝宝发育】{{scope.row.babyDevelopment}}-->
              <!--</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column label="内容" width='649px' style="text-overflow: ellipsis;">
          <template slot-scope="scope">
              <span style="display: block; text-align:left; width:630px; height: 40px; overflow: hidden; text-overflow:ellipsis">
                    【妈妈关注】{{scope.row.momAttention }} <br>
                    【宝宝发育】{{scope.row.babyDevelopment}}
              </span>
          </template>
        </el-table-column>



        <el-table-column label="创建时间" width="180">
          <template slot-scope="scope">
            {{timeFormattershow(scope.row.createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <!--                             <el-button
                                        size="mini"
                                        type="primary"
                                        @click="BreedEdit(scope.$index, scope.row)">编辑</el-button>
                                        <el-button
                                        size="mini"
                                        type="danger"
                                        @click="BreedDelete(scope.$index, scope.row)">删除</el-button> -->
            <i class='my-icon edit' @click="BreedEdit(scope.$index, scope.row)"></i>
            <i class='my-icon delete' @click="BreedDelete(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24" v-show="this.SelectSate=='今日提醒'">
      <el-table
        :data="TodaytableData"
        border
        style="width: 100%">
        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="scope">
            <span v-if="TodaytableData[scope.$index].pregnantStatus==1">怀孕中</span>
            <span v-else>宝宝出生了</span>
          </template>
        </el-table-column>
        <el-table-column
          label="天数/周数"
          width="180">
          <template slot-scope="scope">
            <span v-if="TodaytableData[scope.$index].pregnantStatus==2">{{scope.row.birthDays}}天</span>
            <span v-else>{{scope.row.pregnancyWeeks}}周{{scope.row.birthDays}}天</span>
          </template>
        </el-table-column>
        <el-table-column
          label="类别">
          <template slot-scope="scope">
            <span v-if="TodaytableData[scope.$index].type==1">待办事项</span>
            <span v-if="TodaytableData[scope.$index].type==3">每日亲子互动</span>
            <span v-if="TodaytableData[scope.$index].type==2">每日小贴事</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="180"
        >
          <template slot-scope="scope">
            {{timeFormattershow(scope.row.createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i class='my-icon edit' @click="TodayhandleEdit(scope.$index, scope.row)"></i>
            <i class='my-icon delete' @click="ToadyhandleDelete(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24" v-show="this.SelectSate=='专定课程'">
      <el-table
        border
        :data="SpeciallyData"
        style="width: 100%">
        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="scope">
            <span v-if="SpeciallyData[scope.$index].pregnantStatus==1">怀孕中</span>
            <span v-else>宝宝出生了</span>
          </template>
        </el-table-column>
        <el-table-column
          label="课程名称"
        >
          <template slot-scope="scope">
            <div
              v-for="item in  SpeciallyData[scope.$index].list"
              :key="item.id"
            >
              {{item.courseName}}
            </div>

          </template>
        </el-table-column>
        <el-table-column

          label="课程分类">
          <template slot-scope="scope">
            <div
              v-for="item in  SpeciallyData[scope.$index].list"
              :key="item.id"
            >
              <div v-if="item.type==1">亲子教育</div>
              <div v-if="item.type==2">宝宝护理</div>
              <div v-if="item.type==3">妈妈护理</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="180"
          label="周数/天数">
          <template slot-scope="scope">
            <span v-if="SpeciallyData[scope.$index].pregnantStatus==2">{{scope.row.birthDays}}天</span>
            <span v-else>{{scope.row.pregnancyWeeks}}周{{scope.row.birthDays}}天</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="180"
        >
          <template slot-scope="scope">
            {{timeFormattershow(SpeciallyData[scope.$index].createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <i class='my-icon edit' @click="SpeciallyEdit(scope.$index, scope.row)"></i>
            <i class='my-icon delete' @click="SpeciallyDelete(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      <div class="myPagination">
        <el-pagination
          layout="prev, pager, next,  total"
          :total="totalNumber"
          :page-size='pageSize'
          @current-change='pageIndexChange'>
        </el-pagination>
      </div>
    </el-col>
    <el-col :span="24">
      <el-dialog
        title="孕育记录"
        :visible.sync="GetstateDialogVisible"
        width="40%"
        @close="closeGetstate"
        center>

        <el-form :inline="true" :model="breedValidateForm" ref="breedValidateForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item style="display:block" label="状态">
            <el-radio-group v-model="pregnantStatus" @change="changeAdd">
              <el-radio label="1" border>怀孕中</el-radio>
              <el-radio label="2" border>宝宝出生了</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="toggle==1">
            <el-form-item
              label="怀孕周数"
            >
              <el-input v-model="breedValidateForm.pregnancyWeeks" auto-complete="off" placeholder="怀孕周数"></el-input>
            </el-form-item>
            <el-form-item label="怀孕天数">
              <el-input v-model="breedValidateForm.birthDays" auto-complete="off" placeholder="怀孕天数"></el-input>
            </el-form-item>
          </div>
          <div v-if="toggle==2">
            <el-form-item label="设置出生天数">
              <el-input v-model="breedValidateForm.birthDays" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="宝宝身高区间">
            <el-input type="number" min="0" style="width:80px" v-model="breedValidateForm.babyHeightMin"></el-input>
            －－
            <el-input type="number" min="0" style="width:80px" v-model="breedValidateForm.babyHeightMax"></el-input>
            <span style="font-size:24px"><b>cm</b></span>
          </el-form-item>
          <el-form-item label="宝宝体重区间">
            <el-input type="number" min="0" style="width:80px" v-model="breedValidateForm.babyWeightMin"></el-input>
            －－
            <el-input type="number" min="0" style="width:80px" v-model="breedValidateForm.babyWeightMax"></el-input>
            <span style="font-size:24px"><b>kg</b></span>
          </el-form-item>
          <el-form-item label="妈妈关注"
          >
            <textarea v-model="breedValidateForm.momAttention" cols="60" rows="10"></textarea>
          </el-form-item>
          <el-form-item label="宝宝发育" style="display:block">
            <textarea v-model="breedValidateForm.babyDevelopment " cols="60" rows="10"></textarea>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                        <el-button @click="GetstateDialogVisible = false" size="small">取 消</el-button>
                        <el-button type="primary" @click="submitBreed" size="small">确 定</el-button>
                    </span>
      </el-dialog>
      <el-dialog
        title="VIP定制课"
        :visible.sync="CustomDialogVisible"
        width="40%"
        @close="closeCustom"
      >
        <el-form :inline="true" :model="CustomValidateForm" ref="CustomValidateForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item style="display:block" label="状态">
            <el-radio-group v-model="pregnantStatus" @change="changeAdd">
              <el-radio :disabled="editdisabled" label="1" border>怀孕中</el-radio>
              <el-radio :disabled="editdisabled" label="2" border>宝宝出生了</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="toggle==1">
            <el-form-item
              label="设置怀孕周数"
            >
              <el-input :disabled="editdisabled" v-model="CustomValidateForm.pregnancyWeeks" auto-complete="off"
                        placeholder="怀孕周数"></el-input>
            </el-form-item>
            <el-form-item label="天数">
              <el-input :disabled="editdisabled" v-model="CustomValidateForm.birthDays" auto-complete="off"
                        placeholder="怀孕天数"></el-input>
            </el-form-item>
          </div>
          <div v-if="toggle==2">
            <el-form-item label="设置出生天数">
              <el-input :disabled="editdisabled" v-model="CustomValidateForm.birthDays" auto-complete="off"
                        placeholder="出生天数"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <!--  <div style="height:40px"></div> -->
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'课程ID'"
            :key="domain.key"
            :prop="'domains.' + index + '.courseId'"
          >
            <el-input style="width:200px;" v-model="domain.courseId" readonly="readonly"></el-input>
            <el-button type="primary" size="small" @click="SelectCloudlist(domain,index)">选择</el-button>
            <el-button style="margin-left:20px;" type="danger" size="small" @click.prevent="removeDomain(domain)">删除
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="addDomain">新增课程ID</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="Customsubmint" size="small">确 定</el-button>
                    </span>
      </el-dialog>
      <el-col :span="24">
        <el-dialog
          title="云课堂列表"
          :visible.sync="CloudDialogVisible"
          width="60%"
        >
          <el-table
            :data="ClodlistData"
            style="width: 100%"
            border
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column
              type="index"
              width="55">
            </el-table-column>
            <el-table-column
              label="主图"
              width="100">
              <template slot-scope="scope">
                <span v-if="ClodlistData[scope.$index].classroomType==1"><img
                  :src="`${baseUrl}/common/fileOut?url=${ClodlistData[scope.$index].url}`"
                  style="dispaly:inline-block;width:40px;height:40px"></span>
                <span v-if="ClodlistData[scope.$index].classroomType==2">
                           <video :src="`${baseUrl}/common/fileOut?url=${ClodlistData[scope.$index].url}`" width="40"
                                  height="40">
                          </video>
                        </span>
              </template>
            </el-table-column>
            <el-table-column
              label="课程名称"
              prop="title"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="所属专家">
            </el-table-column>
            <el-table-column
              width="180"
              prop="idx"
              label="课程ID">
            </el-table-column>
            <el-table-column
              label="课程分类">
              <template slot-scope="scope">
                <span v-if="ClodlistData[scope.$index].category==1">亲子教育</span>
                <span v-if="ClodlistData[scope.$index].category==2">宝宝护理</span>
                <span v-if="ClodlistData[scope.$index].category==3">妈妈护理</span>
              </template>
            </el-table-column>
            <el-table-column
              label="课程性质">
              <template slot-scope="scope">
                <span v-if="ClodlistData[scope.$index].classroomType==1">图文</span>
                <span v-if="ClodlistData[scope.$index].classroomType==2">视频</span>
              </template>

            </el-table-column>
            <el-table-column
              prop="state"
              label="上下架">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格">
            </el-table-column>
          </el-table>
          <div class="myPagination">
            <el-pagination
              layout="prev, pager, next,  total"
              :total="totalNumber"
              :page-size='pageSize'
              @current-change='pageIndexChangeyun'>
            </el-pagination>
          </div>
          <span slot="footer" class="dialog-footer">
                       <el-button @click="CloudDialogVisible = false" size=small>取 消</el-button>
                        <el-button size="small" type="primary" @click="SelectCloudidx">确 定</el-button>
                    </span>
        </el-dialog>
        <el-dialog
          title="下列重复!"
          :visible.sync="repetitionVisible"
          width="30%"
        >
          <el-table
            border
            :data="repetitionData">
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span v-if="repetitionData[scope.$index].pregnantStatus==1">怀孕中</span>
                <span v-else>宝宝出生了</span>
              </template>
            </el-table-column>
            <el-table-column label="周数/天数">
              <template slot-scope="scope">
                <span v-if="repetitionData[scope.$index].pregnantStatus==2">{{scope.row.birthDays}}天</span>
                <span v-else>{{scope.row.pregnancyWeeks}}周{{scope.row.birthDays}}天</span>
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
                       <el-button @click="repetitionVisible = false" size="mini">返回重选</el-button>
                        <el-button size="mini" type="primary" @click="surerepetition">确定提交</el-button>
                    </span>

        </el-dialog>


      </el-col>
    </el-col>
  </el-row>
</template>
<script>
  import {
    pregnantadd,
    pregnantlist,
    pregnantdel,
    pregnantedit,
    remindlist,
    CloudclasssearchBack,
    customadd,
    remindedit,
    reminddel,
    customgetList,
    customgetdel,
    customgetvipupdate,
    queryexists
  } from '@/api/api'
  import {timeFormattershow} from '@/assets/js/common'
  import {baseUrl} from '../../../static/baseUrl'
  import qs from 'qs'

  export default {
    data () {
      return {
        repetitionVisible: false,//重复弹框显示
        repetitionData: [],//重复
        timeFormattershow,
        baseUrl,
        editdisabled: false,//vip专定的时候不能编辑
        SpeciallyData: [],//专定数组
        TodaytableData: [],//今日提醒的数组
        ClodlistData: [],
        CloudDialogVisible: false,//云课堂弹框
        CustomDialogVisible: false,
        pregnantStatusSelect: '',//页面搜索
        day: '',
        SelectSate: '孕育记录',
        GetstateDialogVisible: false,
        pregnantStatus: '1',//新增状态
        toggle: 1,
        pageNo: 1,
        pageSize: 10,
        totalNumber: null,
        breedValidateForm: {
          pregnancyWeeks: '',
          birthDays: '',
          momAttention: '',
          babyDevelopment: '',//宝宝发育\
          babyHeightMin: '',
          babyHeightMax: '',
          babyWeightMax: '',
          babyWeightMin: '',
        },
        Seletidx: null,//弹框选中的id
        gestatedata: [],//孕育
        pregnantAdd: true,
        procodeID: '',
        gestatedatashow: true,
        TodayRemindDialogVisible: false,//今日提醒的弹框
        remindData: [],
        CustomValidateForm: {//专定课程
          pregnancyWeeks: '',
          birthDays: '',
        },
        dynamicValidateForm: {
          domains: [{
            courseId: ''
          }],
        },
        selectinput: '',//选中的下标
        SelectType: null,//选中类型
        courseId: [],//发给后台的id
        TodayID: null,//编辑的ID发过去
        TodayAdd: true,//今日提醒的添加
        Customeditid: null,//编辑的时候传一个id
        Customadd: true,//vip新增
      }
    },
    methods: {
      closeCustom () {//清空vip
        this.CustomValidateForm.pregnancyWeeks = ''//专定课程
        this.CustomValidateForm.birthDays = ''
        this.dynamicValidateForm.domains = []
      },
      closeGetstate () {//清空孕育记录
        this.pregnantStatus = '1'
        this.breedValidateForm.pregnancyWeeks = ''
        this.breedValidateForm.pregnancyWeeks = ''
        this.breedValidateForm.birthDays = ''
        this.breedValidateForm.momAttention = ''
        this.breedValidateForm.babyDevelopment = ''//宝宝发育\
        this.breedValidateForm.babyHeightMin = ''
        this.breedValidateForm.babyHeightMax = ''
        this.breedValidateForm.babyWeightMax = ''
        this.breedValidateForm.babyWeightMin = ''
      },

      onSubmitSeach () {
        switch (String(this.SelectSate)) {
          case '孕育记录':
            this.getpregnantlist()
            break
          case '今日提醒':
            this.getremindlist()
            break
          case '专定课程':
            this.getcustomgetList()
        }
      },
      SubbuttonAdd () {
        switch (this.SelectSate) {
          case '孕育记录':
            this.GetstateDialogVisible = true
            this.pregnantAdd = true
            break
          case '今日提醒':
            this.TodayAdd = true
            this.$router.push({name: 'VIPRemind', params: {TodayAdd: this.TodayAdd}})
            break
          case '专定课程':
            this.Customadd = true
            this.CustomDialogVisible = true
            this.editdisabled = false
            break
        }
      },
      changeSelect (value) {//选中的值
        this.totalNumber = null
        this.SelectSate = value
        this.pageNo = 1
        this.pageIndexChange()
        switch (value) {
          case '孕育记录':
            this.getpregnantlist()
            break
          case '今日提醒':
            console.log('==================')
            this.getremindlist()
            break
          case '专定课程':
            this.getcustomgetList()
            break
        }
      },
      pageIndexChangeyun (index) {
        this.pageNo = index
        this.getClodList() //云课堂列表如果不是上面三个的翻页,就是云课堂的翻页
      },

      changeAdd (value) { //添加时候的选中
        this.toggle = value
        if (value = 2) {
          console.log('2222')
          this.CustomValidateForm.pregnancyWeeks = ''//..选择宝宝出生的时候清空周
          this.breedValidateForm.pregnancyWeeks = ''//
        }
      },
      submitBreed () {//孕育提交内容
        this.breedValidateForm.pregnantStatus = this.pregnantStatus
        var parms = this.breedValidateForm
        if (this.pregnantAdd) {
          pregnantadd(qs.stringify(parms), this.mysession).then(res => {
            console.log(parms)
            if (res.data.code == 1001) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.GetstateDialogVisible = false
              this.getpregnantlist()
            }
          })
        } else {
          this.breedValidateForm.idx = this.procodeID
          pregnantedit(qs.stringify(parms), this.mysession).then(res => {
            console.log(parms)
            if (res.data.code == 1001) {
              this.$message({
                type: 'success',
                message: '编辑成功'
              })
              this.GetstateDialogVisible = false
              this.getpregnantlist()
            }
          })
        }
      },
      BreedEdit (index) {//孕育编辑
        this.breedValidateForm.babyHeightMin = this.gestatedata[index].babyHeightMin
        this.breedValidateForm.babyHeightMax = this.gestatedata[index].babyHeightMax
        this.breedValidateForm.babyWeightMin = this.gestatedata[index].babyWeightMin
        this.breedValidateForm.babyWeightMax = this.gestatedata[index].babyWeightMax
        console.log(this.gestatedata[index])
        this.GetstateDialogVisible = true
        this.pregnantAdd = false
        this.pregnantStatus = String(this.gestatedata[index].pregnantStatus)
        if (this.pregnantStatus == 1) {
          this.toggle = 1

        } else {
          this.toggle = 2
        }
        this.breedValidateForm.pregnancyWeeks = this.gestatedata[index].pregnancyWeeks
        this.breedValidateForm.birthDays = this.gestatedata[index].birthDays
        this.breedValidateForm.momAttention = this.gestatedata[index].momAttention
        this.breedValidateForm.babyDevelopment = this.gestatedata[index].babyDevelopment//宝宝发育\
        this.procodeID = this.gestatedata[index].idx
      },
      BreedDelete (index) {//孕育删除
        var parms = {
          idx: this.gestatedata[index].idx
        }
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          pregnantdel(qs.stringify(parms), this.mysession).then(res => {
            if (res.data.code == 1001) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getpregnantlist()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      getpregnantlist () {//孕育记录的列表
        //  var mysession = sessionStorage.getItem("sesstion");
        this.gestatedata = []
        var parms = {
          pregnantStatus: this.pregnantStatusSelect,
          day: this.day,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        pregnantlist(parms, this.mysession).then(res => {
          console.log('孕育记录')
          console.log(res)
          if (res.data.code == 1001) {
            this.gestatedata = res.data.data.items
          }
          this.totalNumber = res.data.data.totalNum
        })
      },
      getremindlist () {//今日提醒列表
        var parms = {
          pregnantStatus: this.pregnantStatusSelect,
          day: this.day,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        remindlist(parms, this.mysession).then(res => {
          console.log('今日提醒')
          console.log(this.mysession)
          console.log(parms)
          console.log(res)
          if (res.data.code == 1001) {
            this.TodaytableData = res.data.data.items
            this.totalNumber = res.data.data.totalNum
          }
        })
      },
      //VIP专订
      removeDomain (item) {//删除
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain () {//增加
        this.dynamicValidateForm.domains.push({
          courseId: '',
          key: Date.now()
        })
      },
      pageIndexChange (index) {//翻页
        this.pageNo = index
        switch (String(this.SelectSate)) {
          case '孕育记录':
            this.getpregnantlist()
            break
          case '今日提醒':
            this.getremindlist()
            break
          case '专定课程' :
            this.getcustomgetList()
            break

        }
      },
      SelectCloudlist (domain, index) {//点击选择进云课堂的列表选择
        this.getClodList() //云课堂列表
        this.CloudDialogVisible = true
        this.selectinput = index
      },
      Customsubmint () {//提交VIP定制
        this.courseId = []
        for (var i = 0; i < this.dynamicValidateForm.domains.length; i++) {//sb后台不会接受对象
          this.courseId.push(this.dynamicValidateForm.domains[i].courseId)
        }
        var parms = {
          pregnantStatus: this.pregnantStatus,
          pregnancyWeeks: this.CustomValidateForm.pregnancyWeeks,
          birthDays: this.CustomValidateForm.birthDays,
          courseIdlist: this.courseId
        }
        if (this.Customadd) {
          customadd(parms, this.mysession).then(res => {
            console.log('----增加----')
            console.log(res)
            console.log(parms)
            if (res.data.code == 1001) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.getcustomgetList()
              this.CustomDialogVisible = false
            } else {
              this.$message({
                type: 'error',
                message: 'VIP课程已经创建'
              })
            }
          })
        } else {
          console.log('编辑VIP')
          console.log(parms)
          /* var   parmsedit=parms.id */
          customgetvipupdate(parms, this.mysession).then(res => {
            if (res.data.code == 1001) {
              this.$message({
                type: 'success',
                message: '编辑成功'
              })
              this.CustomDialogVisible = false
              this.getcustomgetList()
            }
          })
        }
      },

      SelectCloudidx () {//选中的云课堂的ID
        this.CloudDialogVisible = false
        var parms = {
          idx: this.Seletidx.idx
        }
        queryexists(qs.stringify(parms)).then(res => {
          console.log('++提交前确认+++')
          console.log(res)
          if (res.data.code == 1001) {
            this.repetitionData = res.data.data
            if (this.repetitionData.length !== 0) {
              this.repetitionVisible = true
            }
          }
        })
      },
      surerepetition () {///提交重负的
        this.dynamicValidateForm.domains[this.selectinput].courseId = this.Seletidx.idx
        this.repetitionVisible = false
      },
      handleCurrentChange (value) {//当前选中
        this.Seletidx = value
        console.log(this.Seletidx)
      },
      TodayhandleEdit (index) {//今日提醒的编辑
        this.TodayAdd = false
        this.$router.push({name: 'VIPRemind', params: {id: this.TodaytableData[index], TodayAdd: this.TodayAdd}})
      },
      ToadyhandleDelete (index) {//今日提醒的删除
        var parms = {
          idx: this.TodaytableData[index].idx
        }
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reminddel(qs.stringify(parms), this.mysession).then(res => {
            if (res.data.code == 1001) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }
            this.getremindlist()
          })
        })
      },

      getClodList () {//云课堂的列表显示
        var parms = {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
        CloudclasssearchBack(qs.stringify(parms), this.mysession).then(res => {
          console.log('yunketangde liebiao')
          console.log(parms)
          console.log(res)
          this.ClodlistData = []
          if (res.data.code == 1001) {
            this.totalNumber = res.data.data.totalNum
            res.data.data.items.forEach((item, index) => {
              this.ClodlistData.push(item)
            })
          }
        })
      },
      getcustomgetList () {//专定课程列表
        var parms = {
          pregnantStatus: this.pregnantStatusSelect,
          birthDays: this.day,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        customgetList(qs.stringify(parms), this.mysession).then(res => {
          console.log('VIP专定列表')
          console.log(res)
          if (res.data.code == 1001) {
            this.SpeciallyData = res.data.data.items
            this.totalNumber = res.data.data.totalNum
          }
        })
      },
      SpeciallyEdit (index) {//专定课程编辑
        console.log(this.SpeciallyData[index])
        this.editdisabled = true
        this.CustomDialogVisible = true
        this.Customadd = false//编辑的时候
        this.pregnantStatus = String(this.SpeciallyData[index].pregnantStatus)
        if (this.SpeciallyData[index].pregnantStatus == 1) {
          this.toggle = 1
          this.CustomValidateForm.pregnancyWeeks = this.SpeciallyData[index].pregnancyWeeks
          this.CustomValidateForm.birthDays = this.SpeciallyData[index].birthDays
        } else {
          this.toggle = 2
          this.CustomValidateForm.birthDays = this.SpeciallyData[index].birthDays
        }
        this.dynamicValidateForm.domains = this.SpeciallyData[index].list
        for (var i = 0; i < this.SpeciallyData[index].list.length; i++) {
          this.dynamicValidateForm.domains[i].courseId = String(this.SpeciallyData[index].list[i].courseId)
        }
      },
      SpeciallyDelete (index) {//删除
        var parms = {
          birthDays: this.SpeciallyData[index].birthDays,
          pregnancyWeeks: this.SpeciallyData[index].pregnancyWeeks,
          pregnantStatus: this.SpeciallyData[index].pregnantStatus
        }
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          customgetdel(qs.stringify(parms), this.mysession).then(res => {
            if (res.data.code == 1001) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getcustomgetList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
    },
    mounted () {
      this.mysession = sessionStorage.getItem('sesstion')
      this.getpregnantlist()

    },
    deactivated () {
      this.$destroy(true)
    }

  }
</script>
<style lang="scss" scoped>
  .VIPorder {

  }
</style>
