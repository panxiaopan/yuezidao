<template>
    <el-container>
        <el-header>
            <i class="header_log"></i>
            <!--    <div style="display:inline-block;float:right;padding-right:30px"><el-button type="primary" size="small" @click="Logout">退出</el-button></div> -->
            <div class="headertopicon">
                <div class="headerlocation">
                    <span class="username">您好 ! {{this.Username}}</span>
                    <i class="top_icon   changepassword" @click="ChangePassword"></i>
                    <i class="top_icon  exit" @click="Logout"></i>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu background-color='#1c222c' :default-active='$route.path' text-color='#FFF' :unique-opened="true" active-text-color="#12d3dd" router>
                    <template v-for="(item,index) in routerurl">
                        <el-menu-item :key="item.url" :index="item.url" v-if="item.childmenu.length==0">
                            <template slot='title'>
                                <!--  <i class="icon-el business_icon"></i>  -->
                                <i class='menu-icon' :class="item.image" style="margin-right:5px;"></i>
                                <!--  <img src="../assets/img/ICON_04fwgl_icon.png" alt="">  -->
                                <span class="stairfont">{{item.name}}</span>
                            </template>
                        </el-menu-item>
                        <el-submenu :key="index" :index='String(index)' v-if="item.childmenu.length !==0">
                            <template slot='title'>
                                <i class='menu-icon' :class="item.image" style="margin-right:5px;"></i>
                                <span class="stairfont">{{item.name}}</span>
                            </template>
                            <el-menu-item :key="item.id" :index='item.url' v-for="item in item.childmenu">
                                {{item.name}}
                            </el-menu-item>
                        </el-submenu>
                    </template>

                    <!--               <el-menu-item index="/Homeage">
                          <template slot='title'>
                                <i class="icon-el business_icon"></i>
                                <span class="stairfont">商家首页</span>
                            </template>
                   </el-menu-item> 
                   <el-menu-item index="/yuezilogin">
                          <template slot='title'>
                                <i class="icon-el business_icon"></i>
                                <span class="stairfont">月子岛首页</span>
                            </template>
                   </el-menu-item> 
                   <el-submenu index='1' >
                        <template slot='title'>
                            <i class="icon-el business_icon"></i>
                            <span class="stairfont">商家管理</span>
                        </template>
                        <el-menu-item index='/MemberList' >
                           商家列表
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot='title'>
                            <i class="icon-el business_icon"></i>
                            <span class="stairfont">商品管理</span>
                        </template>
                        <el-menu-item index="/LiliPackage">
                             月子套餐列表
                        </el-menu-item>  
                       <el-menu-item index="/MerchandiseControllist">
                             商品预约管理
                        </el-menu-item>  
                       <el-menu-item index="/Custody">
                             远程智能管理
                        </el-menu-item>  
                        <el-menu-item index="/ClodList">
                             云课堂列表
                        </el-menu-item>                         
                         <el-menu-item index="/Technocracy">
                             专家管理
                        </el-menu-item>    
                    </el-submenu>
                    <el-submenu index="3">
                         <template slot='title'>
                            <i class="icon-el business_icon"></i>
                            <span class="stairfont">用户管理</span>
                         </template>
                         <el-menu-item  index="/OnManagetPreson">
                               服务人员管理
                         </el-menu-item>
                         <el-menu-item   index="/UserList">
                              用户列表
                         </el-menu-item>
                         <el-menu-item   index="/PhotoManage">
                              用户相册管理
                         </el-menu-item>
                          <el-menu-item   index="/dataMonitor">
                              用户数据监测
                         </el-menu-item>                        
                    </el-submenu>
                     <el-submenu index="4">
                        <template slot='title'>
                            <i class="icon-el business_icon"></i>
                            <span class="stairfont">页面编辑管理 </span>
                         </template>
                            <el-menu-item index="/PageEditManagement">
                                   主页面
                            </el-menu-item>
                            <el-menu-item index="/PagePackage">
                                   页面套餐编辑
                             </el-menu-item>
                     </el-submenu>
                      <el-submenu index="5">
                         <template slot='title'>
                            <i class="icon-el business_icon"></i>
                            <span class="stairfont">数据统计</span>
                         </template>
                         <el-menu-item index="/UserData" >
                              用户数据
                         </el-menu-item>
                         <el-menu-item index="/OrderData">
                             订单数据
                         </el-menu-item>
                    </el-submenu> 
                     <el-submenu index="6">
                         <template slot='title'>
                            <i class="icon-el business_icon"></i>
                            <span class="stairfont">结算管理</span>
                         </template>
                         <el-menu-item index="/OrderDatabase" >
                             订单结算列表
                         </el-menu-item>
                         <el-menu-item index="/BondeRefund">
                           押金退还列表
                         </el-menu-item>
                         <el-menu-item index="/CommissionSet">
                              提成结算列表
                         </el-menu-item>
                         <el-menu-item  index="/Commission">
                              上门提成设置
                         </el-menu-item>
                    </el-submenu>                
                  <el-submenu index="7">
                        <template slot='title'>
                            <i class="icon-el business_icon"></i>
                            <span class="stairfont">消息管理 </span>
                         </template>
                            <el-menu-item index="/Feedback">
                                     问题反馈
                            </el-menu-item>
                            <el-menu-item index="/MessageConsulting">
                                      留言咨询
                            </el-menu-item>
                    </el-submenu>   -->
                    <!--    <el-menu-item index="/ActiveList">
                          <template slot='title'>
                                <i class="icon-el business_icon"></i>
                                <span class="stairfont">活动管理</span>
                            </template>
                   </el-menu-item>
                   <el-menu-item index="/VipOrder">
                           <template slot='title'>
                                <i class="icon-el business_icon"></i>
                                <span class="stairfont">VIP专订</span>
                            </template>
                   </el-menu-item>
                   <el-menu-item index="/CallCenter">
                          <template slot='title'>
                                <i class="icon-el business_icon"></i>
                                <span class="stairfont">系统设置</span>
                            </template>
                   </el-menu-item>                 
                 <el-submenu index="9">
                        <template slot='title'>
                            <i class="icon-el business_icon"></i>
                            <span class="stairfont">权限设置</span>
                         </template>
                            <el-menu-item index="/PeopleManagement">
                                     人员角色分配
                            </el-menu-item>
                            <el-menu-item index="/CharacterManagement">
                                     角色权限分配
                            </el-menu-item>
                    </el-submenu> 
                     <el-submenu index="10">
                        <template slot='title'>
                            <i class="icon-el business_icon"></i>
                            <span class="stairfont">Ai智能</span>
                         </template>
                           <el-menu-item  index="/RuleList">
                                  健康规则列表
                           </el-menu-item>
                           <el-menu-item  index="/ProductionList">
                                 产康规则列表
                           </el-menu-item>
                             <el-menu-item  index="/PostpartumMood">
                                产后情绪列表
                           </el-menu-item>  
                              <el-menu-item  index="/PushRules">
                                产后推送规则
                            </el-menu-item>                              
                            <el-menu-item  index="/Article">
                                异常文章推送管理
                            </el-menu-item>
                       </el-submenu>    
                     <el-submenu index="11">
                        <template slot='title'>
                            <i class="icon-el business_icon"></i>
                            <span class="stairfont">实用工具</span>
                         </template>
                           <el-menu-item index="/ChildrenSong">
                                  儿歌列表
                           </el-menu-item>
                           <el-menu-item index="/Assistedfood">
                                  辅食列表
                           </el-menu-item>
                       </el-submenu> 
                     <el-submenu index="12">
                        <template slot='title'>
                            <i class="icon-el business_icon"></i>
                            <span class="stairfont">营销管理</span>
                         </template>
                           <el-menu-item index="/IntegralList">
                                  积分进出列表
                           </el-menu-item>
                           <el-menu-item index="/Listofrules">
                                  积分规则列表
                           </el-menu-item>

                           <el-menu-item index="/IntegrationRule">
                                  积分规则
                           </el-menu-item> 
                       </el-submenu> 
                    <el-submenu index="13">
                       <template slot='title'>
                            <i class="icon-el business_icon"></i>
                            <span class="stairfont">订单管理</span>
                         </template>
                         <el-menu-item index="/RemoteListorder">
                             远程智能监护
                         </el-menu-item>
                         <el-menu-item index="/postpartummealOrder">
                            月子餐
                         </el-menu-item>
                         <el-menu-item index="/VisitingService">
                            上门服务
                         </el-menu-item>
                         <el-menu-item index="/ToStoreService">
                           到店服务
                         </el-menu-item>
                         <el-menu-item index="/CloudListorder">
                           云课堂
                         </el-menu-item>
                         <el-menu-item index="/OrderRefund">
                           订单退款
                         </el-menu-item>                     
                     </el-submenu> -->
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-dialog :visible.sync="passworddialogVisible" width="30%">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="旧密码" prop="oldpass">
                        <el-input type="password" v-model="ruleForm2.oldpass"></el-input>
                    </el-form-item>

                    <el-form-item label="新密码" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click="submitForm('ruleForm2')">确 定</el-button>
                </span>
            </el-dialog>
        </el-container>
        <!--  <el-footer>Copyrights @2018 All Rights Reserved  技术支持：深圳市月子岛科技有限公司</el-footer> -->
    </el-container>

