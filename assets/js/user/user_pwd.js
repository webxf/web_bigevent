$(function() {
    const form = layui.form;
    form.verify({
        pwd:[/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        samePwd: (value) => {
            if(value === $('[name=oldPwd]').val()) return '新旧密码不能相同';
        }, 
        rePwd: (value) => {
            if(value !== $('[name=newPwd]').val()) return '两次密码应该相同';
        }
    })
    //更新密码
    $('.layui-form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:(res) => {
                if(res.status !== 0) return layer.msg('更新密码失败');
                layer.msg('更新密码成功');
                //强制清空token
                localStorage.removeItem('token');
                //跳转到登录页面
                window.parent.location.href = '/login.html';
            }
        })
    })
})