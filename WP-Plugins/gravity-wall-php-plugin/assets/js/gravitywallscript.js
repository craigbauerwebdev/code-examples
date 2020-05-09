(function($){

	function getGravitySubs() {
		var leadCount = document.querySelector('.gravity-wall-wrap').getAttribute('data-lead'),
		formId = document.querySelector('.gravity-wall-wrap').getAttribute('data-formid'),
		features = document.querySelector('.gravity-wall-wrap').getAttribute('data-features'),
		sharemessage = document.querySelector('.gravity-wall-wrap').getAttribute('data-sharemessage'),
		featuredEntries = JSON.parse("[" + features + "]"),
		proto = window.location.protocol,
		host = window.location.hostname,
		url = proto + '//' + host + '/api/gravitywall/?id=' + formId + '&cb=' + leadCount,
		gww = $('.gravity-wall-wrap'),
		dataRequest = new XMLHttpRequest();
		dataRequest.onreadystatechange = callback;
		dataRequest.open("GET", url, true);
		dataRequest.send();
	
		function callback() {		   
			if(dataRequest.readyState == 4 && dataRequest.status == 200) {
				var data = dataRequest.responseText;
				var gravityData = JSON.parse(data);
				useData(gravityData, featuredEntries);
				$(document).ready(function($) {
					$('#gform_' + formId + ' input[type=submit]').on('click', function () { // jquery
						var countRequest = new XMLHttpRequest();
						countRequest.onreadystatechange = getCount;
						countRequest.open("GET", url, true);
						countRequest.send();
						function getCount() {
							 if(countRequest.readyState == 4 && countRequest.status == 200) {
								var count = countRequest.responseText,
								countData = JSON.parse(count),
								count = countData.length;
								setCookie('gwsublength', count, 15);
							  }
						}
					});
				});
				var gwl = gravityData.length;

				function setCookie(cname, cvalue, exdays) {
					var d = new Date();
					d.setTime(d.getTime() + (exdays*1000)); //exdays*24*60*60*1000 //exdays is now seconds
					var expires = "expires="+ d.toUTCString();
					document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
				}
				
				function getCookie(cname) {
					var name = cname + "=";
					var ca = document.cookie.split(';');
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
					var submit = getCookie('gwsublength');
					if (submit != '') {
						if(gwl > submit) {
							var success = document.createElement('div');
							success.className = 'grav-sub-success primary-active-color';
							success.innerHTML = 'Thank you for your submission';
							document.getElementById('grav-confirmation').appendChild(success);
							setTimeout(function(){
								document.getElementById('grav-confirmation').className = 'hidden';
							}, 8000);
						} else {
							form.style.display = 'block';
							form.scrollIntoView();
						}
					} else {}
				}
				checkCookie(); 
			}
		}
		function useData(d, f) {
			var count = d.length;
			$('.gravity-wall-wrap').empty();

			function proccessData(bo) {
				for (var i = 0; i < count; i++){
					var defaultImg = proto + '//' + host + '/wp-content/plugins/gravity-wall/assets/img/defaultImg.png',
					subInfo = {
						sfname: d[i]['seniorfullname'],
						subfname: d[i]['subfullname'],
						description: d[i]['description'],
						image: d[i]['image'] +'?w=400&h=400&zc=1&a=t',
						relationship: d[i]['relationship'],
						leadId: d[i]['leadid']
					}
					var curratedBio = subInfo.description.replace( /"/g, '&quot;' );
					var gravityWrap = '<a data-first="'+subInfo.sfname+'" data-subtitle="'+subInfo.subfname+'" data-title="'+subInfo.sfname+'" data-bio="'+curratedBio+'" data-image="'+subInfo.image+'" href="javascript:void(0);" data-relationship="'+subInfo.relationship+'" data-leadid="'+subInfo.leadId+'" class="grav-submission">'+
						'<img style="width: 100%; height: auto;" src="/wp-content/plugins/gravity-wall/assets/img/placeholder.gif" />'+
						'<img class="preloader-lg" style="width: 100%; height: auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px;" src="'+ proto + '//' + host  + '/wp-content/plugins/gravity-wall/assets/img/ajax-loader.gif" />'+
						'<div class="name-rollover"><p class="rollover-text">' + d[i]['seniorfullname'] + '</p></div>'+
					'</a>';
					var append;
					f.forEach(function(item, index){
						if (item == subInfo.leadId) {
							append =  true;
						} 
					});
					if(bo) {
						if(append) {
							gww.append(gravityWrap);
						}
					} else {
						if(!append) {
							gww.append(gravityWrap);
						}
					}
					append = false;
				}
			}
			if(count) {
				proccessData(true);
				proccessData(false);
			} else {
				gww.append('<p class="grav-sorry">Sorry there is no submissions yet. Be the first to submit!</p>');
			}
			var divCollection = document.getElementsByClassName('grav-submission'),
			divMap = {};

			for (var i = 0; i < divCollection.length; i++ ) {
				elem = divCollection[i],
				imgSrc = elem.dataset.image;
				divMap[i] = elem;

				function validateImg(URL, callback, i) {
					var image = new Image();
					image.src = URL;
					image.onload = function() {
						$('.preloader-lg').remove();
						var imgUrl = this.src;
						callback(imgUrl, i);
					};
					image.onerror = function() {
						$('.preloader-lg').remove();
						var imgUrl = proto + '//' + host + '/wp-content/plugins/gravity-wall/assets/img/defaultImg.png';
						callback(imgUrl, i);
					};
				}
				validateImg(imgSrc, function(imgUrl, i){
					divMap[i].style.backgroundImage = 'url('+imgUrl+')';
				}, i);
			}
			// deep link
			if(window.location.hash) {
					var hash = document.URL.substr(document.URL.indexOf('#')+1);
					$('.grav-submission[data-leadid="'+hash+'"]').trigger('click');
			}	
		}
		
		$('.gravity-wall-wrap').on('click', '.grav-submission', function(){
			var vars = {
				title: this.getAttribute('data-title'),
				subtitle: this.getAttribute('data-subtitle'),
				image: this.getAttribute('data-image'),
				bio: this.getAttribute('data-bio'),
				rel: this.getAttribute('data-relationship'),
				lead: this.getAttribute('data-leadid')
			}
			
			var currentUrl = proto + '//' + host,
			path = window.location.pathname,
			fullPath = currentUrl + path,
			shareUrl = fullPath+'%23'+vars.lead,
			twitterMessage = sharemessage.replace('{{name}}', vars.title).replace('{{url}}', shareUrl).replace('#AmericanSenior', '%23AmericanSenior'),//fullPath+'#AmericanSenior'),
			emailSubject = sharemessage.replace('{{name}}', vars.title).replace('{{url}}', '').replace('#AmericanSenior', '').replace('-', ''),
			emailMessage =  sharemessage.replace('{{name}}', vars.title).replace('{{url}}', shareUrl);

			function createElems() {
				var modalWrap = document.createElement('div');
				modalWrap.id = 'grav-modalWrap';
				modalWrap.className = 'grav-modalWrap';
				document.getElementsByTagName('body')[0].appendChild(modalWrap);

				var innerWrap = document.createElement('div');
				innerWrap.className = 'grav-wall-inner-wrap';
				document.getElementsByTagName('body')[0].appendChild(innerWrap);

				var closeBtn = document.createElement('img');
				closeBtn.className = 'close-btn';
				closeBtn.src = '/wp-content/plugins/gravity-wall/assets/img/closeBtn.png';
				innerWrap.appendChild(closeBtn);
				// create a wrapper that scrolls so close btn will not scroll
				var contentScroller = document.createElement('div');
				contentScroller.className = 'content-scroller'; // for scrolling
				innerWrap.append(contentScroller);

				var seniorImg = document.createElement('div');
				seniorImg.className = 'popup-img',
				loader = document.createElement('img');
				loader.className = 'loader-lg';
				loader.src = currentUrl + '/wp-content/plugins/gravity-wall/assets/img/ajax-loader.gif';
				seniorImg.appendChild(loader);
				contentScroller.append(seniorImg);
				var imgLarge = vars.image;

				function validateImg(URL) {
					var image = new Image();
					image.src = URL;
					image.onload = function() {
						$('.loader-lg').remove();
						$('.popup-img').css('background', 'url('+URL+')').css('background-size' , 'cover').css('background-position', 'top center');	
					};
					image.onerror = function() {
						var imgUrl = proto + '//' + host + '/wp-content/plugins/gravity-wall/assets/img/defaultImg.png';
						$('.loader-lg').remove();
						$('.popup-img').css('background', 'url('+imgUrl+')').css('background-size' , 'cover').css('background-position', 'top center');

					};
				}
				validateImg(imgLarge);
				var
				h1Wrap = document.createElement('h1'),
				bioWrap = document.createElement('p');
				
				h1Wrap.append(vars.title);
				h1Wrap.className = 'popup-title';
				contentScroller.append(h1Wrap);

				bioWrap.append(vars.bio);
				bioWrap.className = 'popup-bio';
				contentScroller.append(bioWrap);

				var 
				btnWrap = document.createElement('div');
				btnWrap.className = 'btn-wrap';

				//fb
				var 
				fbShare = document.createElement('a');
				fbShare.className = 'fb-share';
				fbShare.href = 'http://www.facebook.com/sharer.php?u='+shareUrl,//+'&picture='+vars.image,
				fbShare.target = '_blank';

				var 
				fbImg = document.createElement('img');
				fbImg.src = '/wp-content/plugins/gravity-wall/assets/img/social/fb.jpg';
				fbImg.className = 'fbShareImg';
				fbShare.appendChild(fbImg);

				// twitter
				var twShare = document.createElement('a');
				twShare.className = 'tw-share';
				twShare.href = 'http://twitter.com/share?text='+twitterMessage+'&url=none';//'https://twitter.com/share/?text='+shareUrl;//+ '-' + '<a href="'+shareUrl+'">'+shareUrl+'</a> %23AmericanSenior';   //url='+shareUrl+'&amp;,
				twShare.target = '_blank';

				var twImg = document.createElement('img');
				twImg.src = '/wp-content/plugins/gravity-wall/assets/img/social/twitter.jpg';
				twImg.className = 'twShareImg';
				twShare.appendChild(twImg);

				// email
				var emailShare = document.createElement('a');
				emailShare.className = 'email-share',
				emailShare.href = 'mailto:?Subject='+emailSubject+'&amp;Body='+emailMessage;
				//emailShare.target = '_blank';

				var emailImg = document.createElement('img');
				emailImg.src = '/wp-content/plugins/gravity-wall/assets/img/social/email.jpg';
				emailImg.className = 'emailShareImg';
				emailShare.appendChild(emailImg);

				btnWrap.append(fbShare);
				btnWrap.append(twShare);
				btnWrap.append(emailShare);

				creditWrap = document.createElement('p');
				creditWrap.className = 'gravitywall-credits';
				creditWrap.innerHTML = 'Submitted by '+vars.subtitle; // jquery use innerHTML
				
				contentScroller.appendChild(creditWrap);
				//contentScroller.appendChild(shareTitle);
				contentScroller.appendChild(btnWrap);
				document.querySelector('.grav-wall-inner-wrap').style.display = 'block';
				document.querySelector('.grav-modalWrap').style.display = 'block';
			}

			function events() {
				var gPopWrap = $('.grav-wall-inner-wrap'),
				gravModalWrap = $('.grav-modalWrap');
				gravModalWrap.on('click', function(){ // try js event listener
					$(this).remove(); //
					gPopWrap.remove(); //
				});
				$('body').on('click', '.close-btn', function(){ //
					gravModalWrap.remove(); //
					gPopWrap.remove(); //
				});
			}
			createElems();
			events();
		});
	}
	getGravitySubs();
	var form = document.querySelector('.grav-form-wrap');
	$('body')
		.on('mouseenter', '.grav-submission', function(){
			$(this).find('.name-rollover').fadeIn(0);
		}).on('mouseleave', '.grav-submission', function(){
			$(this).find('.name-rollover').fadeOut(0);
		});
	$('.show-form-btn').on('click', function(){
		form.style.display = 'block';
		form.scrollIntoView();
	});
})(typeof Zepto === 'undefined' ? jQuery : Zepto);