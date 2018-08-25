<template>
  <el-row class="LongDistance">
    <el-col :span='24'>
      <div class="CurrentPage">商品管理<i class="el-icon-arrow-right"></i>智护新增</div>
    </el-col>
    <el-col :span='24'>
      <el-form :inline="true"   :model="SmartForm"  :rules="RemoteRules"  ref="SmartForm" label-width="120px">
        <div class="BlogInfo">基础信息</div>
        <el-form-item  label="商品名称"  prop="itemName">
          <el-input v-model="SmartForm.itemName" style="width:373px">
          </el-input>
        </el-form-item>
        <el-form-item label="商品概述" prop="itemDesc" style="display:block">
          <!-- <el-input ></el-input> -->
          <textarea v-model="SmartForm.itemDesc" name="" id="" class="goods-desc" cols="50" rows="10" maxlength="36"
                    placeholder="输入字数不能超过36个字"></textarea>
        </el-form-item>
        <div class="BlogInfo">规格/价格设置</div>
        <div>
          <el-form-item >
            <el-button type="primary" size="small" @click="AddDays">增加天数规格</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small"  @click="ADDintelligence" >增加可选规格</el-button>
          </el-form-item>
        </div>
        <el-form-item >
          <el-table
            :data="monthMealDaysPriceList"
            style="width: 100%"
            border
          >
            <el-table-column
              label="套餐天数"
              width="160"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="monthMealDaysPriceList[scope.$index].bespeakSpecId"
                >
                  <el-option
                    v-for="item in Dayoption"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              width="160"
              label="套餐类型">
              <template  slot-scope="scope">
                <el-select v-model="monthMealDaysPriceList[scope.$index].packType">
                  <el-option   label="关爱套餐"   value="1"></el-option>
                  <el-option   label="无忧套餐"   value="2"></el-option>
                  <el-option  label="Queen套餐"  value="3"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="市场价(单位/元)"
            >
              <template slot-scope="scope">
                <el-input v-model="monthMealDaysPriceList[scope.$index].marketPrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="销售价(单位/元)"
            >
              <template slot-scope="scope">
                <el-input v-model="monthMealDaysPriceList[scope.$index].salesPrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width='100'
              label='操作'
            >
              <template slot-scope="scope" >
                <el-button
                  size='mini'
                  @click.native.prevent="deleteRow(scope.$index, monthMealDaysPriceList)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-form-item label="库存数量"  prop="stock">
            <el-input v-model="SmartForm.stock"></el-input>
          </el-form-item>
        </el-form-item>
        <div class="BlogInfo">押金规则</div>
        <table   cellspacing="0" style="width:300px;height:80px;text-align:center;" >
          <thead >
          <tr style="height:50px">
            <td>物品名称</td>
            <td>展示图</td>
            <td>押金金额(元)</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><input  v-model="bespeakItemAssortobj.assortName"   type="text" placeholder="输入名称" class="feedin"></td>
            <td>
              <el-upload
                class="avatar-uploader"
                :action="actionurl"
                :show-file-list="false"
                :on-success="RemoteAvatarSuccesscash"
              >
                <img v-if="imageUrlcash" :src="imageUrlcash"  class="showcash">
                <i v-else class="el-icon-plus avatar-uploadercash"></i>
              </el-upload>
            </td>
            <td><input   v-model="bespeakItemAssortobj.assortPrice" min="0"  type="number" placeholder="输入金额" class="feedin"></td>
          </tr>
          </tbody>
        </table>
        <div class="BlogInfo">商品主图</div>
        <el-form-item    prop="itemPic"  label="商品封面图" >
          <el-upload
            class="avatar-uploader"
            :action="actionurl"
            :show-file-list="false"
            :on-success="RemoteAvatarSuccesslist"
          >
            <img v-if="imageUrllist" :src="imageUrllist" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="picturedescription">尺寸150*150</span>
        </el-form-item>
        <el-form-item    prop="itemImg" label="商品内容主图" >
          <el-upload
            class="avatar-uploader"
            :action="actionurl"
            :show-file-list="false"
            :on-success="RemoteAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="picturedescription">尺寸750*420</span>
        </el-form-item>



        <div class="BlogInfo">商品描述</div>
        <el-form-item style="display:block">
          <iframe :src="iframehtml" ref="mybox" style="width:1100px;height:625px;" id="ueditor" name="frmRpt"></iframe>
        </el-form-item>
        <div style="text-align: center"><el-button type="primary" @click="Remotesubmit" >发布</el-button></div>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-dialog
        title="增加套餐可选天数"
        :visible.sync="PackageVisible"
        width="30%"
        center
      >
        <el-form :model="predestinationValidateForm" ref="predestinationValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="自定义天数"
            prop="predestination"
            :rules="[
                                        { required: true, message: '不能为空'},
                                        ]"
          >
            <el-input v-model="predestinationValidateForm.predestination" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFormday('predestinationValidateForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
  import {bespeakspecadd,bespeakspeclist,bespeaksitemaddAll,bespeakApiitemget,bespeakstateitemedit} from '@/api/api'
  import qs from 'qs'
  import {baseUrl} from '../../../static/baseUrl'
  import {iframe} from "../../../static/iframe"
  export default {
    data(){
      return{
        SmartForm:{//提交数据的表格
          itemName:'',
          itemDesc:'',
          stock:'',
        },
        iframehtml:iframe+'/ueditor/index.html',
        actionurl: baseUrl+"/common/uploadFile",
        monthMealDaysPriceList:[],
        Dayoption:[],//新增天数
        packType:'',//套餐类型
        bespeakSpecId:'',//天数id
        salesPrice:'',//价格
        PackageVisible:false,
        predestinationValidateForm:{
          predestination:'',
        },
        mysession:null,
        imageUrl:'',
        itemImg:'',//提交的图片
        EditsendID:null,
        CustodyisAddget:true,
        Editid:"",
        imageUrllist:'',
        itemPic:'',//商品列表图
        imageUrlcash:'',//商品押金图
        /*             bespeakItemAssort:[
                    ], */
        bespeakItemAssortobj:{
          assortName:'',
          assortImg:'',
          assortPrice:'',
        }
      }
    },
    computed:{
      RemoteRules(){
        return{
          itemName:[
            { required: true, message: "输入商品名称", trigger: "blur" }
          ],
          itemDesc:[
            { required: true, message: "输入商品描述", trigger: "blur" }
          ],
          itemImg:[
            { required: true, message: "上传商品主图", trigger: "blur" }
          ],
          stock:[
            { required: true, message: "填写剩余库存", trigger: "blur" }
          ],
          itemPic:[
            { required: true, message: "上传商品列表图", trigger: "blur" }
          ]
        }
      }
    },
    methods:{
      deleteRow(index, rows) {//页面增加的删除
        rows.splice(index, 1);
      },
      ADDintelligence(){//增加一行
        this.monthMealDaysPriceList.push({

        })
      },
      submitFormday(){//提交天数
        var parms={
          name:this.predestinationValidateForm.predestination,
          type:2
        }
        this.$refs['predestinationValidateForm'].validate((valid)=>{
          if(valid){
            bespeakspecadd(qs.stringify(parms),this.mysession).then(res=>{
              console.log(res)
              if(res.data.code==1001){
                this.$message({
                  type:'success',
                  message:'添加成功'
                })
                this.PackageVisible=false;
                this.$refs['predestinationValidateForm'].resetFields();
                this.getday()
              }
            })
          }
        })
      },
      getday(){

        bespeakspeclist(this.mysession).then(res=>{
          console.log(res)
          if(res.data.code==1001){
            this.Dayoption=res.data.data.items
          }
        })
      },
      AddDays(){//天数弹框显示
        this.PackageVisible=true;
      },
      RemoteAvatarSuccess(res, file){//上传商品主图成功
        this.imageUrl=file.url //成功后显示的图片
        if(res.code==1001){
          this.SmartForm.itemImg=res.data[0].fileUrl
        }
      },
      RemoteAvatarSuccesslist(res, file){//商品列表图
        console.log("列表图")
        this.imageUrllist=file.url
        if(res.code==1001){
          this.SmartForm.itemPic=res.data[0].fileUrl
          console.log(this.SmartForm.itemPic)
        }
      },
      RemoteAvatarSuccesscash(res, file){//商品押金的图
        console.log("押金的图")
        console.log(res)
        console.log(file)
        this.imageUrlcash=file.url
        if(res.code==1001){
          this.bespeakItemAssortobj.assortImg=res.data[0].fileUrl
        }
      },

      getbespeakApiitemget(){
        var parms={
          id: this.EditsendID
        }
        console.log("---编辑----")
        bespeakApiitemget(parms,this.mysession).then(res=>{
          console.log(res)
          this.Editid=res.data.data.bespeakItem.id
          this.SmartForm.itemName=res.data.data.bespeakItem.itemName;
          this.SmartForm.itemDesc=res.data.data.bespeakItem.itemDesc;
          this.SmartForm.stock=res.data.data.bespeakItem.stock;
          this.SmartForm.itemImg=res.data.data.bespeakItem.itemImg;
          this.imageUrl=`${baseUrl}/common/fileOut?url=${res.data.data.bespeakItem.itemImg}`;
          this.imageUrllist=`${baseUrl}/common/fileOut?url=${res.data.data.bespeakItem.itemPic}`;
          this.SmartForm.itemPic=res.data.data.bespeakItem.itemPic
          this.monthMealDaysPriceList=res.data.data.bespeakSpecPrice;
          this.$refs.mybox.contentWindow.setContent2Page(res.data.data.bespeakItem.content)
          this.bespeakItemAssortobj.assortName=res.data.data.bespeakItemAssort.assortName
          this.imageUrlcash=`${baseUrl}/common/fileOut?url=${res.data.data.bespeakItemAssort.assortImg}`;
          this.bespeakItemAssortobj.assortImg=res.data.data.bespeakItemAssort.assortImg
          this.bespeakItemAssortobj.assortPrice=res.data.data.bespeakItemAssort.assortPrice
          for(var i=0 ;i<this.monthMealDaysPriceList.length;i++){
            this.monthMealDaysPriceList[i].packType=String(this.monthMealDaysPriceList[i].packType)
          }

        })

      },
      Remotesubmit(){//提交所有信息
        this.SmartForm.content = this.$refs.mybox.contentWindow.getContent2ParentPage()
        var parms={
          bespeakItem:this.SmartForm,
          bespeakSpecPrice: this.monthMealDaysPriceList,
          bespeakItemAssort:[this.bespeakItemAssortobj]
        }
        console.log("_+++++++++")

        /*    console.log(this.$refs.mybox.contentWindow.getContent2ParentPage()) */
        if(this.CustodyisAddget==false){
          this.$refs['SmartForm'].validate((valid) => {
            this.SmartForm.id=this.Editid
            var parmsedit={
              bespeakItem:this.SmartForm,
              bespeakSpecPrice: this.monthMealDaysPriceList,
              bespeakItemAssort:[this.bespeakItemAssortobj]
            }
            bespeakstateitemedit(parmsedit,this.mysession).then(res=>{
              console.log("编辑")
              console.log(res)
              console.log(parms)
              if(res.data.code==1001){
                this.successgono()
              }
            })
          })
        }
        else{
          this.$refs['SmartForm'].validate((valid) => {
            if(valid){
              bespeaksitemaddAll(parms,this.mysession).then(res=>{
                console.log("新增")
                console.log(parms)
                console.log(res)
                if(res.data.code==1001){
                  this.successgono()
                }
              })
            }
            console.log(parms)



          })
        }
      },
      successgono(){//添加成功后
        this.$confirm('添加成功, 是否继续?', '提示', {
          confirmButtonText: '继续添加',
          cancelButtonText: '返回页面',
          type: 'warning'
        }).then(() => {
          location.reload();  //如果继续添加就在当前页面
          this.CustodyisAddget=true
        }).catch(() => {
          this.$router.push("/Custody")
        });
      },
    },
    mounted(){
      this.mysession = sessionStorage.getItem("sesstion");
      this.getday()
      this.EditsendID=this.$route.params.id;
      this.CustodyisAddget=this.$route.params.CustodyisAdd
      console.log("======")
      console.log(this.CustodyisAddget)
      if(this.CustodyisAddget==false){
        setTimeout(()=>{
          this.getbespeakApiitemget()
        },500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .LongDistance{
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      border:1px solid #8c939d ;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .avatar-uploadercash{
      width: 80px;
      height: 80px;
      text-align: center;
      border:1px solid #8c939d ;
      line-height: 80px;
    }
    table,th,td
    {
      border:1px solid #d9d9d9;
    }
    .showcash{
      width: 80px;
      height: 80px;
      display: block;
    }
    .feedin{
      height: 80px;
      border: none;
      text-align: center;
      line-height: 80px;
    }
  }
</style>

