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

/*
 *电话号码验证
 * @phone 手机号码
 * */
function is_mobile(phone) {
    var flag = false;
//    var reg0 = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;   //判断 固话
    var reg1 = /^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18|14|17)\d{9}$/;                     //判断 手机
//    if (reg0.test(phone)) {
//        flag = true;
//    }
    if (reg1.test(phone)) {
        flag = true;
    }
    if (!flag) {
        return false;
    } else {
        return true;
    }
}

/*
 *邮箱格式验证
 * @emails 邮箱地址
 * */
function is_email(emails) {
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var email = emails.match(reg);
    if (email != null) {
        return true;  //正确
    } else {
        return false; //错误
    }
}

/*中文姓名格式验证
* @name 中文姓名
* */
function is_name(name) {
    var reg = /^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/;
    var name = name.match(reg);
    if (name != null) {
        return false;  //正确
    } else {
        return true; //错误
    }
}

/*
* 汉字
* */
function isChineseChar(Chinese) {
    var reg = /[^\u4E00-\u9FA5-\-]/g;
    var Chinese = Chinese.match(reg);
    if (Chinese != null) {
        return true;  //正确
    } else {
        return false; //错误
    }
}

/*
 * 地址
 * */
function isAddr(addr) {
    var reg = /(?=.*?[\u4E00-\u9FA5])/;
    var addr = addr.match(reg);
    if (addr != null) {
        return false;  //正确
    } else {
        return true; //错误
    }
}

/*[A-Za-z0-9_\-\u4e00-\u9fa5]+
 *身份证格式验证
 * @card 身份证
 */
function is_card(card) {
    var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    var card = card.match(reg);
    if (card != null) {
        return true;  //正确
    } else {
        return false; //错误
    }
}

/*tips*/
function message(tips) {
    var msgbox = document.createElement('div');
    msgbox.id = 'msgbox';
    $('section').append(msgbox);

    var $msgbox = $('#msgbox');
    $msgbox.html(tips);
    var left = ($msgbox.outerWidth()) / 2;
    $msgbox.css('marginLeft', '-' + left + 'px');
    setTimeout(() => {
        $msgbox.fadeOut("slow", function () {
            $(this).remove();
        });
    }, 600)
}