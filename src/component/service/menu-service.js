import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    HomeOutlined,
    UnorderedListOutlined,
    SettingOutlined ,
    ReadOutlined,
    AuditOutlined,
    SmileOutlined,
  
  } from '@ant-design/icons';
import { getLocalData } from './axios-service';
import { getRoleRightbyId } from './direction-service';
  const menus=[{
      "url":"/home",
      "name":"首页",
      'right':null,
      "icon":<HomeOutlined />
  },{
      "url":"/me",
      "name":"我的",
      'right':null,
      "icon":<UserOutlined />
  },{
    "url":"/user",
    "name":"用户列表",
    'right':null,
    "icon":<AuditOutlined />
},{
    "url":"/class",
    "name":"我的班课",
    'right':null,
    "icon":<UnorderedListOutlined />
},{
    "url":"/direction",
    "name":"数据字典",
    'right':'updateDictory',
    "icon":<ReadOutlined />
},{
    "url":"/system-param",
    "name":"系统参数",
    'right':'updateSyspara',
    "icon":<SettingOutlined />
},{
    "url":"/role-edit",
    "name":"角色管理",
    'right':'updateRole',
    "icon":<SettingOutlined />
}];

  export function getMenu() {
      return menus;
  }

