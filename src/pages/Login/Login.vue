<template>

  <el-row class='loginConteiner loginpng' style="height:100%">

      <el-col :span="24" style="border:1px solid ">
             <div class="iconleft">
                 <div class="yuexiicon"></div>
                 <div class="smartfight"><span class="motherfontsize">母婴智能</span><span class="motherfontsize">移动互联新生态</span></div>
             </div>
      </el-col>
       <el-col :span="24">
      <el-form :model="LoginForm" :rules="rules" ref='loginForm'   class='Fromstyle' >
           <div style="margin-top:100px">
              <el-form-item  prop='name' :error='showError'   style="width:420px;display:inline-block;" >
                    <div>
                    <div class="usericon"></div>
                    <el-input v-model='LoginForm.name'   @change='showError = null'  placeholder="用户名" ></el-input>
                    </div>
                </el-form-item>
                <el-form-item  prop='pass' :error='showError'  style="display:inline-block;width:420px" >
                    <div>
                      <div class="passicon"></div>
                      <el-input v-model='LoginForm.pass' @change='showError = null'  class="contentpadding"   type="password"   @keyup.enter.native="submitForm()"  placeholder="密码"   ></el-input>
                   </div>
                </el-form-item>
                <el-form-item>
                    <el-button    @click='submitForm' style="width:420px;height:48px; background:#1b222c;color:#fff;margin-top:20px;font-size:18px"> 登录</el-button>
                </el-form-item>
           </div>

      </el-form>
      </el-col>
       <!--  <VueUEditor > </VueUEditor >  -->
  </el-row>
        <!--  <VueUEditor > </VueUEditor > -->


</template>
<script>
/*   import VueUEditor from 'vue-ueditor'   */
import { businessmanLogin } from '@/api/api'
import qs from 'qs';
export default {
  data () {
      return {
          LoginForm: {
              name: '',
              pass: ''
          },
          showError:null,
      }
  },
  computed: {
      rules () {
          return {
              name: [
                  { required: true, message: '请输入用户名', trigger: 'blur'}
              ],
              pass: [
                  { required: true, message: '请输入密码', trigger: 'blur' }
              ]
          }
      },
  },
/*   components:{
             VueUEditor
      },  */
  methods: {
     submitForm () {
             var parms={
                     accounts:this.LoginForm.name,
                     passwd:this.LoginForm.pass
                 }
             //  this.$router.push('/demo')
          this.$refs['loginForm'].validate((valid) => {
              if(valid) {
                  let user = { name: this.LoginForm.name }
                businessmanLogin(qs.stringify(parms)).then(res=>{
                           //   console.log(res)
                           //   console.log(parms)
                            console.log(res)
                               if(res.code=="1001"){
                                   // console.log(res.data)
                                    sessionStorage.setItem('sesstion',res.data.sessionId)
                                    sessionStorage.setItem('user', JSON.stringify(user))
                                    sessionStorage.setItem("cityId",res.data.cityId)//存城市id然后添加的时候直接找区
                                    sessionStorage.setItem("roleName",res.data.roleName)
                                      /* this.$router.push('/MemberList')  */
                                    if(res.data.type==2){
                                         this.$router.push('/Homeage')
                                    }else if(res.data.type==1){
                                        this.$router.push('/yuezilogin')
                                    }
                               }else{
                                     this.showError='用户名或密码错误'
                               }
                  })
              }
          })

      },
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
        .loginpng{
               background: url(../../assets/img/login.jpg) no-repeat;
               background-size: cover;
               .iconleft{
                        display: inline-block;
                        margin: 0 auto;
                        width: 570px;
                        height: 420px;
                        position: absolute;
                        left:13%;
                        top: 50%;
                        margin-top: -180px;
               }
               .smartfight{
                   font-size: 38px;
                   color: #fff;
                   font-family: "Microsoft YaHei";
                   text-align: center;
               }
               .motherfontsize{
                   display: inline-block;
                   margin: 20px;
               }
               .yuexiicon{
                   height: 120px;
                   background: url(../../assets/img/loginicon.png) no-repeat 80px 0px;
                   z-index: 9;
                   margin-top: 60px;
               }

            .Fromstyle{
                        margin: 0 auto;
                        width: 570px;
                        height: 420px;
                        position: absolute;
                        border:1px solid #f2f2f2;
                        left: 50%;
                        top: 50%;
                        text-align: center; /*IE*/
                        margin-top: -180px;
                        background: #fff;
                        border-radius: 5px;
                        box-shadow: 5px 5px 5px #0a0000;
                    .projectname{
                            text-align: center;
                            height: 60px;
                            line-height: 60px;
                            font-size: 20px;
                            color: #fff;
                        }
                       .usericon{
                            width: 55px;
                            height: 48px;
                            border-bottom: 0px;
                            border-top:0px;
                            border-right: 1px solid #d8dce5;
                            background: url(../../assets/img/userico.png) no-repeat 14px 10px;
                            position: absolute;
                            z-index: 9;
                         }
                      .passicon{
                            width: 55px;
                            height: 48px;
                            border-bottom: 0px;
                            border-top:0px;
                            border-right: 1px solid #d8dce5;
                            background: url(../../assets/img/passico.png) no-repeat 14px 10px;
                            position: absolute;
                            z-index: 9;
                      }


                    }

             }
</style>

<style type="text/css">
          .Fromstyle  .el-input__inner {
                     padding-left: 68px;
                     height: 48px;
                     font-size: 18px;
             }
</style>




