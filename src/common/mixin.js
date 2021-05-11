import { getUserList } from "network/home.js";

//获取用户列表
export const getUserListMixin = {
  data() {
    return {
      //获取用户列表默认参数
      queryInfo: {
        query: "",
        //当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 2,
        //控制添加用户输入框的显示与隐藏
      },
    }
  },
  methods: {
    async getUserList() {
      const res = await getUserList(this.queryInfo);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.total = res.data.total;
      this.userList = res.data.users;
    },
  }
}

export const proofRulesMixin = {
  data() {
    return {
      //表单验证规则
      userFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度 6 到 15 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: this.checkEmail, trigger: "blur"}
        ],
        mobile: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: this.checkMobile, trigger: "blur"}
        ],
      },
    }
  },
  methods: {
    //邮箱验证规则
    checkEmail(rule, value, callback) {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(regEmail.test(value)) {
        return callback();
      }
      callback(new Error('邮箱不正确'));
    },
    //手机号验证规则
    checkMobile(rule, value, callback) {
      const regMobile = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
      if(regMobile.test(value)) {
        return callback();
      }
      return callback(new Error('手机号不正确'))
    }
  }
}


