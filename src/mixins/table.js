export default {
  data() {
    return {
      pageLoading: false,
      pagingData: {
        size: 30,
        current: 1,
        sizes: [30, 70, 100, 150],
        total: 0
      },
      tableData: {
        loading: false,
        column: [],
        data: [],
        defaultProp: {prop: 'createTime', order: 'descending'},
        sortOrders: ['descending', 'ascending']
      },
      orderField: '',
      orderBy: 'DESC',
      tableSelectionData: []
    };
  },
  methods: {
    /**
     * 分页事件
     * @param val         值
     * @param type        分页类型：size：每页条数，current：当前页
     */
    pagingEvent(val, type) {
      if (type === 'size') {
        this.pagingData.size = val;
        this.pagingData.current = 1;
      } else {
        this.pagingData.current = val;
      }
      this.getTableData();
    },

    /** 表格排序 */
    sortChange({column, prop, order}) {
      this.orderField = prop;
      this.orderBy = order === 'ascending' ? 'ASC' : 'DESC';

      this.getTableData();
    },

    /* 搜索、新增、删除 表格数据时调用 */
    refreshTableData() {
      this.pagingData.current = 1;
      this.getTableData();
    },

    /** 表格勾选 */
    tableSelection(row) {
      this.tableSelectionData = row;
    },

    /* 获取分页参数 */
    getPageParams() {
      return {
        currentPage: this.pagingData.current,
        pageSize: this.pagingData.size
      };
    },

    /* 表格勾选参数 */
    tableSelectParams(key, temp = this.tableSelectionData) {
      const list = [];
      temp.map(it => list.push(it[key]));
      return list;
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
    },

    // 拼接get参数
    getDownLoadParam(obj) {
      delete obj.currentPage;
      delete obj.pageSize;
      return obj;
    },

    /* 威胁告警、威胁分析、数据节点-列表刷新 */
    threatRefreshTableData(obj) {
      this.orderField = obj.orderField;
      this.orderBy = obj.orderBy;
      this.refreshTableData();
    }
  }
};
