 <template>
    <el-row class="roleManagement">
        <el-col :span='24'>
            <div class="CurrentPage">权限管理
                <i class="el-icon-arrow-right"></i>角色管理</div>
        </el-col>
        <el-col :span="24" class="permission">
            <el-col :span="4" class="personnel">
                <div style="text-align:center;margin-top:15px; margin-bottom:40px">
                    <el-button icon='el-icon-plus' type="primary" size="small" @click="Addrolepopout">新增角色</el-button>
                </div>

                <el-radio-group v-model="Selectradio" style="width:100%" @change="lookover">
                    <div class="rolestyle" v-for='(item,index) in RoleData' :key="item.id">
                        <el-radio :label="item.id" style="width:150px;text-align:left ">{{item.name}}</el-radio>
                        <!-- <el-button type="primary" size="mini" @click="roledit(index,item.id)"  >编辑</el-button> -->
                        <i class='my-icon edit' @click="roledit(index,item.id)"></i>
                    </div>
                </el-radio-group>
            </el-col>
            <el-col :span="20" class="personnel">
                <div style="padding-left:80px">
                    <el-checkbox-group v-model="arrygroup">
                        <template v-for="item in MenuList">

                            <div :key="item.url" style="display:inline-block;width:30%">
                                <el-checkbox v-model="item.selected" :label="item.id" v-if="item.childmenu.length == 0" class="onelevel">
                                    <span style="font-size:20px;font-weight:900;display:inline-block; margin: 20px 0 ">{{item.name}}</span>
                                </el-checkbox>
                            </div>
                            <div :key="item.sortnum" v-if="item.childmenu.length !==0">
                                <el-checkbox v-model="item.selected" :label="item.id">
                                    <span style="font-size:20px;font-weight:900;display:inline-block; margin: 20px 0 ">
                                        {{item.name}}
                                    </span>
                                </el-checkbox>
                            </div>
                            <div :key="item.name" v-if="item.childmenu.length !==0">
                                <el-checkbox v-for="item in item.childmenu" :label="item.id" :key="item.name" v-model="item.selected">{{item.name}}</el-checkbox>
                            </div>
                        </template>
                    </el-checkbox-group>
                </div>
                <div style="float:right; margin:40px">
                    <el-button type="primary" @click="submitdata"> 提交 </el-button>
                </div>
            </el-col>
        </el-col>
        <el-dialog title="增加角色" :visible.sync="RoledialogVisible" width="30%">
            <el-form :model="RoleValidateForm" ref="RoleValidateForm" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="name" label="角色命名" :rules="[
                            {required:true, message:'不能为空'},
                            ]">
                    <el-input v-model="RoleValidateForm.name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <textarea v-model="RoleValidateForm.roleDesc" placeholder="非必填写" cols="30" rows="10"></textarea>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="Addrole">确 定</el-button>
            </span>
        </el-dialog>

    </el-row>
</template>
 <script>
import {
  rolegetList,
  roleadd,
  roleupdate,
  getSelectMenu,
  addrolemenulist
} from "@/api/api";
import qs from "qs";
export default {
  data() {
    return {
      arrygroup: [],
      selectedData: [],
      RoleData: [], //角色数组
      Selectradio: "",
      mysession: "",
      checked: [],
      RoledialogVisible: false,
      RoleValidateForm: {
        name: "",
        roleDesc: ""
      },
      Roleeditid: "", //编辑时候的id
      RoleisAdd: true,
      lookoverID: "",
      MenuList: []
    };
  },
  methods: {
    GetgetSelectMenu() {
      //获取右边的
      var parms = {
        roleId: this.lookoverID
      };
      getSelectMenu(qs.stringify(parms), this.mysession).then(res => {
        console.log("quanxianjiao");
        console.log(res);
        if (res.data.code == 1001) {
          this.MenuList = res.data.data;
          for (var i = 0; i < this.MenuList.length; i++) {
            if (this.MenuList[i].selected == true) {
              this.arrygroup.push(this.MenuList[i].id);
            }
            for (var k = 0; k < this.MenuList[i].childmenu.length; k++) {
              if (this.MenuList[i].childmenu[k].selected == true) {
                this.arrygroup.push(this.MenuList[i].childmenu[k].id);
              }
            }
          }
        }
        console.log(this.arrygroup);
      });
    },
    lookover(value) {
      this.arrygroup = [];
      console.log(value);
      this.lookoverID = value;
      this.GetgetSelectMenu();
    },
    submitdata() {
      //提交数据
      console.log("----------");
      console.log(this.arrygroup);
      var parms = {
        roleId: this.lookoverID,
        menuId: this.arrygroup
      };
      addrolemenulist(parms, this.mysession).then(res => {
        console.log(res);
        if (res.data.code == 1001) {
          this.$message({
            type: "success",
            message: "授权成功"
          });
        }
      });
    },

    getrollist() {
      rolegetList(this.mysession).then(res => {
        console.log("tijiaode");
        console.log(res);
        console.log(this.mysession);
        if (res.data.code == 1001) {
          this.RoleData = res.data.data;
        }
      });
    },
    Addrolepopout() {
      //增加弹框
      this.RoledialogVisible = true;
      this.RoleisAdd = true;
    },
    roledit(index, edit) {
      //编辑角色
      this.RoledialogVisible = true;
      this.RoleisAdd = false;
      this.RoleValidateForm.roleDesc = this.RoleData[index].roleDesc;
      this.RoleValidateForm.name = this.RoleData[index].name;
      this.Roleeditid = this.RoleData[index].id;
    },
    Addrole() {
      //增加角色
      var parm = this.RoleValidateForm;
      if (this.RoleisAdd) {
        this.$refs["RoleValidateForm"].validate(valid => {
          if (valid) {
            roleadd(qs.stringify(parm), this.mysession).then(res => {
              console.log(res);
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.RoledialogVisible = false;
                this.$refs["RoleValidateForm"].resetFields();
                this.getrollist();
              }
            });
          }
        });
      } else {
        parm.id = this.Roleeditid;
        this.$refs["RoleValidateForm"].validate(valid => {
          if (valid) {
            roleupdate(qs.stringify(parm), this.mysession).then(res => {
              console.log(res);
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "编辑成功"
                });
                this.RoledialogVisible = false;
                this.$refs["RoleValidateForm"].resetFields();
                this.getrollist();
              }
            });
          }
        });
      }
    }
  },
  mounted() {
    this.mysession = sessionStorage.getItem("sesstion");
    this.getrollist();
    this.GetgetSelectMenu();
  }
};
</script>
 <style lang="scss"  scoped>
.roleManagement {
  height: 100%;
  .permission {
    .personnel {
      height: 100%;
      border: 1px solid #dcdfe6;
      overflow-y: auto;
      .rolestyle {
        height: 40px;
        width: 100%;
        border-bottom: 1px solid #d7d7d7;
        text-align: center;
        line-height: 50px;
      }
    }
  }
  .onelevel {
    .el-checkbox__label {
      font-size: 30px;
    }
  }
}
</style>
 