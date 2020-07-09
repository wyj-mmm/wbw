function rand (a,b){
    if(a > b){
        [a,b] = [b,a];
    }
    return Math.floor(Math.random()*(b-a+1)+a)
}
let sjs = document.querySelector('.sjs')
let str = "";
str = str + rand(0,9) + rand(0,9) + rand(0,9) + rand(0,9);
sjs.innerHTML = str;

class Registor{
    constructor(){
        //属性
        this.phone = this.$('.phone');
        this.pwd = this.$('.pwd');
        this.yz = this.$('.yz');
        this.sjs = this.$('.sjs')
        this.reg = this.$('.reg');
        this.login1 = this.$('.login1')
        this.addEvent();
    }
    addEvent(){
        //reg-点击
        //检测手机号
        let that = this
        this.phone.onblur = function(){
            let re = /^13(\d){9}$/;
            let str = that.phone.value;
            if(!re.test(str)){
                this.nextElementSibling.nextElementSibling.innerHTML = '手机号输入不正确'
                that.phone.value = '';
            }else{
                this.nextElementSibling.nextElementSibling.innerHTML = ''
            }
        }
        //检测密码
        this.pwd.onblur = function(){
            let re = /^\w{3,6}$/;
            let str = that.pwd.value;
            if(!re.test(str)){
                // console.log(this);
                // console.log(this.nextElementSibling.nextElementSibling);
            this.nextElementSibling.nextElementSibling.innerHTML ='密码必须是3~6位的字母、数字、下划线组成！'
                that.pwd.value = '';
            }else{
                this.nextElementSibling.nextElementSibling.innerHTML  = ''
            }
        }
        //检测验证码
        this.yz.onblur = function(){
            let yzm = that.yz.value;
            let yz = that.sjs.innerHTML;
            // console.log(yzm,yz);
            if(yzm !== yz){
                this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = '验证码错误'
            }else{
                this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = ''
            }
        }
        this.reg.onclick = function(){
            if(!that.phone.value || !that.pwd.value || !that.yz.value){
                this.nextElementSibling.nextElementSibling.innerHTML= '信息不能为空！'
                return; //退出函数
            }
            //获取用户名、密码
            let phone = that.phone.value;
            let pwd = that.pwd.value;

            //获取cookie
            let cookie_str = getCookie('registors') ? getCookie('registors') : '';
            // 转对象
            let cookie_obj = convertStrToObj(cookie_str);
            // //判断对象中是否有当前注册的用户
            if(phone in cookie_obj){
                //存在
                this.nextElementSibling.nextElementSibling.innerHTML= '用户名已存在'
                return;
            }else{
                //不存在，将用户添加到对象中
                cookie_obj[phone] = pwd;
            }
            // //存入cookie
            createCookie('registors',JSON.stringify(cookie_obj),{
                expires : 7,
                path : '/'
            })
            that.phone.value = that.pwd.value = that.yz.value = '';
            this.nextElementSibling.nextElementSibling.innerHTML= '注册成功'
        }
        this.login1.onclick = function (){
            location.href = '../../dist/pages/login.html'            
        }
    }
    $(selector){
        return document.querySelector(selector);
    }
}

window.onload = function(){
    new Registor();
}