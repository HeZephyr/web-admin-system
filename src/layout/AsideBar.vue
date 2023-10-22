<template>
  <el-aside>
    <el-scrollbar>
      <el-menu
          :default-active="activeMenu"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          mode="vertical"
      >
      <a href="/" class="logo">
        <img src="@/assets/images/logo.png" alt="" style="margin-right: 10px;">
        <h1>校友会管理系统</h1>
      </a>
      <el-sub-menu index="0">
        <template #title>
          <el-icon><HomeFilled /></el-icon><span>首页</span>
        </template>
      </el-sub-menu>
      <el-sub-menu index="1">
          <template #title>
            <el-icon><setting /></el-icon><span>系统管理</span>
          </template>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><user-filled /></el-icon><span>用户管理</span>
        </template>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><lock /></el-icon><span>权限管理</span>
        </template>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><message /></el-icon><span>供需信息管理</span>
        </template>
        <el-menu-item index="4.1" @click="goToMessagePage">
          <template #title>
            <el-icon><list /></el-icon><span>查看供需信息</span>
          </template>
        </el-menu-item>
        <el-menu-item index="4.2" @click="goToReviewPage">
          <template #title>
            <el-icon><checked /></el-icon><span>审核供需信息</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import {Checked, HomeFilled, List, Lock, Setting, UserFilled} from "@element-plus/icons-vue";
import useAppStore from '@/store/modules/app'
import {useRoute} from "vue-router";

const router = useRoute()

const appStore = useAppStore()

const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = ''
function goToMessagePage() {
  console.log("test")
  router.push({path: '/message'})
}
function goToReviewPage() {
  console.log("test")
  router.push({path: '/review'})
}
</script>
<style lang="scss" scoped>
.el-aside {
  background-color: #fff;
  height: 100%;
  width: auto;
  padding-left: 10px;
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
