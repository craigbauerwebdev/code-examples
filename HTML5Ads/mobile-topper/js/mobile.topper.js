/* Mobile Topper v1 by Craig */
(function(w) {
	w.igniteCampaigns = w.igniteCampaigns || {};
	w.top.igniteCampaigns = w.top.igniteCampaigns || {};
	var adSettings = w.top.igniteCampaigns.adSettings,
	disableSlideIn = adSettings.disableSlideIn,
	var defaults = { 
		clickthrough: '//townsquaremedia.com',
		topBannerImg: '//ignitecampaigns.com/uploads/2018/01/18/snow-top.png',
		imgBottom: '//ignitecampaigns.com/uploads/2017/12/07/v2_13231004_lufkin_army_bottom.jpg',
		bottomBanner: '//ignitecampaigns.com/uploads/2018/01/18/army-bar_2.png',
		dockedBanner: '//ignitecampaigns.com/uploads/2018/01/18/snow-bar.png',
		exploreColor: '#ec3432',
		exploreBkgColor: '#ddd',
		imgTop: '//ignitecampaigns.com/uploads/2018/01/18/snow-expand.png'	
	},	
	params = {
		theURL: window.top.location.host,
		markup: 
		'<div class="mp-top-wrap">' +
			'<div class="video-container">' +
			 	'<div class="vThumb"></div>'+
			 	'<img class="playBtn" src="//ignitecampaigns.com/global/mobile-topper/assets/playBtn.png" />'+
			 	'<div class="preloader">' +
				 	'<img src="//ignitecampaigns.com/uploads/2014/10/10/loading-dark.gif">' +
				 '</div>'+
			 	'<div id="ytPlayer"></div>' +
			'</div>' +
			'<div class="display-ct"></div>' +
			'<div class="bottom-banner">' +
				(typeof adSettings.bottomBanner != 'undefined' ? '<img width="100%" class="video-bottom-banner" src="'+adSettings.bottomBanner+'" />' : '' ) +
				((typeof disableSlideIn === undefined || !disableSlideIn) ? '<div class="explore"><div class="explore-bkg"></div><span class="swipe-text">SWIPE TO EXPLORE</span>' +
				'<svg style="height: 22px; position: absolute; right: 0; top: 50%; width: 30px; transform: translateY(-50%);" xmlns="https://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 462.86 752.14"><defs><style>.cls-1{fill: '+adSettings.exploreColor+';}</style></defs><title>arrow-right</title><g id="Layer_1-2" data-name="Layer_1"><path class="cls-1" d="M25.34,604A86.72,86.72,0,0,0,86.68,752,86.09,86.09,0,0,0,148,726.62L437.38,437.27a86.73,86.73,0,0,0,0-122.68l-1.3-1.3L148,25.23A86.72,86.72,0,1,0,25.34,147.84L253.43,375.93Z" transform="translate(0.07 0.11)"/></g></svg>' +
				'</div>' : '')+
				(typeof adSettings.dockedBanner != 'undefined' ? '<img class="dock-banner" width="100%" src="'+ adSettings.dockedBanner +'" />' : '') +
			'</div>' +
		'</div>',
		theStyles: '*{ padding: 0;margin: 0;}' +
			'.mp-top-wrap {}' +
			'.vThumb {background: url('+ (typeof adSettings.videoThumb != 'undefined' ? adSettings.videoThumb : '') +') center center; background-size: cover; position: absolute; top: 0; right: 0; bottom: 0; left: 0; }'+
			'.video-container { width: 100%; margin: 0 auto; position: relative; padding-top: 56%; height: 0; overflow: hidden; background: '+ (typeof adSettings.ytId != 'undefined' ? '#000' : 'url("'+adSettings.topBannerImg+'")')+'; background-size: cover; background-position: top;}'+
			'.display-ct { position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%; display: '+ (typeof adSettings.ytId != 'undefined' ?  'none' : 'block') +';}' +
			'.bottom-banner { position: absolute; left: 0; bottom: 0; width: 100%; z-index:9; }'+
			'.bottom-banner .video-bottom-banner { opacity:'+ (typeof adSettings.barAlpha != 'undefined' ? adSettings.barAlpha : '.8')+'; width: 100%; display: '+ (typeof adSettings.ytId != 'undefined' ?  'block' : 'none') +';}'+
			'.explore {transition: opacity .5s; text-align: center; font-family: Arial; font-size: 1.1em; font-weight: bold; color: '+adSettings.exploreColor+'; display: '+ (typeof adSettings.ytId != 'undefined' ?  'none' : 'block') +'; position: absolute; left: 0; bottom: 0; width: 100%; z-index: 2; }' + //padding: 6px 0;
			'.explore-bkg { opacity:'+ (typeof adSettings.barAlpha != 'undefined' ? adSettings.barAlpha : '.8')+'; position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: '+ (typeof adSettings.exploreBkgColor != 'undefined' ? adSettings.exploreBkgColor : '#fff')+'; z-index: -1; }' + //background: rgba(255,255,255,.8);
			'.playBtn { position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); opacity: .2; display: '+ (typeof adSettings.ytId != 'undefined' ?  'block' : 'none') +';}'+
			'.preloader {display: none; height: 100%; width: 100%; text-align: center; background: #000;}' +
			'.preloader img {position: absolute; margin-left: -24px; margin-top: -24px; top: 50%; opacity: .5;}' +
			'#ytPlayer{position: absolute; height: 200%; top: -50%; right: 0; bottom: 0; left: 0; display: block; background: #000; opacity: .01;}' + // opacity: .01;
			'.swipe-text { position: absolute; top: 50%; right: 0; bottom: 0; left: 50%; width: 100%; transform: translate(-50%, -50%);}' +
			'.center { text-align: center }' +
			'.show {display: block;}' +
			'.hide {display: none;}' +
			'.dock-banner { transition: opacity .5s; opacity: .01; display: block; z-index: 999;}' +
			'@media only screen and (max-width: 330px) { .explore { font-size: .95em; } }' +
			'.cls-1 { fill: '+adSettings.exploreColor+'!important;}',
		laterExternalStyles: '#ads-top-leaderboard { min-height: 0!important;}'
	}	
	$('body').append( params.markup );  // move this to shitout markup
	var elems = {
		this: $(this),
		bodytag: $('body'),
		preloader: $('.preloader'),
		vThumb: $('.vThumb'),
		playBtn: $('.playBtn'),
		sticky: false
	}, 
	pulldown;
	var 
		getFrameForDocument = function(document){ var w = document.defaultView || document.parentWindow, frames = w.parent.document.getElementsByTagName('iframe'); for (var i = frames.length; i-->0;) { var frame = frames[i]; try { var d= frame.contentDocument || frame.contentWindow.document; if (d===document) return frame; } catch(e) {} } },
		iFrame = jQuery(getFrameForDocument(document));
	iFrame
		.css({
			'position': 'relative',
			'width': '100%',
			'height': '0',
			'top': '0',
			'right': '0',
			'left': '0',
			'border': '0'
		})
		.addClass('mobile-topper-iframe');

	function unitType(){
		if( typeof adSettings.ytId !== 'undefined' && adSettings.ytId !== '' ) {
			return 'Video';
		} else if( typeof adSettings.song !== 'undefined' && adSettings.song !== '' ) {
			return 'Music';
		} else {
			return 'Display'
		}	
	}
	var TopMPClass = function(settings) {
		var events = {
			init: function( initParams ){
			 	ga.sendTiming( 'load', {label: adSettings.campaignName} );
			 	ga.sendtrack( 'impression', '' );
			 	if (typeof adSettings.ytId != 'undefined' && adSettings.ytId != '' ) {	
				 	TopMP.initVideo();
				} else {
					var loop = setInterval(function(){
						if($('.dock-banner').height() > 0) {
							$('.explore').height($('.dock-banner').height() + 'px');
							clearInterval(loop);
						}
					}, 50);
				}
				if (typeof adSettings.useSprite && adSettings.useSprite == true) {
					TopMP.useSprite();
				}				 	
			 	TopMP.initSlide( initParams.slideCb || function(){} );
			 	TopMP.actions();			 	
			 	window.onunload = function(){
		    		$(window.top).off('scroll.mptopper');
		    	};
				TopMP.shitOutMarkup(defaults); // move to params setting function
			},
			scrollStyles: function() {
				setTimeout(function(){	
					var unitHeight = $('.mp-top-wrap').height();
					if(typeof adSettings.ytId != 'undefined' ) {
						if( $('.video-bottom-banner').length ){
							var bannerHeight = $('.video-bottom-banner').height() || 35;
						}
					} else {
						if( $('.dock-banner').length ){
							var bannerHeight = $('.dock-banner').height(); //32
						}
					}
					var stickyHeight = (unitHeight - bannerHeight),//bannerHeight
					bodyScrollTop;
					window.stickyMenuHeight = stickyHeight;
					if(typeof adSettings.ytId == 'undefined' ) {
						$(parent.window).off('scroll.mptopper').on('scroll.mptopper', scrollTopper);
					}
					function scrollTopper() { 
						bodyScrollTop = $(window.top).scrollTop();
						if(bodyScrollTop > stickyHeight) {
							$('.dock-banner').css('opacity', 1);
							$('.explore').css('opacity', .01);
						} else {
							$('.explore').css('opacity', 1);//.fadeIn(200).css('display', 'block');
							$('.dock-banner').css('opacity', .01);//fadeOut(200);
						}			
					}
					var wtd = w.top.document,
					laterextstyles = document.createElement('style');
					laterextstyles.setAttribute('type', 'text/css');
					laterextstyles.id = 'mt-override-styles';
					laterextstyles.innerHTML = '#site-menu-wrapper, .blingbar {top: -'+stickyHeight+'px }';
					wtd.getElementsByTagName('head')[0].appendChild( laterextstyles );
				}, 800);
			},
			toggleAd: function() {
				$("html, body", window.top.document).animate({
					"scrollTop": window.stickyMenuHeight + "px"
				}, 100);
		    },
			initGA: function() {
				var ga = new window.igniteCampaigns.initGA({
			        id: adSettings.gaId,
			        campaignName: unitType() + ' - ' +  adSettings.campaignName,
			        container:jQuery( '#ad' ),
			        gaunitname: 'Mobile - Topper',
			        player:undefined,
			        callback: function(){}
				}).setBenchmarkReporting({
					propertyName: 'mobile - topper - ' + unitType(),
					campaign: '',
					category: 'Mobile - Topper - ' + unitType()
				});
				ga.getBenchmarker().setVariables( 'videoCount', '1' );
				if (typeof adSettings.clickToCall && adSettings.clickToCall === true){
					ga.getBenchmarker().setVariables( 'clickToCall', 'true' );
				} else {
					ga.getBenchmarker().setVariables( 'clickToCall', 'false' );
				}
				ga.getBenchmarker().setVariables( 'campaign', adSettings.campaignName );
				self.ga = ga;
				return self;
			},
			initVideo: function() {
				var ignitePlayer = new window.igniteCampaigns.videoHelper({
					apitype:'youtube',
					playerContainerId:'ytPlayer',
					w:'100%',
					h:'100%',
					autoplay: 0,
					startVideo: adSettings.ytId,
					forceHTML5: false,
					addProgressEvent: 1,
					showControls: false
				});
				elems.bodytag.on( 'ignite-yt-ready', function(){
					ga.getBenchmarker().setVariables( 'videoDuration', ''  + ignitePlayer.getDuration() );
				});
				var counter = 0, 
				one = true, two = true, three = true;
				$('.mp-top-wrap')
				.on( 'ignite-playerprogress', function( e, o ){
					var	per = o.current/o.duration,
					i = Math.floor( 100 * per / ( 100 * 0.25 ) );
					if( per*100 >= 0 && per*100 <= 100 ){
						if( per > 0.25*i && per <= 0.25*(i+1) ){
							if(i == 1) {
								if(one == true){
									ga.sendtrack( 'videoquart 25 user', adSettings.ytId );
									if (typeof adSettings.quartilePixels != 'undefined') {
										TopMP.firePixels( [ adSettings.quartilePixels[25] ] );
									}
									one = false;
								}
							} else if (i == 2) {
								if(two == true){	
									ga.sendtrack( 'videoquart 50 user', adSettings.ytId );
									if (typeof adSettings.quartilePixels != 'undefined') {
										TopMP.firePixels( [ adSettings.quartilePixels[50] ] );
									}
									two = false;
								}
							} else if (i == 3) {
								if(three == true){
									ga.sendtrack( 'videoquart 75 user', adSettings.ytId );
									if (typeof adSettings.quartilePixels != 'undefined') {
										TopMP.firePixels( [ adSettings.quartilePixels[75] ] );
									}
									three = false;
								}
							}		
						}
					}
				}).on( 'ignite-playervideostart', function(){
					w.igniteCampaigns.spriteStatus = 'played';
					ga.sendtrack( 'user click: video thumbnail - init', adSettings.ytId );
					ga.sendtrack( 'videoquart 0 user', adSettings.ytId );
					if (typeof adSettings.quartilePixels != 'undefined') {
						TopMP.firePixels( [ adSettings.quartilePixels[0] ] );			
					}
					$('#ytPlayer').css('opacity', '1');
					elems.preloader.removeClass('show');
					elems.preloader.addClass('hide');
					elems.preloader.remove();
				}).on( 'ignite-playerpause', function(){
					$('#ytPlayer').css('opacity', '.01');
					elems.vThumb.show();
					elems.playBtn.show();
				}).on( 'ignite-playerplay', function(){
					$('#ytPlayer').css('opacity', '1');
					elems.vThumb.hide();
					elems.playBtn.hide();
				}).on( 'ignite-playervideoend', function(){
						$('iframe#ytPlayer').remove();//.css('opacity', '.01');
						var newYT = document.createElement('div');
						newYT.id = 'ytPlayer';
						$('.video-container').append(newYT);
						TopMP.initVideo();
						onYouTubeIframeAPIReady();
						elems.vThumb.show();
						elems.playBtn.show();
						ga.sendtrack( 'videoquart 100 user', adSettings.ytId );
						if (typeof adSettings.quartilePixels != 'undefined') {
							TopMP.firePixels( [ adSettings.quartilePixels[100] ] );
						}
					TopMP.resetQuart();
				}).on( 'ignite-playerbuffering', function(){
					elems.preloader.addClass('show');
					elems.vThumb.hide();
					elems.playBtn.hide();
				});
				self.ignitePlayer = ignitePlayer;
				return self;
			},
			firePixels: function( pixels ){
				for( var i = 0 ; i < pixels.length; i++ ){
						var img = new Image(), src = pixels[i];
						img.src = src;
					}
			},
			resetQuart: function() {
				one = true; 
				two = true; 
				three = true;
			},
			clickthrough: function() {
				if (typeof adSettings.clickToCall !== undefined && adSettings.clickToCall === true){
					var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
					if( iOS ) {
						var phone = 'telprompt://' + adSettings.phoneNum,
						ct = phone;
					} else {
						var phone = 'tel:+1' + adSettings.phoneNum,
						ct = phone;
					}
				} else { 
					var ct = adSettings.clickthrough;
				}
				w.top.open(ct, '_blank');
				ga.sendtrack( 'clickthrough - init', '' );
			},
			useSprite: function() {	
				$('.vThumb').css('background', 'none');
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
					self.sprite = sprite;
					return self;
			},
			initSlide: function( cb ) {
				if( typeof cb === "undefined" ){
					cb = function(){};
				}
				setTimeout(function(){
					var topHeight = $('.mp-top-wrap').height();
					//iFrame.css('height', topHeight);
					iFrame.animate({
						'height': topHeight + 'px'
					}, 600, 'linear', TopMP.scrollStyles());
					if (typeof adSettings.ytId == 'undefined' ) {
						$('.dock-banner').css('opacity', .01);//fadeOut(200);
						$('.explore').fadeIn(200);
					}
				}, 1000)
			},
			setTopHeight: function(menuCollapse) {
				setTimeout(function(){
					if(typeof adSettings.ytId != 'undefined' ) {
			 			var bannerHeight = $('.video-bottom-banner').height();
			 		} else {
			 			var bannerHeight = $('.dock-banner').height();
			 		}
			 		dockBannerheight = $('.dock-banner').height();
			 		setTimeout(function(){
						if (typeof adSettings.ytId != 'undefined' ) {
							iFrame.animate({
								'height': bannerHeight + 'px'
							}, 600);
						} else {
							$('.dock-banner').fadeIn(200);
							$('.explore').fadeOut(200);
							iFrame.animate({
								'height': dockBannerheight + 'px'
							}, 600);
						}
					}, 50);
				}, 50);

			},
			actions: function() {
				$('.mobile-menu-button, div.screen', window.top.document).on('click', TopMP.toggleAd);
				$('.bottom-banner').on('click', function(){
					TopMP.slideOutMP('tap');
				});
				$('.display-ct').on('click', function() {
					TopMP.clickthrough();
				});
				$('.mp-top-wrap, #ytPlayer').touchwipe({
				     wipeLeft: function() { 
				     	TopMP.slideOutMP('swipe left');
				     },
				     wipeRight: function() { 
				     	TopMP.slideOutMP('swipe right'); 
				     },
				     wipeUp: function() {},
				     wipeDown: function() {},
				     min_move_x: 20,
				     min_move_y: 20,
				     preventDefaultEvents: true
				});
				window.top.addEventListener('orientationchange', function() {
					TopMP.setTopHeight();
				});
			},
			slideOutMP: function(action) {
				if(typeof disableSlideIn === undefined || !disableSlideIn) {
					$('#mp-slidein-frame-id', window.top.document).animate({
						left: '0'
					}, 250);
					ga.sendtrack( 'user open', action );
					if (typeof adSettings.ytId != 'undefined' && adSettings.ytId != '' ) {
						ignitePlayer.pauseVideo();
						TopMP.checkResumeSprite();
					}
				} else {
					TopMP.clickthrough();
				}
			},
			checkResumeSprite: function() {
				var spriteStatus = w.igniteCampaigns.spriteStatus;
				var checkSprite = setInterval(function(){
					if($('#mp-slidein-frame-id', window.top.document).hasClass('resume-sprite')) {
						if(spriteStatus !== 'played') {
							if (typeof adSettings.useSprite && adSettings.useSprite == true) {
								sprite.resumeSprite();
							}
						}
						clearInterval(checkSprite);
						$('#mp-slidein-frame-id', window.top.document).removeClass('resume-sprite');
					}
				}, 500);
			}
		}
		return events;
	}
	TopMP = new TopMPClass(adSettings);
	TopMP.initGA();
	var
		d = w.document,
		styles = document.createElement('style');
		styles.setAttribute('type', 'text/css');
		styles.innerHTML = params.theStyles;
	var
		wtd = w.top.document,
		laterextstyles = document.createElement('style');
		laterextstyles.setAttribute('type', 'text/css');
		laterextstyles.innerHTML = params.laterExternalStyles;

	d.getElementsByTagName('head')[0].appendChild(styles);
	TopMP.init({
		slideCb: function(){
			setTimeout(function(){
				wtd.getElementsByTagName('head')[0].appendChild( laterextstyles );
			}, 3000);
		}
	});
}(window));