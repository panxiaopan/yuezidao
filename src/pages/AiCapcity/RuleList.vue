<template>
  <el-row>
     <el-col :span='24'>
         <div class="CurrentPage">Ai智能<i class="el-icon-arrow-right"></i>规则设置</div>
     </el-col>
       <el-form :inline="true">
            <el-form-item>    
                <el-radio-group v-model="itemSort" size="medium" @change="changesort" >
                        <el-radio-button label="1" >新生儿健康测评</el-radio-button>
                        <el-radio-button label="2">产妇健康测评</el-radio-button>
                </el-radio-group>
           </el-form-item>
            <div style="float:right"><el-button type="primary" size="small" @click="AddRulelist">新增</el-button></div>
       </el-form>
        <el-col :span="24">
                <el-table
                :data="RulelisttableData"
                 border
                 style="width: 100%">
<!--                     <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                    </el-table-column> -->
                    <el-table-column
                        prop="itemName"
                        label="测量项目"
                        width="180">
                    </el-table-column>
                   <el-table-column
                        label="正常值"
                        width="140"
                       >
                    <template slot-scope="scope">
                           <div v-for="item in RulelisttableData[scope.$index].normalValueList" :key="item.key">
                              <div v-if="RulelisttableData[scope.$index].valueType==1"> <span  >{{item.minValue}}</span>--<span>{{item.maxValue}}</span></div>
                               <div  v-if="RulelisttableData[scope.$index].valueType==2"><span >{{item.value}}</span></div>
                            </div>
                    </template>
                    </el-table-column>
                   <el-table-column
                        label="预警值"
                        width="140"
                       >
                    <template slot-scope="scope">
                           <div v-for="item in RulelisttableData[scope.$index].warnValueList" :key="item.key">
                               <div v-if="RulelisttableData[scope.$index].valueType==1"><span  >{{item.minValue}}</span>--<span>{{item.maxValue}}</span></div>
                                <div v-if="RulelisttableData[scope.$index].valueType==2"><span  >{{item.value}}</span></div>
                            </div>
                    </template>
                    </el-table-column>
                    <el-table-column label="预警推送文章" >
                             <template slot-scope="scope">
                                      <div v-for="item in RulelisttableData[scope.$index].warnValueList" :key="item.key">
                                          <span>{{item.articleName}}</span>
                                      </div>
                             </template>
                    </el-table-column>
                 <el-table-column
                        label="危险值"
                        width="140"
                       >
                    <template slot-scope="scope">
                           <div v-for="item in RulelisttableData[scope.$index].dangerValueList" :key="item.key">
                                <div  v-if="RulelisttableData[scope.$index].valueType==1"><span>{{item.minValue}}</span>--<span>{{item.maxValue}}</span></div>
                                <div  v-if="RulelisttableData[scope.$index].valueType==2"><span>{{item.value}}</span></div>
                            </div>
                    </template>
                    </el-table-column> 
                    <el-table-column
                        width='100'
                        label="类型">
                        <template slot-scope="scope">
                             <span v-if=" RulelisttableData[scope.$index].valueType==2">定性</span>
                              <span v-else >定量</span>
                        </template>  
                    </el-table-column>
                    <el-table-column
                    width="140"
                     label="操作">
                        <template  slot-scope="scope" >
