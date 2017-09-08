/*
 *设备兼容设置
 * */
var pixelRatio = 1 / window.devicePixelRatio;
oMeta = document.createElement('meta');
oMeta.charset = 'utf-8';
oMeta.name="viewport";
oMeta.content='width=device-width,initial-scale=' + pixelRatio + ',minimum-scale=' + pixelRatio + ',maximum-scale=' + pixelRatio;
document.getElementsByTagName('head')[0].appendChild(oMeta);
var html = document.getElementsByTagName("html")[0];
var pageWidth = html.getBoundingClientRect().width;
html.style.fontSize = pageWidth / 15 + "px";

/**
 * 移动端事件延迟处理
 */
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

/*列表页头部效果*/
function list_header_scroll() {
    $(window).scroll(function () {
        var top = $(window).scrollTop();
        if (top > 10) {
            $('.article-header').stop().animate({
                height: '2.76rem'
            }, 200);
            $('.header-animate h4').stop().animate({
                fontSize: '.8rem',
                left: '50%',
                top: '0',
                marginLeft: '-2.03rem'
            }, 200);
        } else {
            $('.article-header').stop().animate({
                height: '4.84rem'
            }, 200);
            $('.header-animate h4').stop().animate({
                fontSize: '.96rem',
                'left': '.8rem',
                'top': '2.12rem',
                'margin-left': '0'
            }, 200)
        }
    });
}
