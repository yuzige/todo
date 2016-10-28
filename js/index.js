/**
 * Created by Lewis on 2016/10/12.
 */
$(function () {
    var todos = [];
    var lists = $('.list ul');
    var input = $('.add .input input');
    var add = $('.add .button');
    var delAll = $('.header ul .delete');
    var work = $('#shouye .work');
    var study = $('#shouye .study');
    var life = $('#shouye .life');
    var shouye = $('#shouye');
    var login = $('#shouye .login');

    if(localStorage.todosData){
        todos = JSON.parse(localStorage.todosData);
        render();
    }else {
        localStorage.todosData = JSON.stringify(todos);
    }
    function render() {
        lists.empty();
        $.each(todos,function (i,v) {
            $('<li style="background-image: url(./img/'+(i+1)+'.png)"><div class="check"><input type="checkbox"></div><span><input class="update" type="text" value="'+v.title+'"></span><i class="iconfont icon-shanchu del"></i></li>').addClass(function () {
                if(v.state){
                    return 'done';
                }
            }).appendTo('.list ul');
        });

    }
    function addTodo() {
        todos.push({title:input.val(),state:0,isDel:0});
        localStorage.todosData = JSON.stringify(todos);
        render();
    }

    //增加信息
    add.on('click',function () {
        addTodo();
        input.get(0).value = null;
    });

    //删除信息
    lists.on('touchstart','.del',function (e) {
        $(this).parent().toggleClass('out').delay(800).queue(function () {
            $(this).remove().dequeue();
        });
        var i = $(this).parent().index();
        todos.splice(i,1);
        localStorage.todosData = JSON.stringify(todos);
        render();
    });

    //一键删除信息
    delAll.on('touchstart',function (e) {
        var ch = [];
        var checked = $('.list .check input:checked');
        $.each(checked,function (i,v) {
            $(this).closest('li').addClass('.out');
            $(this).closest('li').delay(800).queue(function () {
                $(this).remove().dequeue();
            });
        });
        for(var i in todos){
            if(todos[i].state==0){
                ch.push(todos[i]);
            }
        }
       todos = ch;
        localStorage.todosData = JSON.stringify(todos);
        render();
    });

    //修改信息
    lists.on('blur','.update',function(e){
        var val = $(this).val();
        todos[$(this).closest('li').index()].title = val;
        localStorage.todosData = JSON.stringify(todos);
        render();
    });

    //是否完成任务信息
    lists.on('touchstart','input:checkbox',function (e) {
        if( !$(this).is(':checked') ){
            $(this).closest('li').addClass('done');
            todos[$(this).closest('li').index()].state = 1;
            localStorage.todosData = JSON.stringify(todos);
        }else {
            $(this).closest('li').removeClass('done');
            todos[$(this).closest('li').index()].state = 0;
            localStorage.todosData = JSON.stringify(todos);
        }
    });

    //滑动事件
    var left = null;
    lists.on('touchstart','li',function (e) {
        e.stopPropagation();
        left = e.originalEvent.changedTouches[0].pageX;
    });
    lists.on('touchmove','li',function (e) {
        e.stopPropagation();
        var n = e.originalEvent.changedTouches[0].pageX;
        var x = n - left +'px';
        $(this).css('transform','translate3d('+x+',0,0)');
    });
    lists.on('touchend','li',function (e) {
        e.stopPropagation();
        $(this).css('transition','transform .8s ease both');
        $(this).css('transform','translate3d(0,0,0)');
        $(this).delay(800).queue(function () {
           $(this).css('transition','none').queue();
        });

        var n = e.originalEvent.changedTouches[0].pageX;
        if((n >left)&&(n-left>100)){
            $(this).find('input:checkbox').attr("checked", true);
            $(this).addClass('done');
            todos[$(this).index()].state = 1;
            localStorage.todosData = JSON.stringify(todos);
        }

    });


//    进入工作便签
    work.on('click',function () {
        shouye.addClass('jinru');
        $('#work').addClass('in');
    });

//    进入学习便签
    study.on('click',function () {
        shouye.addClass('jinru');
        $('#study').addClass('in');
    });

//    进入生活便签
    life.on('click',function () {
        shouye.addClass('jinru');
        $('#life').addClass('in');
    });

//    进入空白便签
    login.on('click',function () {
        shouye.addClass('jinru');
        $('#login').addClass('in');
        lists.empty();
    });

//    返回主页面
    $('.header .back').on('click',function () {
        $(this).parent().parent().parent().removeClass('in');
        shouye.removeClass('jinru');
    });

//    开始页面
    $('.first').on('click',function () {
       $(this).css('display','none');
    });

});