/**
 * Created by wdq on 17/3/16.
 */
/*
 * 获取验证码倒计时
 * */
var wait = 60;
var t;
function times() {
    if (wait == 0) {
        $("#send").removeClass("disabled");
        $("#send").html("获取验证码");
        wait = 60;
        clearTimeout(t);
    } else {
        //$('#send').unbind("click");
        $("#send").addClass("disabled");
        $("#send").html(wait+"秒后重发");
        wait--;
        t = setTimeout(function() {
            times()
        }, 1000)
    }
}

/*表单验证*/
var tips=$('.err-tip'),
    errMsg='';
function checkMsg(){
    $('.form-box .input').each(function(index){
        var self=$(this)
            ,inx=index;

        self.blur(function(){
            self.parent().removeClass('active');
            tips.eq(inx).text('');

            if(this.value==''){
                errMsg='不能为空!';
                errTips(errMsg,inx,self);
            }

            if(self.is('#phone') ){
                if(this.value != '' && !is_mobile(this.value)){
                    errMsg='电话号码输入错误!';
                    errTips(errMsg,inx,self);
                }
            }

            if(self.is('#pas')){
                if(this.value != '' && this.value.length < 6 || this.value.length >18){
                    errMsg='密码为6-18位!';
                    errTips(errMsg,inx,self);
                }
            }

            if(self.is('#pas-sure')){
                if(this.value != $('#pas').val()){
                    errMsg='密码输入不一致!';
                    errTips(errMsg,inx,self);
                }
            }

            if(self.is('#name')){
                if(this.value != '' && !is_name(this.value)){
                    errMsg='姓名格式有误!';
                    errTips(errMsg,inx,self);
                }
            }

            if(self.is('#IDcard')){
                if(this.value != '' && !is_card(this.value)){
                    errMsg='身份证号码格式有误!';
                    errTips(errMsg,inx,self);
                }
            }

            if(tips.text() == ''){
                $('#register').removeClass('disabled');
            }
        });
    })
};
/*错误信息*/
function errTips(errMsg,inx,self){
    tips.eq(inx).text(errMsg);
    self.parent().addClass('active');
}
checkMsg();
