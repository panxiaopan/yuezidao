<template>
    <el-row>
         <el-col :span="24">
        <el-col :span='24'>
           <div class="CurrentPage">Ai智能监测管理<i class="el-icon-arrow-right"></i>产后情绪规则列表</div>
       </el-col>
              <div style="float:right">
                  <el-button type="primary"  size="small"  @click="AddPostRules"  >新增</el-button>
              </div>   
         </el-col>
         <el-col :span="24" style="margin-top:40px">
            <el-table
                :data="PushRulestableData"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="80">
                </el-table-column>
                <el-table-column
                prop="calculateFormula"
                label="总分值"
                width="180">
                </el-table-column>
                <el-table-column
                 width="180"
                  prop="statusDesc"
                  label="状态">
                </el-table-column>
                <el-table-column
                  prop="pushContent"
                  label="推送内容">
                </el-table-column>
                <el-table-column 
                 width="200px"
                  label="操作">
                <template slot-scope="scope">
                    <i class='my-icon edit' @click="PushEdit(scope.$index, scope.row)" ></i>
                    <i class='my-icon delete' @click="PushDelete(scope.$index, scope.row)" ></i>
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
                    title="新增"
                    :visible.sync="PushdialogVisible"
                    width="38%"
                    >
                    <el-form :inline="true" :model="PushformInline"   label-width="80px"      class="demo-form-inline">
   
                        <el-form-item label="总分值">
                         <span>
                             <el-select v-model="calculateCharA" placeholder="请选择" style="width:130px;"  >
                                    <el-option label="<(小于)" value="<"></el-option>
                                    <el-option label=">(大于)" value=">"></el-option>
                                    <el-option label=">=(大于等于)" value=">="></el-option>
                                    <el-option label="<=(小于等于)" value="<="></el-option>
                             </el-select>
                              <el-input v-model="valueA" style="width:60px"></el-input>
                              <el-select v-model="logicCharA" placeholder="请选择" style="width:130px;">
                                    <el-option label="&&" value="&&"></el-option>
                                    <el-option label="||" value="||"></el-option>
                             </el-select>
                             <el-select v-model="calculateCharB" placeholder="请选择" style="width:130px;">
                                    <el-option label="<(小于)" value="<"></el-option>
                                    <el-option label=">(大于)" value=">"></el-option>
                                    <el-option label=">=(大于等于)" value=">="></el-option>
                                    <el-option label="<=(小于等于)" value="<="></el-option>
                             </el-select>
                             <el-input v-model="valueB" style="width:60px"></el-input>
                            </span>
                        </el-form-item>
                        <el-form-item label="状态" style="display:block">
                               <el-input v-model="PushformInline.condition"   ></el-input>
                        </el-form-item>
                        <el-form-item label="推送内容">
                                <textarea  v-model="PushformInline.pushContent" name="" id="" cols="30" rows="10"></textarea>
                        </el-form-item>

                        </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" size="small"   @click="PushDataAdd">确 定</el-button>
                    </span>
            </el-dialog>  
        </el-col>
    </el-row>
</template>
<script>
import qs from "qs"
import{emotionRuleadd,emotionRulelist,emotionRuledel,emotionRuleedit} from '@/api/api'
export default {
    data(){
        return{
             pageNo:1,
             pageSize:10,          
             totalNumber:null,
             mysession:'',
             PushRulestableData:[],
             PushdialogVisible:false,
             PushformInline:{
                     condition:'',
                     pushContent:'',
             },
             calculateCharA:'',
             valueA:'',
             calculateCharB:'',
             valueB:'',
             logicCharA:'',
             EditID:"",
             PushisAdd:true,
        }
    },
    methods:{
         AddPostRules(){//点击新增
              this.PushdialogVisible=true
              this.PushisAdd=true
         },
         PushDataAdd(){//点击发送数据
                 var parms={
                      calculateCharA:this.calculateCharA,
                      valueA:this.valueA,
                      calculateCharB:this.calculateCharB,
                      logicCharA:this.logicCharA,
                      valueB:this.valueB,
                      statusDesc:this.PushformInline.condition,
                      pushContent:this.PushformInline.pushContent
                 }
            if(this.PushisAdd){
                  emotionRuleadd(qs.stringify(parms),this.mysession).then(res=>{
                                if(res.data.code==1001){
                                      this.$message({
                                          type:'success',
                                          message:'添加成功',
                                      })
                                    this.PushdialogVisible=false 
                                    this.getemotionRulelist()
                                }
                   }) 
            }else{
                 console.log("编辑")
                 parms.id= this.EditID
                 emotionRuleedit(qs.stringify(parms),this.mysession).then(res=>{
                         if(res.data.code==1001){
                             this.$message({
                                 type:'success',
                                 message:'编辑成功'
                             })
                              this.PushdialogVisible=false 
                              this.getemotionRulelist() 
                         }
                         /*  console.log(res) */
                 })
                 

            }
         },
       PushEdit(index){//编辑
                    console.log(this.PushRulestableData[index])
                    this.EditID=this.PushRulestableData[index].id 
                    this.PushisAdd=false
                    this.PushdialogVisible=true;
                    this.calculateCharA=this.PushRulestableData[index].calculateCharA;
                    this.valueA=this.PushRulestableData[index].valueA;
                    this.calculateCharB=this.PushRulestableData[index].calculateCharB;
                    this.logicCharA=this.PushRulestableData[index].logicCharA;
                    this.valueB=this.PushRulestableData[index].valueB;
                    this.PushformInline.condition=this.PushRulestableData[index].statusDesc;
                    this.PushformInline.pushContent=this.PushRulestableData[index].pushContent;
       },
        getemotionRulelist(){//列表
              var parms={
                        pageNo:this.pageNo,
                        pageSize:this.pageSize
              }
            emotionRulelist(parms).then(res=>{           
                         if(res.data.code==1001){
                             this.PushRulestableData=res.data.data.items
                             this.totalNumber=res.data.data.totalNum 
                         }
                })
        },
        pageIndexChange(index){
                this.pageNo=index
                this.getemotionRulelist()
        },

       PushDelete(index){//删除
            var parms={
                  id:this.PushRulestableData[index].id 
            }
            emotionRuledel(qs.stringify(parms),this.mysession).then(res=>{
                     if(res.data.code==1001){
                          this.getemotionRulelist()   
                     }
               })    
         },
    },
    mounted(){
           this.mysession = sessionStorage.getItem("sesstion");
           this.getemotionRulelist()
    }
}
</script>

