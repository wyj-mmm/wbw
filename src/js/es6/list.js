// 二级菜单
var olis = $('#shop_ul li')
var oul = $('#shop_ul')
var oDivs = $('#shop_ul_erji .box')
var oShop = $('#shop')
var Bigo  = $('#shop_ul_erji')
var index = 0
var lastIndex = 0

$(oShop).mouseenter(function(){
    $(oul).css({display:'block'})
    $(oul).mouseenter(function(){
        $(oul).css({display:'block'})
        for( let i= 0; i < olis.length; i ++ ){
                console.log(i)
        }
        
    }).mouseleave(function(){
        $(oul).css({display:'none'})
    })
    
}).mouseleave(function(){
    $(oul).css({display:'none'})
})

// 列表
class List{
    constructor(){
        this.url = "http://localhost/wbw/dist/libs/data/list.json";
        this.$goods = $(".good_box");
        // this.$i = $(".good_box")
        this.load();
    }
    load(){
        var that = this;
        $.getJSON(this.url,function(data){
            that.display(data)
            that.$i.last().html(data.length);
        })
    }
    display(data){
        let str = "";
        for(var i=0;i<data.length;i++){
            str += `<div class="wGoods" index="${data[i].goodId}">
                        <a href="http://localhost/wbw/dist/pages/details.html?id=${data[i].goodId}">
                            <img class="img1" src="${data[i].imgs.largeImg[0]}" alt="">
                            <div><span>${data[i].brand}</span></div>
                            <p>${data[i].title}</p>
                            <h3>￥${data[i].price}</h3>
                        </a>
                    </div>`
        }
        this.$goods.append(str);
    }
}
new List;