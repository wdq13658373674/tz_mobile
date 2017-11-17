/**
 * Created by wdq on 17/3/16.
 */
/*
 * 获取验证码倒计时
 * */
var wait = 60,
    t;
function times() {
    if (wait === 0) {
        $("#send").removeClass("disabled").html("获取验证码");
        wait = 60;
        clearTimeout(t);
    } else {
        $("#send").addClass("disabled").html("重新获取(" + wait + "s)");
        wait--;
        t = setTimeout(function() {
            times()
        }, 1000)
    }
}