

 function layertest(){
    layer.open({
        type: 1,
        area: ['600px', '360px'],
        shadeClose: true, //点击遮罩关闭
        content: '<div style="padding:20px;">自定义内容</div>'
    });
}

function kefu_bt_hover(){
	$('.kefu_bt li.first').mouseenter(function(){
		$('.kefu_bt li').show();
	});
	$('.kefu_bt').mouseleave(function(){
		$('.kefu_bt li').not('.first').hide();
	});
}


function tab_init(){
	$('.tab .tab_bt').children().click(function(){

		var rel = $(this).attr('rel');
		if(!rel || rel == '')return;
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		var $tabcon_rel = $(rel);
		$tabcon_rel.siblings().hide();
		$tabcon_rel.show();

	});

	$('#talk_filter a').click(function(){
		var rel = $(this).attr('rel');
		if(!rel || rel == '')return;
		$(this).siblings().removeClass('cur');
		$(this).addClass('cur');
		$('#topicbox').children().hide();
		$('#topicbox').find('.'+rel).show();
	});
}


function ulist_init(){
	$('#list_u li').click(function(){
		$(this).siblings().removeClass('u_cur');
		$(this).siblings().children('p').children('.talkto').css('background','none');
		$(this).addClass('u_cur');
		$(this).children('p').children('.talkto').css('background','url(images/ico.png) 0 -133px no-repeat');
	});
	
	$('#ul_member').mCustomScrollbar();
	$('#ul_manager').mCustomScrollbar();
}

function showFacePanel(e,toinput){
	var offset = $(e).offset();

	var t = offset.top;
	var l = offset.left;
	$('#face').css( {"top" : t-$('#face').outerHeight(), "left":l});
	$('#face').show();
	$('#face').attr("toinput" , toinput);
	
}
function bind_event(){
	//点击用户名
	$(document).on("click",".u_mor",function(){
		var menuhtml = '<dl id="MoreM" class="umenu">\
			<dd>ID:26799</dd>\
			<dd><a href="javascript:void(0)" onclick="sayTo(this)" uid="26799" rid="217" name="李雷and韩梅梅">对他说</a></dd>\
			<dd><a href="javascript:void(0)" onclick="lookIP(this)" ip="220.175.29.121" uid="26799">查看IP</a></dd>\
			<dd><a href="javascript:void(0)" onclick="forbidSpeak(1,\'26799\')">禁言5分钟</a></dd>\
			<dd><a href="javascript:void(0)" onclick="forbidSpeak(0,\'26799\')">恢复发言</a></dd>\
			<dd><a href="javascript:void(0)" onclick="kickout(\'26799\');">踢出房间</a></dd>\
			<dd><a href="javascript:void(0)" onclick="privateTalkto(\'26799\',\'李雷and韩梅梅\',\'217\');">对TA私聊</a></dd>\
		</dl>';

		var menutip = layer.tips(
			menuhtml,
			this,
			{
				tips:[3, 'rgb(216,220,223)'],
				time:0,
				success: function(){
					$(document).on("click",function(){
						layer.close(menutip);
					});
				}
			});

	});
	
	$(document).on("click","a[target='_iframe']",function(){
		var url = $(this).attr('url');
		var width = $(this).attr('pwidth');
		var height =  $(this).attr('pheight');
		iframe_layer(url,width,height);
	});
	//表情框事件
	$(document).on("click","#face dd",function(){
		var toinput =$('#face').attr("toinput");
		$(toinput).insertAtCaret('['+$(this).attr('title')+']');
	});
	$(document).on('mouseup',function(e){
		if($(e.target).attr('isface')!='1' && $(e.target).attr('isface')!='2')
		{
			$('#face').hide();
		}
	});
}
function scrooll_init(){
	$('#introduce .tab_con').mCustomScrollbar();
}
function resize(){

	var windowHeight = $(window).height();
	var windowWidth = $(window).width(); 
	var headerHeight= $('.header').height();
	var footerHeight= windowWidth>598 ? $('.footer').height():0;	
	var mmargin = windowWidth>1600 ? 10 :(windowWidth<598 ? 0:5 );
	var $main = $('.main');
	
	$main.height(windowHeight - headerHeight - footerHeight- mmargin*2); //设置主体高度

	//用户列表高度
	var tempH = 0;
	$.each($('#user_list').siblings(),function(i,v){
		tempH += $(v).height();
	});
	$('#ul_member').height($main.height() - tempH - 37);
	$('#ul_manager').height($main.height() - tempH - 37);
	//聊天文字显示区高度
	tempH = 0;
	if(windowWidth > 598){		
		$.each($('.topiccontent').siblings(),function(i,v){
			tempH += $(v).height();
		});
		$('.topiccontent').height($main.height() - tempH -5);
		$('.topiccontent_wrap').height($main.height() - tempH -5);
	}else{
		$('.topiccontent').height($main.height() - $('#shiping').height() -$('#topicinput').height()-5);
		$('.topiccontent_wrap').height($main.height() - $('#shiping').height() -$('#topicinput').height()-5);
		
	}
	

	//视频下方内容区高度
	$('#introduce').height($main.height() - $('.shiping_wrap').height());
	$('#introduce .tab_con').height( $('#introduce').height()-  $('#introduce .tab_bt').height() -30);
	//nav宽度
	var  navspace = windowWidth - $('.logo').width() - $('.right_wrap').width()-$('.kefu_bt').width();

	$('.nav').width(Math.min(navspace,820));
	
	
	
}



function init(){
	kefu_bt_hover();
	tab_init();
	ulist_init();
	scrooll_init();
	bind_event();

	chatcontainer= new ChatContainer('.topiccontent','#topicbox',50);
}

$(function(){
	$(window).resize(function(){
		resize();
	});
	resize();

	init();
});


//右下角信息提示
$('.right_bottom_message').animate({height:90},800).fadeIn();
	$('.clos_btn').click(function(e) {
        $('.right_bottom_message').animate({height:0},800);
    });

/*function a(){
	var js = alert('ok');	
	
	$('body').append("<script>'+js+'</script>");
	
}
a();

alert('111');*/


//$("script:last").remove();
/*
var ffffffff = setTimeout("var ffffffff2 = layer.open({
                                    type: 1,
                                    title: false,
                                    area: ['549px','364px'],
                                    closeBtn: true,
                                    shadeClose: true,
                                    skin: 'layui-layer-nobg',
                                    content: ''
                            });
                        layer.style(ffffffff2,{
                            background: 'url("images/background.jpg") no-repeat'
                        });
                ",20000);*/
/*if($("#topicbox").height()>100){
	$("#topicbox div:first-child").remove();
}*/
                            





