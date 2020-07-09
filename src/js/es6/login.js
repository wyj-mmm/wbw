let $login = $('.loginBtn')
console.log($login);
let $registor = $('.registorBtn')
let $c1 = $('.change1')
let $c2 = $('.change2')
$registor.click(function(){
    $c1.css(
        'display','block'
    ) 
    $c2.css(
        'display','none'
    ) 
    $login.css(
        "color","#666"
    )
    $registor.css(
        "color","#D70057"
    )
})
$login.click(function(){
    $c1.css(
        'display','none'
    ) 
    $c2.css(
        'display','block'
    )
    $login.css(
        "color","#D70057"
    )
    $registor.css(
        "color","#666"
    )
})
class Login{
    constructor(){
        //属性
        this.phone = this.$('.phone');
        this.pwd = this.$('.pwd');
        this.login = this.$('.login_btn');
        this.addEvent();
    }
    addEvent(){
        let that = this
         //判断用户
         this.phone.onblur = function(){
            let re = /^13(\d){9}$/;
            let str = that.phone.value;
            if(!re.test(str)){
                this.nextElementSibling.innerHTML = '手机号码格式错误'
                that.phone.value = '';
            }
        }
        //检测密码
        this.pwd.onblur = function(){
            let re = /^\w{3,6}$/;
            let str = that.pwd.value;
            if(!re.test(str)){
                // console.log(this.nextElementSibling);
                // this.nextElementSibling = '密码格式错误'
                // alert('密码必须是3~6位的字母、数字、下划线组成！');
                // this.upwd.value = '';
            }
        }
        //登录
        this.login.onclick = function(){
            // console.log(this.nextElementSibling);
            // 获取用户名密码
            let phone = that.phone.value;
            let pwd = that.pwd.value;
            // //获取cookie
            let cookieStr = getCookie('registors') ? getCookie('registors') : '';
            // //转对象
            let cookieObj = convertStrToObj(cookieStr);
            // //判断是否存在 
            if(phone in cookieObj){
            //在
                if(pwd === cookieObj[phone]){
                    this.nextElementSibling.innerHTML = '登录成功,3秒钟进入首页'
                    setTimeout(()=>{
                        location.href = '../../dist/index.html';
                    },3000)
                }else{
                    this.nextElementSibling.innerHTML = '密码错误'
                }
            }else{
                this.nextElementSibling.innerHTML = '账号不存在'
                that.phone.value = that.pwd.value = '';
            }
        }
    }
    $(selector){
        return document.querySelector(selector);
    }
}

window.onload = function(){
    new Login();
}