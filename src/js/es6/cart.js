class Cart{
    constructor(){
        this.blank = $('.blank');
        this.init();
    }
    init(){
        //获取数据
        let storage = window.localStorage;
        let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
        //判断是否有商品信息
        if(!storage_str){
            this.blank.style.display = 'block';
        }else{
            //转对象
            let storage_obj = convertStrToObj(storage_str);
            let cartList = $('.cartList');
            //遍历对象
            for(let key in storage_obj){
                //取出商品
                let good = storage_obj[key];

                //创建ul
                let ul = document.createElement('ul');
                //设置属性
                ul.className = "goodInfo";
                ul.setAttribute('data-good-id',key);
               let str = `
                    <li><img src="${good.src}" /></li>
                    <li>${good.name}</li>
                    <li>${good.price}</li>
                    <li class="num">
                        <a href="javascript:;" class="minus">-</a>
                        <input type="text" name="" id="" value="${good.num}" />
                        <a href="javascript:;" class="plus">+</a>
                    </li>
                    <li class="total">${good.price * good.num}</li>
                    <li><a href="javascript:;" class="del">删除</a></li>
                `;
                ul.innerHTML = str;
                cartList.appendChild(ul);
            }
            //获取所有的-
            let minus = document.querySelectorAll('.goodInfo .minus');
            //添加事件
            for(let i = 0,len = minus.length;i < len;i ++){
                minus[i].onclick = function(){
                    //获取id
                    let goodId = this.parentNode.parentNode.getAttribute('data-good-id');
                    //创建storage
                    let storage = window.localStorage;
                    //获取内容
                    let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                    //转对象
                    let storage_obj = convertStrToObj(storage_str);
                    //改变数量
                    if(storage_obj[goodId].num > 1){
                        storage_obj[goodId].num --;
                    }
                    //存入storage
                    storage.setItem('carts',JSON.stringify(storage_obj));
                    //改变数量框中数量
                    this.nextElementSibling.value = storage_obj[goodId].num;
                    //改变小计的值
                    this.parentNode.nextElementSibling.innerHTML = storage_obj[goodId].price * storage_obj[goodId].num;
                }
            }
            //获取+
            let plus = document.querySelectorAll('.goodInfo .plus');
            for(let i = 0,len = plus.length;i < len;i ++){
                plus[i].onclick = function(){
                    let id = this.parentNode.parentNode.getAttribute('data-good-id');
                    //创建storage
                    let storage = window.localStorage;
                    //获取内容
                    let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                    //转对象
                    let storage_obj = convertStrToObj(storage_str);
                    //数量 + 1
                    storage_obj[id].num ++;
                    //存入storage
                    storage.setItem('carts',JSON.stringify(storage_obj));
                    //数量框
                    this.previousElementSibling.value = storage_obj[id].num;
                    //小计
                    this.parentNode.nextElementSibling.innerHTML = storage_obj[id].price * storage_obj[id].num;
                }

            }
            //获取所有的数量框
            let num_inp = document.querySelectorAll('.goodInfo .num input');
            for(let i = 0,len = num_inp.length;i < len ;i ++){
                num_inp[i].onblur = function(){
                    let id = this.parentNode.parentNode.getAttribute('data-good-id');
                     //创建storage
                     let storage = window.localStorage;
                     //获取内容
                     let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                     //转对象
                     let storage_obj = convertStrToObj(storage_str);
                     if(isNaN(this.value) || this.value < 1){
                         this.value = 1;
                     }
                     storage_obj[id].num = this.value;
                    //存入storage
                    storage.setItem('carts',JSON.stringify(storage_obj));
                    //数据变量
                    // this.value = storage_obj[id].num;
                    this.parentNode.nextElementSibling.innerHTML = storage_obj[id].price * storage_obj[id].num;
                }
            }
            //获取所有的删除按钮
            let del = document.querySelectorAll('.goodInfo .del');
            for(let i = 0,len = del.length;i < len;i ++){
                del[i].onclick = function(){
                    let id = this.parentNode.parentNode.getAttribute('data-good-id');
                     //创建storage
                     let storage = window.localStorage;
                     //获取内容
                     let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                     //转对象
                     let storage_obj = convertStrToObj(storage_str);
                     //delete ：删除对象中的属性
                     delete storage_obj[id];
                      //存入storage
                    storage.setItem('carts',JSON.stringify(storage_obj));
                    this.parentNode.parentNode.remove();
                }
            }
        }

        
    }
}
window.onload = function(){
    new Cart();
}