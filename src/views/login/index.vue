<template>
  <div class="login" v-loading="loading">
    <img src="../../assets/logo.png" class="logo">
    <el-form class="sub-form" label-position="left" label-width="0" :rules="rules" ref="ruleForm" :model="subForm">
      <el-form-item prop="account">
        <el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="subForm.account"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" prefix-icon="el-icon-key" v-on:keyup.native.enter="submitForm('ruleForm')"
          v-model="subForm.password" show-password></el-input>
      </el-form-item>
      <div class="foot-btn">
        <el-button type="primary" style="width:100%" @click="submitForm('ruleForm')">登陆</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { randomName } from "../../plugins/utils";

export default {
  name: "login",
  data() {
    return {
      loading: false,
      subForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, message: "请输入帐号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let codekey = randomName();
          this.$ajax._axios.defaults.headers.code = codekey;
          this.loading = true;
          this.$ajax.post("/api/user/login", this.subForm).then(res => {
            this.loading = false;
            if (res.rsp_code === 200) {
              // 重置ajax的header.code
              let curtime = new Date().getTime();
              localStorage.setItem(
                "code",
                JSON.stringify({
                  key: codekey,
                  value: res.token,
                  timer: curtime
                })
              );
              // this.$ajax._axios.defaults.headers.code = res.token;
              this.$message({
                message: "登陆成功",
                type: "success"
              });
              this.loading = false;
              this.$router.push({
                path: "/main"
              });
            } else {
              this.$message({
                message: res.rsp_msg,
                type: "error"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/bg.jpg") no-repeat center;
  background-size: 100%;
  .logo {
    width: 50px;
    margin-bottom: 10px;
  }
  .sub-form {
    width: 500px;
    .foot-btn {
      text-align: center;
    }
  }
}
</style>
