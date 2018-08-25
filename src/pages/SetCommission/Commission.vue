<template>
     <el-row class="setComission">
         <el-col :span='24'>
             <div class="CurrentPage">提成设置<i class="el-icon-arrow-right"></i>服务提成设置</div>
         </el-col>
        <el-col :span="24">
            <el-form> 
                <div style="float:right">
                <el-form-item>
                     <el-button type="primary" size="small" @click="CommissionAdd">增加</el-button>
                </el-form-item>
                 </div>
            </el-form>  
        </el-col>
         <el-col>
              <el-table
                     border
                    :data="ComData"
                    style="width: 100%">
                    <el-table-column
                        label="商品类别"
                        width="180">
                         <template slot-scope="scope">
                             <span v-if="ComData[scope.$index].itemType==1">住院照护</span>
                             <span v-if="ComData[scope.$index].itemType==2">上门到家</span>
                             <span v-if="ComData[scope.$index].itemType==3">预约到店</span>
                             <span v-if="ComData[scope.$index].itemType==4">住店尊享</span>
                         </template>
                    </el-table-column>
                    <el-table-column
                        label="服务项目"
                         prop="itemName"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="profitScale"
                        label="提成金额(单位/元)">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                           <el-button type="primary" size="mini" @click="editCommiss(scope.$index, scope.row)">
                               编辑
                           </el-button>
                        </template>
                    </el-table-column>
             </el-table>
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

         </el-col>
         <el-col :span="24">
              <el-dialog
                    title="增加提成规则"
                    :visible.sync="CommissiondialogVisible"
                     width="30%"
                     >
                     <el-form :model="CommissInline" ref="CommissInline" :rules="CommisRules" label-width="100px"  >
                        <el-form-item label="商品类别" prop="Comboid" >
                            <el-select v-model="CommissInline.Comboid" @change="changComboid" >
                                <el-option label="住院照护" value="1" ></el-option>
                                <el-option label="上门到家" value="2" ></el-option>
                                <el-option label="预约到店" value="3" ></el-option>
                                <el-option label="住店尊享" value="4" ></el-option>

                            </el-select> 
                        </el-form-item>
                        <el-form-item label="商品名称" prop="ComboName">
                            <el-select v-model="CommissInline.ComboName" @change="changComboid" >
                                    <el-option 
                                    v-for="item in productData"
                                    :key="item.id"
                                    :label="item.itemName"
                                    :value="item.id">
                                    </el-option>
                                </el-select> 
                        </el-form-item>
                        <el-form-item label="提成金额" prop="price">
                             <el-input style="width:220px"  v-model="CommissInline.price"></el-input>
                        </el-form-item>
                     </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="small"  type="primary" @click="CommissionSibmit">确 定</el-button>
                    </span>
              </el-dialog> 
         </el-col>
     </el-row>
</template>
<script>
 import {itemgetIdList,profitSharingadd,profitSharinglist,profitSharingedit} from '@/api/api'
 import qs from 'qs'
export default {
    data(){
        return{
             mysession:null,
             ComData:[],//
             CommissiondialogVisible:false,
             CommissInline:{
                Comboid:'',
                ComboName:'',
                price:'',
             },
             productData:[],//商品名称  
             totalNumber:null,
             pageNo:1,
             pageSize:10,
             EditCommis:null,
             ComboisAdd:true,
        }
    },
    computed:{
        CommisRules(){
            return{
                Comboid:[
                     { required: true, message: '请选择商品类别', trigger: 'blur' }, 
                ],
                ComboName:[
                     { required: true, message: '请选择商品名称', trigger: 'blur' }, 
                ],
                price:[
                      { required: true, message: '请添加金额', trigger: 'blur' }, 
                      { pattern: /^\+?[1-9][0-9]*$/, message: "输入数字", trigger: "blur" }
                ]
            }
        }
    },
    methods:{
          CommissionAdd(){//新增弹框按钮
              this.CommissiondialogVisible=true 
              this.ComboisAdd=true  
          },
         CommissionSibmit(){//增加提交按钮
                   var parms={
                        itemType:this.CommissInline.Comboid,
                        nursingItemId:this.CommissInline.ComboName,
                        profitScale:this.CommissInline.price,
                     } 
         if(this.ComboisAdd){
              this.$refs['CommissInline'].validate((valid) => {
                 if(valid){
                    profitSharingadd(qs.stringify(parms),this.mysession).then(res=>{
                        console.log("===添加====")
                              console.log(res)
                              console.log(parms)
                                if(res.data.code==1001){
                                     this.$message({
                                         type:"success",
                                         message:"添加成功",
                                     })
                                       this.CommissiondialogVisible=false
                                         this.getprofitSharinglist()
                                       this.$refs['CommissInline'].resetFields();
                                }
                          })
                      }
                 }); 
             }else{
                  parms.id=this.EditCommis
            this.$refs['CommissInline'].validate((valid) => {
                 if(valid){
                    profitSharingedit(qs.stringify(parms),this.mysession).then(res=>{
                              console.log(res)
                              console.log(parms)
                                if(res.data.code==1001){
                                     this.$message({
                                         type:"success",
                                         message:"编辑成功",
                                     })
                                       this.CommissiondialogVisible=false
                                       this.$refs['CommissInline'].resetFields();
                                       this.getprofitSharinglist()
                                }
                          })
                      }
                 });

             }

         },
         getprofitSharinglist(){//列表
              var parms={
                    pageNo:this.pageNo,
                    pageSize:this.pageSize
              } 
             profitSharinglist(parms,this.mysession).then(res=>{
                     console.log("列表")
                      console.log(res)
                      if(res.data.code==1001){
                          this.ComData=res.data.data.items;
                          this.totalNumber=res.data.data.totalNum
                      }
             })

         },
         editCommiss(index){
                   this.ComboisAdd=false
                    this.CommissiondialogVisible=true;
                    this.changComboid(this.ComData[index].itemType)
                    this.CommissInline.Comboid=String(this.ComData[index].itemType)
                    this.CommissInline.ComboName=this.ComData[index].nursingItemId
                    this.CommissInline.price=this.ComData[index].profitScale
                    this.EditCommis=this.ComData[index].id      
         },
         changComboid(value){//改变选项的时候,
               this.productData=[]
              var parm ={
                     id:value
                    }
            itemgetIdList(parm,this.mysession).then(res=>{
                  console.log("商品类别")
                  console.log(res)
                  if(res.data.code==1001){
                      this.productData=res.data.data
                  }
            }) 
         },
         pageIndexChange(index){//翻页的
                   this.pageNo=index
                   this.getprofitSharinglist()
         },


    },
    mounted(){
            this.mysession = sessionStorage.getItem("sesstion");
            this.getprofitSharinglist()

    },
}
</script>
<style lang="scss" scoped>
     .setComission{

      }

</style>
