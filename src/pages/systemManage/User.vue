<template>
  <div v-loading="isLoading">
    <div class="mgb20">
      <el-button type="primary" @click="editEvidenceEvt('add')">新建用户</el-button>
    </div>
    <base-table
      :pagination="pagination"
      :table="table"
      @sizeChange="(val, type) => pagingEvent(val, type)"
      @currentChange="(val, type) => pagingEvent(val, type)">
      <template columnType>
        <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      </template>
      <template #operator>
        <el-table-column
          label="操作"
          prop="taskName"
          :min-width="100"
          :show-overflow-tooltip="true"
          align="center">
          <template slot-scope="scope">
            <el-button
              title="编辑"
              type="primary"
              size="small"
              class="table-operator table-edit"
              :disabled="scope.row.username === 'admin'"
              @click="editEvidenceEvt('edit', scope.row)">
              编辑
            </el-button>
            <el-button
              title="删除"
              type="danger"
              size="small"
              class="table-operator table-delete"
              :disabled="scope.row.username === 'admin'"
              @click="OperatorEvt('delete', scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </base-table>

    <!--添加/编辑用户-->
    <base-dialog
      ref="dialog"
      :title="`${editUserData.type === 'edit' ? '修改' : '新增'}用户`"
      :nodeId="editUserData.nodeId"
      @dialogClose="editUserData.nodeId = null">
      <div class="container">
        <el-form
          :model="editUserData.editUserForm"
          :rules="editUserData.editUserFormRule"
          ref="editUserForm"
          label-width="80px"
          required>
          <el-form-item label="用户名" prop="username">
            <el-input
              maxlength=20
              placeholder="请输入用户名"
              v-model.trim="editUserData.editUserForm.username"
              clearable
              :disabled="editUserData.type === 'edit'"
              onpaste="return false">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :required="isPasswordRequired">
            <el-input
              v-if="editUserData.type === 'add' || isResetPassword"
              maxlength=20
              type="password"
              placeholder="请输入密码"
              v-model.trim="editUserData.editUserForm.password"
              clearable
              onpaste="return false">
            </el-input>
            <el-button v-else @click="isResetPassword = true">重置</el-button>
          </el-form-item>
          <el-form-item v-if="editUserData.type === 'add' || isResetPassword" label="确认密码" prop="repeatPassword">
            <el-input
              maxlength=20
              type="password"
              placeholder="请再次输入密码"
              v-model.trim="editUserData.editUserForm.repeatPassword"
              clearable
              onpaste="return false">
            </el-input>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-tag>普通用户</el-tag>
          </el-form-item>
          <el-form-item label="描述" prop="origin">
            <el-input
              type="textarea"
              maxlength=250
              placeholder="请输入描述"
              v-model.trim="editUserData.editUserForm.description">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <template slot="dialogFooter">
        <el-button type="primary" @click="submitFormEvt">确 定</el-button>
        <el-button type="info" @click="editUserData.nodeId = null">取 消</el-button>
      </template>
    </base-dialog>

    <!--弹框-->
    <base-dialog
      ref="delDialog"
      :title="operatorData.title"
      :nodeId="operatorData.nodeId"
      @dialogClose="hideDialog">
      <p class="base-dialog-tip">{{operatorData.text}}</p>
      <template slot="dialogFooter">
        <el-button type="primary" @click="submitOperatorEvt">确 定</el-button>
        <el-button type="info" @click="operatorData.nodeId = null">取 消</el-button>
      </template>
    </base-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins';
