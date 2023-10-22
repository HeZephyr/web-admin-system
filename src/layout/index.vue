<template>
  <div class="common-layout">
    <el-container>
      <aside-bar />
      <el-container class="header-and-main">
        <navbar />
        <app-main />
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import AsideBar from "@/layout/AsideBar";
import Navbar from "@/layout/Navbar";
import AppMain from "@/layout/AppMain";
</script>

<style lang="scss" scoped>
.header-and-main {
  flex-direction: column;
}
</style>