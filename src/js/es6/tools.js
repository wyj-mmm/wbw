//将字符串转为对象
function convertStrToObj(str){
    if(!str){
        return {};
    }else{
        return JSON.parse(str);
    }
}
function $(selector){
    return document.querySelector(selector);
}

