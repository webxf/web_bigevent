$(function() {
    const form = layui.form
    const initArtCateList = () => {
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:(res) => {
                if(res.status !== 0) return layer.msg('获取失败');
                const htmlStr = template('tpl-table',res);
                $('tbody').empty().html(htmlStr);
            }
        })
    }
    let indexAdd = null;
    $('#btnAddCate').click(function(){
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html(),
        });
    })
    //添加文章分类
    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:(res) => {
                if(res.status !== 0) return layer.msg('添加文章分类失败');
                layer.msg('添加文章分类成功');
                //重新渲染数据列表
                initArtCateList();
                //关闭弹窗
                layer.close(indexAdd)
            }
        })
    })
    let indexEdit = null;
    $('tbody').on('click','.btn-edit',function(){
        const id = $(this).attr('data-id');
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        })
        $.ajax({
            type: "GET",
            url:'/my/article/cates/'+ id,
            success: function(res){
               if(res.status !== 0)return layer.msg('获取文章失败')
               form.val("form-edit", res.data);
            }
        })
    })
    $('body').on('submit', '#form-edit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/article/updatecate/',
            data:$(this).serialize(),
            success:(res) => {
                if(res.status !== 0) return layer.msg('修改文章分类失败');
                layer.msg('修改文章成功');
                //重新渲染列表
                initArtCateList()
                //关闭弹窗
                layer.close(indexEdit);
            }
        })
    })
    $('tbody').on('click','.btn-delete',function(e) {
        const id = $(this).attr('data-id');
        layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
            $.ajax({
                type:'GET',
                url:'/my/article/deletecate/' + id,
                success:(res) => {
                    if(res.status !== 0) return layer.msg('删除失败');
                    layer.msg('删除成功');
                    layer.close(index);
                    initArtCateList()
                }
            })
        })
    })
    initArtCateList()
})