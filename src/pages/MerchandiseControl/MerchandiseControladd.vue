<template>
     <el-row class="MerchandiseControladd">
       <el-col :span='24'>
          <div class="CurrentPage">商品管理<i class="el-icon-arrow-right"></i>预约增加
          </div>
      </el-col>
       <el-col :span="24">
               <el-form :model="MerchanruleForm"  :inline="true"  :rules="Merchanrules"   ref="MerchanruleForm" label-width="100px" class="ruleForm">
                        <div class="BlogInfo">基础信息</div>
<!--                         <el-form-item label="商品编号" >
                            <el-input v-model="MerchandiseID"   style="width:210px;" placeholder="无需填写"></el-input>
                        </el-form-item> -->
                        <el-form-item label="商品性质" prop="sortId" >
                             <el-select v-model="MerchanruleForm.sortId"  :disabled="disablededit"    placeholder="请选择商品性质" style="display:block;width:373px;">
                                    <el-option label="住院照护" value="1"></el-option>
                                    <el-option label="上门到家" value="2"></el-option>
                                    <el-option label="预约到店" value="3"></el-option>
                                    <el-option label="住店尊享" value="4"></el-option>
                                    <el-option label="专护人员" value="5"></el-option>
                                    <el-option label="早幼教" value="6"></el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item
                         label="商品名称"
                         style="display:block;"
                         prop="itemName">
                               <el-input v-model="MerchanruleForm.itemName"  style="width:373px;"  ></el-input>
                         </el-form-item>
                         <el-form-item
                           style="display:block"
                          prop="itemDesc"
                         label="商品概述">
                           <!-- <textarea  style="height:40px;width:200px;"></textarea> -->
                           <textarea v-model="MerchanruleForm.itemDesc" class="goods-desc"  cols="50" rows="10" maxlength="36"
                           placeholder="输入字数不能超过36个字"></textarea>
                         </el-form-item>
                          <div class="BlogInfo">规格/价格设置</div>
                         <el-form-item>
                               <el-radio-group v-model="comboType" @change="SIZEchange">
                                    <el-radio :label="1" border >预定次数</el-radio>
                                    <el-radio :label="2" border >预定天数</el-radio>
                                    <el-radio :label="3" border >预定月数</el-radio>
                                </el-radio-group>
                         </el-form-item>
                          <el-form-item>
                              <el-button type="primary" size="small" @click="reserveAdd">增加预定规格</el-button>
                         </el-form-item>
                         <el-form-item>
                            <el-button   type="primary" size="small" @click="Addline" >增加套餐规格</el-button>
                        </el-form-item>
                         <el-form-item style="display:block">
                         <el-table
                            :data="monthMealDaysPriceList"
                             style="width: 100%"
                             border
                               >
                                <el-table-column
                                :label=" '预约'+SIZEchangetitle+'数'"
                                width="200"
                                >
                                <template slot-scope="scope">
                                            <el-select
                                               v-model="monthMealDaysPriceList[scope.$index].nursingDaysCountId"
                                                >
                                                <el-option
                                                        v-for="item in Dayoption"
                                                        :key="item.id"
                                                        :value="item.id"
                                                        :label="item.dayCountName"
                                                  >
                                                </el-option>
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
                                      <el-input v-model="monthMealDaysPriceList[scope.$index].price"></el-input>
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
                     <div class="BlogInfo">库存设置</div>
                    <div>
                        <el-form-item>
                            <el-button type="primary" size="small"  @click="StockAddline" >增加</el-button>
                        </el-form-item>
                    </div>
                    <el-form-item>
                          <el-table
                            :data="StocktableData"
                            border
                            style="width: 100%">
                                <el-table-column
                                prop="date"
                                label="区域"
                                width="180">
                                <template slot-scope="scope">
                                       <el-select v-model="StocktableData[scope.$index].regionId" placeholder="请选择">
                                                <el-option
                                                      v-for="item in optionscity"
                                                      :key="item.id"
                                                      :label="item.name"
                                                      :value="item.id">
                                                </el-option>
                                         </el-select>
                                </template>
                                </el-table-column>
                                 <el-table-column
                                     label="时间段"
                                      width="380">
                                     <template slot-scope="scope">
                                          <el-time-select
                                            placeholder="起始时间"
                                            v-model="StocktableData[scope.$index].startTime"
                                            :picker-options="{
                                             start: '06:30',
                                             step: '00:10',
                                             end: '23:30'
                                            }">
                                        </el-time-select>
                                        <el-time-select
                                            placeholder="结束时间"
                                            v-model="StocktableData[scope.$index].endTime"
                                            :picker-options="{
                                            start: '06:30',
                                            step: '00:15',
                                            end: '23:30',
                                            minTime: startTime
                                            }">
                                        </el-time-select>
                                      </template>
                                </el-table-column>
                                <el-table-column
                                     label="库存"
                                      width="180">
                                     <template slot-scope="scope">
                                            <el-input v-model="StocktableData[scope.$index].stockCount"></el-input>
                                     </template>
                                </el-table-column>
                                   <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button
                                            size="mini"
                                            @click="StockDelete(scope.$index, StocktableData)">删除</el-button>
                                        </template>
                                  </el-table-column>
                           </el-table>
                    </el-form-item>
                    <div class="BlogInfo">商品图片</div>
                     <el-form-item
                            label="商品封面图">
                            <el-upload
                                        :action="actionurl"
                                        :show-file-list="false"
                                        :limit='1'
                                        :on-success="Goodsuploadsuccessslist"
                                        >
                                        <img v-if="commoditylurllist" :src="commoditylurllist" class="avatar">
                                        <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <span class="picturedescription">尺寸150*150</span>
                        </el-form-item>
                    <el-form-item
                         label="商品内容主图">
                           <el-upload
                                    :action="actionurl"
                                    :show-file-list="false"
                                    :limit='1'
                                    :on-success="Goodsuploadsuccesss"
                                    >
                                    <img v-if="commoditylurl" :src="commoditylurl" class="avatar">
                                    <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
                         </el-upload>
                           <span class="picturedescription">尺寸750*420</span>
                    </el-form-item>





                     <div class="BlogInfo">商品描述</div>
                    <el-form-item
                      style="display:block">
                         <div>
                            <iframe :src="iframehtml" ref="mybox" style="width:1100px;height:625px;" id="righticon" name="frmRpt"></iframe>
                        </div>
                    </el-form-item>
                      <div style="text-align: center">
                        <el-button type="primary"  @click="Submitbook" >发布</el-button>
                    </div>
                 </el-form>
         </el-col>
        <el-col :span="24">
              <el-dialog
                    :title="'预定'+SIZEchangetitle+'数'"
                    :visible.sync="reservedialogVisible"
                     width="30%"
                     @close="closedialogVisible"
                   >
                  <el-form :model="predestinationValidateForm"  :rules="predestinrules"    ref="predestinationValidateForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item
                                label="自定义"
                                prop="predestination"
                            >
                            <el-input  style="width:200px"    v-model="predestinationValidateForm.predestination" ></el-input>

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
 import{nursingApiadd,nursingApilist,getcity,nursingApinursadd,nursingApinursitemInfo,nursitemedit} from "@/api/api"
