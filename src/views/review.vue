<template>
  <div class="app-container home">

  </div>
  <!--利用el-table展示供需信息-->
  <div class="supply-demand-list">
    <el-table :data="filterTableData" style="width: 100%; height: 400%" :max-height="400">
      <el-table-column label="ID" prop="id" />
      <el-table-column label="标题" prop="title" />
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="state" label="审核状态">
        <template #default="scope">
          {{ getStatusText(scope.row.state) }}
        </template>
      </el-table-column>
      <el-table-column prop="announcerId" label="审核管理员ID"></el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="acceptReview(scope.$index, scope.row)"
          >通过</el-button
          >
          <el-button size="small" @click="rejectReview(scope.$index, scope.row)"
          >不通过</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import useMessageStore from "@/store/modules/message.js";
import {computed, onMounted, ref} from "vue";
import { format } from 'date-fns';
const messageStore = useMessageStore(); // 创建 useMessageStore 实例

const supplyDemandList = ref([
  {
    id: "",
    title: "",
    content: "",
    date: "",
    state: "",
    announcerId: "",
  }
]); // 创建一个响应式的数组，用于存储供需信息列表
const search = ref('');
onMounted(() => {
  // 在组件挂载后，调用获取供需信息列表的接口
  console.log("test")
  messageStore.queryAllNotReviewMessages().then((response) => {
    supplyDemandList.value = response.rst.map((item) => {
      return {
        ...item,
        date: format(new Date(item.date), 'yyyy-MM-dd'),
      }
    });
    console.log("index.vue", supplyDemandList.value);
  }).catch((error) => {
    console.log(error)
  });
});

const filterTableData = computed(() =>
    supplyDemandList.value.filter(
        (data) =>
            !search.value ||
            data.title.toLowerCase().includes(search.value.toLowerCase()) ||
            data.content.toLowerCase().includes(search.value.toLowerCase())
    )
);
const getStatusText = (status) => {
  if (status === 0) {
    return '未审核';
  } else if (status === 1) {
    return '审核通过';
  } else if (status === 2){
    return '审核未通过';
  } else {
    return '未知状态';
  }
};
const acceptReview = (index, row) => {
  console.log(index, row)
  messageStore.handleMessage(row.id, 1).then((response) => {
    // 修改数据成功，刷新表单
    messageStore.queryAllNotReviewMessages().then((response) => {
      supplyDemandList.value = response.rst.map((item) => {
        return {
          ...item,
          date: format(new Date(item.date), 'yyyy-MM-dd HH:mm:ss'),
        }
      });
      console.log("index.vue", supplyDemandList.value);
    }).catch((error) => {
      console.log(error)
    });
  }).catch((error) => {
    console.log(error)
  });
};
const rejectReview = (index, row) => {
  console.log(index, row)
  messageStore.handleMessage(row.id, 2).then((response) => {
    // 修改数据成功，刷新表单
    messageStore.queryAllNotReviewMessages().then((response) => {
      supplyDemandList.value = response.rst.map((item) => {
        return {
          ...item,
          date: format(new Date(item.date), 'yyyy-MM-dd HH:mm:ss'),
        }
      });
      console.log("index.vue", supplyDemandList.value);
    }).catch((error) => {
      console.log(error)
    });
  }).catch((error) => {
    console.log(error)
  });
};
</script>
<style scoped>
.supply-demand-list {
  padding: 20px;
}
</style>