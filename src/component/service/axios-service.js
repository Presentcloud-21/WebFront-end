import axios from 'axios';
import {message,Modal} from 'antd';
axios.interceptors.request.use(
    (config) => {

      console.log('request success:',config);
      let token = window.localStorage.getItem('token');
      config.headers.Authorization = token;
      
      return config;
    },(error)=> {
      // console.log('request error:',error);
      return Promise.reject(error);
    }
  )
  
  axios.interceptors.response.use(
    (response)=>{
      // console.log('response suceess:',response);
      return response;
    },(error)=>{
      const code=error.response.status;
      // console.log('response error:',code);
      switch(code) {
        case 401:window.location.href-'/login';break;
        // case 404:window.location.href='/status404';break;
        // case 502:window.location.href='/status502';break;
        // case 504:window.location.href='/status504';break;
      }
      return Promise.reject(error);
    }
  )
  axios.defaults.headers.post['Content-Type']="application/json";
export async function AddToken(token) {
  console.log('token',token);
  window.localStorage.setItem('token',token);
}
export function getLocalData(code) {
  const res=window.sessionStorage.getItem(code);
  if(res==undefined || res==null) return res;
  return JSON.parse(res);
}
export async function Request(method,target,data) {
    var info;
    method = method || 'POST';
    if(method === 'GET') {
        info = await Get(target);
    }
    if(method === 'POST') {
        info = await Post(target,data);
    }
    // if(info.success) {b
    //   alert(info.msg);
    // }
    
    // console.log('request data',info);
    return info;
}

async function Get(target) {
    const info = await axios.get(target);
    return info;
}

async function Post(target,data) {
    const info = await axios.post(target,data);
    return info;
}
export function errorModal(title,content) {
  Modal.error({
    title: title,
    content: content,
  });
}
export function successMessage(content)  {
  message.success(content);
}