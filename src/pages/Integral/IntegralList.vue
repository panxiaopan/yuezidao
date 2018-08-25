<template>
    <el-row>
        <el-col :span='24'>
          <div class="CurrentPage">积分管理<i class="el-icon-arrow-right"></i>积分列表 </div>
       </el-col>
       <el-col :span="24">
           <el-form  :inline="true">
                 <el-form-item>
                        <div class="block">
                            <el-date-picker
                                v-model="valuetime"
                                type="daterange"
                                range-separator="至"
                                value-format="timestamp"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                         </div>
                 </el-form-item>
                  <el-form-item>
                       <button class='search-btn' @click="Seach" >
                           <i class='search-btn-icon' ></i>
                       </button>
                  </el-form-item>
           </el-form>
       </el-col>
        <el-col :span="24">
                 <el-table
                 border
                :data="IntertableData"
                style="width: 100%">
               <el-table-column label="用户ID" prop="id">

               </el-table-column>



                <el-table-column
                    prop="userName"
                    label="昵称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="integrationIn"
                    label="收入"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="integrationOut"
                    label="支出">
                </el-table-column>
                <el-table-column
                    prop="explains"
                    label="摘要">
                </el-table-column>
                 <el-table-column
                    prop="integrationAll"
                    label="累计积分">
                </el-table-column>               
                <el-table-column
                    prop="createTime"
                    label="产生时间">
                </el-table-column> 
                <el-table-column
                    label="有效期(年)">
                     <template slot-scope="scope">
                          {{timeFormattershow(IntertableData[scope.$index].endTime)}}
                     </template>
                </el-table-column> 
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button
                           size="mini"
                           type="primary"
                          @click="IntegraEdit(scope.$index, scope.row)">编辑</el-button> -->
                          <i class='my-icon edit' @click="IntegraEdit(scope.$index, scope.row)" ></i>
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
                title="积分有效期修改"
                :visible.sync="IntelistdialogVisible"
                width="30%"
               >
                        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item
                            label="积分年限"
                            prop="age"
                            :rules="[
                            { required: true, message: '不能为空'},
                            ]"
                        >
                             <el-date-picker
                                     v-model="numberValidateForm.age"
                                     type="date"
                                     value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                             </el-date-picker> 
                        </el-form-item>
                         </el-form>
                       
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                </span>
        </el-dialog>
        </el-col>
    </el-row>
</template>
<script>
import {tradeLoglist,tradeLogedit} from '@/api/api'
import {timeFormattershow} from '@/assets/js/common'
import qs from 'qs'
export default {
    data(){
        return{
            timeFormattershow,
             totalNumber:null,
             valuetime:[],
             pageNo:1,
             pageSize:10,
             mysession:'',
             IntertableData:[],
             IntelistdialogVisible:false,
             numberValidateForm: {
                          age: ''
                },
            editID:'',
        }
    },
    methods:{
                 gettradeLoglist(){
                       var parms={
                               inStartTime:this.valuetime[0], 
                               inEndTime:this.valuetime[1],
                               pageNo:this.pageNo,
                               pageSize:this.pageSize,   
                       }
                    tradeLoglist(parms,this.mysession).then(res=>{
                                  console.log("leibiao")
                                  console.log(parms)
                                  console.log(res)
                                  if(res.data.code==1001){
                                       this.totalNumber=res.data.data.totalNum
                                       this.IntertableData=res.data.data.items
                                       res.data.data.items.forEach((item,index) =>{
                                           this.IntertableData[index].createTime=timeFormattershow(this.IntertableData[index].createTime)
                                       })   
                                  }
                        })
                 },
               submitForm(formName) {
                           var parms={
                               id:this.editID,
                               endTime: this.numberValidateForm.age
                           }
                        this.$refs[formName].validate((valid) => {
                        if (valid) {
                                tradeLogedit(qs.stringify(parms),this.mysession).then(res=>{
                                           console.log("shijian")
                                           console.log(parms)
                                           console.log(res)
                                            if(res.data.code==1001){
                                                 this.gettradeLoglist() 
                                                  this.IntelistdialogVisible=false; 
                                            }
                                   })
                             } 
                        });
                    }, 

               Seach(){
                     this.gettradeLoglist()
               },
              IntegraEdit(index){//编辑
                      this.IntelistdialogVisible=true
                      console.log(this.IntertableData[index])
                      this.numberValidateForm.age=this.IntertableData[index].expiryTime
                      this.editID=this.IntertableData[index].id
              },
              pageIndexChange(index){
                    this.pageNo=index 
                    this.gettradeLoglist()
              }
    },
    mounted(){
              this.mysession = sessionStorage.getItem("sesstion");  
              this.gettradeLoglist()
    }
}
</script>