</template>
<script>
import { getMenuList, businessmanUpdatePasswd, loginOut } from "@/api/api";
import qs from "qs";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    /*        var validateoldPass = (rule, value, callback) =>{
           if(value === ''){
                callback(new Error('请输入密码'));
           }
             callback();
       } */

    return {
      imageurl: "",
      // imaiconurl:require(imageurl),
      Username: "", //用户名
      mysession: "",
      passworddialogVisible: false,
      routerurl: [],
      ruleForm2: {
        pass: "",
        checkPass: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldpass: [{ required: true, message: "输入旧密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    Logout() {
      this.$confirm("确定退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        loginOut(this.mysession).then(res => {});
        this.$router.push("/login");
      });
    },
    getMenlistme() {
      console.log(this.mysession);
      getMenuList(this.mysession).then(res => {
        console.log("=菜单栏==");
        console.log(res);
        if (res.data.code == 1001) {
          this.routerurl = res.data.data;
        }
      });
    },
    submitForm() {
      //提交
      console.log("123321");
      var parms = {
        oldPasswd: this.ruleForm2.oldpass,
        newPasswd: this.ruleForm2.checkPass
      };
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
          businessmanUpdatePasswd(qs.stringify(parms), this.mysession).then(
            res => {
              console.log(parms);
              console.log(res);
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "修改成功重新登录"
                });
                this.$router.push("/login");
              }
            }
          );
        }
      });
    },
    ChangePassword() {
      //修改密码
      this.passworddialogVisible = true;
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.Username = user.name;
    this.getMenlistme();
  }
};
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-header {
    height: 88px !important;
    background-color: #1c222c;
    color: #333;
  }
  .el-aside {
    height: 100%;
    .el-menu {
      height: 100%;
      .el-menu-item, .el-submenu .el-submenu__title {
        .menu-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("../assets/img/iconb.png") no-repeat;
        }
        .sjsy {
          background-position: -5px -3px;
        }
        .yzdsy {
          background-position: -5px -27px;
        }
        .hsgl {
          background-position: -5px -53px;
        }
        .fwgl {
            background-position: -5px -77px;
        }
        .ddgl {
            background-position: -5px -102px;
        }
        .zym {
            background-position: -5px -128px;
        }
        .hdgl {
            background-position: -5px -152px;
        }
        .yxgl {
            background-position: -5px -179px;
        }
        .xxgl {
            background-position: -5px -202px;
        }
        .qxsz {
            background-position: -5px -227px;
        }
        .rygl {
           background-position: -5px -252px; 
        }
        .yhgl {
            background-position: -5px -280px;
        }
        .sjtj {
            background-position: -5px -304px;
        }
        .jsgl {
            background-position: -5px -328px;
        }
        .znjc {
            background-position: -5px -353px;
        }
        .xtsz {
            background-position: -5px -378px;
        }
        .vipzd {
            background-position: -5px -404px;
        }
        .sygj {
            background-position: -5px -427px;
        }
        .ykt {
            background-position: -5px -455px;
        }
        
      }
      .el-menu-item.is-active, .el-submenu.is-active .el-submenu__title {
        .menu-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("../assets/img/icon.png") no-repeat;
        }
        .sjsy {
          background-position: -5px -3px;
        }
        .yzdsy {
          background-position: -5px -27px;
        }
        .hsgl {
          background-position: -5px -53px;
        }
        .fwgl {
            background-position: -5px -77px;
        }
        .ddgl {
            background-position: -5px -102px;
        }
        .zym {
            background-position: -5px -128px;
        }
        .hdgl {
            background-position: -5px -152px;
        }
        .yxgl {
            background-position: -5px -179px;
        }
        .xxgl {
            background-position: -5px -202px;
        }
        .qxsz {
            background-position: -5px -227px;
        }
        .rygl {
           background-position: -5px -252px; 
        }
        .yhgl {
            background-position: -5px -280px;
        }
        .sjtj {
            background-position: -5px -304px;
        }
        .jsgl {
            background-position: -5px -328px;
        }
        .znjc {
            background-position: -5px -353px;
        }
        .xtsz {
            background-position: -5px -378px;
        }
        .vipzd {
            background-position: -5px -404px;
        }
        .sygj {
            background-position: -5px -427px;
        }
        .ykt {
            background-position: -5px -455px;
        }
     }
    }
  }
  .icon-el {
    display: inline-block;
    width: 30px;
    height: 30px;
  }
  .business_icon {
    background: url(../assets/img/icon_merchant.png) no-repeat 6px 8px;
  }
  .header_log {
    display: inline-block;
    height: 88px;
    width: 200px;
    background: url(../assets/img/icon_logo.png) no-repeat 0px 20px;
  }
  .stairfont {
    font-size: 16px;
  }
  .headertopicon {
    /*   display:inline-block; */
    width: 400px;
    height: 88px;
    float: right;
    .top_icon {
      display: inline-block;
      width: 40px;
      height: 40px;
    }
    .headerlocation {
      margin-top: 25px;
    }
    .username {
      display: inline-block;
      width: 180px;
      height: 40px;
      vertical-align: top;
      line-height: 40px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      overflow: hidden;
    }
    .loggicon {
      background: url(../assets/img/icon_portrait.png) no-repeat 1px 5px;
    }
    .changepassword {
      background: url(../assets/img/changePass.png) no-repeat 5px 10px;

      cursor: pointer;
    }
    .exit {
      background: url(../assets/img/ico_exit.png) no-repeat 5px 10px;

      cursor: pointer;
    }
  }
  .is-active {
    background-color: #101418 !important;
  }
}
</style>
<style>
/*     .el-menu-item{
            padding-left: 60px !important;
        } */
/*      .el-submenu .el-menu{
       padding-left: 30px;
    } */
.el-submenu .el-menu-item {
  padding-left: 65px !important;
}
</style>



