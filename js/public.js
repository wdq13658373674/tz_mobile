/*
 *设备兼容设置
 * */
//alert("测试不影响正常操作！" + navigator.userAgent);
!function (N, M) {
    function L() {
        var a = I.getBoundingClientRect().width;
        a / F > 540 && (a = 540 * F);
        var d = a / 15;
        I.style.fontSize = d + "px", D.rem = N.rem = d
    }

    var K, J = N.document, I = J.documentElement, H = J.querySelector('meta[name="viewport"]'),
        G = J.querySelector('meta[name="flexible"]'), F = 0, E = 0, D = M.flexible || (M.flexible = {});
    if (H) {
        console.warn("将根据已有的meta标签来设置缩放比例");
        var C = H.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        C && (E = parseFloat(C[1]), F = parseInt(1 / E))
    } else {
        if (G) {
            var B = G.getAttribute("content");
            if (B) {
                var A = B.match(/initial\-dpr=([\d\.]+)/), z = B.match(/maximum\-dpr=([\d\.]+)/);
                A && (F = parseFloat(A[1]), E = parseFloat((1 / F).toFixed(2))), z && (F = parseFloat(z[1]), E = parseFloat((1 / F).toFixed(2)))
            }
        }
    }
    if (!F && !E) {
        var y = N.navigator.userAgent, x = (!!y.match(/android/gi), !!y.match(/iphone/gi)),
            w = x && !!y.match(/OS 9_3/), v = N.devicePixelRatio;
        F = x && !w ? v >= 3 && (!F || F >= 3) ? 3 : v >= 2 && (!F || F >= 2) ? 2 : 1 : 1, E = 1 / F
    }
    if (I.setAttribute("data-dpr", F), !H) {
        if (H = J.createElement("meta"), H.setAttribute("name", "viewport"), H.setAttribute("content", "initial-scale=" + E + ", maximum-scale=" + E + ", minimum-scale=" + E + ", user-scalable=no"), I.firstElementChild) {
            I.firstElementChild.appendChild(H)
        } else {
            var u = J.createElement("div");
            u.appendChild(H), J.write(u.innerHTML)
        }
    }
    N.addEventListener("resize", function () {
        clearTimeout(K), K = setTimeout(L, 300)
    }, !1), N.addEventListener("pageshow", function (b) {
        b.persisted && (clearTimeout(K), K = setTimeout(L, 300))
    }, !1), "complete" === J.readyState ? J.body.style.fontSize = 12 * F + "px" : J.addEventListener("DOMContentLoaded", function () {
        J.body.style.fontSize = 12 * F + "px"
    }, !1), L(), D.dpr = N.dpr = F, D.refreshRem = L, D.rem2px = function (d) {
        var c = parseFloat(d) * this.rem;
        return "string" == typeof d && d.match(/rem$/) && (c += "px"), c
    }, D.px2rem = function (d) {
        var c = parseFloat(d) / this.rem;
        return "string" == typeof d && d.match(/px$/) && (c += "rem"), c
    }
}(window, window.lib || (window.lib = {}));


/**
 * 移动端事件延迟处理
 */
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
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
    setTimeout(function () {
        $msgbox.fadeOut("slow", function () {
            $(this).remove();
        });
    }, 600);
}

function notice(el, tips) {
    var msgbox = document.createElement('div');
    msgbox.id = 'msgbox';
    $('section').append(msgbox);

    var $msgbox = $('#msgbox');
    $msgbox.html(tips);
    var left = ($msgbox.outerWidth()) / 2;
    $msgbox.css('marginLeft', '-' + left + 'px');
    $(el).addClass("dis");
    setTimeout(function () {

        $msgbox.fadeOut("slow", function () {
            $(this).remove();
            $(el).removeClass("dis");
        });
    }, 600);
}

/*
 * 获取验证码倒计时
 * */
var waits = 60;
var t;

function times() {
    if (waits === 0) {
        $("#send").removeClass("disabled").html("获取验证码");
        waits = 60;
        clearTimeout(t);
    } else {
        $("#send").addClass("disabled").html("重新获取(" + waits + "s)");
        waits--;
        t = setTimeout(function () {
            times()
        }, 1000)
    }
}

/*修复Iscroll高版本安卓无法点击*/
function iScrollClick() {
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
    if (/Silk/i.test(navigator.userAgent)) return false;
    if (/Android/i.test(navigator.userAgent)) {
        var s = navigator.userAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3);
        return parseFloat(s[0] + s[3]) < 44 ? false : true
    }
}

/* 简单的消息弹出层 */
var motify = {
    timer: null,
    /*shade 为 object调用 show为true显示 opcity 透明度*/
    log: function (msg, time, shade) {
        $('.motifyShade,.motify').hide();
        if (motify.timer) clearTimeout(motify.timer);
        if ($('.motify').lenght > 0) {
            $('.motify').show().find('.motify-inner').html(msg);
        } else {
            $('body').append('<div class="motify" style="display:block;"><div class="motify-inner">' + msg + '</div></div>');
        }
        if (shade && shade.show) {
            if ($('.motifyShade').size() > 0) {
                $('.motifyShade').css({'background-color': 'rgba(0,0,0,' + (shade.opcity ? shade.opcity : '0.3') + ')'}).show();
            } else {
                $('body').append('<div class="motifyShade" style="display:block;background-color:rgba(0,0,0,' + (shade.opcity ? shade.opcity : '0.3') + ');"></div>');
            }
        }
        if (typeof(time) == 'undefined') {
            time = 3000;
        }
        if (time != 0) {
            motify.timer = setTimeout(function () {
                $('.motify').hide();
            }, time);
        }
    },
    clearLog: function () {
        $('.motifyShade,.motify').hide();
    },
    checkMobile: function () {
        if (/(iphone|ipad|ipod|android|windows phone)/.test(navigator.userAgent.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    },
    checkIos: function () {
        if (/(iphone|ipad|ipod)/.test(navigator.userAgent.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    },
    checkAndroid: function () {
        if (/(android)/.test(navigator.userAgent.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    },
    checkWeixin: function () {
        if (/(micromessenger)/.test(navigator.userAgent.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    },
    checkApp: function () {
        if (/(pigcmso2olifeapp)/.test(navigator.userAgent.toLowerCase()) || /(pigcmso2oreallifeapp)/.test(navigator.userAgent.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    },
    checkLifeApp: function () {
        if ((/(pigcmso2olifeapp)/.test(navigator.userAgent.toLowerCase()) && /(life_app)/.test(navigator.userAgent.toLowerCase())) || /(pigcmso2oreallifeapp)/.test(navigator.userAgent.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    },
    getLifeAppVersion: function () {
        var reg = /versioncode=(\d+),/;
        var arr = reg.exec(navigator.userAgent.toLowerCase());
        if (arr == null) {
            return 0;
        } else {
            return parseInt(arr[1]);
        }
    },
    getAndroidVersion: function () {
        var index = navigator.userAgent.indexOf("Android");
        if (index >= 0) {
            var androidVersion = parseFloat(navigator.userAgent.slice(index + 8));
            if (androidVersion > 1) {
                return androidVersion;
            } else {
                return 100;
            }
        } else {
            return 100;
        }
    }
};
/*倒计时跳转*/

function jump(el, count, callback) {
    window.setTimeout(function () {
        count--;
        if (count > 0) {
            $(el).html(count);
            jump(el, count, callback);
        } else {
            if (typeof callback === "function") {
                callback();
            }
        }
    }, 1000);
}

/*向下保留2位小数*/
function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.floor(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}