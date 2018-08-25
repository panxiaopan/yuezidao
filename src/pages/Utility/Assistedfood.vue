<template>
      <el-row>
       <el-col :span='24'>
           <div class="CurrentPage">实用工具<i class="el-icon-arrow-right"></i>辅食列表</div>
        </el-col>
        <el-col :span="24">
                <el-form :inline="true" :model="FoodformInline">
                      <el-form-item>
                        <el-input v-model="FoodformInline.name" placeholder="辅食名称">
                        </el-input>
                      </el-form-item>
                      <el-form-item>
                          <!--<el-button type="primary" size="small" @click="Seach"  >查询</el-button>-->
                        <button class='search-btn' @click="Seach">
                          <i class='search-btn-icon'></i>
                        </button>
                      </el-form-item>
                      <div style="float:right">
                        <el-form-item>
                              <el-button type="primary" size="small" @click="AddAssist"    >
                                  新增
                              </el-button>
                        </el-form-item>
                     </div>
                </el-form>
                     <el-table
                        border
                        :data="AssitetableData"
                        style="width: 100%">
                        <el-table-column
                            type="index"
                            label="序号"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="辅食名称"
                            width="280">
                        </el-table-column>
                        <el-table-column
                            prop="stage"
                            label="适龄阶段(单位/月)"
                            width="180">
                        </el-table-column>
                        <el-table-column label="商品主图">
                             <template slot-scope="scope">
                                <img  style="width:50px;height:50px"  :src="`${baseUrl}/common/fileOut?url=${AssitetableData[scope.$index].picUrl}`" >
                           </template>
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="创建时间">
                        <template slot-scope="scope">
                             {{timeFormattershowsecod(AssitetableData[scope.$index].createTime)}}
                        </template>
                        </el-table-column>
                        <el-table-column label="操作">
                        <template slot-scope="scope">
                            <i class='my-icon edit' @click="AssistedEdit(scope.$index, scope.row)" ></i>
                            <i class='my-icon delete' @click="AssistedDelete(scope.$index, scope.row)" ></i>
                        </template>
                        </el-table-column>
                 </el-table>
                 <div class="myPagination">
                        <el-pagination
                             background
                            layout="prev, pager, next,  total"
                            :total="totalNumber"
                            :page-size='pageSize'
                            @current-change='pageIndexChange'>
                        </el-pagination>
                </div>
        </el-col>
      </el-row>
</template>
<script>
      import {timeFormattershowsecod,} from '@/assets/js/common'
       import {auxiliaryFoodsearch,auxiliaryFoodarticledel} from '@/api/api'
       import {baseUrl} from '../../../static/baseUrl'
        import qs from 'qs'
export default {

    data(){
        return{
            timeFormattershowsecod,
            baseUrl,
            totalNumber:null,
            pageNo:1,
            pageSize:10,
             mysession:'',
             FoodformInline:{
                 name:''
             },
             AssisistisAdd:true,
             AssitetableData:[],
        }
    },
    methods:{
         AddAssist(){//点击新增
                this.AssisistisAdd=true
                this.$router.push({name:"AssistedfoodAdd",params:{AssisistisAdd:this.AssisistisAdd}})
         },
        getauxiliaryFoodsearch(){//得到列表
                  var  parms={
                       name:this.FoodformInline.name,
                      pageNo:this.pageNo,
                      pageSize:this.pageSize,
                  }
            auxiliaryFoodsearch(parms,this.mysession).then(res=>{
                        console.log("列表")
                         console.log(res)
                         if(res.data.code==1001){
                                this.AssitetableData=res.data.data.items
                                this.totalNumber=res.data.data.totalNum
                        }
            })

        },
        AssistedEdit(index){//编辑
              this.AssisistisAdd=false
              this.$router.push({name:"AssistedfoodAdd",params:{AssisistisAdd:this.AssisistisAdd,edidcontent:this.AssitetableData[index]}})
        },
        AssistedDelete(index){
               var  parms ={
                    idx: this.AssitetableData[index].idx
               }
              auxiliaryFoodarticledel(qs.stringify(parms),this.mysession).then(res=>{
                           console.log(res)
                           if(res.data.code==1001){
                                this.getauxiliaryFoodsearch()
                           }
              })

        },
        Seach(){
           this.getauxiliaryFoodsearch()
        },
        pageIndexChange(index){
               this.pageNo=index
               this.getauxiliaryFoodsearch()
        },
    },
    mounted(){
           this.mysession = sessionStorage.getItem("sesstion");
           this.getauxiliaryFoodsearch()



    }
}
</script>

