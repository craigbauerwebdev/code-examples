/* Version 1.0 */
(function(w, d) {
	w.igniteCampaigns = w.igniteCampaigns || {};
	var adData = w.igniteCampaigns.adData,
	options = adData.options.blogOptions,
	squareLogo = options && options.design_option_live && options.design_option_live.square_logo_img ? options.design_option_live.square_logo_img : false;
	var data = {
		appIcon: squareLogo || options._station_logos["apple-high-res"] || options._station_logos["web-apps"] || options._station_logos["apple-low-res"] || options._station_logos["apple-ipad"] || "missing data", //.blogOptions._staion_logos
		backgroundColor: options.design_option_live.iv_primary_color.substring(2),
		legalName: options._station_info.legalname,
		messageId: parseInt(options._station_info.message_id),
		audienceId: parseInt(options._station_info.audience_id),
		appUrl: options._station_info.promo_url || [ "https://", adData.options.activeDomain, "/app/?utm_source=", options._station_info.open_message ? "om" : "twl", "&utm_medium=SMS&utm_campaign=App%20Promo" ].join( "" ),
		useOpenMessage: options._station_info.open_message
	},
	params = {
		markup: 
			`<div id=\\"ad\\"><div class=\\"app-logo-wrap\\">\
				<img class=\\"app-logo\\" src=\\"${data.appIcon}\\" />\
			</div>\
			<div class=\\"description-text\\">\
				<div class=\\"inner\\">Download The ${data.legalName} Mobile App Now</div>\
			</div>\
			<div class=\\"form-wrap\\">\
				<div class=\\"inner\\">\
					<input id=\\"phone\\" maxlength=\\"10\\" type=\\"text\\" placeholder=\\"Enter Mobile Number\\" onkeypress=\\"TSMAD.validate(event)\\" />\
					<button>DOWNLOAD NOW</button>\
				</div>\
			</div>
			<div class=\\"thank-you\\">\
				<h2>Thank You</h2>\
				<p>A link has been set to your phone</p>\
			</div>
			<div class=\\"error\\">\
				<h2>Error</h2>\
				<p>Please enter a valid 10 digit number</p></div>\
				<div id=\\"clickthru\\"></div>\
			</div>`,
		theStyles: 
			`*{ padding: 0;margin: 0;}\
			#ad{ font-family: \\"Roboto\\", sans-serif; position: relative; padding: 10px 10px 10px 10px; width: 708px; height: 70px; z-index: 99; background-color: #${data.backgroundColor}; -webkit-box-shadow: inset 0px -48px 80px -2px rgba(0,0,0,0.37); -moz-box-shadow: inset 0px -48px 80px -2px rgba(0,0,0,0.37); box-shadow: inset 0px -48px 80px -2px rgba(0,0,0,0.37);}#clickthru{ position: absolute; top: 0; right: 380px; bottom: 0; left: 0; }\
			.app-logo-wrap { margin-left: 3px; margin-top: 1px; width: 68px; height: 68px; border-radius: 15px; overflow: hidden; }\
			.app-logo { width: 100%; height: 100%; }\
			.description-text { color: #fff; position: absolute; top: 2px; right: 380px; bottom: 0; left: 95px;}\
			.description-text .inner { font-family: \\"Roboto Condensed\\", sans-serif; font-weight: 300; position: absolute; top: 50%; left: 0; transform: translateY(-60%); font-size: 16px; line-height: 16px;}\
			.thank-you { display: none; padding-top: 20px; text-align: center; color: #fff;}\
			.error { display: none; padding-top: 20px; text-align: center; color: #fff;}\
			.form-wrap, .thank-you, .error { position: absolute; top: 3px; right: 0; bottom: 0; left: 355px;}\
			.form-button-wrap {left: 480px; text-align: center; padding-top: 21px;}\
			.form-button {color: #fff; background: #000; padding: 10px 15px; text-align: center; display: inline-block;}\
			.form-wrap .inner { position: absolute; top: 50%; left: 0; transform: translateY(-60%);}\
			.form-wrap a {text-decoration: none;}\
			input { font-size: 12px; padding: 5px 7px; border: 0; height: 27px; width: 194px; margin-right: 19px; }\
			button { font-family: \\"Roboto Condensed\\", sans-serif; font-weight: 400; background: #000; color: #fff; padding: 5px 15px; font-size: 14px; height: 37px; border: 0; }\
			input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }\
			.hide { display: none;}\
			.move-left {left: 30px}`
	}
	$('body').append( params.markup );
	if( data.appIcon === "missing data") {
		$('img.app-logo').addClass('hide');
		$('.description-text').addClass('move-left');
	}
	
	var TSMadClass = function(settings) {
		var events = {
			init: function(){
				TSMAD.appendStyles();
				TSMAD.addFonts();
				TSMAD.clickEvents();
			},
			clickEvents: function() {
				var adWrap = $('#clickthru'),
				button = $('button'),
				formbutton = $('.form-button');
				adWrap.on('click', function(){
					TSMAD.clickthrough();
				});
				button.on('click', function(){
					var phone = $('#phone').val();
					TSMAD.initOM(phone, data.legalName, data.useOpenMessage);
				});
				formbutton.on('click', function(e){
					e.preventDefault();
					w.top.open(data.appUrl);
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
				w.top.open(settings.clickthrough, '_blank');
				ga.sendtrack( 'clickthrough', '' );
			},
			validate: function(e) {
			    const numberEntered = e || window.event;
			    let key = null;
			    if (numberEntered.type === "paste") {
			      key = event.clipboardData.getData("text/plain");
			    } else {
			      key = numberEntered.keyCode || numberEntered.which;
			      key = String.fromCharCode(key);
			    }
			    const regex = /[0-9]|\./;
			    if( !regex.test(key) ) {
			      numberEntered.returnValue = false;
			      if(numberEntered.preventDefault) {
			        numberEntered.preventDefault();
			      }
			    }
			},
			initOM: function(phoneNumber, legalName, service) {
			    const
			      messageId = data.messageId,
			      audienceId = data.audienceId;
			    if(phoneNumber.length === 10) {
			    	var
				    	useOpenMessage = service,
				    legalName = legalName,
				    twilioDesc = `Get The ${legalName} Mobile App`;
			    	fetch( "/rest/carbon/api/promomessaging/getCustomerAndSendMessage/", { //sends request to our Node Api
				        method: "POST",
				        body: JSON.stringify({
				          messageId: messageId,
				          audienceId: audienceId,
				          phone: phoneNumber,
				          promoUrl: data.appUrl,
				          description: twilioDesc,
				          twilioIcon: "disabled for now",
				          useOpenMessage: useOpenMessage
				        }),
				        headers: {
				          "Content-Type": "application/json",
				        }
				      })
				        .then(( res ) => res.json() )
				        .then( (json)=>{
							console.log(json)
				        	$('.form-wrap').hide();
							$('.thank-you').show();
				        })
				        .catch( e => {
				          console.log( "error: ", e );
				        });
			    } else {
			    	$('.form-wrap').hide();
					$('.error').show();
					setTimeout(function(){
						$('.form-wrap').show();
						$('.error').hide();
						$('#phone').val('');
					}, 3000);
			    }
			}	
		}
		return events;
	}
	TSMAD = new TSMadClass();
	TSMAD.init(); 
}(window, window.document));