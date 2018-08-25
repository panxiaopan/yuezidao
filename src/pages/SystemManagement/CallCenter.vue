<template>
  <el-row class="SystemManagement">
    <el-form :model="phoneForm" ref="phoneForm" :rules="rules" label-width="100px" class="phoneformclass">
      <el-row>
        <el-col :span="20">
          <el-form-item label="系统号码" prop="phone">
            <el-input v-model="phoneForm.phone" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="2">
          <div style="">
            <el-button type="primary" @click="subbutton">确定</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-row>
</template>
<script>
  import qs from 'qs'
  import {centerPhoneadd, centerPhonelist} from '@/api/api'

  export default {
    data () {
      return {
        phoneForm: {
          phone: '',
        }
      }
    },
    computed: {
      rules () {
        return {
          phone: [
            {required: true, message: '请输入公司电话', trigger: 'blur'},
            {pattern: /^(\d{3}-)(\d{8})$|^(\d{4}-)(\d{7})$|^(\d{4}-)(\d{8})$/, message: '输入正确的电话'}
          ]
        }
      }
    },

    methods: {
      subbutton () {//提交号号码
        var mysession = sessionStorage.getItem('sesstion')
        this.$refs['phoneForm'].validate((vaild) => {
          var parm = {
            phone: this.phoneForm.phone
          }
          centerPhoneadd(qs.stringify(parm), mysession).then(res => {
            console.log(res)
            if (res.data.code == 1001) {
              this.$message({
                type: 'success',
                message: '设置成功'
              })
            }
          })
        })
      },
      getcenterPhonelist () {
        var mysession = sessionStorage.getItem('sesstion')
        centerPhonelist(mysession).then(res => {
          if (res.data.code == 1001) {
            this.phoneForm.phone = res.data.data.phone
          }
        })
      },
    },
    mounted () {
      this.getcenterPhonelist()
    },
  }
</script>


<style lang="scss" scoped>
  .SystemManagement {
    .phoneformclass {
      position: fixed;
      width: 400px;
      height: 60px;
      left: 50%;
      top: 50%;
      margin-left: -200px;
    }
  }
</style>

