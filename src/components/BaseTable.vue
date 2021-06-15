<template>
  <div class="wfull table-container" ref="baseTableContainer" v-loading="table.isLoading">
    <template v-if="!!table && !!table.column.length">
      <el-table
        ref="baseTable"
        class="wfull"
        stripe
        :data="table.data"
        :height="hasPagination ? 'calc(100% - 50px)' : '100%'"
        :default-sort="table.defaultSort"
        :row-key="table.getRowKey"
        :expand-row-keys="table.expandRowKeys"
        @sort-change="({prop, order}) => $emit('sortChange', prop, order)"
        @selection-change="selection => $emit('selectionChange', selection)"
        @expand-change="handleExpandChange">
        <slot name="columnType"></slot>
        <template v-for="(item, i) in table.column">
          <el-table-column
            :key="`table_${i}`"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width || 120"
            :show-overflow-tooltip="true"
            :align="item.align || 'left'"
            :sort-orders="table.sortOrders"
            :sortable="item.sortable ? 'custom' : false">
            <template #default="{row}">
              <span class="table-value" v-html="$options.filters[item.filter || 'transformNull'](row[item.prop], ...item.arguments)"/>
            </template>
          </el-table-column>
        </template>
        <slot name="column"></slot>
        <slot name="operator"></slot>
      </el-table>
    </template>

    <slot name="table"></slot>

    <template v-if="hasPagination">
      <el-pagination
        @size-change="val => $emit('sizeChange', val, 'size')"
        @current-change="val => $emit('currentChange', val, 'current')"
        :current-page="pagination.current"
        :page-sizes="pagination.sizes"
        :page-size="pagination.size"
        :total="pagination.total"
        class="fr mgt20"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </template>
  </div>
</template>

<script>
/**
 * table.column属性如下：
 * label: 表格列标签label
 * prop: 列属性prop
 * align: 列对齐方式，默认left
 * filter: 过滤器名称：默认transformNull
 * arguments: 数组-过滤器参数
 * width: 列最小宽度，默认120
 */
export default {
  name: 'BaseTable',
  props: {
    table: {
      type: Object,
      default: () => ({})
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    hasPagination: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleExpandChange(row, expandedRows) {
      const isExpanded = expandedRows.length > 0;
      this.$emit('expandChange', isExpanded && this.table.isSingleExpanded ? [row] : expandedRows);
    }
  }
};
</script>

<style scoped lang="less">
  .table-container {
    height: calc(100% - 60px);
  }
</style>