import qs from "qs";
import {baseUrl} from '../../../static/baseUrl'
import {iframe} from "../../../static/iframe"
export default {
    data(){
        return{
            iframehtml: iframe+'/ueditor/index.html',
            actionurl: baseUrl+"/common/uploadFile",
            stockCount:'',
            nursingDaysCountId:'',
            VIPitemImg:'',//传给后台时候接受的
            itemPic:'',//商品的列表的图
            Dayoption:[],//预定的数组
            commoditylurl:'',//显示的url
            startTime:"",//开始时间
            endTime:'',//.结束时间
            regionId:'',//城市选中的id
            optionscity:[


            ],//城市区域选择
            StocktableData:[],//库存的id
            monthMealDaysPriceList:[],
            reservedialogVisible:false,//弹框增加类型
            MerchandiseID:"",//编辑的时候.发送商品ID
            MerchanruleForm:{
               sortId:'',//
               itemName:'',
               itemDesc:'',
               itemImg:'',
               itemPic:"",
           },
           comboType:1,//预约规格类型
           SIZEchangetitle:"次",
           predestinationValidateForm: {
                        predestination: ''
                 },
            SubscribeAdd:false,//接受判断是编辑还是新增的数据
            MerchaneditData:null,  //接受编辑过来的数组
            disablededit:false,//编辑的时候这个不能编辑
            EditID:null,
            Prcoud:null,//编辑id接受
            itemImgedit:"",
            commoditylurllist:'',//商品列表的图
        }
    },
      computed:{
            Merchanrules(){
                return{
                    sortId:[
                        { required: true, message: '请选择商品性质', trigger: 'blur' },
                    ],
                    itemName:[
                         { required: true, message: '商品名称不能为空', trigger: 'blur' },
                    ],
                    itemDesc:[
                         { required: true, message: '商品描述不能为空', trigger: 'blur' },
                    ]
                }
            },
            predestinrules(){
                return{
                    predestination:[
                         { required: true, message: '不能为空', trigger: 'blur' },
                        /*  { pattern: /^\+?[1-9][0-9]*$/, message: "输入数字", trigger: "blur" } */
                    ]
                }
            }
      },
     methods:{
           reserveAdd(){//新增预定规格
               if(this.SIZEchangetitle==""||undefined||null){
                   this.$message({
                       type:"error",
                       message:"选择添加类型"
                   })
               }else{
                  this.reservedialogVisible=true
               }
           },
           SIZEchange(value){//值改变的时候title也改变
              this.SIZEchangetitle=value
              switch(String(this.SIZEchangetitle)){
                  case "1":
                  this.SIZEchangetitle="次"
                  break;
                  case "2":
                  this.SIZEchangetitle="天"
                  break;
                  case "3":
                  this.SIZEchangetitle="月"
              }
              this.getreserve()//xiamian
           },
        getreserve(){//得到预定的数据
             var mysession = sessionStorage.getItem("sesstion");
           var parms={
                  type:this.comboType,
                  pageNo:1,
                  pageSize:100,
              }
             nursingApilist(parms,mysession).then(res=>{
                     console.log("规格天数")
                     console.log(res)
                    if(res.data.code==1001){
                        this.Dayoption=res.data.data.items
                    }
               })
        },
         getgetcity(){//获取省市
            let params = {
                parentId:sessionStorage.getItem("cityId")
            }
            getcity(params).then(res => {
            if(res.code==1001){
                  console.log("市区")
                  console.log(res)
                 res.data.push({
                        id:"0",
                        name:'全区'
                   })
                  this.optionscity=res.data
                  this.optionscity.reverse()
                 }
                 console.log(this.optionscity)
            })

         },
         StockAddline(){//库存增加一行
              this.StocktableData.push({})
            //  this.Addsuccess()
         },
         deleteRow(index, rows) {//页面增加的删除
                      rows.splice(index, 1);
               },
         submitFormday(formName) {

            //类型提交
/*             var mysession = sessionStorage.getItem("sesstion");
            //   console.log(mysession) */
             var parms={
                  dayCountName:this.predestinationValidateForm.predestination,
                  type:this.comboType
             }
                     this.$refs['predestinationValidateForm'].validate((valid) => {
                        if (valid) {
                                nursingApiadd(qs.stringify(parms),this.mysession).then(res=>{
                                        if(res.data.code==1001){
                                            this.$message({
                                                type:"success",
                                                message:'添加成功'
                                            })
                                            this.reservedialogVisible=false ;
                                            this.$refs["predestinationValidateForm"].resetFields();
                                            this.getreserve()//刷新一下下拉框
                                        }
                                })
                            }
                        });
            },
           closedialogVisible(){//关闭的时候清空
               this.predestinationValidateForm.predestination==""
           },
           Addline(){//增加行
               this.monthMealDaysPriceList.push({});
           },
           StockDelete(index, rows){//删除
                 rows.splice(index, 1);
           },
            Goodsuploadsuccesss(res,file){//主商品展示图片
                this.commoditylurl=file.url
                if(res.code ==1001){
                  this.MerchanruleForm.itemImg= res.data[0].fileUrl
                }
            },
           Goodsuploadsuccessslist(res,file){//商品列表图
                 this.commoditylurllist=file.url
                  if(res.code==1001){
                      this.MerchanruleForm.itemPic=res.data[0].fileUrl
                  }

           },
         Submitbook(){//提交数据

                 this.MerchanruleForm.content=this.$refs.mybox.contentWindow.getContent2ParentPage()

                var params={
                      nursingItem:this.MerchanruleForm,
                      nursingDaysPrice:this.monthMealDaysPriceList,
                      nursingStock:this.StocktableData
                }
            if(this.SubscribeAdd ==false){
                      this.MerchanruleForm.id=this.Prcoud
                             console.log("提交编辑")
                            console.log(params)
                   nursitemedit(params,this.mysession).then(res=>{
                                if(res.data.code==1001){
                                     this.successgono()
                                }
                       })
                }else{
                     console.log("添加")
                    this.$refs['MerchanruleForm'].validate((valid)=>{
                        nursingApinursadd(params,this.mysession).then(res=>{
                                 console.log("tianjia")
                                console.log(params)
                                 console.log(res)
                                 if(res.data.code==1001){
                                        this.successgono()
                                    }
                                })
                            })
                     }
              },
            geteditData(){//编辑过来赋值是上去
                  var parms={
                      id:this.EditID
                  }
              nursingApinursitemInfo(parms,this.mysession).then(res=>{
                    console.log("bianjide=========")
                    console.log(res)

                this.comboType=res.data.data.nursingItem.type
                this.getreserve()
                this.monthMealDaysPriceList=res.data.data.nursingDaysPrice
                this.MerchanruleForm.sortId=String(res.data.data.nursingItem.sortId)
                this.MerchanruleForm.itemName=res.data.data.nursingItem.itemName
                this.MerchanruleForm.itemDesc=res.data.data.nursingItem.itemDesc
                 this.MerchanruleForm.itemPic=res.data.data.nursingItem.itemPic
                 this.MerchanruleForm.itemImg=res.data.data.nursingItem.itemImg
                this.getgetcity()
                this.StocktableData=res.data.data.nursingStock
                  for(var i=0;i<this.StocktableData.length;i++){
                     this.StocktableData[i].regionId=String(this.StocktableData[i].regionId)
                 }
                 this.commoditylurl=`${baseUrl}/common/fileOut?url=${res.data.data.nursingItem.itemImg}`
                 this.commoditylurllist=`${baseUrl}/common/fileOut?url=${res.data.data.nursingItem.itemPic}`

                 this.$refs.mybox.contentWindow.setContent2Page(res.data.data.nursingItem.content)
                 this.Prcoud=res.data.data.nursingItem.id
                })
            },
              successgono(){
                      this.$confirm('成功, 是否继续?', '提示', {
                                        confirmButtonText: '继续添加',
                                        cancelButtonText: '返回页面',
                                        type: 'warning'
                                    }).then(() => {
                                        window.location.reload()  //如果继续添加就在当前页面
                                      }).catch(() => {
                                        this.$router.push("/MerchandiseControllist")
                          });
                  }
      },
     mounted(){
           this.mysession = sessionStorage.getItem("sesstion");
           this.getreserve()
           this.getgetcity()
          this.SubscribeAdd=this.$route.params.SubscribeAdd
          console.log(this.SubscribeAdd)
          this.EditID=this.$route.params.id
          if(this.SubscribeAdd==false){
               this.disablededit=true
              setTimeout(()=>{
                   this.geteditData()
              },500)
          }

     },
      deactivated() {
            this.$destroy(true);
        },
}
</script>
<style lang="scss" scoped>
       .MerchandiseControladd{
          .ruleForm{
             .el-date-editor--time-select{
                display: inline-block;
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
                border-color: #409EFF;
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


