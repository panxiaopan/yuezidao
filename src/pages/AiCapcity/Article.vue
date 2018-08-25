<template>
    <el-row class="Abnormal" >
             <el-col :span='24'>
                <div class="CurrentPage">Ai智能<i class="el-icon-arrow-right"></i>异常文章管理</div>
            </el-col>
            <el-col :span="24">
                 <el-form  :inline="true"  class="demo-form-inline">
                         <el-form-item >
                            <!-- <el-input v-model="Category"   placeholder="类别"></el-input> -->
                        <el-select v-model="category">
                             <el-option label="新生儿" value="1" ></el-option>
                             <el-option label="产妇"   value="2" ></el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item >
                            <el-input v-model="Keyword"   placeholder="关键词"></el-input>
                        </el-form-item>
                         <el-form-item>
                            <!--<el-button size="small" type="primary"  @click="SeachArticle" >查询</el-button>-->
                           <button class='search-btn' @click="SeachArticle">
                             <i class='search-btn-icon' ></i>
                           </button>
                         </el-form-item>
                         <div style="float:right">
                             <el-button type="primary" size="small"  @click="ArticleAdd" >新增 </el-button>
                         </div>
                 </el-form>
            </el-col>
            <el-col :span="24">
                    <el-table
                         border
                        :data="ArticletableData"
                         style="width: 100%">
                        <el-table-column
                            label="序号"
                            type="index"
                            width="180">
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
                        <el-table-column label="标题"  prop="title">
                        </el-table-column>
                        <el-table-column
                            prop="keyWord"
                            label="关键">
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
                         <el-table-column
                          width="200px"
                          label="操作">
                              <template slot-scope="scope">
                               <i class='my-icon edit' @click="EditAriticle(scope.$index, scope.row)" ></i>
                               <i class='my-icon delete' @click="DelAriticle(scope.$index, scope.row)" ></i>
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
    </el-row>
</template>
<script>
 import {articlegetList,articledel} from "@/api/api"
 import {baseUrl} from '../../../static/baseUrl'
 import qs from "qs"

export default {
    data(){
        return{
             baseUrl,
             category:'',//类别
             Keyword:'',//关键词
             ArticletableData:[],
             ArticleisAdd:true,
             pageNo:1,
             pageSize:10,
             mysession:"",
             totalNumber:null,
        }
    },
    methods:{
           ArticleAdd(){//增加
             this.ArticleisAdd=true
             this.$router.push({name:"AiCapcityAdd",params:{ArticleisAdd:this.ArticleisAdd}})
           },
          getarticlegetList(){
                 var parms={
                        category:this.category,
                        keyWord:this.Keyword,
                        pageNo:this.pageNo,
                        pageSize:this.pageSize
                 }
                articlegetList(parms,this.mysession).then(res=>{
                           if(res.data.code==1001){
                                console.log("异常文章")
                                 console.log(res)
                                  this.ArticletableData=res.data.data.items
                                  this.totalNumber=res.data.data.totalNum
                             }
                })
          },
          DelAriticle(index){//删除
                var parms={
                     idx:this.ArticletableData[index].idx
                }
               articledel(qs.stringify(parms),this.mysession).then(res=>{
                         console.log(res)
                          if(res.data.code==1001){
                               this.getarticlegetList()
                          }
               })
          },
          pageIndexChange(index){
                  this.pageNo=index
                  this.getarticlegetList()
          },
          SeachArticle(){//查询
               this.getarticlegetList()
          },
           EditAriticle(index){
                  this.$router.push({name:"AiCapcityAdd",params:{Aritclecontent:this.ArticletableData[index]}})
           },
    },
    mounted(){
          this.mysession = sessionStorage.getItem("sesstion");
          this.getarticlegetList()
    },
}
</script>
<style lang="scss"  scoped>
      .Abnormal{

      }
</style>

