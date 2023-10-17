<template>
  <div class="app-container home">

  </div>
  <!--利用el-table展示供需信息-->
  <div class="supply-demand-list">
    <el-table :data="supplyDemandList" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="state" label="审核状态"></el-table-column>
      <el-table-column prop="announcerId" label="审核管理员ID"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import useMessageStore from "@/store/modules/message.js";
import {onMounted, ref} from "vue";
const messageStore = useMessageStore(); // 创建 useMessageStore 实例

const supplyDemandList = ref([]); // 创建一个响应式的数组，用于存储供需信息列表
onMounted(() => {
  // 在组件挂载后，调用获取供需信息列表的接口
  console.log("test")
  messageStore.queryAllMessages().then((response) => {
    supplyDemandList.value = response.rst;
    console.log("index.vue", supplyDemandList.value);
  }).catch((error) => {
    console.log(error)
  });
});

</script>
<style scoped>
.supply-demand-list {
  padding: 20px;
}
</style>