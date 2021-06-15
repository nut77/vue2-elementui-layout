<template>
  <div>
    <base-table
      class="hfull"
      :pagination="pagination"
      :table="table"
      @sortChange="handleSortChange"
      @sizeChange="handlePaging"
      @currentChange="handlePaging">
      <template #columnType>
        <el-table-column type="index" :index="rowIndex" width="60" label="序号" align="center"></el-table-column>
      </template>
      <template #operator>
        <el-table-column label="操作" :min-width="100" align="center">
          <template #default="{row}">
            <el-button type="danger" size="small" @click="handleDialogShowConfirm(row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </base-table>

    <!--弹框-->
    <base-dialog
      ref="dialogConfirm"
      title="确认删除"
      :dialogId="dialog.confirm.dialogId"
      @dialogConfirm="handleDialogConfirmSubmit"
      @dialogClose="dialog.confirm.dialogId = 0">
      <p class="base-dialog-tooltip">确认删除该客户？</p>
    </base-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins';
export default {
  name: 'Customer',
  mixins: [mixins.table, mixins.dialog],
  data() {
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
      dialog: {
        confirm: {
          dialogId: 0,
          requestParams: []
        }
      }
    };
  },
  methods: {
    getTableData() {
      this.setTableData('systemManage', 'getCustomer', this.getTableRequestParams());
    },
    handleDialogShowConfirm(row) {
      Object.assign(this.dialog.confirm, {
        dialogId: Date.now(),
        requestParams: row.id
      });
    },
    async handleDialogConfirmSubmit() {
      this.$refs.dialogConfirm.loadingOpen();
      const res = await this.$api.systemManage.delCustomer(this.dialog.requestParams);
      this.$refs.dialogConfirm.loadingClose();
      if (!!res && res.status === 200) {
        this.dialog.confirm.dialogId = 0;
        this.$message.success('删除客户成功');
        this.refreshTableData();
      } else {
        this.$message.error(res.message);
      }
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
