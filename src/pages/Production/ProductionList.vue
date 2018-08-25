<template>
    <el-row>
       <el-col :span="24">
           <div class="CurrentPage">AI智能<i class="el-icon-arrow-right"></i>产康规则列表</div> 
        </el-col>
        <div><el-button type="primary" size="small"  style="float:right" @click="addProduction">新增</el-button></div>
        <el-col :span="24" style="margin-top:40px" >
             <el-table
                :data="ProductiontableData"
                stripe
                border
                style="width: 100%">
                <el-table-column
                   type="index"
                   width="100">
                </el-table-column>
                <el-table-column
                 label="测评项目"
                  width="180">
                  <template slot-scope="scope">
                        <span v-if="ProductiontableData[scope.$index].questionnaireSubject.sort==1">盆底康复</span>
                        <span v-if="ProductiontableData[scope.$index].questionnaireSubject.sort==2">乳房养护</span>
                        <span v-if="ProductiontableData[scope.$index].questionnaireSubject.sort==3">女性特征</span>
                        <span v-if="ProductiontableData[scope.$index].questionnaireSubject.sort==4">产后体形恢复</span>
                        <span v-if="ProductiontableData[scope.$index].questionnaireSubject.sort==5">产后体质调理</span>
                        <span v-if="ProductiontableData[scope.$index].questionnaireSubject.sort==6">妇科常见问题改善</span>
                        <span v-if="ProductiontableData[scope.$index].questionnaireSubject.sort==7">产后情绪</span> 
                  </template>
                </el-table-column >
                <el-table-column label="问题">
                    <template slot-scope="scope" >
                        <span>{{ProductiontableData[scope.$index].questionnaireSubject.subjectName}} </span>
                    </template>
                </el-table-column>
                  <el-table-column
                     label="推送套餐">
                    <template slot-scope="scope" >
                        <div  style="font-weight: bold"  v-for="item in ProductiontableData[scope.$index].questionnaireRule" :key="item.id">{{item.nursingItemName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="140px">
                     <template slot-scope="scope">
<!--                         <el-button
                        size="mini"
                        @click="productionEdit(scope.$index, scope.row)">编辑</el-button> -->
<!--                         <el-button
                        size="mini"
                        type="danger"
                        @click="productionDelete(scope.$index, scope.row)">删除</el-button> -->

                         <i class='my-icon delete' @click="productionDelete(scope.$index, scope.row)" ></i>
                    </template>  
                </el-table-column>
            </el-table> 
            <div class="myPagination">
                        <el-pagination
                            layout="prev, pager, next,  total"
                            :total="totalNumber" 
                            :page-size='pageSize'
                            @current-change='pageIndexChange'>
                        </el-pagination>
                </div>
              <el-dialog
                title="提示"
                :visible.sync="Productiondialog"
                width="34%"
              >
             <el-form :inline="true" :model="producform" class="demo-form-inline" label-width='80px' >
                    <el-form-item label="测评项目" style="display:block">
                        <el-select v-model="producform.regiontype" style="width:200px" >
                            <el-option v-for="item in NurseData"
                                    :key="item.value" 
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item label="问题描述:" style="display:block">
                          <el-input v-model="producform.describe" ></el-input> 
                    </el-form-item>
                     <el-form-item label="答案A" >
                        <el-input v-model="producform.qustionA" ></el-input>
                     </el-form-item>
                     <el-form-item label="答案B"  >
                           <el-input v-model="producform.qustionB" ></el-input>
                     </el-form-item>
                     <el-form-item label="答案C">
                             <el-input v-model="producform.qustionC" ></el-input>  
                     </el-form-item>
                      <el-form-item label="答案D">
                             <el-input v-model="producform.qustionD" ></el-input>  
                     </el-form-item> 
                     <el-form-item 
                        v-for="(domain, index) in producform.domains"
                        :key="domain.key"
                         :prop="'domains.' + index + '.value'"
                         label="选项">
                       <el-select v-model="domain.answerName" style="width:120px">
                            <el-option  label="A" value="A"></el-option>
                            <el-option  label="B" value="B"></el-option>
                            <el-option  label="C" value="C"></el-option>
                            <el-option  label="D" value="D"></el-option>
                        </el-select>
                            <el-input v-model="domain.nursingItemId" style="width:200px" ></el-input>
                            <el-button @click="SelectDomain(domain)" size="small" type="primary" >选择</el-button>
                            <el-button @click.prevent="removeDomain(domain)" size="small" type="danger"  >删除</el-button>  
                     </el-form-item>
                      <el-form-item label="推送规则" style="display:block">
                         <el-button @click="addDomain" type="primary" size="small" >新增选项</el-button> 
                      </el-form-item>
                </el-form> 
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click="Sendproductiondata">确 定</el-button>
                </span>
                </el-dialog>
        </el-col>
        <el-col :span="24">
           <el-dialog
                  title="提示"
                  :visible.sync="Merchandialog"
                  width="50%"

                > 
                  <el-table
                         :data="MerchantableData"
                         highlight-current-row
                         border
                        @current-change="CurrentChange"
                        style="width: 100%">
                        <el-table-column
                           type="index"
                           width="55"
                        >
                        </el-table-column>
                        <el-table-column
                            label="商品主图"
                            width="180">
                            <template slot-scope="scope">
                                <img  style="width:50px;height:50px"  :src="`${baseUrl}/common/fileOut?url=${MerchantableData[scope.$index].itemImg}`" >  
                           </template>
                        </el-table-column>
                        <el-table-column
                            prop="itemName"
                            label="商品名称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                        label="价格">
                             <template slot-scope="scope" >
                                       <span>{{MerchantableData[scope.$index].minPrice}}</span>/
                                       <span>{{MerchantableData[scope.$index].dayCountName}}</span>
                                       <span  v-if="MerchantableData[scope.$index].type==3">月</span>
                                       <span  v-if="MerchantableData[scope.$index].type==2">天</span>
                                       <span  v-if="MerchantableData[scope.$index].type==1">次</span>
                             </template>
                        </el-table-column>
                        <el-table-column
                             label="上下架状态">
                          <template slot-scope="scope">
                             <span v-if="MerchantableData[scope.$index].state==0">未上架</span>
                             <span v-if="MerchantableData[scope.$index].state==1">上架</span>
                             <span v-if="MerchantableData[scope.$index].state==2">下架</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                             label="商品性质">
                            <template slot-scope="scope">
                                <span v-if="MerchantableData[scope.$index].sortId==1">住院照护</span>
                                 <span v-if="MerchantableData[scope.$index].sortId==2">上门到家</span>
                                  <span v-if="MerchantableData[scope.$index].sortId==3">预约到店</span>
                                   <span v-if="MerchantableData[scope.$index].sortId==4">住店尊享</span>   
                           </template> 
                        </el-table-column>
                        <el-table-column
                           label="创建时间">
                             <template slot-scope="scope">

                             </template>
                        </el-table-column>

                  </el-table> 
                <div class="myPagination">
                        <el-pagination
                            layout="prev, pager, next,  total"
                            :total="totalNumber" 
                            :page-size='pageSize'
                            @current-change='pageIndexChange'>
                        </el-pagination>
                </div>
                  <span slot="footer" class="dialog-footer">
                <el-button type="primary"  size="small"  @click="Ensure">确 定</el-button>
            </span>
         
           </el-dialog> 
        </el-col>

    </el-row>
</template>
<script>
import{nursingApinursitemlist,subjectadd,subjectgetList,delchankangdel} from '@/api/api'
import {baseUrl} from '../../../static/baseUrl'
import qs from 'qs'
export default {
     data(){
         return{
             ProductiontableData:[],
             Merchandialog:false,
             mysession:'',
             baseUrl,
             totalNumber:null,
             Productiondialog:false,
             producform:{
                    regiontype:'',
                    describe:'',
                    qustionA:'',
                    qustionB:'',
                    qustionC:'',
                    qustionD:'',
                    domains:[
                        {
                          answerName:'',
                          nursingItemId:'',
                          nursingItemName:'',  
                        }
                    ]
             },
            NurseData:[
                {
                    label:"盆底康复",
                    value:'1'
                },
                {
                    label:'乳房养护',
                    value:"2"
                },
                {
                    label:'女性特征',
                    value:'3'
                },
                {
                    label:"产后体形回复",
                    value:'4'
                },
                {
                    label:'产后体质调理',
                    value:'5'
                },
                {
                    label:'妇科常见问题改善',
                    value:'6'
                },
                {
                    label:'产后情绪',
                    value:"7"
                }
            ],
            MerchantableData:[],
            pageNo:1,
            pageSize:10,
            Selectindex:null,
            Selectid:null,
            SelectName:null,
         }
     },
     methods:{
         getnursingApinursitemlist(){
               this.MerchantableData=[];
                var params = {
                            pageNo:this.pageNo,
                            pageSize:this.pageSize,
                            sortId:'3',
                            state:'1',
                     }
                    nursingApinursitemlist(params,this.mysession).then(res=>{
                            console.log(res)

                           if(res.data.code==1001){
                               this.MerchantableData=res.data.data.items
                               this.totalNumber=res.data.data.totalNum
                           }
                  })
           },
/*            productionEdit(){//编辑

           }, */
           productionDelete(index){//删除
                console.log(this.ProductiontableData[index])
                var parms ={
                       id:this.ProductiontableData[index].questionnaireSubject.id
                }
              delchankangdel(qs.stringify(parms),this.mysession).then(res=>{
                          console.log(parms)
                           console.log(res)   
              })
           },
          getsubjectgetList(){//产康列表
               subjectgetList(this.mysession).then(res=>{
                       console.log("产康列表")
                      /*   console.log(res) */
                     if(res.data.code==1001){
                          console.log(res) 
                          this.ProductiontableData=res.data.data.items
                          this.totalNumber=res.data.data.totalNum
                        }
               })

             //  console.log(this.ProductiontableData)
          },
         addProduction(){//新增
               this.Productiondialog=true 

         },
         removeDomain(item){//删除
             var index = this.producform.domains.indexOf(item)
                if (index !== -1) {
                   this.producform.domains.splice(index, 1)
                }
                  
         },
         SelectDomain(item){//点击选择
              var index = this.producform.domains.indexOf(item) 
              console.log(index)
              this.Merchandialog=true
              this.Selectindex=index
              this.getnursingApinursitemlist()
         },
        CurrentChange(value){//选中的当前hang的数据
               console.log(value)
               this.Selectid=value.id
               this.SelectName=value.itemName 
        },
        Ensure(){

             this.producform.domains[this.Selectindex].nursingItemId = this.Selectid 
             this.producform.domains[this.Selectindex].nursingItemName =  this.SelectName
             this.Merchandialog=false   
        },
        Sendproductiondata(){//提交题目数据
               let questionnaireSubject={
                     sort:this.producform.regiontype,
                     subjectName:this.producform.describe,
               }   
              let questionnaireAnswer=[
                     { 
                         answerName:'A',
                         answerDesc:this.producform.qustionA
                     },
                     {
                          answerName:'B',
                           answerDesc:this.producform.qustionB
                     },
                      {
                          answerName:'C',
                          answerDesc:this.producform.qustionC
                      },
                       {
                          answerName:'D ',
                          answerDesc:this.producform.qustionD
                      },

              ]
             var parms={
                    questionnaireSubject:questionnaireSubject,
                    questionnaireAnswer:questionnaireAnswer,
                    questionnaireRule:this.producform.domains 
             }
             console.log(parms)
             //console.log(this.producform.domains)  
             subjectadd(parms,this.mysession).then(res=>{
                        console.log("====tianjia===")
                        console.log(res)
                        if(res.data.code==1001){
                            this.$message({
                                type:"success",
                                message:"添加成功"
                            })
                         this.Productiondialog=false
                    }
             })

        },
         addDomain(){//增加ID
             this.producform.domains.push({
                        answerName:'',
                        nursingItemId:'',
                        nursingItemName:'',
                        key: Date.now()
              });
         },
        pageIndexChange(){//翻页
            
        },



     },
     mounted(){
            this.mysession = sessionStorage.getItem("sesstion");
            this.getsubjectgetList()
     },
}
</script>
<style  lang="scss" scoped>

</style>