import SHA256 from 'js-sha256';
export default {
  name: 'User',
  mixins: [mixins.table, mixins.dialog],
  data() {
    const editUserFormDefault = {
      id: '',
      username: '',
      password: '',
      repeatPassword: '',
      role: '普通用户',
      description: ''
    };
    return {
      isLoading: true,
      isResetPassword: false,
      operatorData: {
        title: '',
        nodeId: null,
        text: '',
        requestParams: []
      },
      editUserData: {
        nodeId: null,
        type: '',
        editUserForm: {...editUserFormDefault},
        editUserFormDefault,
        editUserFormRule: {
          username: [{required: true, validator: this.$validator.userName, isEdit: false}],
          password: [
            {
              trigger: 'change',
              validator: (rule, value, callback) => {
                // 避免清除表单项后，错误提示是英文
                this.isPasswordRequired && !value ? callback(new Error('请输入密码')) : callback();
              }
            },
            {
              trigger: 'blur',
              passwordType: '密码',
              validator: (rule, value, callback) => {
                rule.required = this.isPasswordRequired;
                this.$validator.password(rule, value, callback);
              }
            }
          ],
          repeatPassword: [{
            required: true,
            trigger: 'blur',
            passwordType: '确认密码',
            validator: (rule, value, callback) => {
              rule.newPassword = this.editUserData.editUserForm.password;
              this.$validator.password(rule, value, callback);
            }
          }]
        }
      }
    };
  },
  computed: {
    isPasswordRequired() {
      return !(this.editUserData.editUserForm.id && !this.isResetPassword);
    }
  },
  methods: {
    async getTableData() {
      this.isLoading = true;
      const res = await this.$api.systemManage.getUser(this.getPageParams());
      this.isLoading = false;
      if (!!res && res.status === 200) {
        this.table.data = (res.data || {data: []}).data;
        this.pagination.total = (res.data || {total: []}).total;
      } else {
        this.$message.error(res.message);
      }
    },
    editEvidenceEvt(type, row) {
      this.isResetPassword = false;
      if (this.$refs.editUserForm !== undefined) {
        this.$refs.editUserForm.resetFields();
      }
      Object.assign(this.editUserData.editUserForm, this.editUserData.editUserFormDefault);
      if (type === 'edit') {
        this.$tool.setObject(this.editUserData.editUserForm, row);
        this.editUserData.editUserForm.password = '';
      }
      this.editUserData.type = type;
      this.editUserData.editUserFormRule.username[0].isEdit = this.editUserData.type === 'edit';
      this.editUserData.nodeId = +new Date();
    },
    OperatorEvt(type, row) {
      this.operatorData.title = '确认删除';
      this.operatorData.text = '确认删除该用户？';
      this.operatorData.requestParams = row.id;
      this.operatorData.nodeId = Date.now();
    },
    async submitOperatorEvt() {
      this.$refs.delDialog.loadingOpen();
      const res = await this.$api.systemManage.delUser(this.operatorData.requestParams);
      this.$refs.delDialog.loadingClose();
      if (!!res && res.status === 200) {
        this.operatorData.nodeId = null;
        this.$message.success('删除用户成功');
        this.refreshTableData();
      } else {
        this.$message.error(res.message);
      }
    },
    submitFormEvt() {
      this.$refs.editUserForm.validate(async valid => {
        if (!valid) return;
        this.$refs.dialog.loadingOpen();
        const url = this.editUserData.type === 'edit' ? 'editUser' : 'addUser';
        const params = {
          username: this.editUserData.editUserForm.username,
          role: this.editUserData.editUserForm.role,
          description: this.editUserData.editUserForm.description,
          id: this.editUserData.type === 'add' ? '' : this.editUserData.editUserForm.id
        };
        if (this.isPasswordRequired) {
          params.password = SHA256.hmac(this.editUserData.editUserForm.username, this.editUserData.editUserForm.password);
        }
        const res = await this.$api.systemManage[url](params);
        this.$refs.dialog.loadingClose();
        if (!!res && res.status === 200) {
          this.editUserData.nodeId = null;
          this.$message.success(this.editUserData.type === 'edit' ? '编辑用户成功' : '增加用户成功');
          this.refreshTableData();
        } else {
          this.$message.error(res.message);
        }
      });
    }
  },
  created() {
    this.table.column = [
      {label: '创建时间', prop: 'created', filter: 'formatDate', funcParam: [], width: 150},
      {label: '用户名', prop: 'username'},
      {label: '用户类型', prop: 'role', align: 'center'},
      {label: '描述', prop: 'description'},
      {label: '最近登录时间', prop: 'lastLogin', filter: 'formatDate', funcParam: [], width: 150}
    ];
    this.getTableData();
  }
};
</script>

<style scoped lang="less">

</style>