<!--                             <el-button
                            size="mini"
                            type="primary"
                            @click="RulehandleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="RulehandleDelete(scope.$index, scope.row)">删除</el-button> -->
                            <i class='my-icon edit' @click="RulehandleEdit(scope.$index, scope.row)" ></i>
                            <i class='my-icon delete' @click="RulehandleDelete(scope.$index, scope.row)" ></i>




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
        </el-col>

        <el-col :spn="24">
               <el-dialog
                     :title="SelectType"
                     :visible.sync="RulelistdialogVisible"
                     width="980px"
                     @close="closeRulelistdialogVisible"
                     >
                    <el-form  :model="RuleliatForm"  ref="RuleliatForm"    label-width="100px">
                           <el-form-item  label="测量项目" >
                                <!--  <el-input v-model="RuleliatForm.item"  style="width:220px"></el-input> -->
                                 <el-select v-model="RuleliatForm.Name" placeholder="请选择">
                                     <el-option v-for="item in MeasureData"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                                     </el-option>
                                 </el-select> 
                           </el-form-item>
                          <el-form-item label="发布栏">
                                     <el-select v-model="pushlish">
                                         <el-option label="功能待定" value="1">
                                         </el-option>
                                      </el-select>
                          </el-form-item>
                            <el-form-item label="选择性质">
                               <el-radio-group  v-model="RuleliatForm.valueType" size="mini"  @change="changevaluetype"  >
                                     <el-radio  border   label="1" >定量</el-radio>
                                     <el-radio  border   label="2">定性</el-radio>
                              </el-radio-group>
                           </el-form-item>
                            <span v-if="RuleliatForm.valueType==1">
                             <el-form-item label="单位">
                                     <el-input v-model="RuleliatForm.unit" class="worthclass" ></el-input>
                            </el-form-item>
                           <el-form-item 
                                  label="正常值"
                                  v-for="domain in normalValueList"
                                  :key="domain.key">
                                       <el-input v-model="domain.minValue" class="worthclass"></el-input>
                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                       <el-input v-model="domain.maxValue" class="worthclass"></el-input>
                                       <i class="fa fa-plus fa-1x pngicon " aria-hidden="true"  @click="normaladdDomain"></i>
                                        <i class="fa  fa-minus fa-1x pngicon " aria-hidden="true"  @click="normalremoveDomain(domain)"></i>
                           </el-form-item>
                             <el-form-item 
                                  label="预警值"
                                  v-for="(domain,index) in warnValueList"
                                  :key="domain.key">
                                       <el-input v-model="domain.minValue" class="worthclass"></el-input>
                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                       <el-input v-model="domain.maxValue" class="worthclass"></el-input>
                                         <el-form-item label="扣分" class="insideinline">
                                                <el-input v-model="domain.deductScore" class="worthclass"></el-input>
                                         </el-form-item>
                                         <el-form-item label="推送文章" class="insideinline">
                                                <el-input v-model="domain.articleId" class="Artticleclass"></el-input>
                                         </el-form-item>
                                          <el-button size="small" type="primary"  @click="SelectCloudlist(domain,index)">选择</el-button>
                                        <i class="fa fa-plus fa-1x pngicon " aria-hidden="true"  @click="warnaddDomain"></i>
                                        <i class="fa  fa-minus fa-1x pngicon " aria-hidden="true"  @click="warnremoveDomain(domain)"></i>
                           </el-form-item>    
                             <el-form-item 
                                  label="危险值"
                                  v-for="domain in dangerValueList"
                                  :key="domain.key">
                                       <el-input v-model="domain.minValue" class="worthclass"></el-input>
                                        <i class="fa fa-window-minimize" aria-hidden="true"></i>
                                       <el-input v-model="domain.maxValue" class="worthclass"></el-input>
                                          <el-form-item label="扣分" class="insideinline">
                                                <el-input v-model="domain.deductScore" class="worthclass"></el-input>
                                         </el-form-item>
                                        <i class="fa fa-plus fa-1x pngicon " aria-hidden="true"  @click="dangeraddDomain"></i>
                                        <i class="fa  fa-minus fa-1x pngicon " aria-hidden="true"  @click="dangerremoveDomain(domain)"></i>
                           </el-form-item>
                          </span>
                          <span v-else>
                                <el-form-item 
                                    label="正常值"
                                    v-for="domain in DeterminenormalValueList"
                                    :key="domain.key">
                                        <el-input v-model="domain.value" class="worthclass"></el-input>
                                           <i class="fa fa-plus fa-1x pngicon " aria-hidden="true"  @click="DeternormaladdDomain"></i>
                                            <i class="fa  fa-minus fa-1x pngicon " aria-hidden="true"  @click="DeternormalremoveDomain(domain)"></i>
                              </el-form-item>   
                              <el-form-item 
                                    label="预警值"
                                    v-for="(domain,index) in DeterminewarnValueList"
                                    :key="domain.key">
                                        <el-input v-model="domain.value" class="worthclass"></el-input>
                                             <el-form-item label="扣分" class="insideinline">
                                                <el-input v-model="domain.deductScore" class="worthclass"></el-input>
                                            </el-form-item>
                                         <el-form-item label="推送文章" class="insideinline">
                                                <el-input v-model="domain.articleId" class="Artticleclass"></el-input>
                                         </el-form-item>
                                             <el-button size="small" type="primary"  @click="SelectCloudlist(domain,index)">选择</el-button>
                                            <i class="fa fa-plus fa-1x pngicon " aria-hidden="true"  @click="DeterminewarnaddDomain"></i>
                                            <i class="fa  fa-minus fa-1x pngicon " aria-hidden="true"  @click="DeterminewarnremoveDomain(domain)"></i>
                            </el-form-item>   
                              <el-form-item 
                                    label="危险值"
                                    v-for="domain in DerdangerValueList"
                                    :key="domain.key">
                                         <el-input v-model="domain.value" class="worthclass"></el-input>
                                             <el-form-item label="扣分" class="insideinline">
                                                <el-input v-model="domain.deductScore" class="worthclass"></el-input>
                                            </el-form-item>
                                           <i class="fa fa-plus fa-1x pngicon " aria-hidden="true"  @click="DerdangeraddDomain"></i>
                                            <i class="fa  fa-minus fa-1.5x pngicon " aria-hidden="true"  @click="DerdangerremoveDomain(domain)"></i>
                              </el-form-item>   
                          </span>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" size="small" @click="RuleAddsubmit">确 定</el-button>
                    </span>
                </el-dialog>   
        </el-col>
        <el-col :span="24">
                 <el-dialog
                      :visible.sync="ArticledialogVisible"
                       width="60%"
                       @close="closeArticle"
                      >
                         <el-table
                                border
                                :data="ArticletableData"
                              highlight-current-row
                                 @current-change="handleCurrentChange"
                                style="width: 100%">
                                <el-table-column
                                    label="序号"
                                     width="100">
                                   <template slot-scope="scope">
                                      <span> {{(pageindex-1) * 10 +scope.$index+1}}  </span> 
                                   </template>
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="类别"
                                    width="180">
                                <template slot-scope="scope">
                                        <span v-if="ArticletableData[scope.$index].category==2">产妇</span>
                                        <span v-else>新生儿</span>
                                </template>
                                </el-table-column>
                                <el-table-column
                                    prop="keyWord"
                                    label="关键">

                                </el-table-column>
                                <el-table-column label="标题"  prop="title" width="260">
                                </el-table-column>
                                <el-table-column
                                    label="封面图">
                                    <template  slot-scope="scope">
                                        <img  style="width:50px;height:50px"  :src="`${baseUrl}/common/fileOut?url=${ArticletableData[scope.$index].url}`" >  
                                    </template>
                                </el-table-column> 
                                <el-table-column
                                    prop="createTime"
                                    label="创建时间">
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
                        <el-button size="small"   type="primary" @click="SelectCloudidx">确 定</el-button>
                    </span>
                </el-dialog>
        </el-col>
  </el-row>
