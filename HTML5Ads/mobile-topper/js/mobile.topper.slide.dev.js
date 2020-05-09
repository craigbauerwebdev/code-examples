(function(w) {
	w.top.igniteCampaigns = w.top.igniteCampaigns || {};
	var adSettings = w.top.igniteCampaigns.adSettings;
	adSettings.outline = 'none';
	var params = {
		theURL: window.top.location.host,
		markup: '<div class="theBkg"></div>' +
			'<div class="mp-wrap">' +
				'<div class="positionWrapper">' +
					'<div id="ad">' +	
						'<div class="swipe-to-close closeMP">'+
							'<svg style="height: 22px; height: 20px; position: absolute; left: -5px; top: 50%; width: 30px; transform: translateY(-50%);" class="arrow-left" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" width="6.41666in" height="10.4444in" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 6417 10444"><defs><style type="text/css"><![CDATA[.fil0 {fill:#282828;fill-rule:nonzero}]]></style></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"/><path class="fil0" d="M2907 5221l3168 -3168c227,-227 353,-530 353,-851 0,-322 -125,-624 -353,-852 -235,-235 -543,-352 -852,-352 -308,0 -617,117 -852,352l-4001 4001 -18 18c-227,227 -353,530 -353,852 0,322 125,624 353,852l4019 4019c228,228 530,353 852,353 322,0 624,-125 852,-353 227,-228 353,-530 353,-852 0,-322 -125,-624 -353,-851l-3168 -3168z"/></g></svg>'+
							' SWIPE TO CLOSE' +
						'</div>' +
						'<img class="imgs imgTop" width="100%" src="'+ (typeof adSettings.imgTop != 'undefined' ? adSettings.imgTop : '') +'">' +
						'<div class="video-container">' +
						 '<div class="vThumb"></div>' +
						 '<div class="playBtn"></div>' +
						 '<div class="preloader">' +
						 	'<img src="http://wac.450f.edgecastcdn.net/80450F/ignitecampaigns.com/uploads/2014/10/10/loading-dark.gif">' +
						 '</div>'+
						'<div id="ytPlayer"></div>' +
						'<div class="iosBtn" style="position: absolute; top: 0, right: 0; bottom: 0; left: 0; width: 100%; height: 100%; opacity: .8;"></div>'+
					'</div>' +	
					'<img class="imgs imgBottom" width="100%" src="'+ (typeof adSettings.imgBottom != 'undefined' ? adSettings.imgBottom : '') +'">' +
					'<div id="mp-audio">' +
						'<div id="mp-play">' +
							'<img class="audioPlayBtn" src="//ignitecampaigns.com/global/mobile-topper/assets/retina-play.png" />' +
							'<img class="audioPauseBtn hide" src="//ignitecampaigns.com/global/mobile-topper/assets/retina-pause.png" />' +
						'</div>' +
						'<div id="mp-audio-player">' +
							'<div id="mp-audio-seek">' +
							'<div></div>' +
							'</div>' +
							'<div id="mp-audio-status"></div>' +
							'<div id="mp-audio-progress"></div>' +
							'<img id="mp-audio-apple" src="//ignitecampaigns.com/uploads/2014/09/22/mp-music-top-bot-apple.png"/>' +
						'</div>' +
					'</div>' +
					'</div>' +
				'</div>' + 
			'</div>', //45.25
		theStyles: '*{ padding: 0;margin: 0;}' +
			'.mp-wrap { position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden; }' +
			'.positionWrapper { position: fixed; top: 50%; right: 0; left: 0; max-width: 400px; margin: 0 auto; transform: translateY(-50%)}' +
			'iphone4 { padding: 20px 40px 0 40px; }' +
			'#ad{ opacity: 0; position: relative; width:100%; height: auto; margin: 0 auto; z-index:99999999999999999!important; border: '+adSettings.outline+' solid 2px; }' +
			'#ytPlayer{position: relative; display: block; background: #000;}' +
			'.imgs {display: block;}' +
			'.swipe-to-close { position: relative; color: #fff; background: #333; font-family: Arial; font-size: 1em; padding: 8px 0; text-align: center; }' +
			'.swipe-to-close span { position: absolute; top: 50%; left: 7px; font-size: 1.8em; transform: translateY(-50%);}' +
			'.video-container {position: relative; padding-top: 56%; height: 0; overflow: hidden; background-color: #000;}' +
				'.video-container iframe, .video-container #ytPlayer, .video-container object, .video-container embed { position: absolute; top: -50%; left: 0; width: 100%; height: 200%;}' +
				'.theBkg { background: #000; position: fixed; width: 100%; height: 100%; opacity: 1;}' +
				'.vThumb {background: url('+ adSettings.videoThumb +') center center; overflow:hidden; height:100%;}' +
			'.vThumb, .playBtn, .preloader {position: absolute; top: 0; right: 0; bottom: 0; left: 0;-webkit-background-size: cover;-moz-background-size: cover;-0-background-size: cover;-ms-background-size: cover;background-size: cover;}' +
			'.playBtn {background: url(http://ignitecampaigns.com/global/mobile-topper/assets/playBtn.png) no-repeat center center; background-size: initial; opacity: .3;}' +
			'.preloader {display: none; height: 100%; width: 100%; text-align: center; background: #000;}' +
			'.preloader img {position: absolute; margin-left: -24px; margin-top: -24px; top: 50%; opacity: .5;}' +
			'#ytPlayer { opacity: .01; }' +
			'.show {display: block;}' +
			'.hide {display: none;}' +
			'#mp-audio{position: absolute; top: '+ adSettings.playerHeight +'; left: 0; width: 74%;margin: 0 auto 12px;padding: 2.5% 0 0 20%; height: 40px;}' +
			'#mp-play{width: 15%; height: 40px; position: absolute; top:0; left:11px;}' +
			'#mp-play img {width: 100%;}' +
			'#mp-audio-player{position:relative; margin-top:12px}' +
			'#mp-audio-status{width:0;position:absolute;top:0;left:0;height:5px;background-color:#b8afaf;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;z-index:1}' +
			'#mp-audio-progress{width:100%;height:5px;background-color:#f0e6e6;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px}' +
			'#mp-audio-seek{position:absolute;width:25px;height:25px;top:-10px;left:0;z-index:2; margin-left: -6px;}' +
			'#mp-audio-seek div{position:absolute;width:15px;height:15px;top:50%;left:50%;margin:-8px 0 0 -8px;background-color:#f0e6e6;-webkit-border-radius:50px;-moz-border-radius:50px;border-radius:50px;-webkit-box-shadow:2px 2px 5px 0 rgba(0,0,0,.5);-moz-box-shadow:2px 2px 5px 0 rgba(0,0,0,.5);box-shadow:2px 2px 5px 0 rgba(0,0,0,.5)}' +
			'#mp-audio-music{height:0}' +
			'#mp-audio-apple{position:absolute;width:100px;top:10px;right:10px;z-index:1}' +
			'#animationStyles {  }'+
			'.iosBtn { display: none; }'+
			'.fil0 { fill: #fff!important;}'
	};
	$('body').append( params.markup );
	var elems = {
		this: $(this),
		bodytag: $('body'),
		ad: $('#ad'),
		mpWrap: $('.mp-wrap'),
		positionWrapper: $('.positionWrapper'),
		imgTop: $('.imgTop'),
		imgBot: $('.imgBottom'),
		preloader: $('.preloader'),
		vThumb: $('.vThumb'),
		mpAudio: $('#mp-audio'),
		vidContainer: $('.video-container'),
		playBtn: $('.playBtn'),
		audioSeek: $('#mp-audio-seek'),
		audioStatus: $('#mp-audio-status'),
		audioPlayBtn: $('.audioPlayBtn'),
		audioPauseBtn: $('.audioPauseBtn'),
		closeMP: $('.closeMP'),
		adsPrestitial: $('body').find('#ads-prestitial'),
		iFrameTimeout: 100
	};
	var 
		getFrameForDocument = function(document){ var w = document.defaultView || document.parentWindow, frames = w.parent.document.getElementsByTagName('iframe'); for (var i = frames.length; i-->0;) { var frame = frames[i]; try { var d= frame.contentDocument || frame.contentWindow.document; if (d===document) return frame; } catch(e) {} } },
		iFrame = jQuery(getFrameForDocument(document));
	iFrame
		.css({
			'position': 'fixed',
			'width': '100%',
			'height': '100%',
			'top': '0',
			'left': '100%',
			'border': '0',
			'z-index': '99999999999999999'
		})
		.addClass('sizeiFrame');
	function unitType(){
		if( typeof adSettings.ytId !== 'undefined' && adSettings.ytId !== '' ) {
			return 'Video';
		} else if( typeof adSettings.song !== 'undefined' && adSettings.song !== '' ) {
			return 'Music';
		} else {
			return 'Display'
		}
	}
	var TSMadClass = function(settings) {
		var events = {
			init: function(){
				$('#ads-prestitial', window.top.document).css('display', 'block');
				elems.ad.css('opacity', '1');
			 	ga.sendTiming( 'load', {label: adSettings.campaignName} );
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
			 	$('.mp-wrap, #ytPlayer').touchwipe({
				     wipeLeft: function() { 
				     	TSMAD.removeMP('swipe left');
				     },
				     wipeRight: function() { 
				     	TSMAD.removeMP('swipe right');
				     },
				     wipeUp: function() {},
				     wipeDown: function() {},
				     min_move_x: 20,
				     min_move_y: 20,
				     preventDefaultEvents: true
				});
				TSMAD.handleOrientation();
				window.top.addEventListener('orientationchange', TSMAD.handleOrientation);
			},
			handleOrientation: function() {
				  if(window.orientation == 90 || window.orientation == -90) {
				  	TSMAD.setWidth();
				  	$('.swipe-to-close').css('font-size', '.6em');
				  	$('.playBtn').css('background-size', 'contain');
				  } else {
				  	TSMAD.setWidth();
				  	$('.swipe-to-close').css('font-size', '1em');
				  	$('.playBtn').css('background-size', 'initial');
				  }
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
					} else {
						elem.css('opacity', '.' + counter);
					}
				}, 80);
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
			clickthrough: function() {
				if (typeof adSettings.clickToCall !== 'undefined' && adSettings.clickToCall === true){
					var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
					if( typeof adSettings.brandedApp !== 'undefined' && adSettings.brandedApp && iOS ) {
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
				ga.sendtrack( 'clickthrough - fullscreen', '' );
				TSMAD.removeMP('ct');
			},
			video: function() {
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
				elems.ad
				.on( 'ignite-playerprogress', function( e, o ){
					var	per = o.current/o.duration,
					i = Math.floor( 100 * per / ( 100 * 0.25 ) );
					if( per*100 >= 0 && per*100 <= 100 ){
						if( per > 0.25*i && per <= 0.25*(i+1) ){
							if(i == 1) {
								if(one == true){
									ga.sendtrack( 'videoquart 25 user', adSettings.ytId );
									if (typeof adSettings.quartilePixels != 'undefined') {
										TSMAD.firePixels( [ adSettings.quartilePixels[25] ] );
									}
									one = false;
								}
							} else if (i == 2) {
								if(two == true){	
									ga.sendtrack( 'videoquart 50 user', adSettings.ytId );
									if (typeof adSettings.quartilePixels != 'undefined') {
										TSMAD.firePixels( [ adSettings.quartilePixels[50] ] );
									}
									two = false;
								}
							} else if (i == 3) {
								if(three == true){
									ga.sendtrack( 'videoquart 75 user', adSettings.ytId );
									if (typeof adSettings.quartilePixels != 'undefined') {
										TSMAD.firePixels( [ adSettings.quartilePixels[75] ] );
									}
									three = false;
								}
							}		
						}
					}
				}).on( 'ignite-playervideostart', function(){
					ga.sendtrack( 'user click: video thumbnail - fullscreen', adSettings.ytId );
					ga.sendtrack( 'videoquart 0 user', adSettings.ytId );
					if (typeof adSettings.quartilePixels != 'undefined') {
						TSMAD.firePixels( [ adSettings.quartilePixels[0] ] );			
					}
					$('#ytPlayer').css('opacity', '1');
					elems.vThumb.hide();
					elems.playBtn.hide();
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
					$('iframe#ytPlayer').remove();
					var newYT = document.createElement('div');
					newYT.id = 'ytPlayer';
					$('.video-container').append(newYT);
					TSMAD.video();
					onYouTubeIframeAPIReady();
					elems.vThumb.show();
					elems.playBtn.show();
					ga.sendtrack( 'videoquart 100 user', adSettings.ytId );
					if (typeof adSettings.quartilePixels != 'undefined') {
						TSMAD.firePixels( [ adSettings.quartilePixels[100] ] );
					}						
					TSMAD.resetQuart();
				}).on( 'ignite-playerbuffering', function(){
					elems.preloader.addClass('show');
					elems.vThumb.hide();
					elems.playBtn.hide();
				});
				elems.mpAudio.remove();
				self.ignitePlayer = ignitePlayer;
				return self;
			},
			music: function() {
				var audio = document.createElement('audio');
				audio.src = adSettings.song;
				var audioProg00 = true, audioProg25 = true, audioProg50 = true, audioProg75 = true, audioProg100 = true;
				
				function track() {
					setInterval(function(){
						var 
							dur = audio.duration,
							currentTime = audio.currentTime,
							progress = parseFloat(((currentTime / dur) * 100).toFixed(2)) + '%',
							quartileProg = parseFloat(((currentTime / dur) * 100).toFixed(0));
						elems.audioSeek.css('left', progress);
						elems.audioStatus.css('width', progress);
						if(audio.ended){
							elems.audioPlayBtn.css('display', 'block');
							elems.audioPauseBtn.css('display', 'none');
							elems.audioSeek.css('left', '0%');
							elems.audioStatus.css('width', '0%');
							if(audioProg100 === true) {
								ga.sendtrack( 'audioquart 100 user', adSettings.song );
								audioProg100 = false;
								TSMAD.resetAudioQuart();
							}
						}
						//audio quartiles
						if(audioProg00 === true) {
							ga.sendtrack( 'audioquart 0 user', adSettings.song );
							audioProg00 = false;
						} 
						else if(quartileProg >= 25 && audioProg25 === true) {
							ga.sendtrack( 'audioquart 25 user', adSettings.song );
							audioProg25 = false;
						} 
						else if (quartileProg >= 50 && audioProg50 === true) {
							ga.sendtrack( 'audioquart 50 user', adSettings.song );
							audioProg50 = false;
						}
						else if (quartileProg >= 75 && audioProg75 === true) {
							ga.sendtrack( 'audioquart 75 user', adSettings.song );
							audioProg75 = false;
						}
					}, 100);
				}
				elems.audioPlayBtn.on('click', function() {
					TSMAD.mpTimeOut('clear');
					ga.sendtrack( 'user click: play', '' );
					$(this).css('display', 'none');
					elems.audioPauseBtn.css('display', 'block');
					audio.play();
					track();
				});
				elems.audioPauseBtn.on('click', function() {
					var timeLabel = audio.currentTime;
					ga.sendtrack( 'user click: pause', parseFloat(timeLabel).toFixed(0) + ' Seconds' );
					$(this).css('display', 'none');
					elems.audioPlayBtn.css('display', 'block');
					audio.pause();
				});
			},
			resetQuart: function() {
				one = true; 
				two = true; 
				three = true;
			},
			resetAudioQuart: function() {
				audioProg00 = true; audioProg25 = true; audioProg50 = true; audioProg75 = true; audioProg100 = true;
			},
			firePixels: function( pixels ){ //passes an array
				for( var i = 0 ; i < pixels.length; i++ ){
						var img = new Image(), src = pixels[i];
						img.src = src;
					}
			},
			removeMP: function(action) {
				$('#mp-slidein-frame-id', window.top.document).animate({
					left: '100%'
				}, 250);
				if (typeof adSettings.ytId != 'undefined' && adSettings.ytId != '' ) {
					$('#mp-slidein-frame-id', window.top.document).addClass('resume-sprite');
					ignitePlayer.pauseVideo();
				}
				if(action !== 'ct') {
					ga.sendtrack( 'user close', action );
				}
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
			},
			setWidth: function() {
				setTimeout(function() {
					elems.positionWrapper.css('left', '0px').css('right', '0px');
					var 
						right = 0, left = 0,
						heightCheck = setInterval(function() {
						var 
							dh = window.top.innerHeight - 15,
							mpHeight = elems.positionWrapper.height();
						if(dh < mpHeight) {
							left = left + 5;
							right = right + 5;
							elems.positionWrapper.css({
								'left': left + 'px', 
								'right': right + 'px'
							});
						} else {
								clearInterval(heightCheck);
						}
					});
				}, 1000);
			},		
		}
		return events;
	}
	TSMAD = new TSMadClass(adSettings);
	TSMAD.initGA();
	if (typeof adSettings.ytId != 'undefined' && adSettings.ytId != '' ) {
		TSMAD.video();
	} else {
		elems.vidContainer.remove();
		elems.imgBot.remove();
	}
	if (typeof adSettings.song != 'undefined') {
		TSMAD.music();
	} else {
		elems.mpAudio.remove();
	}
	var
		d = w.document,
		body = $('body'),
		ad = document.getElementById('ad'),
		styles = document.createElement('style');
		styles.setAttribute('type', 'text/css');
		styles.innerHTML = params.theStyles;
	d.getElementsByTagName('head')[0].appendChild(styles);
	elems.imgTop.on('click', function(){
		TSMAD.clickthrough();
	});
	elems.imgBot.on('click', function(){
		TSMAD.clickthrough();
	});
	elems.closeMP.on('click', function(){
		TSMAD.removeMP('tap');
	});
	var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
	isFirstTime = 1;
	if ( typeof adSettings.ytId != 'undefined' && adSettings.ytId != '' ) {
		elems.bodytag.on( 'ignite-yt-ready', function(){
			if(isFirstTime) {
				TSMAD.init();
				TSMAD.setWidth();
				if(typeof adSettings.useSprite !== 'undefined' && adSettings.useSprite === true) {
					TSMAD.useSprite();
				} else {
					$('#spriteContainer').remove();
				}
			}
			isFirstTime = 0;	
		});
	} else {
		TSMAD.init();
		TSMAD.setWidth();
	}
}(window));