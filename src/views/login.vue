<template>
  <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">南航南京校友会后台管理系统</h3>
      <el-form-item prop="account">
        <el-input
            v-model="loginForm.account"
            type="text"
            size="large"
            auto-complete="off"
            placeholder="账号"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter="handleLogin"
        >
        </el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
            :loading="loading"
            size="large"
            type="primary"
            style="width:100%;"
            @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer" style="margin-top: 20px; text-align: center;">
      <span>Copyright © 2023 nuaa All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup>
import useUserStore from '@/store/modules/user'
import {useRoute, useRouter} from "vue-router";
import {getCurrentInstance, ref, watch} from "vue";
import ElMessage from "element-plus";

const userStore = useUserStore()
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const loginForm = ref({
  account: "admin",
  password: "admin123",
});

const loginRules = {
  account: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
};

const loading = ref(false);
// 注册开关
const register = ref(false);
const redirect = ref(undefined);

// 监听route对象的变化，并且每次变换更新redirect的值
watch(route, (newRoute) => {
  redirect.value = newRoute.query && newRoute.query.redirect;
}, { immediate: true });

function handleLogin() {
  // 触发表单的验证
  proxy.$refs.loginRef.validate(valid => {
    if (valid) {
      loading.value = true;
      // 调用action的登录方法
      userStore.login(loginForm.value).then(() => {
        const query = route.query;
        // 从路由查询参数中提取除 "redirect" 以外的其他参数
        const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
          if (cur !== "redirect") {
            acc[cur] = query[cur];
          }
          return acc;
        }, {});
        // 导航到指定路径，如果没有指定路径，则导航到默认路径 "/"
        router.push({ path: redirect.value || "/", query: otherQueryParams });
      }).catch(() => {
        loading.value = false;
      });
    }
  });
}
</script>
<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  width: 300px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}
</style>