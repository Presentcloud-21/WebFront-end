import './config'
const sexdata={
    "0":"男",
    "1":"女",
    "2":"未知"
}
const majordata={
    "0":"计算机",
    "1":"机械",
    "2":"电气"
}
const total = {
    "sex":sexdata,
    "major":majordata
}
let list = {};

export function transformDirectionData(value,code) {
    console.log(total[code]);
    if(!list.hasOwnProperty(code)) {
        list[code]=total[code];
    }
    return list[code][value];
}