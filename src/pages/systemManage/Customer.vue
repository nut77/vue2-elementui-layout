<template>
  <div>
    <div class="mgb20">
      <el-button type="primary" @click="handleDialogShowUser('add')">新建客户</el-button>
    </div>

    <base-table
      :pagination="pagination"
      :table="table"
      @sortChange="handleSortChange"
      @selectionChange="handleSelectionChange"
      @expandChange="handleExpandChange"
      @sizeChange="handlePaging"
      @currentChange="handlePaging">
      <template #columnType>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column type="index" :index="rowIndex" width="60" label="序号" align="center"></el-table-column>
      </template>
      <template #operator>
        <el-table-column type="expand" width="60">
          <template #header>
            详情
          </template>
          <template #default="{row}">
            <p v-for="(value, key) in row" :key="key">
              <span class="expanded-item-label">{{key}}：</span>
              <span>{{value}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" :min-width="100" align="center">
          <template #default="{row}">
            <el-button
              type="primary"
              size="small"
              :disabled="row.username === 'admin'"
              @click="handleDialogShowUser('edit', row)">
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              :disabled="row.username === 'admin'"
              @click="handleDialogShowConfirm('delete', row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </base-table>

    <!--添加/编辑客户-->
    <base-dialog
      ref="dialogUser"
      :title="`${dialog.user.type === 'edit' ? '编辑' : '新增'}客户`"
      :dialogId="dialog.user.dialogId"
      @dialogConfirm="submitDialogUser"
      @dialogClose="dialog.user.dialogId = 0">
      <div class="container">
        <el-form :model="formData" :rules="formRules" ref="userForm" label-width="80px">
          <el-form-item label="客户名" prop="username">
            <el-input
              maxlength=20
              placeholder="请输入客户名"
              v-model.trim="formData.username"
              clearable
              :disabled="dialog.user.type === 'edit'"
              onpaste="return false">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :required="isPasswordRequired">
            <el-input
              v-if="dialog.user.type === 'add' || isResetPassword"
              maxlength=20
              type="password"
              placeholder="请输入密码"
              v-model.trim="formData.password"
              clearable
              onpaste="return false">
            </el-input>
            <el-button v-else @click="isResetPassword = true">重置</el-button>
          </el-form-item>
          <el-form-item v-if="dialog.user.type === 'add' || isResetPassword" label="确认密码" prop="repeatPassword">
            <el-input
              maxlength=20
              type="password"
              placeholder="请再次输入密码"
              v-model.trim="formData.repeatPassword"
              clearable
              onpaste="return false">
            </el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-tag>普通客户</el-tag>
          </el-form-item>
          <el-form-item label="描述" prop="origin">
            <el-input
              type="textarea"
              maxlength=250
              placeholder="请输入描述"
              v-model.trim="formData.description">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </base-dialog>

    <!--弹框-->
    <base-dialog
      ref="dialogConfirm"
      :title="dialog.confirm.title"
      :dialogId="dialog.confirm.dialogId"
      @dialogConfirm="submitDialogConfirm"
      @dialogClose="dialog.confirm.dialogId = 0">
      <p class="base-dialog-tooltip">{{dialog.confirm.tooltip}}</p>
    </base-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins';
import SHA256 from 'js-sha256';
export default {
  name: 'Customer',
  mixins: [mixins.table, mixins.dialog],
  data() {
    const userFormDefault = {
      id: '',
      username: '',
      password: '',
      repeatPassword: '',
      role: '普通客户',
      description: ''
    };
    return {
      isLoading: true,
      table: {
        defaultSort: {prop: 'created', order: 'descending'},
        column: [
          {label: '创建时间', prop: 'created', filter: 'formatDate', arguments: [], width: 150, sortable: true},
          {label: '客户名', prop: 'username', sortable: true},
          {label: '客户类型', prop: 'role', align: 'center'},
          {label: '描述', prop: 'description'},
          {label: '最近登录时间', prop: 'lastLogin', filter: 'formatDate', arguments: [], width: 150}
        ]
      },
      isResetPassword: false,
      dialog: {
        user: {
          dialogId: 0,
          type: 'add'
        },
        confirm: {
          dialogId: 0,
          title: '',
          tooltip: '',
          requestParams: []
        }
      },
      userFormDefault,
      formData: {...userFormDefault},
      formRules: {
        username: [{required: true, validator: this.$validator.username, isEdit: false, fieldType: '客户名'}],
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
            fieldType: '密码',
            validator: (rule, value, callback) => {
              rule.required = this.isPasswordRequired;
              this.$validator.password(rule, value, callback);
            }
          }
        ],
        repeatPassword: [{
          required: true,
          trigger: 'blur',
          fieldType: '确认密码',
          validator: (rule, value, callback) => {
            rule.newPassword = this.formData.password;
            this.$validator.password(rule, value, callback);
          }
        }]
      }
    };
  },
  computed: {
    isPasswordRequired() {
      return !(this.formData.id && !this.isResetPassword);
    }
  },
  methods: {
    getTableData() {
      this.setTableData('systemManage', 'getCustomer', this.getTableRequestParams());
    },
    // type: add/edit
    handleDialogShowUser(type, row) {
      this.isResetPassword = false;
      if (this.$refs.userForm !== undefined) {
        this.$refs.userForm.resetFields();
      }
      Object.assign(this.formData, this.userFormDefault);
      if (type === 'edit') {
        this.$tool.setObject(this.formData, row);
        this.formData.password = '';
      }
      this.dialog.user.type = type;
      this.formRules.username[0].isEdit = this.dialog.user.type === 'edit';
      this.dialog.user.dialogId = Date.now();
    },
    // type: delete
    handleDialogShowConfirm(type, row) {
      Object.assign(this.dialog.confirm, {
        dialogId: Date.now(),
        title: '确认删除',
        tooltip: '确认删除该客户？',
        requestParams: row.id
      });
    },
    async submitDialogConfirm() {
      this.$refs.dialogConfirm.loadingOpen();
      const res = await this.$api.systemManage.delUser(this.dialog.requestParams);
      this.$refs.dialogConfirm.loadingClose();
      if (!!res && res.status === 200) {
        this.dialog.confirm.dialogId = 0;
        this.$message.success('删除客户成功');
        this.refreshTableData();
      } else {
        this.$message.error(res.message);
      }
    },
    submitDialogUser() {
      this.$refs.userForm.validate(async valid => {
        if (!valid) return;
        this.$refs.dialogUser.loadingOpen();
        const params = {
          username: this.formData.username,
          role: this.formData.role,
          description: this.formData.description,
          id: this.dialog.user.type === 'add' ? '' : this.formData.id
        };
        if (this.isPasswordRequired) {
          params.password = SHA256.hmac(this.formData.username, this.formData.password);
        }
        const res = await this.$api.systemManage[this.dialog.user.type === 'edit' ? 'editCustomer' : 'addCustomer'](params);
        this.$refs.dialogUser.loadingClose();
        if (!!res && res.status === 200) {
          this.dialog.user.dialogId = 0;
          this.$message.success(this.dialog.user.type === 'edit' ? '编辑客户成功' : '新增客户成功');
          this.refreshTableData();
        } else {
          this.$message.error(res.message);
        }
      });
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
