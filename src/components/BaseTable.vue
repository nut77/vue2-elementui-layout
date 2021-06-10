<template>
  <div class="wfull table-container" ref="baseTableContainer">
    <template v-if="!!table && !!table.column.length">
      <el-table
        ref="baseTable"
        v-loading="table.isLoading"
        class="wfull"
        stripe
        :data="table.data"
        :height="hasPagination ? 'calc(100% - 50px)' : '100%'"
        :default-sort="table.defaultSort"
        @sort-change="({prop, order}) => $emit('sortChange', prop, order)"
        @selection-change="selection => $emit('selectionChange', selection)"
        @expand-change="(row, expandedRows) => $emit('expandChange', row, expandedRows)">
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
    },
    rowKeyProps: {
      type: Array,
      default: () => ['id']
    }
  },
  methods: {
    getRowKey(row, props = this.rowKeyProps) {
      return props.reduce((str, key) => str + row[key], '');
    }
  },
  mounted() {
    // :row-key="getRowKey" :expand-row-keys="table.expandRowKeys"
    if (this.table.hasExpandColumn) {
      // 设置展开行相关参数 expandRowKeys设置了，rowKey必须设置
      this.$set(this.$refs.baseTable.$options.propsData, 'expandRowKeys', this.table.expandRowKeys);
      this.$set(this.$refs.baseTable.$options.propsData, 'rowKey', this.getRowKey);
    }
  }
};
</script>

<style scoped lang="less">
  .table-container {
    height: calc(100% - 60px);
  }
</style>
