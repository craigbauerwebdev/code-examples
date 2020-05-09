/* Version 1.0 */
(function(w, d) {
	w.igniteCampaigns = w.igniteCampaigns || {};
	var adData = w.igniteCampaigns.adData,
	options = adData.options.blogOptions,
	data = {
		appIcon: options._station_logos["apple-high-res"] || options._station_logos["web-apps"] || options._station_logos["apple-low-res"] || options._station_logos["apple-ipad"] || "missing data", //.blogOptions._staion_logos
		backgroundColor: options.design_option_live.iv_primary_color.substring(2),
		legalName: options.blogname,
		iosDownloadUrl: '//'+adData.options.activeDomain+'/download/ios',
		androidDowloadUrl: '//'+adData.options.activeDomain+'/download/android'
	},
	params = {
		markup: 
			`<div id=\\"ad\\">\
				<div class=\\"app-logo\\">\
					<img src=\\"${data.appIcon}\\" />\
				</div>\
				<div class=\\"description-text\\">\
					<div class=\\"inner\\">Get The ${data.legalName} Mobile App Now</div>\
				</div>\
				<div class=\\"form-wrap\\">\
					<div class=\\"inner\\">\
						<button>DOWNLOAD NOW</button>\
					</div>\
				</div>\
				<div id=\\"clickthru\\"></div>
			</div>`,
		theStyles: 
			`*{ padding: 0;margin: 0;}\
			#ad{ font-family: \\"Roboto\\", sans-serif; position: relative; padding: 5px; width: 310px; height: 40px; z-index: 99; background-color: #${data.backgroundColor}; -webkit-box-shadow: inset 0px -25px 80px -2px rgba(0,0,0,0.37); -moz-box-shadow: inset 0px -25px 80px -2px rgba(0,0,0,0.37); box-shadow: inset 0px -25px 80px -2px rgba(0,0,0,0.37);}\
			#clickthru { position: absolute; top: 0; right: 128px; bottom: 0; left: 0; cursor:pointer; }\
			.app-logo { width: 40px; height: 40px; border-radius: 10px; overflow: hidden; margin-left: 1px; }\
			.app-logo img { width: 100%; height: 100%; }\
			.description-text { color: #fff; position: absolute; top: 0; right: 135px; bottom: 0; left: 56px; }\
			.description-text .inner { font-family: \\"Roboto Condensed\\", sans-serif; position: absolute; top: 50%; left: 0; transform: translateY(-50%); font-size: 12px; line-height: 13px; }\
			.form-wrap { position: absolute; top: 0; right: 0; bottom: 0; left: 190px; }\
			.form-wrap .inner { text-align: center; position: absolute; top: 50%; left: 0; transform: translateY(-50%); font-size: 18px; }\
			button { font-family: \\"Roboto Condensed\\", sans-serif; background: #000; color: #fff; padding: 5px 10px; font-size: 14px; border: 0;}`
	};
	$('body').append( params.markup );
	if( data.appIcon === "missing data") {
		$('img.app-logo').addClass('hide');
		$('.description-text').addClass('move-left');
	}
	var TSMadClass = function(settings) { //import ad settings
		var events = {
			init: function(){
				TSMAD.appendStyles();
				TSMAD.addFonts();
				TSMAD.clickEvents();
			},
			clickEvents: function() {
				var adWrap = $('#clickthru'),
				button = $('button');
				adWrap.on('click', function(){
					TSMAD.clickthrough();
				});
				button.on('click', function(){
					TSMAD.appDownload();
				});
			},
			appendStyles: function() {
				styles = document.createElement('style');
				styles.setAttribute('type', 'text/css');
				styles.innerHTML = params.theStyles;
				d.getElementsByTagName('head')[0].appendChild(styles);
			},
			addFonts: function() {
				font = document.createElement('link');
				font.setAttribute('rel', 'stylesheet');
				font.href = "https://fonts.googleapis.com/css?family=Roboto";
				d.getElementsByTagName('head')[0].appendChild(font);
				fontC = document.createElement('link');
				fontC.setAttribute('rel', 'stylesheet');
				fontC.href = "https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700";
				d.getElementsByTagName('head')[0].appendChild(fontC);
			},
			clickthrough: function() {
				TSMAD.appDownload();
			},
			appDownload: function(phone) {
				//console.log('APP Download');
				iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
			    if(iOS) {
			      w.top.open(data.iosDownloadUrl, '_self');
			    } else {
			      w.top.open(data.androidDowloadUrl, '_self');
			    }	
			}	
		}
		return events;
	}
	TSMAD = new TSMadClass();
	TSMAD.init(); 
}(window, window.document));