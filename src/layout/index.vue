<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item index="1">
            <template #title>
              <el-icon><HomeFilled /></el-icon>首页
            </template>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><setting /></el-icon>系统管理
            </template>
            <el-menu-item>
              <template #title>
                <el-icon><user-filled /></el-icon>用户管理
              </template>
            </el-menu-item>
            <el-menu-item>
              <template #title>
                <el-icon><lock /></el-icon>权限管理
              </template>
            </el-menu-item>
            <el-sub-menu>
              <template #title>
                <el-icon><message /></el-icon>供需信息管理
              </template>
              <el-menu-item @click="goToMessagePage">
                <template #title>
                  <el-icon><user-filled /></el-icon>查看供需信息
                </template>
              </el-menu-item>
              <el-menu-item @click="goToReviewPage">
                <template #title>
                  <el-icon><user-filled /></el-icon>审核供需信息
                </template>
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 15px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
            ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>root</span>
        </div>
      </el-header>

      <el-main>
          <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {HomeFilled, UserFilled, Message, Setting, Lock} from '@element-plus/icons-vue'
import router from "@/router";
function goToMessagePage() {
  console.log("test")
  router.push({path: '/message'})
}
function goToReviewPage() {
  console.log("test")
  router.push({path: '/review'})
}
</script>

<style scoped>
</style>
