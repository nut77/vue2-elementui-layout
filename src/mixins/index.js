// mixins分发组件中可以复用的功能，extends扩展另一个组件（便于扩展单文件组件）
import hook from '@/mixins/hook';
import table from '@/mixins/table';
import dialog from '@/mixins/dialog';
import userInfo from '@/mixins/userInfo';

export default {
  hook,
  table,
  dialog,
  userInfo
};
