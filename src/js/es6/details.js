(function () {

    var Magnifier = function (ele, obj) {

        this.ele = ele;//原始图片盒子
        this.eleWidth = this.ele.offsetWidth;//原始图片盒子宽度
        this.eleHeight = this.ele.offsetHeight;//原始图片盒子高度
        this.url = '';//放大图片url
        this.maskLayerWidth = obj.maskLayerWidth || obj.maskLayerHeight || 180;//遮罩宽度
        this.maskLayerHeight = obj.maskLayerHeight || obj.maskLayerWidth || 180;//遮罩高度
        this.backgroundScaleX = this.eleWidth / this.maskLayerWidth;//放大后图片与原始图片的放大比例(X)
        this.backgroundScaleY = this.eleHeight / this.maskLayerHeight;//放大后图片与原始图片的放大比例(Y)
        this.scaleX = obj.scale ? obj.scale[0] || obj.scale[1] : this.backgroundScaleX;//放大图片盒子与遮罩的放大比例(X)
        this.scaleY = obj.scale ? obj.scale[1] || obj.scale[0] : this.backgroundScaleY;//放大图片盒子与遮罩的放大比例(Y)

        this.init();
    };

    Magnifier.prototype = {

        constructor: Magnifier,
        init: function () {
            this.ele.style.backgroundSize = '100% 100%';//设置原始图片大小为100%
        },
        createRelativeBox: function () {
            //遮罩
            this.maskLayer = document.createElement('div');
            this.maskLayer.style.cssText = 'position: absolute;border: 1px solid #ccc;background: rgba(255, 255, 255, .7);cursor: move;' +
                'width:' + this.maskLayerWidth + 'px;height:' + this.maskLayerHeight + 'px;'
            this.ele.appendChild(this.maskLayer);
            //放大图片盒子
            this.asideBox = document.createElement('div');
            this.asideBox.style.cssText = 'position:absolute;left:105%;top:50%;border:2px solid #ccc;transform:translateY(-50%);' +
                'width:' + this.maskLayerWidth * this.scaleX + 'px;height:' + this.maskLayerHeight * this.scaleY + 'px;' +
                'background-image:url(' + this.url + ');background-repeat:no-repeat;background-size:' + this.backgroundScaleX * 100 + '% ' + this.backgroundScaleY * 100 + '%';
            this.ele.appendChild(this.asideBox);
        },
        calcPosition: function (e) {
            var left = e.pageX - this.ele.offsetLeft - this.maskLayerWidth / 2,
                top = e.pageY - this.ele.offsetTop - this.maskLayerHeight / 2;
            if (left < 0) {
                left = 0;
            } else if (left > this.eleWidth - this.maskLayerWidth) {
                left = this.eleWidth - this.maskLayerWidth;
            };
            if (top < 0) {
                top = 0;
            } else if (top > this.eleHeight - this.maskLayerHeight) {
                top = this.eleHeight - this.maskLayerHeight;
            };
            this.maskLayer.style.left = left + 'px';
            this.maskLayer.style.top = top + 'px';
            this.asideBox.style.backgroundPosition = left * -this.scaleX + 'px ' + top * -this.scaleY + 'px';
        }
    };
    window.Magnifier = Magnifier;
}());

