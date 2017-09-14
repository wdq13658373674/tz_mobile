/**
 * Created by wdq on 2017/9/14.
 */
/**
 * 底部banner按钮波动
 * */
window.onload=function(){
    var openDoor=document.querySelector('.nav-middle');//按钮class
    var dotList=document.querySelector('.dot-box');

    openDoor.addEventListener('touchstart',function(e){
        var oEvent=window.event || e;
        oEvent.preventDefault();

        dotList.classList.add('show');
        dotList.classList.add('infinite');
    })
    openDoor.addEventListener('touchend',function(e){
        var oEvent=window.event || e;
        oEvent.preventDefault();

        dotList.classList.remove('infinite');
        var animationEnd=aniEndName();
        dotList.addEventListener(animationEnd,function(){
            dotList.classList.remove('show');
        })
    })
}
/**
 * animationend兼容检测
 * */
function aniEndName() {
    var eleStyle = document.createElement('div').style;
    var verdors = ['a', 'webkitA', 'MozA', 'OA', 'msA'];
    var endEvents = ['animationend', 'webkitAnimationEnd', 'animationend', 'oAnimationEnd', 'MSAnimationEnd'];
    var animation;
    for (var i = 0, len = verdors.length; i < len; i++) {
        animation = verdors[i] + 'nimation';
        if (animation in eleStyle) {
            return endEvents[i];
        }
    }
    return 'animationend';
};