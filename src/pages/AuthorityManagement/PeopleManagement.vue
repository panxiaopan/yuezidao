 <template>
    <el-row class="Personnel">
        <el-col :span='24'>
            <div class="CurrentPage">权限管理
                <i class="el-icon-arrow-right"></i>人员权限管理</div>
        </el-col>
        <el-col :span="24">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <!--   <el-input v-model="role" placeholder="角色"></el-input> -->
                    <el-select v-model="role" placeholder="选择角色" style="width:200px">
                        <el-option v-for="item in RoleData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="Status" placeholder="状态">
                        <el-option label="冻结" value="1"></el-option>
                        <el-option label="正常" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <button class='search-btn' @click="Secshpeople">
                        <i class='search-btn-icon' ></i>
                    </button>
                </el-form-item>
                <div style="float:right">
                    <el-form-item>
                        <el-form-item>
                            <el-button icon='el-icon-plus' type="primary" size="small" @click="PersonnelAdd">新增</el-button>
                        </el-form-item>
                    </el-form-item>
                </div>
            </el-form>
            <el-col :span="24">
                <el-table :data="PeopletableData" stripe border style="width: 100%">
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="phone" label="联系方式" width="180">
                    </el-table-column>
                    <el-table-column prop="accounts" label="登录账号">
                    </el-table-column>
                    <el-table-column prop="roleName" label="角色">
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span v-if="PeopletableData[scope.$index].userStatus==0">启用</span>
                            <span v-else>冻结</span>

                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="350px">
                        <template slot-scope="scope">
                            <!-- <el-button size="mini" type="primary" @click="AlterState(scope.$index, scope.row)">
                                {{PeopletableData[scope.$index].userStatus==1 ? '启用' : '冻结'}}

                            </el-button> -->

                            <!-- <el-button size="mini" type="primary" @click="peoplehandleEdit(scope.$index, scope.row)">编辑</el-button> -->
                            <!-- <el-button size="mini" type="danger" @click="peoplehandleDelete(scope.$index, scope.row)">删除</el-button> -->
                            <i class='my-icon ' @click="AlterState(scope.$index, scope.row)" :class="PeopletableData[scope.$index].userStatus==1 ? 'kaisuo' : 'dongjie'" ></i>
                            <i class='my-icon edit' @click="peoplehandleEdit(scope.$index, scope.row)" ></i>
                            <i class='my-icon delete' @click="peoplehandleDelete(scope.$index, scope.row)" ></i>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="myPagination">
                    <el-pagination layout="prev, pager, next,  total" :total="totalNumber" :page-size='pageSize' @current-change='pageIndexChange'>
                    </el-pagination>
                </div>
            </el-col>
            <el-col :span="24">
                <el-dialog title="新增" :visible.sync="PeopledialogVisible" width="22%">
                    <el-form :inline="true" :model="StaffformInline" :rules="rules" ref="StaffformInline" class="demo-form-inline" label-width="100px">
                        <el-form-item label="真实姓名" prop="name">
                            <el-input v-model="StaffformInline.name" placeholder="真实姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="分配角色" prop="roleId">
                            <el-select v-model="StaffformInline.roleId" placeholder="选择角色" style="width:200px">
                                <el-option v-for="item in RoleData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="StaffformInline.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="登录账号" prop="accounts">
                            <el-input v-model="StaffformInline.accounts"></el-input>
                        </el-form-item>
                        <!--                          <el-form-item label="登录密码" prop="passwd">
                             <el-input   type="password"  v-model="StaffformInline.passwd" ></el-input>
                        </el-form-item>     -->
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" size="small" @click="Ensure">确 定</el-button>
                    </span>
                </el-dialog>
            </el-col>
        </el-col>
    </el-row>
</template>
 <script>