window.addEventListener('load', function () {

    (function () {

        var smallImgUl = document.querySelector('ul.small-img-ul'),
            phoneDispaly = document.querySelector('a.phone-display');
        
        var i = 0, flag = true;

        var imgArr = {
            'big': [
                '../../dist/img/28cc3cbbf68a49afb3186dc8bef4c345.jpg',
                '../../dist/img/1.jpg',
                '../../dist/img/2.jpg',
                '../../dist/img/3.jpg',
                '../../dist/img/4.jpg'
            ],
            'small': [
                '../../dist/img/d8a76285d9cc44abbcf313a466faf070.jpg',
                '../../dist/img/s_1.jpg',
                '../../dist/img/s_2.jpg',
                '../../dist/img/s_3.jpg',
                '../../dist/img/s_4.jpg'
            ]
        };

        //插入小图片
        var arr = [];
        imgArr['small'].forEach(function (ele) {
            arr.push('<li class=\'img\' style=\'background-image:url(' + ele + ')\'></li>')
        });
        smallImgUl.innerHTML = arr.join('');


        var imgList = smallImgUl.children,
            smallImgWidth = imgList[0].offsetWidth;

        smallImgUl.style.width = imgList.length * smallImgWidth + 'px';

        //获取索引
        function getIndex(item) {
            return Array.prototype.indexOf.call(imgList, item);
        };

        //初始化展示的大图和小图以及相关样式
        initImg();
        function initImg() {
            Array.prototype.forEach.call(imgList, function (ele, index) {
                ele.className = 'img';
            });
            imgList[i].className += ' active';
            phoneDispaly.style.backgroundImage = 'url(' + imgArr['big'][i] + ')';
        };

        //鼠标移入事件
        smallImgUl.addEventListener('mouseover', function (e) {
            i = getIndex(e.target);
            initImg();
        });


        
        var magnifier = new Magnifier(phoneDispaly, {
            maskLayerWidth: 180,
            maskLayerHeight: 240,
            scale: [2]
        });

        function moveEffect(e) {
            if (flag) {
                magnifier.url = imgArr['big'][i];
                magnifier.createRelativeBox();
                flag = false;
            };
            magnifier.calcPosition(e);
        };

        phoneDispaly.addEventListener('mouseenter', function () {
            this.addEventListener('mousemove', moveEffect, false);
            this.addEventListener('mouseleave', function () {
                this.removeEventListener('mousemove', moveEffect);
                this.innerHTML = '';
                flag = true;
            }, false);
        }, false);

        
        //左右按钮点击
        var btnLeft = document.querySelector('.btn-left'),
            btnRight = document.querySelector('.btn-right');

        var overNum = (parseFloat(window.getComputedStyle(smallImgUl, null)['width']) - parseFloat(window.getComputedStyle(smallImgUl.parentNode, null)['width'])) / smallImgWidth;

        var record = 0;
        btnLeft.addEventListener('click', function () {
            record--;
            if (record < 0) {
                record = 0;
                return;
            };
            smallImgUl.style.left = parseFloat(window.getComputedStyle(smallImgUl, null)['left']) + smallImgWidth + 'px';
        }, false);

        btnRight.addEventListener('click', function () {
            record++;
            if (record > overNum) {
                record = overNum;
                return;
            };
            smallImgUl.style.left = parseFloat(window.getComputedStyle(smallImgUl, null)['left']) - smallImgWidth + 'px';
        }, false);
    })();
});






// // 数量
// class Cart{
//     constructor(){
//         // this.btn = $('.btn');
//         // this.blank = $('.blank');
//         this.init();
//     }
//     init(){
//         //获取数据
//         let storage = window.localStorage;
//         let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
//         //判断是否有商品信息
//         if(!storage_str){
//             this.blank.style.display = 'block';
//         }else{
//             //转对象
//             let storage_obj = convertStrToObj(storage_str);
//             let cartList = $('.cartList');
//             //遍历对象
//             for(let key in storage_obj){
//                 //取出商品
//                 let good = storage_obj[key];

//                 //创建ul
//                 let ul = document.createElement('ul');
//                 //设置属性
//                 ul.className = "goodInfo";
//                 ul.setAttribute('data-good-id',key);
//                let str = `
//                     <li class="num">
//                         <a href="javascript:;" class="minus">-</a>
//                         <input type="text" name="" id="" value="${good.num}" />
//                         <a href="javascript:;" class="plus">+</a>
//                     </li>
//                 `;
//                 ul.innerHTML = str;
//                 cartList.appendChild(ul);
//             }
//             //获取所有的-
//             let minus = document.querySelectorAll('.goodInfo .minus');
//             //添加事件
//             for(let i = 0,len = minus.length;i < len;i ++){
//                 minus[i].onclick = function(){
//                     //获取id
//                     let goodId = this.parentNode.parentNode.getAttribute('data-good-id');
//                     //创建storage
//                     let storage = window.localStorage;
//                     //获取内容
//                     let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
//                     //转对象
//                     let storage_obj = convertStrToObj(storage_str);
//                     //改变数量
//                     if(storage_obj[goodId].num > 1){
//                         storage_obj[goodId].num --;
//                     }
//                     //存入storage
//                     storage.setItem('carts',JSON.stringify(storage_obj));
//                     //改变数量框中数量
//                     this.nextElementSibling.value = storage_obj[goodId].num;
//                     //改变小计的值
//                     this.parentNode.nextElementSibling.innerHTML = storage_obj[goodId].price * storage_obj[goodId].num;
//                 }
//             }
//             //获取+
//             let plus = document.querySelectorAll('.goodInfo .plus');
//             for(let i = 0,len = plus.length;i < len;i ++){
//                 plus[i].onclick = function(){
//                     let id = this.parentNode.parentNode.getAttribute('data-good-id');
//                     //创建storage
//                     let storage = window.localStorage;
//                     //获取内容
//                     let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
//                     //转对象
//                     let storage_obj = convertStrToObj(storage_str);
//                     //数量 + 1
//                     storage_obj[id].num ++;
//                     //存入storage
//                     storage.setItem('carts',JSON.stringify(storage_obj));
//                     //数量框
//                     this.previousElementSibling.value = storage_obj[id].num;
//                     //小计
//                     this.parentNode.nextElementSibling.innerHTML = storage_obj[id].price * storage_obj[id].num;
//                 }

