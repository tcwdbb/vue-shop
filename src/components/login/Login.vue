<template>
  <div class="login">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img src="~assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        label-width="0"
        :model="loginForm"
        ref="loginInfo"
        :rules="loginFormRules"
        class="login-info"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" :loading="isLoading" @click="userLogin">登录</el-button>
          <el-button type="info" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from 'network/login.js'

export default {
  name: "Login",
  data() {
    return {
      // 登录表达数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      //登录表单验证规则对象
      loginFormRules: {
        //用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度 3 到 8 个字符", trigger: "blur" },
        ],
        //密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度 6 到 15 个字符", trigger: "blur" },
        ],
      },
      isLoading: false
    };
  },
  methods: {
    //点击重置表单
    resetForm() {
      this.$refs.loginInfo.resetFields();
    },
    //登录验证
    userLogin() {
      this.$refs.loginInfo.validate(async valid => {
        if(!valid) return;
        const result = await login(this.loginForm)
        console.log(result);
        if(result.meta.status !== 200) {
          return this.$message.error(result.meta.msg);
        }
        this.isLoading = true;
        this.$message.success(result.meta.msg);
        window.sessionStorage.setItem('token', result.data.token);
        setTimeout(() => {
          this.isLoading = false;
          this.$router.push('/home');
        }, 1000);
      })
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #2b4b6b;
}

.login-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  border-radius: 3px;
  background-color: #fff;

  .avatar-box {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid #eee;
    box-shadow: 0 0 5px #ddd;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      background-color: #eee;
    }
  }
}

.login-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>