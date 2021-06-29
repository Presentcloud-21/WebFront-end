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
      return new Promise((resolve,reject)=>{
          if(getLocalData('rightnow')==null) {
            getRoleRightbyId(getLocalData('user').role).then((res)=>{
                window.sessionStorage.setItem('rightnow',JSON.stringify(res));
                let map=new Map();
                res.map((i)=>{
                    map.set(i,true);
                })
                console.log('MAP',map);
                const right=getLocalData('roleright');
                let result=[];
                for(let i=0;i<menus.length;++i) {
                    const r = menus[i].right;
                    if(r==null || map.get(right[r])) { 
                        result.push(menus[i]);
                    }
                }
                resolve(result);
            });
          } else {
              const res=getLocalData('rightnow');
              console.log('rightnow',res);
                let map=new Map();
                for(let i=0;i<res.length;++i) {
                    map.set(res[i],true);
                };
                console.log('MAP',map);

            const right=getLocalData('roleright');
            let result=[];
            for(let i=0;i<menus.length;++i) {
                const r = menus[i].right;
                if(r==null || map.get(right[r])) { 
                    result.push(menus[i]);
                }
            }
            resolve(result);
          }
       
      })
  }

