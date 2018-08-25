<template>
    <el-row>
       <el-col :span='24'>
          <div class="CurrentPage">积分管理<i class="el-icon-arrow-right"></i>积分规则 </div>
       </el-col>
        <el-col :span="24" >
            <el-form  :model="InteRuleformInline"  :inline="true"  :rules="rules" ref="InteRuleformInline"     class="demo-form-inline">
              <div class="BlogInfo">积分别名</div>
                <el-form-item label="积分别名" prop="Anothername">
                      <el-input v-model="InteRuleformInline.Anothername" ></el-input>
                </el-form-item>

                 <div class="BlogInfo">积分价值</div>
                <el-form-item label="积分数量" prop="amount">
                    <el-input v-model.number="InteRuleformInline.amount" placeholder="积分数量"></el-input>
                </el-form-item>
                <el-form-item label="相当于" prop="money">
                    <el-input v-model.number="InteRuleformInline.money" placeholder="可抵用钱"></el-input>
                </el-form-item>
                <div class="BlogInfo">积分分配</div>
                <el-form-item label="注册积分" prop="">
                    <el-input v-model.number="InteRuleformInline.registerNum" placeholder="积分数量"></el-input>
                </el-form-item>
<!--                 <div class="BlogInfo">积分兑换商品的类型</div>
                 <el-form-item prop="checkedCities" >
                     <el-checkbox-group v-model="InteRuleformInline.checkedCities" @change="handleChange">
                               <el-checkbox v-for="item in checkedType" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                 </el-form-item> -->
             </el-form>
              <div  style="text-align: center">
                  <el-button type="primary" @click="submitdata" >
                       提交
                  </el-button>
              </div>
         </el-col>
    </el-row>
</template>
<script>
import {integrationRuleadd,integrationRulelist} from '@/api/api'
import qs from 'qs'
export default {
    data(){
        return{
             mysession:'',

             InteRuleformInline:{
                   amount:'',
                   money:'' ,
                   Anothername:'',
                   registerNum: ''
            },
             rules:{
                   amount:[
                        { required: true, message: '输入兑换积分', trigger: 'blur' },
                        { type: 'number', required: true, message: '请输入数字', trigger: 'blur' }
                   ],
                   money:[
                        { required: true, message: '输入可抵用的钱数', trigger: 'blur' },
                        { type: 'number', required: true, message: '请输入数字', trigger: 'blur' }
                   ],
/*                    checkedCities:[
                        { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
                   ], */
             }



        }
    },
    methods:{
            submitdata(){//发送
                var parms={
                      integration:this.InteRuleformInline.amount,
                      amount:this.InteRuleformInline.money,
                      name:this.InteRuleformInline.Anothername
                }
                this.$refs['InteRuleformInline'].validate((valid)=>{
                      if(valid){
                           integrationRuleadd(qs.stringify(parms),this.mysession).then(res=>{
                               console.log(parms)
                               console.log(res)
                               if(res.data.code==1001){
                                      this.$message({
                                           type:'success',
                                           message:"添加成功"
                                      })
                                    //window.location.reload()
                               }

                           })
                      }
                })
            },
            getintegrationRulelist(){
                integrationRulelist(this.mysession).then(res=>{
                        console.log(this.mysession)
                        console.log("liebiao=======")
                        /* console.log() */
                         console.log(res)
                         if(res.data.code==1001){
                              this.InteRuleformInline.amount=res.data.data.items[0].integration
                              this.InteRuleformInline.money=res.data.data.items[0].amount
                              this.InteRuleformInline.Anothername=res.data.data.items[0].name

                         }
                    // console.log(this.InteRuleformInline.checkedCities)
                  //  this.InteRuleformInline.checkedCities=['1','2']
                })
            }


    },
    mounted(){
          this.mysession = sessionStorage.getItem("sesstion");
          this.getintegrationRulelist()
    }
}
</script>

