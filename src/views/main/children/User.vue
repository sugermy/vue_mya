<template>
  <div class="content">
    <header class="header">
      <!-- <h3>用户账户管理</h3> -->
      <el-form inline :model="searchForm">
        <el-form-item label="登陆帐号">
          <el-input v-model="searchForm.account" clearable placeholder="请输入登陆帐号"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="searchForm.real_name" clearable placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="newAction()">新增</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="delAction()">删除</el-button>
      </el-button-group>
    </header>
    <!-- 表格部分 -->
    <el-table :data="tableData" border style="width: 100%" @selection-change="selectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="account" label="帐号" width="120">
      </el-table-column>
      <el-table-column prop="real_name" label="真实姓名" width="120">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="160">
      </el-table-column>
      <el-table-column prop="remark" label="备注说明">
      </el-table-column>
      <el-table-column prop="time_create" label="创建日期" width="200">
      </el-table-column>
      <el-table-column prop="user_create" label="创建操作人" width="200">
      </el-table-column>
      <el-table-column prop="time_update" label="更新日期" width="200">
      </el-table-column>
      <el-table-column prop="user_create" label="更新操作人" width="200">
      </el-table-column>
      <el-table-column prop="is_enabled" label="是否启用" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.is_enabled?'启用':'禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="editAction(scope.row.id)">编辑</el-button>
          <el-button type="text" @click="pwdAction(scope.row.id)">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="searchForm.page"
        :page-sizes="[15, 30, 50, 100]" :page-size="searchForm.rows" layout="sizes, prev, pager, next"
        :total="searchForm.total">
      </el-pagination>
    </div>
    <!-- 编辑部分 -->
    <el-dialog :title="editTxt" :visible.sync="showEdit">
      <el-form :model="form" label-width="80px" ref="editForm" :rules="rules" hide-required-asterisk>
        <el-form-item label="帐号" prop="account">
          <el-input v-model="form.account" autocomplete="off" :disabled="!isNew" placeholder="请输入帐号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" v-if="isNew">
          <el-input v-model="form.pwd" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="real_name">
          <el-input v-model="form.real_name" autocomplete="off" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off" placeholder="请输入用户手机号码"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" autocomplete="off" :rows="2" placeholder="请输入说明内容" v-model="form.remark">
          </el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="form.is_enabled">
            <el-radio :label="true" :disabled="!isNew">启用</el-radio>
            <el-radio :label="false" :disabled="!isNew">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancalAction('editForm')">取 消</el-button>
        <el-button type="primary" @click="confrimAction('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      searchForm: {
        account: "",
        real_name: "",
        page: 1,
        rows: 15,
        total: 30
      },
      tableData: [],
      multipleSelection: [],
      showEdit: false,
      rules: {
        account: [{ required: true, message: "请输入帐号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        real_name: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            message: "联系电话格式不正确",
            trigger: "blur"
          }
        ]
      },
      form: {
        id: "",
        account: "",
        pwd: "",
        real_name: "",
        mobile: "",
        remark: "",
        is_enabled: true
      },
      editTxt: "",
      isNew: true
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    // 获取信息
    getlist() {
      this.$ajax.get("/api/user/", this.searchForm).then(res => {
        this.searchForm.total = res.rsp_data.total || 0;
        this.tableData = res.rsp_data.data_detail || [];
      });
    },
    onSubmit() {
      this.searchForm.page = 1;
      this.getlist();
    },
    // 新增
    newAction() {
      this.editTxt = "新增用户";
      this.showEdit = true;
      this.isNew = true;
    },
    // 操作
    editAction(id) {
      this.editTxt = "编辑用户";
      this.showEdit = true;
      this.isNew = false;
      this.$ajax.get(`/api/user/${id}`).then(res => {
        if (res.rsp_code === 200) {
          this.form = res.rsp_data;
          this.form = {
            id: res.rsp_data.id,
            account: res.rsp_data.account,
            real_name: res.rsp_data.real_name,
            mobile: res.rsp_data.mobile,
            remark: res.rsp_data.remark,
            is_enabled: res.rsp_data.is_enabled
          };
        } else {
          this.$message({ type: "error", message: res.rsp_msg });
        }
      });
    },
    // 删除
    delAction() {
      if (this.multipleSelection.length < 1) {
        this.$message({ type: "warning", message: "请选择需要操作的数据" });
      } else {
        console.log(this.multipleSelection);
      }
    },
    // 修改密码
    pwdAction(id) {},
    // 取消提交
    cancalAction(formName) {
      this.$refs[formName].resetFields();
      this.showEdit = false;
      Object.keys(this.form).forEach(el => {
        this.form[el] = "";
      });
      this.form.is_enabled = true;
    },
    // 确认提交
    confrimAction(formName) {
      console.log(this.form);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.id !== "") {
            this.editPost(formName);
          } else {
            this.newPost(formName);
          }
        } else {
          return false;
        }
      });
    },
    // 新增提交
    newPost(formName) {
      this.$ajax.post("/api/user/", this.form).then(res => {
        if (res.rsp_code === 200) {
          this.$message({ type: "success", message: res.rsp_msg });
          this.$refs[formName].resetFields();
          this.showEdit = false;
          this.getlist();
        } else {
          this.$message({ type: "error", message: res.rsp_msg });
        }
      });
    },
    // 编辑提交
    editPost(formName) {
      this.$ajax.put(`/api/user/${this.form.id}`, this.form).then(res => {
        if (res.rsp_code === 200) {
          this.$message({ type: "success", message: res.rsp_msg });
          this.$refs[formName].resetFields();
          this.showEdit = false;
          this.getlist();
        } else {
          this.$message({ type: "error", message: res.rsp_msg });
        }
      });
    },
    // 页码大小
    sizeChange(val) {
      this.searchForm.rows = val;
      this.searchForm.page = 1;
      this.getlist();
    },
    // 翻页
    currentChange(val) {
      this.searchForm.page = val;
      this.getlist();
    },
    // 选择表格数据
    selectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-form-item {
    margin-bottom: 0;
  }
}
.el-table {
  height: calc(100% - 160px);
}
.el-pagination {
  margin-top: 10px;
}
</style>
