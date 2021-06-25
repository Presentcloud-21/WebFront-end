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
  const menus=[{
      "url":"/home",
      "name":"首页",
      "icon":<HomeOutlined />
  },{
      "url":"/me",
      "name":"我的",
      "icon":<UserOutlined />
  },{
    "url":"/user",
    "name":"用户列表",
    "icon":<AuditOutlined />
},{
    "url":"/class",
    "name":"班课列表",
    "icon":<UnorderedListOutlined />
},{
    "url":"/direction",
    "name":"数据字典",
    "icon":<ReadOutlined />
},{
    "url":"/system-param",
    "name":"系统参数",
    "icon":<SettingOutlined />
}];

  export function getMenu() {
    return menus;
  }

