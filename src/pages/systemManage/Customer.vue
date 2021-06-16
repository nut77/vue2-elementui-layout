<template>
  <div>
    <base-table
      class="hfull"
      :pagination="pagination"
      :table="table"
      @sortChange="handleSortChange"
      @sizeChange="handlePaging"
      @currentChange="handlePaging"
      @setVisibleColumns="handleVisibleColumnsChange">
      <template #typeColumn>
        <el-table-column type="index" :index="rowIndex" width="60" label="序号" align="center"></el-table-column>
      </template>
      <template #operationColumn>
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
        configurableColumns: [
          {label: '订单总数', prop: 'orderTotal'},
          {label: '采购类型', prop: 'purchaseType'},
          {label: '投诉次数', prop: 'unsatisfiedTotal'},
          {label: '好评次数', prop: 'satisfiedTotal'},
          {label: '客户描述', prop: 'description'}
        ],
        configurableVisibleColumns: ['orderTotal'],
        defaultSort: {prop: 'lastOrder', order: 'descending'},
        columns: [
          {label: '最近下单时间', prop: 'lastOrder', sortable: true, filter: 'formatDate', arguments: [], width: 150},
          {label: '客户名', prop: 'username', width: 120},
          {label: '订单总数', prop: 'orderTotal', align: 'center', filter: 'numberWithCommas'},
          {label: '未完成订单', prop: 'orderFinished', align: 'center', filter: 'numberWithCommas'},
          {label: '已完成订单', prop: 'orderUnfinished', align: 'center', filter: 'numberWithCommas'},
          {label: '采购类型', prop: 'purchaseType', align: 'center', filter: 'transformArrayToString'},
          {label: '采购数量', prop: 'purchaseTotal', align: 'center', filter: 'numberWithCommas'},
          {label: '优选客户', prop: 'isVip', sortable: true, align: 'center', width: 120},
          {label: '投诉次数', prop: 'unsatisfiedTotal', align: 'center', filter: 'numberWithCommas', width: 120},
          {label: '好评次数', prop: 'satisfiedTotal', align: 'center', filter: 'numberWithCommas', width: 120},
          {label: '客户描述', prop: 'description'}
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