import {
  rolegetList,
  adminUseradd,
  adminUsergetList,
  adminUserupdate,
  adminUserdel
} from "@/api/api";
import qs from "qs";
export default {
  data() {
    return {
      peopleisadd: true,
      EditID: "",
      pageNo: 1,
      pageSize: 10,
      totalNumber: null,
      PeopletableData: [],
      mysession: "",
      name: "",
      role: "",
      Status: "",
      PeopledialogVisible: false,
      StaffformInline: {
        name: "",
        roleId: "",
        phone: "",
        accounts: "",
        passwd: ""
      },
      RoleData: [],
      rules: {
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { pattern: /^1[34578]\d{9}$/, message: "您的手机号码输入错误" }
        ],
        accounts: [
          { required: true, message: "输入账号", trigger: "blur" },
          { pattern: /^[a-zA-Z0-9_]{0,}$/, message: "不能输入中文" }
        ]
        /*                    passwd:[
                       {required: true, message: '输入密码', trigger: 'blur'}
                   ] */
      }
    };
  },
  methods: {
    PersonnelAdd() {
      //新增
      this.PeopledialogVisible = true;
      this.peopleisadd = true;
    },
    getrollist() {
      //下拉选择的

      rolegetList(this.mysession).then(res => {
        console.log(res);
        if (res.data.code == 1001) {
          this.RoleData = res.data.data;
        }
      });
    },
    AlterState(index) {
      //修改状态
      var parms = {
        id: this.PeopletableData[index].id,
        userStatus: this.PeopletableData[index].userStatus == 1 ? "0" : "1"
      };
      console.log(parms);
      adminUserupdate(qs.stringify(parms), this.mysession).then(res => {
        console.log("冻结");
        console.log(res);
        if (res.data.code == 1001) {
          this.getadminUsergetList();
        }
      });
    },
    getadminUsergetList() {
      var parms = {
        name: this.name,
        roleId: this.role,
        userStatus: this.Status,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      adminUsergetList(qs.stringify(parms), this.mysession).then(res => {
        console.log("----权限列表5858-----");

        console.log(res);
        if (res.data.code == 1001) {
          this.PeopletableData = res.data.data.items;
          this.totalNumber = res.data.data.totalNum;
        }
      });
    },
    pageIndexChange(index) {
      this.pageNo = index;
      console.log("=====");
      console.log(index);
      this.getadminUsergetList();
    },

    peoplehandleEdit(index) {
      //bianji
      this.peopleisadd = false;
      this.PeopledialogVisible = true;
      console.log(this.PeopletableData[index]);
      this.StaffformInline.name = this.PeopletableData[index].name;
      this.StaffformInline.accounts = this.PeopletableData[index].accounts;
      this.StaffformInline.phone = this.PeopletableData[index].phone;
      this.StaffformInline.roleId = this.PeopletableData[index].roleId;
      this.EditID = this.PeopletableData[index].id;
    },
    Secshpeople() {
      this.getadminUsergetList();
    },
    peoplehandleDelete(index) {
      //删除
      var parms = {
        id: this.PeopletableData[index].id
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          adminUserdel(qs.stringify(parms), this.mysession).then(res => {
            if (res.data.code == 1001) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getadminUsergetList();
            }
          });
        })
        .catch(() => {
          /*                         this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });   */
        });
    },
    Ensure() {
      //点击确定发送
      var parms = {
        name: this.StaffformInline.name,
        accounts: this.StaffformInline.accounts,
        phone: this.StaffformInline.phone,
        roleId: Number(this.StaffformInline.roleId)
      };
      if (this.peopleisadd) {
        this.$refs["StaffformInline"].validate(valid => {
          if (valid) {
            adminUseradd(qs.stringify(parms), this.mysession).then(res => {
              console.log(parms);
              console.log(res);
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.$refs["StaffformInline"].resetFields();
                this.PeopledialogVisible = false;
              }
            });
          }
        });
      } else {
        parms.id = this.EditID;
        this.$refs["StaffformInline"].validate(valid => {
          if (valid) {
            adminUserupdate(qs.stringify(parms), this.mysession).then(res => {
              console.log("编辑");
              console.log(res);
              if (res.data.code == 1001) {
                this.$message({
                  type: "success",
                  message: "编辑成功"
                });
                this.$refs["StaffformInline"].resetFields();
                this.PeopledialogVisible = false;
                this.getadminUsergetList();
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
    this.getadminUsergetList();
  }
};
</script>
 <style lang="scss"  scoped>
.Personnel {
}
</style>
 
 