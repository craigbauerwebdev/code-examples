(function($){
	var checking = false,
		bustedUrls = [],
		requestCount = 0,
		limit = 0,
		postStatusDisplay = $('#post-status-display'),
		publishButton = $("#publish"),
		spinner = $('#publishing-action .spinner'),
		action = $('#publishing-action'),
		publish = document.getElementById('publish'),
		saveDraft = document.getElementById('save-post');

	var LinkChecker = function(settings){
		var events = {
			init: function(){
				//console.log('init');
				publish.addEventListener('click', lc.publish);
				if(saveDraft) {
					saveDraft.addEventListener('click', lc.draft);
				}
				lc.checkCookie();
			},
			publish: function(e){
				var status = postStatusDisplay.text();
				//saveDraftButton = document.getElementById("save-post");
				if(status === "Draft" && !saveDraft) {
					publishButton.click();
					publish.removeEventListener('click', lc.publish);
				} else {
					e.preventDefault();
					lc.handleSubmit("publish");
				}
			},
			draft: function(e){
				e.preventDefault();
				lc.handleSubmit("draft");
			},
			handleSubmit: function(postStatus){
				if(!checking) {
					//console.log('checking...', postStatus);
					checking = true;
					publishButton.addClass('disabled');
					//$('#save-post').addClass('disabled');
					spinner.hide();
					action.append('<div id="link-checker-spinner"></div>');
					var iframe = document.querySelector('#content_ifr'),
					textArea = document.querySelector('#content'),
					host = window.location.protocol + '//' + window.location.hostname,
					aTagUrls = [],
					buttonUrls = [],
					chunks = [],
					iframeDocument, iframeContent, doc, links, content, match,
					perRequest = 10,
					shortcodes = /\[(.*?)\]/mg,
					shortCodesArray = [],
					listPostUrls = []; 
					
					// main content
					if(iframe) {
						iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
						iframeContent = iframeDocument.querySelectorAll('#tinymce');
						if (!iframeDocument) {
						    throw "iframe couldn't be found in DOM.";
						}
						iFrameContents = lc.stringToHTML(iframeContent[0].innerHTML);
						links = iFrameContents.getElementsByTagName("a");
						//get button shortcodes
						while((match = shortcodes.exec(iFrameContents.innerHTML)) != null){
							if(match[0].includes("[button")) {
								var href = match[0].match(/href="([^"]*)/)[1];
								shortCodesArray.push([ "Button Shortcode: ", href ]);
							}
						}
					} else {
						var theContent = lc.stringToHTML(textArea.value);
						links = theContent.getElementsByTagName("a");
						//get button shortcodes
						while((match = shortcodes.exec(theContent.innerHTML)) != null){
							if(match[0].includes("[button")) {
								var href = match[0].match(/href="([^"]*)/)[1];
								shortCodesArray.push([ "Button Shortcode: ", href ]);
							}
						}
					}

					// List Posts
					if(document.querySelector('.enable_button').checked){
						//console.log('is a list post');
						// do list post stuff
						$('.data_list_items').children('.postbox').each(function(i) {
							if(lc.listPostType($(this), '.type_standard_list_fields')){						
								// Check Text Fields
								$(this).find('.type_standard_list_fields').each(function(i, elem){
									$(this).find("input[type='text']").each(function(i, elem){
										//console.log(i, $(this).val());
										if(i === 2 || i === 4 || i === 6) {
											if($(this).val() != "") {
												//console.log('index: ', i, $(this).val());
												listPostUrls.push([ 'List Post Field URL ', $(this).val()]);
											}
										}
									});
									// Check PostBox Description for each
									var PBiFrameExists = document.getElementById('#list_data_desc_' + i + '_ifr');
									if(PBiFrameExists) {
										var descId = '#list_data_desc_' + i + '_ifr',
										postBoxiFrame = $(descId).contents().find('body').html(),
										postBoxiFrameContent = lc.stringToHTML(postBoxiFrame),
										descriptionUrls = postBoxiFrameContent.getElementsByTagName("a");
									} else {
										var postBoxTextArea = lc.stringToHTML($('#list_data_desc_' + i).val()),
										descriptionUrls = postBoxTextArea.getElementsByTagName("a");
									}
									for ( var i = 0; i < descriptionUrls.length; i++ ) {
										var link = descriptionUrls[i].getAttribute("href"),
										label = descriptionUrls[i].textContent;
										if( link.startsWith("#") || link.startsWith("app://") || link === "" || link.includes("attachment_id")) {
											//do nothing
										} else if ( link.startsWith('/') ) {
											listPostUrls.push([label +'(List Post Description)', host + link]);
										} else {
											listPostUrls.push([label +'(List Post Description)', link]);
										}   
									}
									// List Post links
									$(this).find('.link_items').find('.link_field').each(function(i, elem){
										$(this).find("input[type='text']").each(function(i, elem){
											if(i === 1) {
												if($(this).val() != "") {
													//console.log(i, $(this).val());
													listPostUrls.push(['Primary List Post Link', $(this).val()]);
												}
											}
										});
									});
									// List Post secondary links
									$(this).find('.secondary_link_items').find('.link_field').each(function(i, elem){
										$(this).find("input[type='text']").each(function(i, elem){
											//console.log(i);
											if(i === 1) {	
												if($(this).val() != "") {
													//console.log(i, $(this).val());
													listPostUrls.push(['Secondary List Post Link', $(this).val()]);
												}
											}
										});
									});
								});
							} else if (lc.listPostType($(this), '.type_twitter_list_fields')){
								console.log('twitter is no longer supported in list posts');

							} else if(lc.listPostType($(this), '.type_playlist_list_fields')){
								console.log('playlist');
								$(this).find('.type_playlist_list_fields').each(function(i, elem){
									$(this).find("input[type='text']").each(function(i, elem){
										//console.log(i, $(this).val());
										if(i === 3 || i === 4) {
											if($(this).val() != "") {
												//console.log('index: ', i, $(this).val());
												// push to array (supposed to be a url)
												if(i === 3) { service = "iTunes "}
												if(i === 4) { service = "Amazon "}
												listPostUrls.push([ service + 'Buy Link ', $(this).val()]);
											}
										}
									});
								});
							} else if(lc.listPostType($(this), '.type_oembed_list_fields')){
								console.log('oembed is no longer supported in list posts');
							}
						});

						// List Post Footer
						var footerUrl = $('#list_footer_link_url').val();
						if(footerUrl != "") {
							listPostUrls.push([ 'Footer Title URL', footerUrl ]);
						}
						//Footer Content
						var FooteriFrameExists = document.getElementById('#list_footer_content_ifr');
						if(FooteriFrameExists){
							var footerIframe = $('#list_footer_content_ifr').contents().find('body').html(),
							footerIframeContent = lc.stringToHTML(footerIframe),
							footerUrls = footerIframeContent.getElementsByTagName("a");
						} else {
							//console.log('no footer iframe');
							var footerTextArea = lc.stringToHTML($('#list_footer_content').val()),
							footerUrls = footerTextArea.getElementsByTagName("a");
							//console.log(footerTextArea);
						}

						for ( var i = 0; i < footerUrls.length; i++ ) {
							var footerLink = footerUrls[i].getAttribute("href"),
							footerLabel = footerUrls[i].textContent;
							if( footerLink.startsWith("#") || footerLink.startsWith("app://") || footerLink === "" || footerLink.includes("attachment_id")) {
								//do nothing
							} else if ( footerLink.startsWith('/') ) {
								listPostUrls.push([footerLabel +'(List Post Footer Description)', host + footerLink]);
							} else {
								listPostUrls.push([footerLabel +'(List Post Footer Description)', footerLink]);
							}   
						}

						// pagination fields
						$('.pagination_fields').find('.link_items').find('.link_field').each(function(i, elem){
							$(this).find("input[type='text']").each(function(i, elem){
								if(i === 1) {	
									if($(this).val() != "") {
										//console.log(i, $(this).val());
										listPostUrls.push(['Paginate Item Link', $(this).val()]);
									}
								}
							});
						});

						var networkButtonUrl = $('#list_network_link_url').val();
						if(networkButtonUrl != "") {
							listPostUrls.push([ 'Network Button URL', networkButtonUrl ]);
						}
						
						console.log("listPostUrls: ", listPostUrls);
						
					} else { 
						console.log('not a list post');
					}

					// build arrays
					for ( var i = 0; i < links.length; i++ ) {
						var link = links[i].getAttribute("href"),
						label = links[i].textContent;
						if(label === "") {
							label = "No Label";
						}
						if( link.startsWith("#") || link.startsWith("app://") || link === "" || link.includes("attachment_id")) {
							//do nothing
						} else if ( link.startsWith('/') ) {
							aTagUrls.push([label, host + link]);
						} else {
							aTagUrls.push([label, link]);
						}   
					}
					for ( var j = 0; j < shortCodesArray.length; j++ ) {
						var scLabel = shortCodesArray[j][0],
						scUrl = shortCodesArray[j][1];
						if( scLabel === "") {
							scLabel = "No Label";
						}
						if( scUrl.startsWith("#") || scUrl.startsWith("app://") || scUrl === "") {
							//do nothing
						} else if ( scUrl.startsWith('/') ) {
							buttonUrls.push([scLabel, host + scUrl]);
						} else {
							buttonUrls.push([scLabel, scUrl]);
						}   
					}
					// all gathered urls
					var urls = aTagUrls.concat(buttonUrls, listPostUrls);
					if(urls.length == 0) {
						console.log('no urls on page!');
						checking = false;
						publishButton.removeClass('disabled');
						handleResponse([]);
						return;
					}
					while (urls.length > 0) { //create chunks
				    	chunks.push(urls.splice(0, perRequest));
					}
					limit = chunks.length;
					console.log('there are ', limit, 'chunks!');
					//send chunks to php
					for ( var c = 0; c < chunks.length; c++ ) {
						var chunk = chunks[c];
						console.log("Chunk: " + (c + 1), chunk);
						lc.sendChunk(chunk, postStatus);
					}	
			    }
			},
			sendChunk: function(urls, postStatus) {
				//console.log("PS send chunk: ", postStatus);
				$.ajax({
		            type : "POST",
		            dataType : "json",
		            url : "/wp-admin/admin-ajax.php",
		            data : { action: "check_for_broken_urls", allurls: urls },
		            //timeout : 90000,
		            success: function(response) {
		            	console.log("Response " + (requestCount+1), response);
		            	requestCount ++;
		            	lc.getBustedUrls(response, postStatus);
		            	publishButton.removeClass('disabled');
		            },
		            error: function(response) {
		            	console.log("Response Error");
		            	lc.handleResponseError();
		            	checking = false;
		            	publishButton.removeClass('disabled');
		            }
		        });
		    },
		    stringToHTML: function(str) {
				var markup = document.createElement('div');
				markup.innerHTML = str;
				return markup;
			},
			listPostType: function($this, elem) {
				var arr = $this.children(elem)[0].classList;
				return !arr.contains('hidden_impt');
			},
			getBustedUrls: function(chunk, postStatus) {
				bustedUrls = bustedUrls.concat(chunk.brokenUrls);
				/*
				while (chunk.brokenUrls.length > 0) {
			    	bustedUrls.push(chunk.brokenUrls.splice(0, chunk.brokenUrls.length));
				}*/	
				if(requestCount === limit) {
					//console.log(bustedUrls);
					if(postStatus === "publish") {
						lc.handleResponse(bustedUrls, postStatus);
					} else if (postStatus === "draft") {
						var savepost = document.getElementById("save-post");
						if(savepost) {
							savepost.removeEventListener('click', lc.draft);
						}
						if(bustedUrls.length > 0){
							//console.log('draft warning set');
							lc.setDraftWarning("wp_draft_warning", bustedUrls);
						}
						setTimeout(function(){
							$("#save-post").click();
						}, 4000);
					}
					requestCount = 0;
				}
			},
			handleResponseError: function() {
				$('#link-checker-spinner').remove();
				alert('There was an issue with the response from the server and your content wasn\'t saved. Pleae try again.');
			},
			setDraftWarning: function(name, urls) {
				lc.setCookie(name, urls, 90);
			},
			handleDraftWarning: function(value) {
				$('.status-banner').append(
				'<div id="broken-link-error">\
					<h3>\
						<strong>Link Checker Warning:</strong>\
					</h3>\
					<p>You have broken links in this post. Publishing live will be disabled until these urls are resolved.</p>\
					<div class="broken-urls">' + value.replace(/,/g, "<br/>") + '</div>\
				</div>');
				bustedUrls = [];
				checking = false;
				document.cookie = "wp_draft_warning= ; expires = Thu, 01 Jan 1970 00:00:00 GMT ; path=/";
			},
			handleResponse: function(res) {
				if(res.length > 0) {
					$('#link-checker-spinner').remove();
					alert('There were issues with the content. Please review the errors at top of this page.');
					$('#broken-link-error').remove();
					$('.status-banner').append(
					'<div id="broken-link-error">\
						<h3>\
							<strong>Link Checker Error:</strong>\
						</h3>\
						<p>You have broken links in this post. Please update now and then resave your updates.</p>\
						<div class="broken-urls">' + res.join("<br/>") + '</div>\
					</div>');
					$("html,body").animate({
						scrollTop: 0
					}, 400);
					bustedUrls = [];
					publishButton.removeClass('disabled');
					checking = false;
				} else {
					document.getElementById("publish").removeEventListener('click', lc.publish);
					setTimeout(function(){
						publishButton.click();
					}, 4000);
				}
			},
			setCookie: function(cname, cvalue, exdays) {
				var d = new Date();
				d.setTime(d.getTime() + (exdays * 1000));
				var expires = "expires="+d.toUTCString();
				document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
			},
			getCookie: function(cname) {
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
				return "";
			},
			checkCookie: function() {
				var wp_draft_warning = lc.getCookie("wp_draft_warning");
				if (wp_draft_warning != "") {
					lc.handleDraftWarning(wp_draft_warning);
				}
			}
		}
		return events;
	}
	lc = new LinkChecker();
	lc.init();
})(jQuery);