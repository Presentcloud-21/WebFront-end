import {
    UserOutlined,
    HomeOutlined,
    UnorderedListOutlined,
    SettingOutlined ,
    ReadOutlined,
    AuditOutlined,
  
  } from '@ant-design/icons';
import { errorModal, Request } from './axios-service';
// import { getLocalData } from './axios-service';
// import { getRoleRightbyId } from './direction-service';
  const icons={
    "无":"",
    'HomeOutlined':<HomeOutlined />,
    'UserOutlined':<UserOutlined />,
    'AuditOutlined':<AuditOutlined />,
    'UnorderedListOutlined':<UnorderedListOutlined />,
    'ReadOutlined':<ReadOutlined />,
    'SettingOutlined':<SettingOutlined />
  }

  const RoleMenu={
      'user:list':'getUserList',
      'user:delete':'deleteUser',
      'user:edit':'editUser',
      'class:created':'getCreatedClass',
      'class:delete_created':'deleteCreatedClass',
      'class:all':'getAllClass',
      'class:delete_all':'deleteAllClass',
      'class:describe':'getDescribeClass',
      'class:describe:editCreated':'editDescribeCreatedClass',
      'class:describe:editAll':'editDescribeAllClass',
      'class:creating':'createClass',
      'dictation':'getDictation',
      'dictation:edit':'editDictation',
      'system-param':'getSysparam',
      'sysparam-edit':'editSysparam'

  };
  
  export function getIconList() {
      return icons;
  }
  export function getIcon(icon) {
      return icons[icon];
  }      
  export function getRoleMenuId(list) {
      if(list==null || list.length==0) return {'idList':[]};
      let res=[];
      for(let i=0;i<list.length;++i) {
          res.push(list[i].menuId);
          const temp=getRoleMenuId(list[i].childmenus);
          res=res.concat(temp['idList']);          
      }
      return {'idList':res};
  }
  let map=new Map();
  export function getRoleMenuMap(list) {
    if(list==null || list.length==0) return {'mapList':{}};
    for(let i=0;i<list.length;++i) {
        map.set(list[i].menuId,list[i].name)
        getRoleMenuMap(list[i].childmenus);
    }
    return {'mapList':map};
  }
  export function checkRight(code) {
      return JSON.parse(window.sessionStorage.getItem('right'))[code]==true?true:false;
  }
  function getRoleMenuPath(list) {
    if(list==null || list.length==0) return [];
    let res={};
    for(let i=0;i<list.length;++i) { 
        const s=RoleMenu[list[i].name];
        if(s!=undefined && s!=null) {
            res[s]=true;
        }
        res=Object.assign(res,getRoleMenuPath(list[i].childmenus));
    }
    return res;
}

  export  function errorRight() {
    errorModal('访问失败','你没有这个权限，请联系管理员',()=>window.history.back());
    
  }
  
  export async function getMenu(id) {  
      if(id==undefined || id==null) {
          id=JSON.parse(window.sessionStorage.getItem('user')).role;
      }

      return new Promise((resolve,reject)=>{
          Request('GET','/ajax/menu/getMenuByRoleId/'+id).then( async (response)=>{
                let {data}=response.data;
                for(let i=0;i<data.length;++i) {
                    data[i].url="/"+data[i].name;
                }
                const right=getRoleMenuPath(data);
                window.sessionStorage.setItem('right',JSON.stringify(right));
                window.sessionStorage.setItem('menus',JSON.stringify(data));
                resolve(data);
            });
        // Request('GET','/ajax/menu/getAllMenu').then( async (response)=>{
        //     let {data}=response.data;
        //     for(let i=0;i<data.length;++i) {
        //         data[i].url="/"+data[i].path;
        //     }
        //     window.sessionStorage.setItem('menus',JSON.stringify(data));
        //     resolve(data);
        // });
      })
    //   return new Promise((resolve,reject)=>{
    //       if(getLocalData('rightnow')==null) {
    //         getRoleRightbyId(getLocalData('user').role).then((res)=>{
    //             window.sessionStorage.setItem('rightnow',JSON.stringify(res));
    //             let map=new Map();
    //             res.map((i)=>{
    //                 map.set(i,true);
    //             })
    //             console.log('MAP',map);
    //             const right=getLocalData('roleright');
    //             let result=[];
    //             for(let i=0;i<menus.length;++i) {
    //                 const r = menus[i].right;
    //                 if(r==null || map.get(right[r])) { 
    //                     result.push(menus[i]);
    //                 }
    //             }
    //             resolve(result);
    //         });
    //       } else {
    //           const res=getLocalData('rightnow');
    //           console.log('rightnow',res);
    //             let map=new Map();
    //             for(let i=0;i<res.length;++i) {
    //                 map.set(res[i],true);
    //             };
    //             console.log('MAP',map);

    //         const right=getLocalData('roleright');
    //         let result=[];
    //         for(let i=0;i<menus.length;++i) {
    //             const r = menus[i].right;
    //             if(r==null || map.get(right[r])) { 
    //                 result.push(menus[i]);
    //             }
    //         }
    //         resolve(result);
    //       }
       
    //   })
  }

