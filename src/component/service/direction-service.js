import './config'
import { Request } from './axios-service';
let direction={};

export  function transformDirectionData(value,code) {
    if(!direction[code]) {
        direction[code]=JSON.parse(window.sessionStorage.getItem(code));
    }
    if(value==undefined || value==null) {
        return direction[code]['default'];
    }
    return direction[code]["_"+String(value)];
}

export function hasDirectionKey(code) {
    return window.sessionStorage.getItem(code)!=null;
}

export function getDirection() {
    Request('GET','/ajax/dictionary').then((response)=>{
        const {data}=response.data;
        addDirection(data);
      });
}
function addDirection(list) {
    list.map((i)=>{
        Request('GET','/ajax/dictionary/dictionarydetailbycode/'+i.dictionaryCode).then((response)=>{
            const {data}=response.data;
            let dire={};
            for(let i=0;i<data.length;++i) {
                dire["_"+String(data[i].itemKey)]=data[i].itemValue;
                if(data[i].isdefault==1) dire['default']=data[i].itemValue;
            }
            window.sessionStorage.setItem(i.dictionaryCode,JSON.stringify(dire));
            if(i.child) {
                addDirection(i.child);
            }
          });
    });
}