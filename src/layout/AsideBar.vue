<template>
  <el-aside>
    <el-scrollbar>
      <el-menu
          default-active="0"
          :default-active="activeMenu"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          mode="vertical"
      >
      <a href="/" class="logo">
        <img src="@/assets/images/logo.png" alt="" style="margin-left:10px; margin-right: 5px;">
        <h1>校友会管理系统</h1>
      </a>
      <el-menu-item index="0" @click="goToHomePage()">
          <el-icon><HomeFilled /></el-icon><span>首页</span>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><setting /></el-icon><span>系统管理</span>
        </template>
        <el-menu-item index="2" @click="goToUserPage()">
          <template #title>
            <el-icon><user-filled /></el-icon><span>用户管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="3" @click="goToAuthPage()">
          <template #title>
            <el-icon><lock /></el-icon><span>权限管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="4" @click="goToMessagePage">
          <template #title>
            <el-icon><message /></el-icon><span>供需信息管理</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>
          <el-icon><platform /></el-icon><span>系统监控</span>
        </template>
        <el-menu-item index="6" @click="goToOnlinePage">
          <template #title>
            <el-icon><User /></el-icon><span>在线用户</span>
          </template>
        </el-menu-item>
        <el-menu-item index="7" @click="goToTaskPage">
          <template #title>
            <el-icon><BellFilled /></el-icon><span>定时任务</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import {BellFilled, HomeFilled, Lock, Platform, Setting, User, UserFilled} from "@element-plus/icons-vue";
import useAppStore from '@/store/modules/app'
import { useRouter } from "vue-router";
const router = useRouter();

const appStore = useAppStore()

const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = ''
function goToHomePage() {
  router.push({path: '/index'})
}
function goToUserPage() {
  router.push({path: '/user'})
}
function goToAuthPage() {
  router.push({path: '/auth'})
}
function goToMessagePage() {
  router.push({path: '/message'})
}
function goToOnlinePage() {
  router.push({path: '/online'})
}
function goToTaskPage() {
  router.push({path: '/task'})
}
</script>
<style lang="scss" scoped>
.el-aside {
  background-color: #fff;
  height: 100vh;
  width: auto;
  padding-left: 10px;
  border-right: 2px solid #eee; /* 添加右侧边框 */
}
.el-menu {
  background-color: #fff;
  border-right: None;
  width: 200px;

  &.el-menu--collapse {
    width: 60px;
    & h1 {
      display: none;
    }
  }
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  height: 60px;
  color: black;
  font-size: 17px;
  font-family: "DengXian", sans-serif;
  img {
    width: 32px;
    height: 32px;
  }
}
</style>
