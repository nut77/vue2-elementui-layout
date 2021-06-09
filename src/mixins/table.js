export default {
  data() {
    return {
      table: {
        isLoading: false,
        column: [],
        data: [],
        defaultSort: {prop: 'createTime', order: 'descending'},
        sortOrders: ['descending', 'ascending'],
        orderField: '',
        orderBy: 'DESC',
        selection: []
      },
      pagination: {
        size: 30,
        current: 1,
        sizes: [30, 70, 100, 150],
        total: 0
      }
    };
  },
  methods: {
    async setTableData(module, apiName, params) {
      this.table.isLoading = true;
      const res = await this.$api[module][apiName](params);
      this.table.isLoading = false;
      if (!!res && res.status === 200) {
        this.table.data = (res.data || {data: []}).data;
        this.pagination.total = (res.data || {total: []}).total;
      } else {
        this.$message.error(res.message);
      }
    },
    // 分页事件：val - 值（当前页或者分页大小）、type - 事件类型，size：改变分页大小，current：改变当前页
    handlePaging(val, type = 'current') {
      if (type === 'size') {
        this.pagination.size = val;
        this.pagination.current = 1;
      } else {
        this.pagination.current = val;
      }
      this.getTableData();
    },
    // 表格排序
    handleSortChange(prop, order) {
      this.setTableSortValue({prop, order});
      this.pagination.current = 1;
      this.getTableData();
    },
    // 设置表格排序值
    setTableSortValue({prop, order}) {
      this.table.orderField = prop;
      this.table.orderBy = order === 'ascending' ? 'ASC' : 'DESC';
    },
    // 搜索、新增、删除 表格数据时调用
    refreshTableData(obj) {
      this.pagination.current = 1;
      this.getTableData();
    },
    // 表格勾选
    handleSelectionChange(row) {
      this.table.selection = row;
    },
    // 拿到表格勾选参数
    getSelectParams(paramKey = '', selection = this.table.selection) {
      if (paramKey && /string|object/.test(typeof paramKey)) return false;
      const params = selection.map(item => {
        if (typeof paramKey === 'string') return item[paramKey];
        let temp = [];
        if (paramKey instanceof Array) {
          // 如果是数组 如：['ip', 'id']
          for (const key of paramKey) temp.push(item[key]);
        } else {
          // 如果是对象 如：{dataId: 'id', dataInId: 'inId'}
          temp = {};
          for (const key in paramKey) {
            temp[key] = item[paramKey[key]];
          }
        }
        return temp;
      });

      return params;
    },
    // 根据需要获取的表格查询参数类型，获取表格查询参数
    getTableRequestParams(type = ['page', 'sort'], otherParams = {}) {
      if (!(type instanceof Array)) return {...otherParams};
      const params = {};
      if (type.includes('page')) {
        Object.assign(params, {
          currentPage: this.pagination.current,
          pageSize: this.pagination.size
        });
      }
      if (type.includes('sort')) {
        if (!this.table.orderField) this.setTableSortValue(this.table.defaultSort);
        Object.assign(params, {
          orderField: this.table.orderField,
          orderBy: this.table.orderBy
        });
      }
      return Object.assign(params, otherParams);
    },
    /**
     * 下载
     * @param url               接口地址
     * @param params            下载参数，格式为：?id=123&name="文件下载"
     * @param [downloadName]    下载文件名
     * @param [isDownload]      是否下载
     */
    downLoadEvt(url, params, downloadName = '', isDownload = true) {
      const el = document.createElement('a');
      document.body.appendChild(el);
      if (isDownload) el.setAttribute('download', downloadName);
      el.setAttribute('target', '_blank');
      const downUrl = params ? `${url}${params}` : url;
      el.href = this.$tool.getFullUrl(downUrl);
      console.log(el.href);
      el.click();
      document.body.removeChild(el);
    },
    /**
     * 下载--带header
     * @param url               接口地址
     * @param data              下载参数，get格式为：?id=123&&name="文件下载"
     * @param method            请求方法get/post(不区分大小写)
     * @param [downloadName]    下载文件名(必填，若为空，下载下来都是txt格式)
     * @param [isDownload]      是否下载
     */
    downLoadAxiosEvt(url, data, method = 'GET', contentType = 'application/json', downloadName = '下载文件名必填', isDownload = true) {
      const ajax = new XMLHttpRequest();
      let _url = this.$tool.getFullUrl(url);
      const _method = method.toUpperCase();
      _url = _method === 'GET' && data ? `${_url}${data}` : _url;
      ajax.open(_method, _url);
      const token = this.token || '';
      ajax.setRequestHeader('Authorization', token);
      ajax.setRequestHeader('Content-Type', contentType);
      ajax.responseType = 'blob';
      ajax.onload = function () {
        if (this.status === 200) {
          // 两种解码方式，区别自行百度:decodeURIComponent/decodeURI
          const fileName = decodeURIComponent((this.getResponseHeader('content-disposition') || '; filename="未知文件"').split(';')[1].slice(10));
          const blob = this.response;
          const file = new Blob([blob]);
          const el = document.createElement('a');
          el.download = fileName || downloadName;
          el.setAttribute('target', '_blank');
          el.href = URL.createObjectURL(file);
          document.body.appendChild(el);
          el.click();
          document.body.removeChild(el);
        }
      };
      if (_method === 'GET') {
        ajax.send();
      } else {
        if (contentType === 'application/json') ajax.send(JSON.stringify(data));
        if (contentType === 'application/x-www-form-urlencoded;charset=UTF-8') {
          let str = '';
          for (const key in data) {
            str += `${key}=${data[key]}&`;
          }
          ajax.send(str);
        }
      }
    }
  }
};
