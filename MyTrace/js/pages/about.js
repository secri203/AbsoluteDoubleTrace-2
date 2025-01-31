/*
 * 	Trace about page script
 * 	Copyright AbsoluteDouble 2018 - 2020
 * 	Written by Jake Mcneill
 * 	https://absolutedouble.co.uk/
 */

let About = {

	init:function(){
		//About.loadPremium();

		$("#trace_vernum").text(chrome.runtime.getManifest().version || "?");

		if (/Firefox/.test(navigator.userAgent)){
			$("body").css("font-size","0.8em");
		}
	},

	loadPremium:function(){
		TraceBg(function(bg){
			$("#premium_status,#info_premium_status").empty().append(
				$("<span/>").text(lang("advPremiumMsgThanks")),
				$("<br/>"),$("<br/>"),
				//$("<button/>").text(lang("advPremiumCtrlDisable")),
				//$("<span/>").text(" "),
				$("<button/>").text(
					(bg.Prefs.Current.Pref_WebController.enabled === true ? "强制更新阻止列表" : "启用网络请求控制器")
				).on("click enter",About.UpdateBlocklist),
				$("<span/>").text(" ")
			);
		});
	},

	UpdateBlocklist:function(){
		TraceBg(function(bg){
			if (bg.Prefs.Current.Pref_WebController.enabled !== true){
				bg.Prefs.Current.Pref_WebController.enabled = true;
			}
			bg.Web.BlocklistLoader(true);
		});
		$(this).text("Working...");
	}

};

About.init();