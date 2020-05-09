(function(w) {
	w.igniteCampaigns = w.igniteCampaigns || {};
	var adSettings = w.igniteCampaigns.adSettings,
	params = {
		markup:'<div id="mobile-anchor-unit" class="mau_ad">' +
		'<div id="mobile-anchor-unit-wrap">' +
			'<div id="mau-content">' +
				'<div id="mau-collapsed">' +
					'<img class="collapsedImg" src="'+ adSettings.collapsedImage +'"/>' +
					'<div class="mau-close mau-close-collapsed"></div>' +
				'</div>' +
				'<div id="mau-unit">'+
				'<img class="banner-img" src="'+ (typeof adSettings.topBanner != 'undefined' ? adSettings.topBanner : '') +'" />'+ // banner img
				'<div class="embed-player">'+ (typeof adSettings.embedPlayer != 'undefined' ? adSettings.embedPlayer : '') +'</div>' +
					'<img class="unit" src="'+ (typeof adSettings.expandedImage != 'undefined' ? adSettings.expandedImage : '') +'" />' +
					'<div class="mau-close mau-close-unit"></div>' +
					'<div class="mau-collapse mau-collapse-unit"></div>' +
					'<div id="mau-video-wrap"><div id="mau-playbtn"></div><div id="preloader"><img src="//ignitecampaigns.com/uploads/2014/10/10/loading-dark.gif" /></div>' +
						'<div id="mau-ytPlayer"></div>' +
						'<img class="videoThumbnail" src="' + (typeof adSettings.videoThumbnail  != 'undefined' ? adSettings.videoThumbnail  : '') + '" width="100%"/>' +
						'<div class="iosBtn" style="position: absolute; top: 0, right: 0; bottom: 0; left: 0; width: 100%; height: 100%; opacity: .8;"></div>'+
					'</div>'+
				'</div>' +
			'</div>'+
		'</div>' +
		'</div>',
		theStyles: '*{margin: 0;padding: 0;}' +
		'#mobile-anchor-unit{position:fixed;width:100%;margin:0;padding:0;z-index:2000000000;text-align: center;bottom:51px;left:0;}' +
		'#mobile-anchor-unit-wrap{width:100%;}' +
		'#mau-content{width:100%;max-width:360px;position:relative;text-align: center;display:inline-block;cursor:pointer;z-index:1;}' +
		'#mau-collapsed{}' +
		'#mau-collapsed img{opacity: 1;width: 100%;z-index: 88;}' +
		'#mau-unit{position: relative; display: none; overflow-x: hidden; padding-top: 29px;}' +
		'#mau-unit img.unit{opacity: 1;width: 100%; max-width: 360px; z-index: 99; left: 0; margin-bottom: -100px;}' +
		'.mau-close-collapsed, .mau-close-unit{background: url(//ignitecampaigns.com/global/mobile-anchor-unit/assets/closeBtnV2.jpg) no-repeat center center;background-size: 100% auto;position: absolute;right: 0;top: 0px; width: 25px;height: 32px; z-index: 2;}' +
		'.mau-collapse-unit {background: url(//ignitecampaigns.com/global/mobile-anchor-unit/assets/collapseBtn.jpg) no-repeat center center;background-size: 100% auto;position: absolute;right: 30px;top: 0px; width: 25px;height: 32px; z-index: 2;}' +
		'.mau-collapse-unit {display: none;}' +
		'.mau-close-collapsed {top: -28px; z-index: -1;}' +
		'.mau-close-unit{display: none;}' +
		'.ytp-watermark{display: none !important;}' +
		'#mau-video-wrap{position: absolute; width: 55%; left: 15px; top: '+ (typeof adSettings.videoTop != 'undefined' ? adSettings.videoTop : '30%') +'; height: 111px;background: 000; overflow: hidden; background-color: #000;}' +
		'#preloader {display: none; background: #000; position: absolute; top: 0; right: 0; bottom: 2px; left: 0; text-align: center; z-index: 9000000000;}' +
		'#preloader img {position: absolute; top: 50%; margin-top: -24px; margin-left: -24px; opacity: .5}' +
		'#mau-playbtn{background:url(//ignitecampaigns.com/uploads/2014/09/03/play-btn.png) center no-repeat;background-size:30%;z-index:4;opacity:1;position: absolute;width: 100%;height: 100%;opacity: .7;}' +
		'#mau-ytPlayer{height: 200%; position: absolute;top: -50%;right: 0;bottom: 0;left: 0;z-index: 6;opacity: .01;}' +
		'.mau_hide{display: none;}' +
		'.show {display: block;}' +
		'.hide {display: none;}' +
		'.iosBtn { display: none; z-index: 999999999999999999; }' +
		'.topBanner {height: 200px; background-color: #000;}' +
		'.banner-img {width: 100%; display: none; margin-bottom: -1px;}'+
		'.embed-player {height: '+ (typeof adSettings.embedPlayerHeight != 'undefined' ? adSettings.embedPlayerHeight : '320px') +'; display: none}' + // 320px was the fixed height
		'@media only screen and (max-width: 330px){#mau-video-wrap{height: 93px;}}' +
		'@media only screen and (max-width: 265px){#mau-video-wrap{height: 84px;}}',
		one: true, 
		two: true, 
		three: true,
		executed: false
	},
	checkTSM = window.top.TSM && window.top.TSM.sitetype,
	pd = window.document,
	ga, isFirstTime = 1;
	getFrameForDocument = function(document){ var w = document.defaultView || document.parentWindow, frames = w.parent.document.getElementsByTagName('iframe'); for (var i = frames.length; i-->0;) { var frame = frames[i]; try { var d= frame.contentDocument || frame.contentWindow.document; if (d===document) return frame; } catch(e) {} } }
	var iFrame = jQuery(getFrameForDocument(document));
	iFrame
	.css('width', '100%')
	.css('height', '146px');
	iFrame.id = 'mau-id';
	var isDebug = function(h,hs,s){ hs = h.split( '?' ); if( hs.length > 1 ){ s=hs[1].split( '&' ); return s.indexOf( 'debug' )>-1; } return 0; }( window.top.location.href );
	$('body', pd).append( params.markup );
	var isDebug = function(h,hs,s){ hs = h.split( '?' ); if( hs.length > 1 ){ s=hs[1].split( '&' ); return s.indexOf( 'debug' )>-1; } return 0; }( window.top.location.href ),
	ytTest = function(h,hs,s){ hs = h.split( '?' ); if( hs.length > 1 ){ s=hs[1].split( '&' ); return s.indexOf( 'test' )>-1; } return 0; }( window.top.location.href );
	if (typeof checkTSM === 'undefined') {	
		iFrame.css('position', 'fixed').css('left', '0').css('bottom', '-51px').css('z-index', '10001');
	}
	/* Global Variables */
	var w = window,
	d = w.document,
	wt = window.top.document,
	//body = $('body',pd),
	ad = $('#mobile-anchor-unit', pd),
	clickThru = $('#mau-unit img', pd),
	unit = $('.unit', pd),
	collapsed = $('#mau-collapsed img', pd),
	expanded = $('#mau-unit img', pd),
	cWrap = $('#mau-collapsed', pd),
	eWrap = $('#mau-unit', pd),
	closeBtn = $('.mau-close', pd),
	closeBtnExpanded = $('.mau-close-unit', pd),
	collapseBtn = $('.mau-collapse-unit'),
	video = $('#mau-video-wrap', pd),
	mobileMenueBtn = $('.mobile-menu-button', parent.document),
	banner = $('.banner-img'),
	embedPlayer = $('.embed-player'),
	timeOut;

	var TSMadClass = function(settings) {
		var events = {
			init: function(){
				var isVideo;
				if(adSettings.ytId != '' && adSettings.ytId != null ) {
					isVideo = true;
				} else {
					isVideo = false;
				}
				//turn on spotify and turn off expnded image (or off if undefined)
				if(typeof adSettings.spotify !== 'undefined' && adSettings.spotify !== '' && adSettings.spotify) {
					unit.remove();
					isVideo = false;
					video.remove();
					embedPlayer.css('display', 'block');
					banner.css('display', 'block');
				}
				if(!isVideo){
					video.remove();
				} else {
					TSMAD.initYT();
				}
				TSMAD.initGA(isVideo);
				var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
			 	if (!iOS) {
			 		$('#mobile-anchor-unit').css('bottom', '45px');
			 	}
			 	if (typeof adSettings.brandedApp !== 'undefined' && adSettings.brandedApp) {
			 		var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
			 		if (iOS) {
						ga.getBenchmarker().setVariables( 'platform', 'app: ios' );
			 		} else {
			 			ga.getBenchmarker().setVariables( 'platform', 'app: android' );
			 		}
			 	} else {
			 		ga.getBenchmarker().setVariables( 'platform', 'browser' );
			 	}
			 	ga.sendtrack( 'impression', '' );
			 	if (window.top.performance) {
				    var domComplete = window.top.performance.timing.domInteractive,
				    date = new Date,
				    now = date.getTime(),
				    adLoadTime = Math.round(now - domComplete);
				}

				if( typeof adSettings.brandedApp !== 'undefined' && adSettings.brandedApp ) {
					$(document).ready(function(){
						var collapsedImg = $('.collapsedImg');
						TSMAD.appCallbacks( collapsedImg, 'adCollapsed' );
					});
			    }
			},
			iosYTFix: function() {
				var iosBtn = $('.iosBtn'); 
				iosBtn.css('display', 'block');
				iosBtn.on('click', function() {
					$(this).remove();
					TSMAD.fadeOut($('#spriteContainer'));
					TSMAD.fadeOut($('#mau-playbtn'));
					TSMAD.fadeIn($('#mau-ytPlayer'));
					ga.sendtrack( 'user click: yt opt in', '' );
				});
			},
			fadeIn: function(elem) {
				var counter = 0,
					self = this;
				var fadeIn = setInterval(function(){
					counter++;
					if(counter === 10) {
						elem.css('opacity', '1');
						clearInterval(fadeIn);
					} else {
						elem.css('opacity', '.' + counter);
					}
				}, 80);
			},
			fadeOut: function(elem){
				var counter = 10,
					self = this;
				var fadeIn = setInterval(function(){
					counter--;
					if(counter === 10) {
						elem.css('opacity', '0');
						clearInterval(fadeIn);
						//self.safariHack();
					} else {
						elem.css('opacity', '.' + counter);
					}
				}, 80);
			},
			clickthrough: function() {
				w.open(settings.clickthrough, '_blank');
				if(typeof adSettings.expandedImage != 'undefined' && adSettings.expandedImage != '') {
					ga.sendtrack( 'clickthrough: expanded', '' );
				} else {
					ga.sendtrack( 'clickthrough: collapsed', '' );
				}
			},
			initGA: function(isVideo) {		
				var unitName;
				if(typeof adSettings.spotify !== 'undefined' && adSettings.spotify){
					unitName = 'Mobile - Anchor Unit - Playlist - Spotify';
					propName = 'mobile - anchor unit - playlist - spotify';
				} else {
					if(!isVideo){
						unitName = 'Mobile - Anchor Unit - Display';
						propName = 'mobile - anchor unit - display';
					} else {
						unitName = 'Mobile - Anchor Unit - Video';
						propName = 'mobile - anchor unit - video';
					}
				}
				ga = new window.igniteCampaigns.initGA({
			        id: adSettings.gaId,
			        campaignName: adSettings.campaignName,
			        container:jQuery( '#mobile-anchor-unit' ),
			        gaunitname: unitName,
			        player:undefined,
			        callback:function(){}
				}).setBenchmarkReporting({
					propertyName: propName,
					campaign: adSettings.campaignName,
					category: unitName
			    });
			},
			initYT: function() {
				player = new window.igniteCampaigns.videoHelper({
					apitype:'youtube',
					playerContainerId:'mau-ytPlayer',
					w:'100%',
					h:'100%',
					autoplay:0,
					startVideo: adSettings.ytId,
					forceHTML5:false,
					addProgressEvent:1,
					showControls:false
				});
				$('body', pd).on( 'ignite-yt-ready', function(){
					ga.getBenchmarker().setVariables( 'videoDuration', ''  + player.getDuration() );
				});
				$('#mobile-anchor-unit', pd)
				.on( 'ignite-playerprogress', function( e, o ){	
					var	per = o.current/o.duration,
					i = Math.floor( 100 * per / ( 100 * 0.25 ) );
					if( per*100 >= 0 && per*100 <= 100 ){
						if( per > 0.25*i && per <= 0.25*(i+1) ){
							if(i == 1) {
								if(params.one){	
									ga.sendtrack( 'videoquart 25 user', adSettings.ytId );
									if (typeof adSettings.quartilePixels != 'undefined') {
										TSMAD.firePixels( [ adSettings.quartilePixels[25] ] );
									}			
									params.one = false;
								}
							}  else if (i == 2) {
								if(params.two){	
									ga.sendtrack( 'videoquart 50 user', adSettings.ytId );
									if (typeof adSettings.quartilePixels != 'undefined') {
										TSMAD.firePixels( [ adSettings.quartilePixels[50] ] );
									}	
									params.two = false;
								}
							} else if (i == 3) {
								if(params.three){
									ga.sendtrack( 'videoquart 75 user', adSettings.ytId );
									if (typeof adSettings.quartilePixels != 'undefined') {
										TSMAD.firePixels( [ adSettings.quartilePixels[75] ] );
									}
									params.three = false;
								}
							}		
						}
					}
				}).on( 'ignite-playervideostart', function(){
			        if (!params.executed) {
			            params.executed = true;
			            ga.sendtrack('user click: video thumbnail', adSettings.ytId);
			            $('#preloader', pd).remove();
			        }
			        ga.sendtrack( 'videoquart 0 user', adSettings.ytId );
			        if (typeof adSettings.quartilePixels != 'undefined') {
						TSMAD.firePixels( [ adSettings.quartilePixels[0] ] );
					}
				}).on( 'ignite-playerpause', function(){	
					$('#mau-ytPlayer', pd).css('opacity', '.01'); // change back to .01
					$('#mau-playbtn, .videoThumbnail, #spriteContainer', pd).show();
				}).on( 'ignite-playerplay', function(){
					$('#mau-ytPlayer', pd).css('opacity', '1');
				}).on( 'ignite-playervideoend', function(){
					$('iframe#mau-ytPlayer').remove();//.css('opacity', '.01');
					var newYT = document.createElement('div');
					newYT.id = 'mau-ytPlayer';
					$('#mau-video-wrap').append(newYT);
					TSMAD.initYT();
					onYouTubeIframeAPIReady();
					ga.sendtrack( 'videoquart 100 user', adSettings.ytId );
					if (typeof adSettings.quartilePixels != 'undefined') {
						TSMAD.firePixels( [ adSettings.quartilePixels[100] ] );
					}
					TSMAD.resetQuart();
					$('#mau-ytPlayer', pd).css('opacity', '.01');
					$('#mau-playbtn, .videoThumbnail, #spriteContainer', pd).show();
				}).on( 'ignite-playerbuffering', function(){
					TSMAD.adTimeOut('vidPlayed');
					$('#preloader', pd).css('display', 'block');
					$('#mau-playbtn, .videoThumbnail, #spriteContainer', pd).hide();
				});
				if(typeof adSettings.useSprite !== 'undefined' && adSettings.useSprite === true && isFirstTime) { //&& isFirstTime
					$('.videoThumbnail').remove();
					var sprite = new w.igniteCampaigns.SpriteAnimation({
						spriteContainer: adSettings.spriteContainer,
						spriteImg: adSettings.spriteImg,
						frameWidth: adSettings.frameWidth,
					    frameHeight: adSettings.frameHeight,
					    rows: adSettings.rows,
					    cols: adSettings.cols,
					    animationTime: adSettings.animationTime,
					    topOffset: adSettings.topOffset
					});
					sprite.code();
					isFirstTime = 0;
				}
			},
			resetQuart: function() {
				params.one = true; 
				params.two = true; 
				params.three = true;
			},
			firePixels: function( pixels ) {
				for( var i = 0 ; i < pixels.length; i++ ){
					var img = new Image(), src = pixels[i];
					img.src = src;
				}
			},
			scrollOpen: function(){
					function setCookie(cname, cvalue, exsecs) {
						var date = new Date();
					    date.setTime(date.getTime() + (exsecs)); //(exdays*24*60*60*1000)
					    var expires = "expires="+ date.toUTCString();
						document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
					}
					
					function getCookie(cname) {
						var name = cname + "=",
						ca = document.cookie.split(';');
						for(var i = 0; i < ca.length; i++) {
							var c = ca[i];
							while (c.charAt(0) == ' ') {
								c = c.substring(1);
							}
							if (c.indexOf(name) == 0) {
								return c.substring(name.length, c.length);
							}
						}
						return '';
					}

					function checkCookie() {
						var scrollCheck = getCookie('mauScroll');
						if (scrollCheck !== 'set') {
							ga.sendtrack( 'user scroll: open', '' );
							TSMAD.expandUnit();
							TSMAD.adTimeOut();	
							if( !isDebug ){
								setCookie('mauScroll', 'set', 1000*60*5); //minutes till Expire
							}
						}
					}
					checkCookie();
			},
			adTimeOut: function(state) {
				if(state != 'vidPlayed'){
					timeOut = setTimeout(function(){		
							TSMAD.collapseUnit();
							if( typeof adSettings.brandedApp !== 'undefined' && adSettings.brandedApp ) {
								var collapsedImg = $('.collapsedImg');
								TSMAD.appCallbacks( collapsedImg, 'adCollapsed' );		 
						    } else {
								iFrame.css('height', '146px');
							}
					}, adSettings.previewTimeOut + '000');
				} else {
					clearTimeout(timeOut);
				}
			},
			clickOpen: function(){
				ga.sendtrack( 'user click: open', '' );
				TSMAD.expandUnit();
			},
			expandUnit: function() {
				$(parent.window).off('scroll.mau', TSMAD.scrollOpen);
				cWrap.hide();
				eWrap.show();
				if( typeof adSettings.brandedApp !== 'undefined' && adSettings.brandedApp ) {
					var unit = $('.unit');
					TSMAD.appCallbacks( unit, 'adExpanded' );
			    } else {
			    	var frameHeight;
			    	if(typeof adSettings.iframeExpandHeight !== 'undefined' && adSettings.iframeExpandHeight !== '') {
			    		frameHeight = adSettings.iframeExpandHeight;
			    	} else {
			    		if(typeof adSettings.spotify !== 'undefined' && adSettings.spotify){
			    			frameHeight = '470px';
			    		} else {
			    			frameHeight = '256px';
			    		}
			    	}
			    	if( isDebug ){
						iFrame.css('background', 'red');
					}
					iFrame.css('height', frameHeight);
				}
				closeBtnExpanded.show();
				if(typeof adSettings.spotify !== 'undefined' && adSettings.spotify){
					collapseBtn.show();
				}
				expanded.animate({
					marginBottom: '0'
				}, 250);
			},
			collapseUnit: function(intent) {
					closeBtnExpanded.hide();
					collapseBtn.hide();
					eWrap.hide(); 
					if( intent === 'clicked') {
						ga.sendtrack( 'user clicked: collapse', '' );
						clearTimeout(timeOut);
					} else {
						ga.sendtrack( 'preview timeout', '' );
					}
					expanded.animate({
						marginBottom: '-180px'
					},250);
					cWrap.show();
			},
			hideUnit: function() {
				ga.sendtrack( 'user click: close', '' );
				if( typeof adSettings.brandedApp !== 'undefined' && adSettings.brandedApp ) {
					var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
					if(iOS) {
						window.webkit.messageHandlers.adClosed.postMessage('ad Closed');
					} else {
						window.jsinterface.adClosed()
					} 
			    } else {
					ad.remove();
					iFrame.css('height', '0');
				}
			},
			appCallbacks: function(target, method) {
				var eImg = target.height(),
				eTotal = eImg + 25;
				var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
				if(iOS) {
					if (method === 'adCollapsed') {
						window.webkit.messageHandlers.adCollapsed.postMessage(eTotal);
					} else if (method === 'adExpanded') {
						window.webkit.messageHandlers.adExpanded.postMessage(eTotal);
					}
				} else {
					if (method === 'adCollapsed') {
						window.jsinterface.adCollapsed(eTotal);
					} else if (method === 'adExpanded') {
						window.jsinterface.adExpanded(eTotal);
					}
				}
			},
			toggleAd: function() { 
		    	var adState = $('#mobile-anchor-unit', pd);
				if (typeof(adState) != 'undefined' && adState != null) {
				  	if ( adState.hasClass('mau_hide') ) {
						adState.removeClass('mau_hide');
					}
					else {
						adState.addClass('mau_hide');
					}	
				}
		    },
		    expandOn: function() {
		    	$(parent.window).off('scroll.mau').on('scroll.mau', TSMAD.scrollOpen );
		    	window.onunload = function(){
		    		$(window.top).off('scroll.mau');
		    	};
		    	collapsed.on('click', function(e){
					e.stopPropagation();
					TSMAD.clickOpen();
				});
				clickThru.on('click', function(){
					TSMAD.clickthrough();
				});
		    },
		    expandOff: function() {
		    	collapsed.on('click', function(e){
					e.stopPropagation();
					TSMAD.clickthrough();
				});
		    }
		}
		return events;
	}
	styles = document.createElement('style');
	styles.setAttribute('type', 'text/css');
	styles.innerHTML = params.theStyles;
	d.getElementsByTagName('head')[0].appendChild(styles);
	TSMAD = new TSMadClass(adSettings);
	closeBtn.on('click', function(e){
		e.stopPropagation();
		TSMAD.hideUnit();
	}); 
	collapseBtn.on('click', function() {
		TSMAD.collapseUnit('clicked');
	});
	mobileMenueBtn.on('click', TSMAD.toggleAd);
	if(typeof adSettings.expandedImage != 'undefined' && adSettings.expandedImage != '' || typeof adSettings.spotify != 'undefined' && adSettings.spotify != 0) {
		TSMAD.expandOn();
	} else {
		$('#mau-unit').remove();
		TSMAD.expandOff();
	}
	TSMAD.init(); 

	/******* partner fixes *********/
	//indie shuffle
	var domain = window.top.location.host;
	if(domain === 'www.indieshuffle.com') { //indie shuffle
		var iphoneWelcome = $('#iphoneWelcome', wt),
		androidWelcome = $('#androidWelcome', wt),
		toolbar = $('.sf-toolbar .sf-minitoolbar', wt);
		iphoneWelcome.css('display', 'none');
		androidWelcome.css('display', 'none');
		$('.mobile-banner', wt).css('display', 'block');
		toolbar.css('display', 'none');
		closeBtn.on('click', function(e){
			e.stopPropagation();
			iphoneWelcome.css('display', 'block');
			androidWelcome.css('display', 'block');
			toolbar.css('display', 'block');
		}); 
	} else if (domain === 'singersroom.com') { //singers room
		var srInterval = setInterval(function(){			//console.log('interval ran');
			var at4mdoc = $('#at4m-dock', wt),
			arrow = $('.at4m-dock-toggle');
			if( at4mdoc.length > 0) {
				at4mdoc.css('display', 'none');
				arrow.css('display', 'none');
				clearInterval(srInterval);
			}
		}, 5);
		closeBtn.on('click', function(e){
			e.stopPropagation();
			var at4mdoc = $('#at4m-dock', wt),
			arrow = $('.at4m-dock-toggle');
			at4mdoc.css('display', 'block');
			arrow.css('display', 'block');
		}); 
	} else if (domain === 'localhost') {
		cnsole.log('localhost');
	} 
}(window));
