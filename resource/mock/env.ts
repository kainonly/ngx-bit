import { en_US, zh_CN } from 'ng-zorro-antd/i18n';
import { BitConfig } from 'ngx-bit';

const bit: BitOptions = {
  url: {
    api: 'http://localhost:9501',
    static: 'https://cdn.kainonly.com/',
    icon: 'https://cdn.kainonly.com/'
  },
  api: {
    namespace: '/system',
    withCredentials: true,
    upload: '/system/main/uploads',
    uploadStorage: 'default',
    uploadSize: 102400
  },
  curd: {
    get: '/get',
    lists: '/lists',
    originLists: '/originLists',
    add: '/add',
    edit: '/edit',
    status: '/edit',
    delete: '/delete'
  },
  col: {
    label: {
      nzXXl: 4,
      nzXl: 5,
      nzLg: 6,
      nzMd: 7,
      nzSm: 24
    },
    control: {
      nzXXl: 8,
      nzXl: 9,
      nzLg: 10,
      nzMd: 14,
      nzSm: 24
    },
    submit: {
      nzXXl: { span: 8, offset: 4 },
      nzXl: { span: 9, offset: 5 },
      nzLg: { span: 10, offset: 6 },
      nzMd: { span: 14, offset: 6 },
      nzSm: { span: 24, offset: 0 }
    },
    test: {
      nzXXl: { span: 8, pull: 16, order: 2 },
      nzXl: { span: 10, pull: 14, order: 3 }
    }
  },
  locale: {
    default: 'zh_cn',
    mapping: ['zh_cn', 'en_us'],
    bind: [zh_CN, en_US]
  },
  i18n: {
    default: 'zh_cn',
    contain: ['zh_cn', 'en_us'],
    switch: [
      {
        i18n: 'zh_cn',
        name: {
          zh_cn: '中文',
          en_us: 'Chinese'
        }
      },
      {
        i18n: 'en_us',
        name: {
          zh_cn: '英文',
          en_us: 'English'
        }
      }
    ]
  },
  page: 10,
  query: 'sql-orm'
};

export const environment = {
  production: true,
  bit
};
