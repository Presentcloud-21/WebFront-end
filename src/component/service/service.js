import axios from 'axios';
axios.interceptors.request.use(
    (config) => {
      return config;
    },(error)=> {
      return Promise.reject(error);
    }
  )
  
  axios.interceptors.response.use(
    (response)=>{
      console.log('response suceess:',response);
      return response;
    },(error)=>{
      const code=error.response.status;
      console.log('response error:',code);
      switch(code) {
        case 404:window.location.href='/status404';break;
        case 502:window.location.href='/status502';break;
        case 504:window.location.href='/status504';break;
      }
      return Promise.reject(error);
    }
  )

export async function Request(method,target,data) {
    var info;
    method = method || 'POST';
    if(method === 'GET') {
        info = await Get(target);
    }
    if(method === 'POST') {
        info = await Post(target,data);
    }
    console.log('request data',info);
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