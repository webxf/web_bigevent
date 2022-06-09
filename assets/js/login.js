$(function() {
    $('#link_reg').click(function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').click(function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    //先引入form来自layui
    const form = layui.form; 
    //自定义校验规则
    form.verify({
        //数组方式
        password:[/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        //函数方式
        repwd:(value) =>{
            //先获取密码框
            const pwd = $('.reg-box [name=password]').val();
            //判断两次密码是否一致
            if(pwd != value) return '两次密码不一致';
        }
    })
    // const baseURL = 'http://www.liulongbin.top:3007';
    //监听表单提交事件，发送注册请求
    $('#form_reg').submit(function(e){
        e.preventDefault();
        //发起注册请求
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data:{
                username:$('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val(),
            },
            success:(res) => {
                if(res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功');
                //模拟点击事件，跳转到登录
                $('#link_login').click();
            },
           
        })
    })
    //监听登录表单提交事件，发送登录请求
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:(res) => {
                if(res.status !==0 ) return layer.msg('登录失败'); 
                layer.msg('登录成功');
                //要把token存在本地
                localStorage.setItem('token',res.token);
                //跳转到首页
                location.href ='/index.html';
            }
        })
    })
})