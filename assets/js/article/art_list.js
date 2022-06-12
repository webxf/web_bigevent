$(function() {
    const form = layui.form;
    const laypage = layui.laypage;
    // 定义一个查询的参数对象，将来请求数据的时候，
// 需要将请求参数对象提交到服务器
   const q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: "", // 文章分类的 Id
    state: "", // 文章的发布状态
};
//获取文章列表
const initTable = () => {
    $.ajax({
        type:'GET',
        url:'/my/article/list',
        data:q,
        success:(res) => {
            if(res.status !== 0)return layer.msg('获取文章列表失败');
            layer.msg('获取文章列表成功');
            const htmlStr = template('tpl-table',res);
            $('tbody').html(htmlStr);
            renderPage(res.total)
        }
    })
}
// 初始化文章分类的方法
const initCate = () => {
    $.ajax({
        type:"GET",
        url:'/my/article/cates',
        success:(res) => {
            if(res.status !== 0) return layer.msg('获取分类数据失败');
            layer.msg('获取分类数据成功');
            let htmlStr = template('tpl-cate',res);
            $('[name = cate_id]').html(htmlStr);
            form.render();
        }
    })
}
//筛选功能
$('#form-search').submit((e) => {
    e.preventDefault();
    q.cate_id = $('[name = cate_id]').val();
    q.state = $('[name = statue]').val();
    initTable()
})
//分页函数
const renderPage = (total) => {
    laypage.render({
        elem:'pageBox',
        count:total,
        limit:q.pagesize,
        curr:q.pagenum,
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [2, 3, 5, 10],
        //切换分页时，触发事件
        //jump函数触发时机
        //1、当我们执行render函数时就会执行（首次加载）
        // 2、当我们切换分页的时候就会执行
        //目的就是首次加载的时候不去执行initTable
        jump:function(obj,first) {
            console.log(first);
            q.pagenum = obj.curr;
            q.pagesize = obj.limit;
            if(!first){
                initTable();
            }
        }
    })
}
//删除文章
$('tbody').on('click','.btn-delete',function() {
    const btnNum = $('.btn-delete').length;
    const id = $(this).attr('data-id');
     // 询问用户是否要删除数据
     layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
         $.ajax({
             type:'GET',
             url:'/my/article/delete/' + id,
             success:(res) => {
                 if(res.status !== 0) return layer.msg('删除文章失败');
                 layer.msg('删除文章成功');
                 if(btnNum === 1){
                     q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                 }
                 initTable()
                 layer.close(index);
             }
         })
     })
})
initTable();
initCate();
// 定义美化时间的过滤器
template.defaults.imports.dataFormat = function(date) {
    const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}

// 定义补零的函数
function padZero(n) {
    return n > 9 ? n : '0' + n
}
})