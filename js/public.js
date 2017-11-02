/*
 *设备兼容设置
 * */
/*var pixelRatio = 1 / window.devicePixelRatio;
console.log(window.document.documentElement.clientWidth * window.devicePixelRatio);
oMeta = document.createElement('meta');
oMeta.charset = 'utf-8';
oMeta.name="viewport";
oMeta.content='width=device-width,initial-scale=' + pixelRatio + ',minimum-scale=' + pixelRatio + ',maximum-scale=' + pixelRatio;
document.getElementsByTagName('head')[0].appendChild(oMeta);
var html = document.getElementsByTagName("html")[0];
var pageWidth = html.getBoundingClientRect().width;
html.style.fontSize = pageWidth / 15 + "px";
*/

(function (designWidth, rem2px) {
    var win = window;
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var dpr = 0;
    var scale = 0;
    var tid;

    if (!dpr && !scale) {
        var devicePixelRatio = win.devicePixelRatio;
        if (win.navigator.appVersion.match(/iphone/gi)) {
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    } else {
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    }
    // 以上代码是对 dpr 和 viewport 的处理，代码来自 lib-flexible。

    // 一下代码是处理 rem，来自上篇文章。不同的是获取屏幕宽度使用的是
    // document.documentElement.getBoundingClientRect
    // 也是来自 lib-flexible ，tb的技术还是很强啊。
    function refreshRem(_designWidth, _rem2px) {
        // 修改viewport后，对网页宽度的影响，会立刻反应到
        // document.documentElement.getBoundingClientRect().width
        // 而这个改变反应到 window.innerWidth ，需要等较长的时间
        // 相应的对高度的反应，
        // document.documentElement.getBoundingClientRect().height
        // 要稍微慢点，没有准确的数据，应该会受到机器的影响。
        var width = docEl.getBoundingClientRect().width;
        var d = window.document.createElement('div');
        d.style.width = '1rem';
        d.style.display = "none";
        docEl.firstElementChild.appendChild(d);
        var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
        // d.remove();
        var portrait = "@media screen and (width: " + width + "px) {html{font-size:" + ((width / (_designWidth / _rem2px) / defaultFontSize) * 100) + "%;}}";
        var dpStyleEl = doc.getElementById('dpAdapt');
        if (!dpStyleEl) {
            dpStyleEl = document.createElement('style');
            dpStyleEl.id = 'dpAdapt';
            dpStyleEl.innerHTML = portrait;
            docEl.firstElementChild.appendChild(dpStyleEl);
        } else {
            dpStyleEl.innerHTML = portrait;
        }
        // 由于 height 的响应速度比较慢，所以在加个延时处理横屏的情况。
        setTimeout(function () {
            var height = docEl.getBoundingClientRect().height;
            var landscape = "@media screen and (width: " + height + "px) {html{font-size:" + ((height / (_designWidth / _rem2px) / defaultFontSize) * 100) + "%;}}"
            var dlStyleEl = doc.getElementById('dlAdapt');
            if (!dlStyleEl) {
                dlStyleEl = document.createElement('style');
                dlStyleEl.id = 'dlAdapt'
                dlStyleEl.innerHTML = landscape;
                docEl.firstElementChild.appendChild(dlStyleEl);
            } else {
                dlStyleEl.innerHTML = landscape;
            }
        }, 500);
    }

    // 延时，让浏览器处理完viewport造成的影响，然后再计算root font-size。
    setTimeout(function () {
        refreshRem(designWidth, rem2px);
    }, 1);

})(640, 100);


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