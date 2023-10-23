<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item label="供需信息标题" prop="title">
        <el-input
            v-model="queryParams.title"
            placeholder="请输入供需信息标题"
            clearable
            style="width: 200px"
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供需内容" prop="content">
        <el-input
            v-model="queryParams.content"
            placeholder="请输入供需内容"
            clearable
            style="width: 200px"
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="states">
        <el-select v-model="queryParams.status" placeholder="审核状态" clearable style="width: 200px">
          <el-option
              v-for="dict in statesText"
              :key="dict.value"
              :label="dict.label"
              :value="dict.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="Plus"
            @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="Edit"
            :disabled="single"
            @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table v-loading="loading" :data="messageList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="供需信息ID" align="center" prop="id" />
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="内容" align="center" prop="content" />
      <el-table-column label="申请日期" align="center" prop="date">
      </el-table-column>
      <el-table-column label="审核状态" align="center" prop="state">
        <template #default="scope">
          <el-tag :type="statesText[scope.row.state].elTagType" :class="statesText[scope.row.state].elTagClass">
            {{ statesText[scope.row.state].label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核管理员ID" align="center" prop="announcerId" width="180">
      </el-table-column>
      <el-table-column label="操作" width="220" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Flag" @click="handleReview(scope.row)" >审核</el-button>
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" >修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
    />
    <!-- 审核对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body center>
      <el-form ref="messageRef" :model="form"  label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" readonly="readonly" />
        </el-form-item>
        <el-form-item type="textarea" label="内容" prop="postCode">
          <el-input v-model="form.content" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="申请日期" prop="date">
          <el-input v-model="form.date" readonly="readonly" />
        </el-form-item>
        <el-form-item label="审核意见" prop="remark">
          <el-input v-model="form.review" type="textarea" placeholder="请输入审核意见" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="success" @click="acceptReview">通 过</el-button>
          <el-button type="danger" @click="rejectReview">拒 绝</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {getCurrentInstance} from "vue";

const { proxy } = getCurrentInstance();
import useMessageStore from "@/store/modules/message.js";
const messageStore = useMessageStore(); // 创建 useMessageStore 实例

const statesText = [
  {value: 0, label: "未审核", elTagType: "warning", elTagClass: "el-tag--danger"},
  {value: 1, label: "审核通过", elTagType: "success", elTagClass: "el-tag--success"},
  {value: 2, label: "审核未通过", elTagType: "danger", elTagClass: "el-tag--warning"}
]

const messageList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    id: undefined,
    title: undefined,
    status: undefined
  },
  rules: {
    id: [{ required: true, message: "供需信息ID不能为空", trigger: "blur" }],
    title: [{ required: true, message: "供需信息标题不能为空", trigger: "blur" }],
    status: [{ required: true, message: "审核信息不能为空", trigger: "blur" }],
  }
});

const { queryParams, form } = toRefs(data);

/** 查询供需信息列表 */
function getList() {
  loading.value = true;
  messageStore.queryAllMessages().then((response) => {
    messageList.value = response.rst;
    console.log(messageList.value)
    total.value = messageList.value.length
    loading.value = false;
    console.log("查询成功")
  }).catch((error) => {
    console.log(error)
  });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 表单重置 */
function reset() {
  form.value = {
    id: undefined,
    title: undefined,
    content: undefined,
    date: undefined,
    status: undefined,
    announcerId: undefined
  };
  proxy.resetForm("messageRef");
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
}
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加岗位";
}
/** 审核按钮操作 */
function handleReview(row) {
  reset()
  open.value = true;
  title.value = "审核供需信息";
  form.value = row;
}
function acceptReview() {
  messageStore.handleMessage(form.value.id, 1).then((response) => {
    // 修改数据成功，刷新表单
    getList();
    open.value = false;
    reset();
  }).catch((error) => {
    console.log(error)
  });
}
function rejectReview() {
  messageStore.handleMessage(form.value.id, 2).then((response) => {
    // 修改数据成功，刷新表单
    getList();
    open.value = false;
    reset();
  }).catch((error) => {
    console.log(error)
  });
}
/** 修改按钮操作 */
function handleUpdate(row) {

}
/** 删除按钮操作 */
function handleDelete(row) {
  const id = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除岗位编号为"' + id + '"的数据项？').then(function() {
    console.log("删除")
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
}

getList();
</script>
