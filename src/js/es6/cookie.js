function createCookie(key,value,json){
    let cookieText = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    //判断是否传了有效期
    if(!isNaN(json.expires)){
        let date = new Date();
        date.setDate(date.getDate() + json.expires);
        cookieText += ';expires=' + date;
    }
    //判断是否传了domain
    if(json.domain){
        cookieText += ';domain=' + json.domain;
    }
    //判断是否传path
    if(json.path){
        cookieText += ';path=' + json.path;
    }
    //判断是否传了secure
    if(json.secure){
        cookieText += ';secure';
    }
    document.cookie = cookieText;
}
// createCookie('name','lisi',{expires : 5,path : '/'});

function getCookie(key){
    let cookieKey = encodeURIComponent(key) + '=';
    let cookie = document.cookie;
    let start = cookie.indexOf(cookieKey);
    if(start !== -1){
        let end = cookie.indexOf('; ',start);
        if(end === -1){
            end = cookie.length;
        }
        return decodeURIComponent(cookie.substring(start + cookieKey.length,end));
    }
}
 // alert(getCookie('name'));
 
function removeCookie(key,json){
    if(json.path){
        document.cookie = encodeURIComponent(key) + '=;path=' + json.path + ';expires=' + new Date(0);
    }else{
        document.cookie = encodeURIComponent(key) + '=' + ';expires=' + new Date(0);
    }
}
// removeCookie('aa',{path:'/'});