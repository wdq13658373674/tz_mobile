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
            $('.list-header').addClass('animation');
            $('.msg-list').css('margin-top', '6.64rem');
        } else {

            $('.list-header').removeClass('animation');
            $('.msg-list').css('margin-top', '4.84rem');
        }
    });
}

/*判断横竖屏切换*/

// window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
//     if (window.orientation === 180 || window.orientation === 0) {
//         history.go(0)
//     }
//     if (window.orientation === 90 || window.orientation === -90 ){
//         history.go(0)
//     }
// }, false);

