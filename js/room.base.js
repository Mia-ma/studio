


$(function(){

		

		$("#login_btn").click(function(){

		

			var phone     		= $("#phone").val();

      var password        = $("#password").val();

			

      if(!check_phone(phone)){

        return false;

      }



      if(!check_password(password)){

        return false;

      }

			

			

      });



      var browser=navigator.appName 

      var b_version=navigator.appVersion 

      var version=b_version.split(";"); 

      if(version.length>2){

        var trim_Version=version[1].replace(/[ ]/g,""); 

      }else{

        var trim_Version ='';

      }

      if(browser=="Microsoft Internet Explorer" && ( trim_Version=="MSIE6.0" || trim_Version=="MSIE7.0"  || trim_Version=="MSIE8.0" )   )

      { 

        lt_ie9=true;

      }else{

        lt_ie9=false;

      }

    

		ie6placeholder();

})

	

function ie6placeholder(){





      $.each($('input.text_input'),function(k,v){

        $inp = $(v);

        if($inp.attr('ispwd') == '1' && $inp.val() === ''){

          if(lt_ie9){

            id =$inp.attr('id');

            $('input.text_input').eq(k).after( '<label class="ie_'+id+'" for="'+id+'" >'+$inp.attr('placeholder')+'</label>' );

          }else{

            $inp.attr('type','text');

          }



        }else{

          $inp.val($inp.attr('placeholder'));

        }



        if(!lt_ie9){

          $inp.val($inp.attr('placeholder'));

        }



        $inp.focus(function(){

          if($(this).val() === $(this).attr('placeholder')){

            $(this).val('');

          }

          if($(this).attr('ispwd') == '1'){

            if(lt_ie9){

              id =$(this).attr('id');

              $('.ie_'+id).hide();

            }else{

              $(this).attr('type','password');

            }

          }

        });

        $inp.blur(function(){

          if($(this).val() === ''){

            if(!lt_ie9){

              $(this).val($(this).attr('placeholder'));

            }else if( $(this).attr('ispwd')!='1'  ){

              $(this).val($(this).attr('placeholder'));

            }

          }

          if($(this).attr('ispwd') == '1' &&  $(this).val()=== $(this).attr('placeholder')){

            $(this).attr('type','text') ;

          }else if(lt_ie9 &&  $(this).val() == '' && $(this).attr('ispwd') == '1' && $(this).attr('ispwd') ){

            id =$(this).attr('id');

            $('.ie_'+id).show();

          }





        });

    });



}