//             }
//             //获取所有的数量框
//             let num_inp = document.querySelectorAll('.goodInfo .num input');
//             for(let i = 0,len = num_inp.length;i < len ;i ++){
//                 num_inp[i].onblur = function(){
//                     let id = this.parentNode.parentNode.getAttribute('data-good-id');
//                      //创建storage
//                      let storage = window.localStorage;
//                      //获取内容
//                      let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
//                      //转对象
//                      let storage_obj = convertStrToObj(storage_str);
//                      if(isNaN(this.value) || this.value < 1){
//                          this.value = 1;
//                      }
//                      storage_obj[id].num = this.value;
//                     //存入storage
//                     storage.setItem('carts',JSON.stringify(storage_obj));
//                     //数据变量
//                     // this.value = storage_obj[id].num;
//                     this.parentNode.nextElementSibling.innerHTML = storage_obj[id].price * storage_obj[id].num;
//                 }
//             }
//         }
//     }
// }

// console.log($('#btn').eq(0));

// $('#buy').eq(0).click(function () {
//     location.href = "http://localhost/wbw/dist/pages/cart.html";
// });


class Product{
    constructor(){
       
        //购物车按钮
        this.buy = $('#buy');
        //购买按钮
        this.addToCart = document.querySelector('.addToCart');
        this.index = $('#index');
        //初始化页面
        this.init();
        //添加事件
        this.addEvent();
    }
    init(){
         //创建storage对象
         let storage = window.localStorage;
         //获取storage记录
         let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
         //转成对象
         let storage_obj = convertStrToObj(storage_str);
         let sum = 0;
         for(let key in storage_obj){
             sum += storage_obj[key].num;
         }
         this.buy.value = `购物车(${sum})`;
    }
    addEvent(){
        let that = this;
        //购物车事件
        this.buy.onclick = function(){
            location.href = 'cart.html';
        }
        //购买按钮
        // for(let i = 0,len = this.addToCart.length;i < len;i ++){
            this.addToCart.onclick = function(){
               
                //获取商品ID
                let goodId = this.parentNode.parentNode.getAttribute('data-good-id');
              
                //获取商品名称
                let goodName = this.parentNode.parentNode.firstElementChild.innerHTML;
                
                //获取价格
                let goodPrice = parseInt(this.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.lastElementChild.firstElementChild.nextElementSibling.innerHTML);
                
                //获取缩略图
                let goodSrc = this.parentNode.firstElementChild.src;

                /*
                    key : carts
                    value : 
                    {
                        "sp1" : {
                            "name" : "香蕉",
                            "price" : 444,
                            "num" : 10,
                            "src" : "..."
                        },
                        "sp2" :{
                            "name" : "香蕉",
                            "price" : 444,
                            "num" : 10,
                            "src" : "..."
                        },
                        "sp3" : {
                            "name" : "香蕉",
                            "price" : 444,
                            "num" : 10,
                            "src" : "..."
                        }
                    }
                */

                //创建storage对象
                let storage = window.localStorage;
                //获取storage记录
                let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                //转成对象
                let storage_obj = convertStrToObj(storage_str);
                //判断当前购买商品是否在购物车中存在 
                if(goodId in storage_obj){
                    //存在:找到当前商品的数量 + 1
                    storage_obj[goodId].num ++;
                }else{
                    storage_obj[goodId] = {
                        "name" : goodName,
                        "price" : goodPrice,
                        "src" : "//image8.wbiao.co/shop/28cc3cbbf68a49afb3186dc8bef4c345.jpg?x-oss-process=image/resize,w_90,h_90",
                        "num" : 1
                    }
                }
                //重新存入storage
                storage.setItem('carts',JSON.stringify(storage_obj));

                //获取购物车按钮上的值
                let str = that.buy.value;
                let re = /(\d+)/;
                let num = Number(re.exec(str)[1]);
                num ++;
                that.index.value = `${num}`;
            }
        }
    // }
}
window.onload = function(){
    new Product();
}



// window.onload = function(){
//     new Cart();
// }








