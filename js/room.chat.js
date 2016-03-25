//ReplaceMsgToFace  ReplaceUploadPic

var liveColor = 'rgb(244,107,10)';

var dieColor = '#aaa';

var scrollconf = {scrollButtons:{enable:true}};

function enterSend(){

	document.onkeydown=function(event){

		if( document.activeElement.id == 'sendMsgInput'){

			if(event.keyCode==13){

				sendMsg();

			}

		}else if(document.activeElement.id == 'Talkinputarea'){

			if(event.keyCode==13){

				sendPrivateMsg();

			}

		}

	 }

}







//审核

function checkMsg(e){



	var id =e.getAttribute("rel");

	var o = checkMsgs[id];

	$(e).hide();

	if(o == null)return;



	$.post(chatCheck_url ,o);

	delete checkMsgs[id];

}



function delMsg(e){

	// if( !confirm('确定删除吗？') ){ return false;}

	var id =e.getAttribute("rel");

	var o = delMsgs[id];

	$(e).hide();

	if(o == null)return;



	$.post(chatDel_url ,o,function(data){

		if(data.rs == 0){

			alertBox(data.content,'error');

		}

	},'json');

	delete delMsgs[id];

}

/*$(function(){

	connectServer();

});*/



// 飞屏

function feiping(data){

	flyScreen(data);

}







//私聊框

var talkbox;

var talklist;

var talkpanel;

var talkpanels;

var talkname;

var talktouid;

var talkboxisshow=false;

var talktopanels = {};

function msgpanelClass(){

	this.uid;

	this.uname;

	this.panel;

	this.create = function(uid,uname){



		this.uid = uid;

		this.uname = uname;

		this.panel = $('<div class="msgpanel"  uname="'+this.uname+'" uid="'+this.uid+'" style="display:none;"><ul></ul></div>');

		this.panel.mCustomScrollbar(scrollconf);

	};

	//滚动到底部

	this.scrollToLast = function(){

		this.panel.mCustomScrollbar("update");

		this.panel.mCustomScrollbar("scrollTo","bottom");

	};

	this.appendMsg = function(data){

		var msg = new MsgClass();

		msg.create(data);

		this.panel.find('ul').append(msg.toPrivateMsgItem());

		this.scrollToLast();



	}

}

var member_whisper ={};

function receivePrivateMsg(data){

	if(data.to_uid != myInfo.id){

		return;

	}else{

		if(!talktopanels.hasOwnProperty(data.from_uid)){

			addTalk(data.from_uid,data.from_name,data.from_roleid,data.id);

		}

		talktopanels[data.from_uid].appendMsg(data);

		if(!talkboxisshow){

			msgNotice(data.from_uid,data.from_name,data.from_roleid);

		}else{

			var nul = talklist.find('dd[uid="'+data.from_uid+'"]');

			if(!nul.hasClass("cur") ){

				twinkleAlert(nul,'newmsg');

			}

		}

		

	}

}



function addTalk(uid,uname,rid,newmsgid){

	var $udd = $('<dd  title="'+uname+'" uid="'+uid+'" rid="'+rid+'" onclick="nameTabClick(this);"><i class="icon-close"></i>李雷and韩梅梅</dd>');

	$udd.children('.icon-close').click(function(e){

		var uid = $(this).parent().attr('uid');

		var pnum = talklist.find('dl').children().size();

		$(this).parent().remove();

		$('.msgpanel[uid="'+uid+'"]').remove();

		delete talktopanels[uid];

		if(pnum >= 1){

			talklist.find('dl').children().last().click();

		}else{

			closeTalkbox();

		}

		return false;

	});

	talklist.find('dl').append($udd);

	talklist.mCustomScrollbar('update');

	var msgpanel = new msgpanelClass();

	msgpanel.create(uid,uname);

	//loadtalkhistory(msgpanel,newmsgid);

	talkpanels.append(msgpanel.panel);

	talktopanels[uid] = msgpanel;

}




function closeTalkbox(){

	$('#Talkbox').hide();

	talkboxisshow = false;
	

}



function showTalkBox(){

	$('#Talkbox').show();

	talkboxisshow = true;

}

function nameTabClick(e){



	var uid = $(e).attr('uid');

	var uname = $(e).attr('title');

	var rid = $(e).attr('rid');

	$(e).removeClass('newmsg');

	talkpanels.children().hide();

	talkpanels.children('[uid="'+uid+'"]').show();

	$('#TalkToNames').find('dd').removeClass('cur');

	talktopanels[uid].scrollToLast();

	$(e).addClass('cur');

	var html = '与 '+uname+' 对话中';



	$('#talktoname').find('span').remove();

	talkname.children('#talktoname').html(html);

	$('#Talkinputarea').focus();

}

function msgNotice(uid,uname,rid){

	var roleimg = getRoleImg(rid);

	var noticehtml = roleimg+'<strong title="'+uname+'">'+uname+'</strong>';

	$('#btn-notice').attr('uid',uid);

	$('#notice-msgfrom').html(noticehtml);

	$('#btn-notice').show();

	setTimeout('shakeNotice()',500);

}

function shakeNotice(){

    var $noticepanel = $("#btn-notice");

    for(var i=1; 5>=i; i++){

        $noticepanel.animate({right: '3px'}, 50);

        $noticepanel.animate({right: '0px',bottom:'3px' } ,50);

        $noticepanel.animate({right: '0px',bottom: '0px' } ,50);

    }

}

function initTalkbox(){

	talkbox = $('#Talkbox'); //私聊框

	talklist = $('#TalkToNames'); //私聊对象名字列表

	talkname = $('#TalkName'); //当前私聊对象标题栏

	talkpanel = $('#TalkCon'); //聊天内容显示窗口

	talkpanels = $('#talkpanels');

	/*if(!isPhone){

		drag(talkbox ,talkname); //初始化拖拽功能

	}*/

	talkname.find('.icon-close').click(function(e){

		closeTalkbox();

		return false;

	});

	//talklist.mCustomScrollbar(scrollconf); //私聊对象名字列表滚动条



}

$(function(){

	initTalkbox();


});



function feiping(){
	var $fei =$( '<div class="flyscreen"><div class="flyscreen_0 m_scroll">我是飞屏。。。。。</div></div>');
	
	$('body').append($fei);
	var fly_width = $('.topiccontent').width();
	$('.flyscreen').width(fly_width);
	alert($('.flyscreen').width());
	
	var mar_num=fly_width;
	var timer_mar=null;
	function mar_fn(){
		mar_num-=2;
		$('.m_scroll').css('left',mar_num);
	}
	
	
	timer_mar=setInterval(mar_fn,30);
}



