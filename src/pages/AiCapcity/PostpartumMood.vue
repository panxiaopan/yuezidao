<template>
     <el-row>
         <el-col :span="24">
        <el-col :span='24'>
           <div class="CurrentPage">Ai智能<i class="el-icon-arrow-right"></i>产后情绪</div>
       </el-col>
              <div style="float:right">
                  <el-button type="primary"  size="small"  @click="AddPostMood"  >新增</el-button>
              </div>   
         </el-col>
         <el-col :span="24" style="margin-top:40px"  >
                <el-table
                    :data="PosttableData"
                    stripe
                    border
                    style="width: 100%">
                    <el-table-column
                      type="index"
                     width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="问题"
                    >
                    <template slot-scope="scope">
                       <el-popover trigger="hover" placement="top">
                        <p v-for ="item in PosttableData[scope.$index].questionnaireAnswer" :key="item.id">{{item.answerName}}.{{item.answerDesc}}({{item.score}})</p>
                         <div slot="reference" class="name-wrapper">   
                            <span>{{PosttableData[scope.$index].questionnaireSubject.subjectName}}</span>
                         </div>
                        </el-popover>
                    </template>
                    </el-table-column>
                    <el-table-column
                      width="200px"
                      prop="address"
                      label="操作">
                           <template slot-scope="scope">
<!--                             <el-button
                            size="mini"
                            @click="postEdit(scope.$index, scope.row)">编辑</el-button> -->
<!--                             <el-button
                            size="mini"
                            type="danger"
                            @click="postDelete(scope.$index, scope.row)">删除</el-button> -->

                            <i class='my-icon delete' @click="postDelete(scope.$index, scope.row)" ></i> 
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
                    :visible.sync="PostdialogVisible"
                    width="34%"
                     >
                     <el-form  :inline="true"     :model="PostformInline" class="demo-form-inline" label-width="80px">
                            <el-form-item label="问题描述"  style="display:block" > 
                               <el-input v-model="PostformInline.description"   >
                               </el-input>
                             </el-form-item>
                               <el-form-item label="答案A"  > 
                                 <el-input v-model="PostformInline.questionA" >
                                </el-input> 
                             </el-form-item>  
                               <el-form-item label="A分值"  > 
                                 <el-input v-model="PostformInline.ScoreA" >
                                </el-input>
                             </el-form-item>                             
                               <el-form-item label="答案B"  > 
                                  <el-input v-model="PostformInline.questionB" >
                                  </el-input>
                             </el-form-item> 
                             <el-form-item label="B分值"  > 
                                 <el-input v-model="PostformInline.ScoreB" >
                                </el-input>
                             </el-form-item>                               
                             <el-form-item label="答案C"  > 
                                  <el-input v-model="PostformInline.questionC" >
                                  </el-input>
                             </el-form-item> 
                              <el-form-item label="C分值"  > 
                                 <el-input v-model="PostformInline.ScoreC" >
                                </el-input>
                             </el-form-item>                               
                            <el-form-item label="答案D"  > 
                                  <el-input v-model="PostformInline.questionD" >
                                  </el-input>
                             </el-form-item>    
                             <el-form-item label="D分值"  > 
                                 <el-input v-model="PostformInline.ScoreD" >
                                </el-input>
                             </el-form-item>                                                       
                        </el-form>
                     <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="Postsubdata">确 定</el-button>
                    </span>
                </el-dialog>
         </el-col>
     </el-row>
</template>
<script>
import{subjectadd,questionnairegetList,subjectdel} from '@/api/api'
import qs from 'qs'
export default {
       data(){
           return{
                 pageNo:1,
                 pageSize:10,
                totalNumber:null,
                mysession:'',
                PosttableData:[],
                PostdialogVisible:false,
                PostformInline:{
                      description:'',
                      questionA:'',
                      questionB:'',
                      questionC:'',
                      questionD:'',
                      ScoreA:'',
                      ScoreB:'',
                      ScoreC:'',
                      ScoreD:'',
                }
           }
       },
       methods:{
           AddPostMood(){//点击显示弹框
                this.PostdialogVisible=true
           },
           Postsubdata(){//点击新增确定按钮
                let questionnaireSubject={
                        sort:'7',
                        subjectName:this.PostformInline.description
                }
                let questionnaireAnswer=[
                            {
                                answerName:'A',
                                answerDesc:this.PostformInline.questionA,
                                score:this.PostformInline.ScoreA
                            },
                            {
                                answerName:'B',
                                answerDesc:this.PostformInline.questionB,
                                score:this.PostformInline.ScoreB
                            },
                            {
                                answerName:'C',
                                answerDesc:this.PostformInline.questionC,
                                score:this.PostformInline.ScoreC
                            },
                            {
                                answerName:'D',
                                answerDesc:this.PostformInline.questionD,
                                score:this.PostformInline.ScoreD
                            },                                                              
                ]
              var  parms={
                     questionnaireSubject:questionnaireSubject,
                     questionnaireAnswer:questionnaireAnswer
              }
           subjectadd(parms,this.mysession).then(res=>{
                        console.log(parms)
                        console.log(res)
                        if(res.data.code==1001){
                            this.$message({
                                type:'success',
                                message:"添加成功"
                            })
                            this.PostdialogVisible=false  
                        }
                  })        
           },
           getquestionnairegetList(){//得到列表

                        var parms={
                              pageNo:this.pageNo,
                              pageSize:this.pageSize
                        }

                 questionnairegetList(parms,this.mysession).then(res=>{
                        
                         if(res.data.code==1001){
                                console.log(res)
                              this.PosttableData=res.data.data.items
                              this.totalNumber=res.data.data.totalNum
                         }
                  })
            },
         pageIndexChange(index){
                 this.pageNo=index
                  this.getquestionnairegetList()
         },

          postEdit(){//编辑

          },
          postDelete(index){//删除
               var parms={
                   id:this.PosttableData[index].questionnaireSubject.id
               }
              subjectdel(qs.stringify(parms),this.mysession).then(res=>{
                        if(res.data.code==1001){
                             this. getquestionnairegetList()  
                        }
              })
          },
       },
       mounted(){
              this.mysession = sessionStorage.getItem("sesstion");  
              this.getquestionnairegetList()
       }
}
</script>
<style lang="scss" scoped>
     
</style>


