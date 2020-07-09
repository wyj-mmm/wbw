
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

// 轮播图

var mySwiper = new Swiper ('.swiper-container', {
  loop: true, // 循环模式选项
  autoplay:{
      autoplay:true,
      disableOnInteraction:false,
  },
  effect : 'fade',
  fadeEffect: {
      crossFade: true,
  },
  pagination: {
      el: '.swiper-pagination',
      clickable :true,
  },
  // 如果需要前进后退按钮
  navigation: {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
  },
})