</template>
<script>
import qs from 'qs'
 import{evaluationadd,articlegetList,evaluationgetList,evaluationdel,evaluationruleget,evaluationupdate,evaluationruleedit} from '@/api/api'
  import {baseUrl} from '../../../static/baseUrl'
export default {
       data(){
           return{
               nubmerindex:0,
               pageindex:1,
               ruleeditid:'',//编辑的id
               pushlish:'',//发布栏
              RulelisttableData:[],
              MeasureData:[],
              baseUrl,
              type:'1',
              itemSort:'1', 
              SelectType:"新生儿",
              RulelistdialogVisible:false,
              RuleliatForm:{
                    Name:'',
                    valueType:'1',//定性定量
                    unit:"",
              },
            normalValueList: [{//正常值
                minValue: '',
                maxValue:'',
                
            }],
            warnValueList: [{//预警值
                minValue: '',
                maxValue:'',
                deductScore:null,//扣分
                articleId:'',//推荐文章
            }],
            dangerValueList:[
               {//危险值
                minValue: '',
                maxValue:'',
                deductScore:null,//扣分
                }
            ],
           //定性
           DeterminenormalValueList:[//正常值
                   {value:''}
           ],
           DeterminewarnValueList:[//预警值
                  {
                    deductScore:null,//扣分
                    value:'',
                    articleId:'',
                  }
           ],
           DerdangerValueList:[//定性危险值
                {
                   deductScore:null,//扣分
                    value:'', 
                }
           ],
             selectinput:null,
             Seletidx:null,//选中的当条
             style:'1',
             content:'',
             pageNo:1,
             pageSize:10,
             totalNumber:null,
             ArticletableData:[],
             ArticledialogVisible:false,
             articleIdList:[],
             RulelistisAdd:true,
             editId:null,
             childrenData:[
                 {
                     label:"体温",
                     value:"体温",
                 },
                 {
                     label:"体重",
                     value:"体重",
                 },
                 {
                     label:"心率",
                     value:"心率",
                 },
                  {
                     label:"奶粉",
                     value:"奶粉",
                 },              
                  {
                     label:"大便",
                     value:"大便",
                 },
                  {
                     label:"小便",
                     value:"小便",
                  },                                 
                 {
                     label:"小便情况",
                     value:"小便情况",
                  }, 
                  {
                     label:"睡眠次数",
                     value:"睡眠次数",
                  },                    
                   {
                     label:"睡眠时间",
                     value:"睡眠时间",
                  },                 
                   {
                     label:"哭声",
                     value:"哭声",
                   },  
                    {
                      label:"黄疸",
                      value:"黄疸",
                    },
                    {
                     label:"活动力",
                     value:"活动力",
                    }, 
                    {
                     label:"呼吸",
                     value:"呼吸",
                    },  
                    {
                     label:"腹部",
                     value:"腹部",
                    },                     
                     {
                     label:"皮肤",
                     value:"皮肤",
                    },
                     {
                      label:"脐带",
                      value:"脐带",
                     },                                                       
                ],
                womandata:[
                     {
                       label:"体温",
                       value:"体温",
                      },
                     {
                       value:"伤口",
                      }, 
                     {
                       label:"宫底",
                       value:"宫底",
                      },
                       { 
                            label:"食欲",
                            value:"食欲",
                       },

                      {
                       label:"乳头",
                       value:"乳头",
                      },
                     {
                       label:"乳房",
                       value:"乳房",
                      },                   
                      {
                       label:"水肿",
                       value:"水肿",
                      }, 
                      {
                       label:"痔疮",
                       value:"痔疮",
                      },
                      {
                       label:"恶露颜色",
                       value:"恶露颜色",
                      },
                      {
                       label:"恶露性状",
                       value:"恶露性状",
                      },
                      {
                       label:"恶露气味",
                       value:"恶露气味",
                      },
                     {
                       label:"大便",
                       value:"大便",
                      },                     

                ]
           }
       },
       methods:{
           AddRulelist(){//增加
                   this.RulelistdialogVisible=true;
                   this.RulelistisAdd=true;
                    this.getarticlegetList()
           },
          changesort(value){//新增时候title
                  console.log(value)
                  this.MeasureData=[]
                  if(value==1){
                      this.SelectType="新生儿"
                      this.MeasureData=this.childrenData 
                  }else{
                       this.SelectType="产妇"
                        this.MeasureData=[]
                       this.MeasureData=this.womandata
                  }
                  this.getRuleList()
          },
           SelectCloudlist(domain,index){//点击选择异常文章的列表选择   
                   this.ArticledialogVisible=true
                   this.selectinput =index   
                   //this.RulelistdialogVisible=false;    
                     this.getarticlegetList()
                     console.log('选择')
            },
         SelectCloudidx(){//选中的异常文章
                  this.ArticledialogVisible=false
                  this.pageNo=1 
                if(this.RuleliatForm.valueType==1){//定性定量文章分开
                     this.warnValueList[this.selectinput].articleId= this.Seletidx.idx;
                }else{
                       this.DeterminewarnValueList[this.selectinput].articleId= this.Seletidx.idx;
                }    
           },
          handleCurrentChange(value){//当前选中
                 this.Seletidx=value  
                 console.log(this.Seletidx)      
          }, 
          normalremoveDomain(item) {//删除正常值
          console.log("------------")
                var index = this.normalValueList.indexOf(item)
                if (index !== -1) {
                     this.normalValueList.splice(index, 1)
                }
            }, 
         normaladdDomain() {////增加正常的值
            this.normalValueList.push({
                  minValue: '',
                  maxValue:'',
                  key: Date.now()
               });
            },
          warnaddDomain(){//增加预警值
                this.warnValueList.push({
                    minValue: '',
                    maxValue:'',
                    deductScore:null,//扣分
                    articleId:'',//推荐文章
                    key: Date.now()
                }) //预警值
              console.log(this.warnValueList)
          },
           warnremoveDomain(item){//减少预警值
                var index = this.warnValueList.indexOf(item)
                    if (index !== -1) {
                        this.warnValueList.splice(index, 1)
                    }    
           },
         dangeraddDomain(){//危险值增加
                this.dangerValueList.push({
                    minValue: '',
                    maxValue:'',
                    deductScore:null,//扣分
                    key: Date.now()
                })
         },
          dangerremoveDomain(item){//减少预警值
                var index = this.dangerValueList.indexOf(item)
                    if (index !== -1) {
                        this.dangerValueList.splice(index, 1)
                    }    
           },
         changevaluetype(value){
         
         },
        DeternormaladdDomain(){//定性正常值增加
              this.DeterminenormalValueList.push({
                     value:'',
                     key: Date.now()
              })
        },
        DeternormalremoveDomain(item){//定性正常值减少
              var index = this.DeterminenormalValueList.indexOf(item)
                    if (index !== -1) {
                        this.DeterminenormalValueList.splice(index, 1)
                    } 
        },
        DeterminewarnaddDomain(){//定性预警值减少
                this.DeterminewarnValueList.push({
                      value:'',
                      deductScore:null,//扣分
                      articleId:'',
                })
        },
        DeterminewarnremoveDomain(item){//定性正常值减少
              var index = this.DeterminewarnValueList.indexOf(item)
                    if (index !== -1) {
                        this.DeterminewarnValueList.splice(index, 1)
                    } 
        },
        DerdangeraddDomain(){
              this.DerdangerValueList.push({
                      value:'',
                      deductScore:null,//扣分
                      key: Date.now()
              })
        },
         DerdangerremoveDomain(item){//定性危险值
              var index = this.DerdangerValueList.indexOf(item)
                    if (index !== -1) {
                        this.DerdangerValueList.splice(index, 1)
                    } 
         },
           RuleAddsubmit(){//提交验证数据.
                var parms={
                      itemSort:Number(this.itemSort),
                      valueType:Number(this.RuleliatForm.valueType),
                      itemName:this.RuleliatForm.Name,
                      unit:this.RuleliatForm.unit,
                      normalValueList: this.RuleliatForm.valueType==1 ? this.normalValueList : this.DeterminenormalValueList,
                      warnValueList:this.RuleliatForm.valueType==1 ? this.warnValueList : this.DeterminewarnValueList,
                      dangerValueList: this.RuleliatForm.valueType==1 ? this.dangerValueList :this.DerdangerValueList
                }
                if(this.RulelistisAdd){
                     evaluationadd(parms,this.mysession).then(res=>{
                             console.log("提交列表数据")
                             console.log(res)
                             if(res.data.code==1001){
                                  this.$message({
                                      type:'success',
                                      message:"添加成功"
                                  })
                                    this.RulelistdialogVisible=false;
                                    this.getRuleList()
                             }
                      })

                }else{
                      console.log("编辑")
                       parms.idx=this.ruleeditid
                        console.log(parms)
                     evaluationruleedit(parms,this.mysession).then(res=>{
                                console.log(res)
                                console.log(parms)
                                if(res.data.code==1001){
                                      this.$message({
                                          type:"success",
                                          message:'编辑成功'
                                      })
                                    this.RulelistdialogVisible=false;
                                    this.getRuleList()
                                }
                     })  
                }
           },
          closeRulelistdialogVisible(){//关闭弹框的时候,
                     this.RuleliatForm.Name='';
                     this.RuleliatForm.valueType='1';//定性定量
                     this.RuleliatForm.unit='';
                    this.normalValueList=[{//正常值
                            minValue: '',
                            maxValue:'',
                        }];
                this.warnValueList= [{//预警值
                minValue: '',
                maxValue:'',
                deductScore:null,//扣分
                articleId:'',//推荐文章
            }];
            this.dangerValueList=[
               {//危险值
                minValue: '',
                maxValue:'',
                deductScore:null,//扣分
                }
            ];
           //定性
           this.DeterminenormalValueList=[//正常值
                   {value:'',

                   }
           ];
           this.DeterminewarnValueList=[//预警值
                  {
                    deductScore:null,//扣分
                    value:'',
                    articleId:'',
                  }
           ];
           this.DerdangerValueList=[//定性危险值
                {
                   deductScore:null,//扣分
                    value:'', 
                }
           ];
          },
           RulehandleEdit(index){//编辑
                this.RulelistdialogVisible=true;
                this.RulelistisAdd=false;
              
                this.ruleeditid=this.RulelisttableData[index].idx
                console.log(this.RulelisttableData[index])
                this.RuleliatForm.Name=this.RulelisttableData[index].itemName
                this.RuleliatForm.valueType= this.RulelisttableData[index].valueType.toString()
                this.RuleliatForm.unit=this.RulelisttableData[index].unit
                if(this.RulelisttableData[index].valueType==1){
                        this.dangerValueList=this.RulelisttableData[index].dangerValueList;
                        this.warnValueList=this.RulelisttableData[index].warnValueList
                        this.normalValueList=this.RulelisttableData[index].normalValueList
                }else{
                        this.DeterminenormalValueList=this.RulelisttableData[index].normalValueList//正常值
                        this.DeterminewarnValueList=this.RulelisttableData[index].warnValueList
                        this.DerdangerValueList=this.RulelisttableData[index].dangerValueList

                }  
           },
           RulehandleDelete(index){//删除
                  var parms={
                       idx:this.RulelisttableData[index].idx
                  } 
              evaluationdel(qs.stringify(parms),this.mysession).then(res=>{
                              
                              if(res.data.code==1001){
                                   this.$message({
                                       type:"success",
                                       message:'删除成功'
                                   }) 
                                  this.getRuleList()
                              }      
                     })          
            },
          getRuleList(){
                var parms={
                        itemSort:this.itemSort,
                        pageNo:this.pageNo,
                        pageSize:this.pageSize
                }
              evaluationgetList(parms,this.mysession).then(res=>{
                           console.log("--列表----")
                            console.log(res)
                          if(res.data.code==1001){
                             this.RulelisttableData=res.data.data.items
                             this.totalNumber=res.data.data.totalNum
                             this.nubmerindex=this.totalNumber
                         }

               })    
          },
         getarticlegetList(){
                 var parms={
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                 }
                articlegetList(parms,this.mysession).then(res=>{
                           console.log("_____文章________")
                           console.log(res)
                           if(res.data.code==1001){
                                  this.ArticletableData=res.data.data.items 
                                  this.totalNumber=res.data.data.totalNum
                             }
                        }) 
                   },
          pageIndexChange(index){
                 this.pageNo=index
                 if(this.ArticledialogVisible==false){//文章的弹框没显示的时候,翻页值翻页列表
                    
                      this.getRuleList()

                 }else{
                     this.pageindex=Number(index)
                     console.log(this.pageindex)
                     this.ArticledialogVisible=true
                     
                     this.getarticlegetList()
                     console.log("fanyewenzhang")
                 }
           },
           closeArticle(){//
                 this.getRuleList()
                 this.pageNo=1
                 this.getarticlegetList()
                console.log("guanbile")

           },
       },
       mounted(){
             this.mysession = sessionStorage.getItem("sesstion");  
             this.getRuleList() 
             this.MeasureData=this.childrenData
       } 

}
</script>
<style lang="scss" scoped>
        .pngicon{
            vertical-align: middle;
            margin-left: 10px;
            cursor: pointer;
        }
        .worthclass{
            display: inline-block;
            width: 100px;
        }
        .Artticleclass{
            display: inline-block;
            width: 160px;
        }
        .insideinline{
            display:inline-block;
        }
</style>