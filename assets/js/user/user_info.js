$(function() {
    const form = layui.form;
    form.verify({
        nickname:(val) => {
            if(val.length > 6) {
                return '昵称长度需在1-6位字符间';
            }
        }
    })
    const initUserinfo = () => {
        $.ajax({
            type: 'GET',
            url:"/my/userinfo",
            success:(res) => {
               if(res.status !== 0){
                   return layer.msg('获取信息失败');
               }
               layer.msg('获取用户信息成功');
               form.val('formUserInfo',res.data);
            }
        })
    }
    initUserinfo()
    //重置表单
    $('#btnReset').click((e) => {
        e.preventDefault();
        initUserinfo()
    })
    //更新用户信息
    $('.layui-form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:(res) => {
               if(res.status !==0 ){
                   return layer.msg('获取信息失败');
               }
               layer.msg('更新用户信息成功')
               //通知父页面，更新用户信息
               window.parent.getUserInfo()
            }
        })
    })
})