$.format = function (source, params) 
{
	if (arguments.length == 1)
	return function () {
	var args = $.makeArray(arguments);
	args.unshift(source);
	return $.format.apply(this, args);
	};
	if (arguments.length > 2 && params.constructor != Array) {
	params = $.makeArray(arguments).slice(1);
	}
	if (params.constructor != Array) {
	params = [params];
	}
	$.each(params, function (i, n) {
	source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
}; 
jQuery.fn.extend({     
    /**    
     * 选中内容    
     */    
    selectContents: function(){     
        $(this).each(function(i){     
            var node = this;     
            var selection, range, doc, win;     
            if ((doc = node.ownerDocument) &&     
                (win = doc.defaultView) &&     
                typeof win.getSelection != 'undefined' &&     
                typeof doc.createRange != 'undefined' &&     
                (selection = window.getSelection()) &&     
                typeof selection.removeAllRanges != 'undefined')     
            {     
                range = doc.createRange();     
                range.selectNode(node);     
                if(i == 0){     
                    selection.removeAllRanges();     
                }     
                selection.addRange(range);     
            }     
            else if (document.body &&     
                     typeof document.body.createTextRange != 'undefined' &&     
                     (range = document.body.createTextRange()))     
            {     
                range.moveToElementText(node);     
                range.select();     
            }     
        });     
    },     
    /**    
     * 初始化对象以支持光标处插入内容    
     */    
    setCaret: function(){     
        if(!$.browser.msie) return;     
        var initSetCaret = function(){     
            var textObj = $(this).get(0);     
            textObj.caretPos = document.selection.createRange().duplicate();     
        };     
        $(this)     
        .click(initSetCaret)     
        .select(initSetCaret)     
        .keyup(initSetCaret);     
    },     
    /**    
     * 在当前对象光标处插入指定的内容    
     */    
    insertAtCaret: function(textFeildValue){     
       var textObj = $(this).get(0);     
       if(document.all && textObj.createTextRange && textObj.caretPos){     
           var caretPos=textObj.caretPos;     
           caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ?     
                               textFeildValue+'' : textFeildValue;     
       }     
       else if(textObj.setSelectionRange){     
           var rangeStart=textObj.selectionStart;     
           var rangeEnd=textObj.selectionEnd;     
           var tempStr1=textObj.value.substring(0,rangeStart);     
           var tempStr2=textObj.value.substring(rangeEnd);     
           textObj.value=tempStr1+textFeildValue+tempStr2;     
           textObj.focus();     
           var len=textFeildValue.length;     
           textObj.setSelectionRange(rangeStart+len,rangeStart+len);     
           textObj.blur();     
       }     
       else {     
           textObj.value+=textFeildValue;     
       }     
    }  
}); 


//对他说 点击事件
function sayTo(e){
  var uid =$(e).attr('uid');
  var name =$(e).attr('name');
  var rid =$(e).attr('rid');
  selectTalkTo(uid,name,rid);
}
//发言框select对某人说
function selectTalkTo(uid,name,rid){
  var $select = $('#send_talkto');
  var $op = $select.children('option[value="'+uid+'"]');
  $select.children().removeAttr('selected');
  if($op && $op.length>0){  
    $op.remove();
  }
  $select.append('<option value="'+uid+'" rid="'+rid+'" selected=selected>'+name+'</option>');
  
}
//处理聊天语言，替换表情
function msgFilter(msg){
  var key=[];

  var str = msg.match(/^:caitiao\[([a-z0-9\.\/\u4e00-\u9fa5]+?)\]$/g);
  if( str ){
    var ckey = str[0].substr(9, str[0].indexOf(']')-9 );
    msg = '<img src="' + phiz_path +'color_bar/'+caitiao[ckey]+'"/>';
    return msg;
  }
  key =msg.match(/\[([a-zA-Z0-9=\.\/\u4e00-\u9fa5]+?)\]/g);
  if( key == null) return msg;
  for(i = 0;i< key.length;i++){ 
    var pkey = key[i].substr(1,key[i].indexOf(']')-1 );
    if( pkey.length >24 && pkey.substr(0,4) =='img='){
      pkeys=pkey.split('/');
      if(pkeys.length == 2){
        msg = msg.replace(key[i],'<img class="talk_pic" src="' + image_url + '/Uploads/' + pkeys[0].substr(4) + '/m_' + pkeys[1] + '" title="点击看大图" onClick="talk_pic(\'' +pkeys[0].substr(4) + '/' + pkeys[1] + '\')">');
      }
    }else{
      if(!phiz.hasOwnProperty(pkey)){
        continue;
      }

      msg = msg.replace( key[i],'<img src="' + phiz_path +'phiz/'+phiz[pkey]+'"/>');
    }
  }
  return  msg;
}

function MsgClass(data){
  this.id = data.id;
  this.company_id = data.company_id;
  this.from_uid = data.from_uid;
  this.to_uid = data.to_uid;
  this.content = data.content;
  this.time = data.time;
  this.type= data.type;
  this.room_id= data.room_id;
  this.from_name= data.from_name;
  this.to_name= data.to_name;
  this.from_roleid= data.from_roleid;
  this.to_roleid= data.to_roleid;
  this.ischecked= data.ischecked;
  this.checkuid= data.checkuid;
  this.toPrivateMsgItem = function(){
      var liclass = this.from_uid == myInfo.id ? 'class="mine"' : '';
      var roleimg = getRoleImg(this.from_roleid);
      //var time = new Date(parseInt(this.time) * 1000).format('[MM/dd hh:mm:ss]');
      var formatstr = '<li {0}>{1}<span>{2}</span><div class="TalkCon_p"><span>{3}</span></div></li>';
      var talkhtml =  $.format(formatstr,liclass,roleimg,this.from_name,msgFilter(this.content));
      return talkhtml;
  };
  this.toMsgItem = function(){
    var dclass = this.type=='0' ? ' private' :' public';
    if(this.from_roleid != "1" && this.type != '0'){
      dclass += ' member';
    }
    var from_role_image = getRoleImg(this.from_roleid);
    if(this.type == '0' ){
      if( this.from_uid==myInfo.id){
        this.from_name = "你";
      }else if(this.to_uid==myInfo.id){
        this.to_name = "你";
      } 
    }

    var fromname = '<a href="javascript:void(0)" class="u_mor" rid="'+this.from_roleid+'" uid="'+this.from_uid+'" >'+this.from_name+'</a>';   
    var toname = this.to_uid != 0? '<a class="dui">对</a>'+getRoleImg(this.to_roleid)+'<a href="javascript:void(0)"  class="u_mor" rid="'+this.to_roleid+'" uid="'+this.to_uid+'">'+this.to_name+'</a>':'';
    
    var time = '<a class="time">'+ new Date(parseInt(this.time) * 1000).format('[hh:mm]') + '</a>';
    var talkcontent = msgFilter(this.content);
    var checkbt = '';
    var del = '';
    if(myRole.purview_check=='1'){
      del = '<a href="javascript:void(0)" onClick="delMsg(this)" rel="'+this.id+'" class="delete" >删除</a>';
      this.del=1;
      if(this.ischecked=="0" && this.from_uid != myInfo.id  && this.type!='0'){
        checkbt = '<a href="javascript:void(0)" onClick="checkMsg(this)" rel="'+this.id+'" class="shenhe" >审核通过</a>';
      }

    }
    
    var talkformat = '<div id="{7}" class="talk {0}">\
    <span>{1}</span>\
    <div class="talk_name">{2}{3}{4}</div>\
    <div class="clear"></div>\
    <div class="talk_hua"><p>{5}</p>{6}{8}\
    </div>\
    <div class="clear"></div>\
    </div>';
    var talkhtml = $.format(talkformat,dclass,from_role_image,fromname,toname,time,talkcontent,checkbt,this.id,del);
    $talkhtml = $(talkhtml);
    $talkhtml.find('.u_mor').on('click',function(){
      var id = $(this).attr('uid');
      var rid = $(this).attr('rid');
      var name = $(this).html();
      $menu = uMenu(id,rid,name);
      var offset = $(this).offset();
      var t = offset.top;
      var l = offset.left;
      $menu.css("top",t).css("left",l);
      $menu.show(); 
    });
    return $talkhtml;
  };
  this.isICanSee = function(){
    if(this.type=='0'){
      if((this.from_uid == myInfo.id) || (this.to_uid == myInfo.id) ){
        return true;
      }else{
        return false;
      }
    }else if(this.type=='1'){
      if((this.from_uid == myInfo.id) || (this.ischecked=="1") || (this.ischecked=="0" && myRole.purview_check=='1' )){
        return true;
      }else{
        return false;
      }
    }
  }
  
}

function ChatContainer(scroolwrap,containerid,max){
  
  this.privateNum = 0;
  this.publicNum = 0;
  this.maxNum = max?max:50;
  this.tabType = 'public';
  this.container = $(containerid);
  this.scroolwrap = $(scroolwrap);
  this.dynamicscroll =true; 
  this.scroolwrap.mCustomScrollbar();
  
  this.push = function(msgItem){    
    if(!msgItem.hasClass(this.tabType)){
      msgItem.hide();
    }
    var msgid = msgItem.attr('id');
    var om  = this.container.children('#'+msgid); 
    if(om && om.length>0)return;
    this.container.append(msgItem);
    var msgnum = this.container.children().size();
    if((msgnum > this.maxNum && this.dynamicscroll) || msgnum>150){
      for(var i=0 ; i< msgnum - this.maxNum; i++){
        this.container.children().first().remove();
      }
    }
    this.scrollToLast();
  }
  //滚动到底部
  this.scrollToLast = function(){
    this.scroolwrap.mCustomScrollbar("update");
    if(this.dynamicscroll){
      this.scroolwrap.mCustomScrollbar("scrollTo","bottom");
    } 
  }

  //内容切换显示
  this.tabToType = function(type){  
    this.tabType = type;  
    $('#talk_filter a').removeClass();
    $('#talk_filter a[rel='+type+']').addClass('cur');
    this.container.children().hide(); 
    this.container.children('.'+type).show();
    this.scrollToLast();

  }
  //清屏
  this.clear = function(){
    this.container.children('.'+this.tabType).remove();
  }
}


function flyScreen(data){
  var text = data.content;
  var margintop = 200;
  var marginbottom = 200;
  var minwidth = 600;
  var id="marquee"+Date.now()+getRandom(1000);
  var $flyscreen = $('<marquee direction="left"  class="flyscreen flyscreen_'+data.color+'" id="'+id+'" scrollamount="6" behavior="scroll" loop=1></marquee>');
  $flyscreen.text(text);
  var len=0;
  //计算文字长度
  for(i=0;i<text.length;i++)
  {
    if(text.charCodeAt(i)>256)
    {len += 2;}
    else
    {len++;}
  }
  len = len*20; 
  len = Math.max(minwidth,len);
  var scrollamount = $flyscreen.attr('scrollamount');
  var scrolltime = len/6;
  $flyscreen.css("width",len);
  var flytop = margintop + getRandom(  $(window).height()- $flyscreen.height() -margintop - marginbottom);
  $flyscreen.css("top",flytop+"px");
  $("body").append($flyscreen);
  $flyscreen.show();
  //定时清除
  setTimeout("removeElement('"+id+"')", scrolltime*200 );
}

function forbidSpeak(isforbid,userid){
    alert('禁言'+userid);
}

function kickout(userid){
    alert('踢出'+userid);
}

function privateTalkto(uid,uname,rid){
		addTalk(uid,uname,rid);
		showTalkBox();
		$('#Talkinputarea').focus();
		talklist.find('[uid="'+uid+'"]').click();
}

function sendMesg(uid,uname,rid){
	addTalk(uid,uname,rid);
	faceShow();
	$('#Talkinputarea').focus();
	talklist.find('[uid="'+uid+'"]').click();	
}

function lookIP(){
    alert('查看ip');
}


//右上角用户名菜单
function nicknamemenu_show(th){
	$(document).on("click",".mynickname",function(){
	  var menuhtml = '<dl class="umenu">\
		  <dd><a href="javascript:void(0)" onclick="modify_password()" >修改密码</a></dd>\
		  <dd><a href="javascript:void(0)" onclick="modify_nickname()" >修改昵称</a></dd>\
		  <dd class="hide"><a href="javascript:void(0)" onclick="modify_roomsetting()">飞屏</a></dd>\
		  <dd><a href="javascript:void(0)" onclick="leave_room()">退出</a></dd>\
		</dl>';
	
	  var nicknametip = layer.tips(
		menuhtml,
		th,
		{
		  tips:[3, 'rgb(216,220,223)'],
		  time:0,
		  success: function(){
			$(document).on("click",function(){
			  layer.close(nicknametip);
			}); 	 
		  }
		});
	 //event.stopPropagation(); 
 	});	
}

function focus(){
	$(".num_login,.password,.yanzhengma input,.name_input").bind({
				focus:(function(){
					if($(this).val()==this.defaultValue){
						$(this).val("");
						$(this).css("color","#333");
					}
					else{
						$(this).css("color","#333");
					}
				}),
				blur:(function(){
					if($(this).val()==""){
						$(this).val(this.defaultValue);
						$(this).css("color","#999");
					}
					else{
						$(this).css("color","#333");
					}
				})
			}) 	
}

layer.ready(function(){
    layer.open({
        type: 1,
        title:'',
        area: 'auto',
		maxWidth:'800',
        shadeClose: true, //点击遮罩关闭
        //time: 60000,   //一分钟后自己关闭
        content: '\<\div class="onload_QQ">\
						<img src="images/onload.jpg">\
                        <\p>\
                            <\a>\<\img src="images/qqjt.gif">\<\/a>\
                            <\a>\<\img src="images/qqjt.gif">\<\/a>\
                            <\a>\<\img src="images/qqjt.gif">\<\/a>\
                            <\a>\<\img src="images/qqjt.gif">\<\/a>\
                        <\/p>\
                  <\/div>'
    });
});

//修改密码
function modify_password(){
    var loginform = '<div>\
<form action="/Member/Public/checkLogin" method="post">\
<div class="m_login">\
   <p class="revise_title ">修改密码：</p>\
   <input type="text" value="原密码" class="num_login" >\
   <p class="wrong hide">原密码错误，请重新输入</p>\
   <input type="text" value="新密码" class="password">\
   <p class="tishi hide">请输入6-20位字符，建议字母与特殊字符的组合</p>\
	<div class="yanzhengma">\
		<input type="text" value="确认密码">\
	</div>\
	<input type="button" value="确 定" class="login_button_tan mt20">\
 </div>\
</form>\
</div>';
    layer.open({
        title:false,
        type: 1,
        area: 'auto',
		maxWidth:'300px',
        shadeClose: true, //点击遮罩关闭
        content: loginform,
		success: function(){
			focus();	 
		  }
    });
 
}

//修改昵称
function modify_nickname(){
    var loginform = '<div>\
<form action="/Member/Public/checkLogin" method="post">\
<div class="name_login">\
   <p class="revise_title">修改昵称：</p>\
   <div class="name_wrap">\
   	<input type="text" value="用户名" class="name_input" >\
   	<span class="cha"></span>\
   </div>\
   <p class="tishi hide">请输入4-20位字符，支持字母和数字</p>\
	<input type="button" value="确 定" class="login_button_tan mt60">\
 </div>\
</form>\
</div>';
    layer.open({
        title:false,
        type: 1,
        area: 'auto',
		maxWidth:'300px',
        shadeClose: true, //点击遮罩关闭
        content: loginform,
		success: function(){
			focus();	 
		  }
    });
 
}

function ie6placeholder(){
	var browser=navigator.appName 

      var b_version=navigator.appVersion 

      var version=b_version.split(";"); 

      if(version.length>2){

        var trim_Version=version[1].replace(/[ ]/g,""); 

      }else{

        var trim_Version ='';

      }

      if(browser=="Microsoft Internet Explorer" && ( trim_Version=="MSIE6.0" || trim_Version=="MSIE7.0"  || trim_Version=="MSIE8.0" )   )

      { 

        lt_ie9=true;

      }else{

        lt_ie9=false;

      }
	  
      $.each($('input.text_input'),function(k,v){

        $inp = $(v);

        if($inp.attr('ispwd') == '1' && $inp.val() === ''){

          if(lt_ie9){

            id =$inp.attr('id');

            $('input.text_input').eq(k).after( '<label class="ie_'+id+'" for="'+id+'" >'+$inp.attr('placeholder')+'</label>' );

          }else{

            $inp.attr('type','text');

          }



        }else{

          $inp.val($inp.attr('placeholder'));

        }



        if(!lt_ie9){

          $inp.val($inp.attr('placeholder'));

        }



        $inp.focus(function(){

          if($(this).val() === $(this).attr('placeholder')){

            $(this).val('');

          }

          if($(this).attr('ispwd') == '1'){

            if(lt_ie9){

              id =$(this).attr('id');

              $('.ie_'+id).hide();

            }else{

              $(this).attr('type','password');

            }

          }

        });

        $inp.blur(function(){

          if($(this).val() === ''){

            if(!lt_ie9){

              $(this).val($(this).attr('placeholder'));

            }else if( $(this).attr('ispwd')!='1'  ){

              $(this).val($(this).attr('placeholder'));

            }

          }

          if($(this).attr('ispwd') == '1' &&  $(this).val()=== $(this).attr('placeholder')){

            $(this).attr('type','text') ;

          }else if(lt_ie9 &&  $(this).val() == '' && $(this).attr('ispwd') == '1' && $(this).attr('ispwd') ){

            id =$(this).attr('id');

            $('.ie_'+id).show();

          }





        });

    });



}
//登录窗
function loginform_show(){
    var loginform = '<div>\
<form action="/Member/Public/checkLogin" method="post">\
<div class="m_login">\
   <p class="login_title">登录</p>\
   <input type="text" value="用户名" class="num_login text_input" >\
   <input type="text" value="密码" class="password text_input">\
   <p class="wrong hide">您输入的密码有误，请重新输入</p>\
	<div class="yanzhengma">\
		<input type="text" value="验证码" class="text_input">\
		<img src="images/yan.png">\
	</div>\
	<p class="wrong hide">您输入的验证码有误，请重新输入</p>\
	<input type="button" value="登 录" class="login_button_tan">\
 </div>\
</form>\
</div>';
    layer.open({
        title:false,
        type: 1,
        area: 'auto',
		maxWidth:'300px',
        shadeClose: true, //点击遮罩关闭
        content: loginform,
		success: function(){
			focus();
			ie6placeholder();
		  }
    });
 
}
//注册窗
function regform_show(){
    var content = '<div class="m_login">\
                    <p class="zhuce_title">欢迎加入大赢家财经</p>\
                    <input type="text" value="用户名" class="num_login" >\
					<p class="tishi hide">请输入6-20位字符，建议字母与特殊字符的组合</p>\
                    <input type="text" value="密码" class="password">\
                    <div class="yanzhengma">\
                        <input type="text" value="确认密码" class="">\
                    </div>\
					<p class="wrong hide">两次密码输入不一致，请重新输入</p>\
                    <input type="button" value="注 册" class="zhuce_button_tan">\
                </div>';
    var temp = layer.open({
        title:false,
        type:1, 
        content: content,
        shadeClose: true,
        area: 'auto',
		maxWidth:'300px',
		success: function(){
			focus();	 
		  }
    });
    layer.style(temp,{
        background: 'url(images/reg.jpg) no-repeat'
    });
}

//飞屏窗
function feiping_show(){
    var fei = '<div class="m_feiBox">\
	<p class="mfei_title">飞屏功能</p>\
	<div class="m_ml"><label><input type="radio" name="color">黄</label><label><input type="radio" name="color">红</label><label><input type="radio" name="color">蓝</label><label><input type="radio" name="color">绿</label><label><input type="radio" name="color">紫</label></div>\
	<textarea class="m_ml m_feiText"></textarea>\
	<input type="button" value="发 布" class="btn m_ml">\
	</div>';
    layer.open({
        title:false,
        type: 1,
        area: ['581px', '332px'],
        shadeClose: true, //点击遮罩关闭
        content: fei,
		success: function(){
			focus();
			ie6placeholder();
		  }
    });
 
}

function  iframe_layer(url , width ,height){
    var temp = layer.open({
        title:false,
        type:2, 
        content: url,
        shadeClose: true,
        area: [width+'px', height+'px']
    });
}


function huanfu_show(){
    var html = '<div class="huanfu-layer" >';
    for(var i=1;i<=24;i++){
      html +=  '<img src="images/bg/w'+i+'x.jpg" data-rel="images/bg/w'+i+'.jpg">';
    }
    html += '</div>';
    var temp = layer.open({
        title:false,
        type:1, 
        content: html,
        shadeClose: true,
        area: ['670px', '300px']
    });
}






	
