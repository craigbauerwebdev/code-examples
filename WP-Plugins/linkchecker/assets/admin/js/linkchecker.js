(function($){
	var checking = false,
		bustedUrls = [],
		requestCount = 0,
		limit = 0,
		postStatusDisplay = $('#post-status-display'),
		publish = $("#publish"),
		spinner = $('#publishing-action .spinner'),
		action = $('#publishing-action'),
		saveDraft = $('#save-post'),
		publishDelay = null,
		scrollSpeed = 1000;

	function getUrlVars() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    return vars;
	}
	var delay = getUrlVars()['delay'];
	if(delay == null) {
		publishDelay = 4000
	} else {
		if(isNaN(delay)){
			publishDelay = 4000;
		} else {
			publishDelay = delay
		}
		
	}
	//console.log("Publish Delay: ", publishDelay);

	var LinkChecker = function(settings){
		var events = {
			init: function(){
				publish.on('click', lc.publish);
				if(saveDraft) {
					saveDraft.on('click', lc.draft);
				}
				$(document).on('click', '#publish-anyway', lc.publishPost);
				$(document).on("click", ".scroll-to-error", lc.scrollToError);
				$(document).on("click", "#save-draft-no-warning", lc.publishDraft);
				lc.checkCookie();
			},
			publish: function(e){
				var status = postStatusDisplay.text();
				saveDraftButton = document.getElementById('save-post');
				if(status === "Draft" && !saveDraftButton) {
				} else {
					e.preventDefault();
					lc.handleSubmit("publish");
				}
				saveDraftButton = null;
			},
			draft: function(e){
				e.preventDefault();
				lc.handleSubmit("draft");
				
			},
			publishPost: function(){
				setTimeout(function(){
					//console.log('publishing...');
					publish.off('click', lc.publish);
					publish.removeClass( "disabled" );
					publish.trigger( "click.edit-post" );
				}, publishDelay);

			},
			publishDraft: function(){
				setTimeout(function(){
					//console.log('saving draft...');
					saveDraft.off('click', lc.draft);
					saveDraft.removeClass( "disabled" );
					saveDraft.click();
				}, publishDelay);
			},
			handleSubmit: function(postStatus){
				if(!checking) {
					checking = true;
					publish.addClass( "disabled" );
					//$('#save-post').addClass('disabled');
					spinner.hide();
					action.append('<div id="link-checker-spinner"></div>');
					var iframe = document.querySelector('#content_ifr'),
					textArea = document.querySelector('#content'),
					host = window.location.protocol + '//' + window.location.hostname,
					aTagUrls = [],
					buttonUrls = [],
					chunks = [],
					iframeDocument, iframeContent, doc, links, content, match, editMode,
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
						//console.log("From WYSIWYG: ", links);
						//get button shortcodes
						while((match = shortcodes.exec(iFrameContents.innerHTML)) != null){
							//console.log(match);
							var href;
							//console.log(match[0].match(/href="([^"]*)/));
							//console.log(match[0].match(/href='([^']*)/));
							if(match[0].includes("[button")) {
								if(match[0].match(/href="([^"]*)/)) {
									//console.log('double quotes');
									href = match[0].match(/href="([^"]*)/)[1];
								} else if(match[0].match(/href=\'([^\']*)/)) {
									//console.log('single quotes');
									href = match[0].match(/href=\'([^\']*)/)[1];
								}
								shortCodesArray.push([ "Button Shortcode ", href, "#wp-content-editor-tools", "" ]);
							}
						}
					} else {
						var theContent = lc.stringToHTML(textArea.value);
						links = theContent.getElementsByTagName("a");
						//console.log("From Text: ", links);
						//get button shortcodes
						while((match = shortcodes.exec(theContent.innerHTML)) != null){
							console.log(match);
							var href;
							if(match[0].includes("[button")) {
								if(match[0].match(/href="([^"]*)/)) {
									href = match[0].match(/href="([^"]*)/)[1];
								} else if(match[0].match(/href='([^\']*)/)) {
									//console.log("checking single quotes from text tab");
									href = match[0].match(/href='([^\']*)/)[1];
								}
								shortCodesArray.push([ "Button Shortcode ", href, "#wp-content-editor-tools", "" ]);
							}
						}
					}
					// List Posts
					if(document.querySelector('.enable_button').checked){
						//console.log('is a list post');
						// do list post stuff
						$('.data_list_items').children('.postbox').each(function(i) {
							$(this).removeClass('closed');
							var postBoxRef = i,
							postBoxRefOffset = i + 1;
							if(lc.listPostType($(this), '.type_standard_list_fields')){						
								// Check Text Fields
								$(this).find('.type_standard_list_fields').each(function(){
									$(this).find("input[type='text']").each(function(i, elem){
										//console.log(i, $(this).val());
										if(i === 2 || i === 4 || i === 6) {
											if($(this).val() != "") {
												var label, selector, location;
												if(i === 2) { 
													$(this).addClass('list-post-title-url-' + postBoxRef);
													selector = '.list-post-title-url-' + postBoxRef;
													label = "List Post Title Url";
												}
												if(i === 4) { 
													$(this).addClass('list-post-subtitle-url-' + postBoxRef);
													selector = '.list-post-subtitle-url-' + postBoxRef;
													label = "List Post Subtitle Url";
												}
												if(i === 6) { 
													$(this).addClass('list-post-description-url-' + postBoxRef);
													selector = '.list-post-description-url-' + postBoxRef;
													label = " List Post Description Url";
												}
												listPostUrls.push([ '('+postBoxRefOffset+') ' + label, $(this).val(), selector, ""]);
											}
										}
									});
									// List Post Description
									var scrollSelector;
									var PBiFrameExists = $(this).find('iframe');
									var postBoxiFrame = PBiFrameExists.contents().find('body').html(),//$(descId)
									postBoxiFrameContent = lc.stringToHTML(postBoxiFrame),
									descriptionUrls;
									$(this).find('.wp-editor-wrap').addClass('list-post-desc-iframe-'+postBoxRef);
									if(postBoxiFrame === undefined) {
										var descTextArea = $(this).find('textarea').val();
										descriptionUrls = lc.stringToHTML(descTextArea).getElementsByTagName("a");
									} else {
										descriptionUrls = postBoxiFrameContent.getElementsByTagName("a");
									}
									scrollSelector = '.list-post-desc-iframe-'+postBoxRef;

									var videoShareUrl = $(this).find('.media_video_field').each(function(i){
										var shareUrlInput = $(this).find('input');
										if (!$(this).hasClass("hidden_impt")) {
											if(shareUrlInput && shareUrlInput != ""){
												shareUrlInput.addClass('video-share-url');
												listPostUrls.push([ '('+postBoxRefOffset+') YouTube Share Url', shareUrlInput.val(), '.video-share-url', ""]);
											}
										}
									});

									for ( var i = 0; i < descriptionUrls.length; i++ ) {
										var link = descriptionUrls[i].getAttribute("href"),
										label = descriptionUrls[i].textContent;
										if( label === ""){
											label = "No Label";
										}
										if(link) {
											if( link.startsWith("#") || link.startsWith("app://") || link === "" || link.includes("attachment_id")) {
											} else if ( link.startsWith('/') ) {
												listPostUrls.push(['('+postBoxRefOffset+') ' + label, host + link, scrollSelector, " (List Post Description)"]);
											} else {
												listPostUrls.push(['('+postBoxRefOffset+') ' + label, link, scrollSelector, " (List Post Description)"]);
											}
										}  
									}
									// List Post links
									$(this).find('.link_items').find('.link_field').each(function(i, elem){
										var linkFieldRef = i;
										$(this).find("input[type='text']").each(function(i, elem){
											if(i === 1) {
												if($(this).val() != "") {
													$(this).addClass('primary-list-post-link' + linkFieldRef);
													var selector = '.primary-list-post-link' + linkFieldRef;
													listPostUrls.push(['('+postBoxRefOffset+') Primary List Post Link', $(this).val(), selector, "" ]);
												}
											}
										});
									});
									// List Post secondary links
									$(this).find('.secondary_link_items').find('.link_field').each(function(i, elem){
										var linkFieldRef = i;
										$(this).find("input[type='text']").each(function(i, elem){
											//console.log(i);
											if(i === 1) {	
												if($(this).val() != "") {
													$(this).addClass('secondary-list-post-link' + linkFieldRef);
													var selector = '.secondary-list-post-link' + linkFieldRef;
													//console.log(i, $(this).val());
													listPostUrls.push(['('+postBoxRefOffset+') Secondary List Post Link', $(this).val(), selector, "" ]);
												}
											}
										});
									});
								});
							} else if (lc.listPostType($(this), '.type_twitter_list_fields')){
								console.log('twitter is no longer supported in list posts');

							} else if (lc.listPostType($(this), '.type_playlist_list_fields')){
								var playlistRef = i,
									playlistRefOffset = i + 1;
								$(this).find('.type_playlist_list_fields').each(function(i, elem){
									$(this).find("input[type='text']").each(function(i, elem){
										if(i === 3 || i === 4) {
											if($(this).val() != "") {
												if(i === 3) { 
													service = "iTunes ";
													$(this).addClass('itunes-buy-list-post-' + playlistRef);
													var selector = '.itunes-buy-list-post-' + playlistRef;
												}
												if(i === 4) { 
													service = "Amazon ";
													$(this).addClass('amazon-buy-list-post-' + playlistRef);
													var selector = '.itunes-buy-list-post-' + playlistRef;
												}
												listPostUrls.push([ '('+ playlistRefOffset +') ' + service + 'Buy Link ', $(this).val(), selector, ""]);
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
							listPostUrls.push([ 'Footer Title URL', footerUrl, '.sec-footer' ]);
						}
						//Footer Content
						var FooteriFrameExists = document.getElementById('list_footer_content_ifr');
						//console.log("Footer iFrame: ", FooteriFrameExists);
						if(FooteriFrameExists){
							var footerIframe = $('#list_footer_content_ifr').contents().find('body').html(),
							footerIframeContent = lc.stringToHTML(footerIframe),
							footerUrls = footerIframeContent.getElementsByTagName("a");
						} else {
							var footerTextArea = lc.stringToHTML($('#list_footer_content').val()),
							footerUrls = footerTextArea.getElementsByTagName("a");
						}
						for ( var i = 0; i < footerUrls.length; i++ ) {
							var footerLink = footerUrls[i].getAttribute("href"),
							footerLabel = footerUrls[i].textContent;
							if(footerLabel === "") {
								footerLabel = "No Label";
							}
							if(footerLink) {
								if( footerLink.startsWith("#") || footerLink.startsWith("app://") || footerLink === "" || footerLink.includes("attachment_id")) {
									//do nothing
								} else if ( footerLink.startsWith('/') ) {
									listPostUrls.push([footerLabel, host + footerLink, '.sec-footer', ' (List Post Footer Description)' ]);
								} else {
									listPostUrls.push([footerLabel, footerLink, '.sec-footer', ' (List Post Footer Description)' ]);
								}
							} 
						}
						// pagination fields
						$('.pagination_fields').find('.link_items').find('.link_field').each(function(i, elem){
							$(this).find("input[type='text']").each(function(i, elem){
								if(i === 1) {	
									if($(this).val() != "") {
										listPostUrls.push(['Paginate Item Link', $(this).val(), ".sec-pagination", ""]);
									}
								}
							});
						});
						var networkButtonUrl = $('#list_network_link_url').val();
						if(networkButtonUrl != "") {
							listPostUrls.push([ 'Network Button URL', networkButtonUrl, "#list_network_link_url", "" ]);
						}	
					}
					// build arrays
					for ( var i = 0; i < links.length; i++ ) {
						var link = links[i].getAttribute("href"),
						label = links[i].textContent;
						if(label === "") {
							label = "No Label";
						}
						if(link) {
							if( link.startsWith("#") || link.startsWith("app://") || link === "" || link.includes("attachment_id")) {
								//do nothing
							} else if ( link.startsWith('/') ) {
								aTagUrls.push([label, host + link, "#wp-content-editor-tools", " (Main Content)"]);
							} else {
								aTagUrls.push([label, link, "#wp-content-editor-tools", " (Main Content)"]);
							}
						} 
					}
					for ( var j = 0; j < shortCodesArray.length; j++ ) {
						var scLabel = shortCodesArray[j][0],
						scUrl = shortCodesArray[j][1];
						if( scLabel === "") {
							scLabel = "No Label";
						}
						if(scUrl) {
							if( scUrl.startsWith("#") || scUrl.startsWith("app://") || scUrl === "") {
								//do nothing
							} else if ( scUrl.startsWith('/') ) {
								buttonUrls.push([scLabel, host + scUrl, "#wp-content-editor-tools", ""]);
							} else {
								buttonUrls.push([scLabel, scUrl, "#wp-content-editor-tools", ""]);
							}
						}
					}
					// all gathered urls
					var urls = aTagUrls.concat(buttonUrls, listPostUrls);
					if(urls.length === 0) {
						//console.log('No Broken URLs...');
						if(postStatus === "draft") {
							lc.publishDraft();
						} else if(postStatus === "publish") {
							lc.publishPost();
						}
					} else {
						//console.log('sending to server');
						while (urls.length > 0) {
					    	chunks.push(urls.splice(0, perRequest));
						}
						limit = chunks.length;
						//send chunks to server
						for ( var c = 0; c < chunks.length; c++ ) {
							var chunk = chunks[c];
							lc.sendChunk(chunk, postStatus);
						}
					}
			    }
			},
			sendChunk: function(urls, postStatus) {
				$.ajax({
		            type : "POST",
		            dataType : "json",
		            url : "/wp-admin/admin-ajax.php",
		            data : { action: "check_for_broken_urls", allurls: urls },
		           	timeout : 90000,
		            success: function(response) {
		            	//console.log(response);
		            	requestCount ++;
		            	lc.getBustedUrls(response, postStatus);
		            	publish.removeClass('disabled');
		            },
		            error: function(response) {
		            	//console.log(response);
		            	console.log("Server Response Error");
		            	lc.handleResponseError();
		            	checking = false;
		            	requestCount = 0;
		            	publish.removeClass('disabled');
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
			addClasses: function() {
				// List Posts
				if(document.querySelector('.enable_button').checked){
					$('.data_list_items').children('.postbox').each(function(i) {
						$(this).removeClass('closed');
						var postBoxRef = i;
						if(lc.listPostType($(this), '.type_standard_list_fields')){						
							// Check Text Fields
							$(this).find('.type_standard_list_fields').each(function(){
								$(this).find("input[type='text']").each(function(i, elem){
									if(i === 2 || i === 4 || i === 6) {
										if($(this).val() != "") {											
											if(i === 2) {
												$(this).addClass('list-post-title-url-' + postBoxRef);
											}
											if(i === 4) {
												$(this).addClass('list-post-subtitle-url-' + postBoxRef);
											}
											if(i === 6) {
												$(this).addClass('list-post-description-url-' + postBoxRef);
											}
										}
									}
								});
								// List Post Description
								$(this).find('.wp-editor-wrap').addClass('list-post-desc-iframe-'+postBoxRef);
								var videoShareUrl = $(this).find('.media_video_field').each(function(i){
									var shareUrlInput = $(this).find('input');
									if (!$(this).hasClass("hidden_impt")) {
										if(shareUrlInput && shareUrlInput != ""){
											shareUrlInput.addClass('video-share-url');
										}
									}
								});
								// List Post links
								$(this).find('.link_items').find('.link_field').each(function(i, elem){
									var linkFieldRef = i;
									$(this).find("input[type='text']").each(function(i, elem){
										if(i === 1) {
											if($(this).val() != "") {
												$(this).addClass('primary-list-post-link' + linkFieldRef);
											}
										}
									});
								});
								// List Post secondary links
								$(this).find('.secondary_link_items').find('.link_field').each(function(i, elem){
									var linkFieldRef = i;
									$(this).find("input[type='text']").each(function(i, elem){
										if(i === 1) {	
											if($(this).val() != "") {
												$(this).addClass('secondary-list-post-link' + linkFieldRef);
											}
										}
									});
								});
							});
						}  else if (lc.listPostType($(this), '.type_playlist_list_fields')){
							$(this).find('.type_playlist_list_fields').each(function(i, elem){
								var playlistRef = i;
								$(this).find("input[type='text']").each(function(i, elem){
									if(i === 3 || i === 4) {
										if($(this).val() != "") {
											if(i === 3) { 	
												$(this).addClass('itunes-buy-list-post-' + playlistRef);
											}
											if(i === 4) { 
												$(this).addClass('amazon-buy-list-post-' + playlistRef);
											}
										}
									}
								});
							});
						}
					});
				}
			},
			getBustedUrls: function(chunk, postStatus) {
				bustedUrls = bustedUrls.concat(chunk.brokenUrls);
				if(requestCount === limit) {
					requestCount = 0;
					if(postStatus === "publish") {
						var superAdmin = chunk.superAdmin;
						lc.handleResponse(bustedUrls, superAdmin, postStatus);
					} else if (postStatus === "draft") {
						//var savepost = document.getElementById("save-post");
						if(saveDraft) {
							saveDraft.off('click', lc.draft);
						}
						if(bustedUrls.length > 0){
							lc.setDraftWarning("wp_draft_warning", bustedUrls);
						}
						lc.publishDraft();
					}
					requestCount = 0;
				}
			},
			handleResponseError: function() {
				$('#link-checker-spinner').remove();
				alert('There was an issue with the response from the server and your content wasn\'t saved. Pleae try again in a few minutes.');
			},
			setDraftWarning: function(name, urls) {
				lc.setCookie(name, urls, 90);
			},
			scrollToError: function(e) {
				e.preventDefault();
				var scrollToData = $(this).data('field');
				if(scrollToData.length){
					$("html, body").animate({
				        scrollTop: $(scrollToData).offset().top - 32
				    }, scrollSpeed);
				} else {
					console.log('scroll data does NOT exist');
				}
			},
			handleDraftWarning: function(cvalue) {
				lc.addClasses();
				//console.log('cookie: ', cvalue);
				$('.status-banner').append(
				'<div id="broken-link-error">\
					<h3>\
						<strong>Link Checker Warning:</strong>\
					</h3>\
					<p>The following broken links in this post came back as <em>"Unresponsive"</em>.\
					Click on <b>"verify"</b> to check the links in a new tab and <b>"edit"</b> to scroll down to each broken link to adjust them.\
					<b>Publishing live will be disabled</b> until these urls are resolved.\</p>\
					<div class="broken-urls">' + cvalue.replace(/,/g, '<br />') + '</div>\
				</div>');
				bustedUrls = [];
				checking = false;
				document.cookie = "wp_draft_warning= ; expires = Thu, 01 Jan 1970 00:00:00 GMT ; path=/";
			},
			handleResponse: function(res, superAdmin, postStatus) {
				if(res.length > 0) {
					$('#link-checker-spinner').remove();
					alert('There were issues with the content. Please review the errors at top of this page.');
					$('#broken-link-error').remove();
					$('.status-banner').append(
					'<div id="broken-link-error">\
						<h3>\
							<strong>Link Checker Error:</strong>\
						</h3>\
						The following broken links in this post came back as <em>"Unresponsive"</em>.\
						Click on <b>"verify"</b> to check the links in a new tab and <b>"edit"</b> to scroll down to each broken link to adjust them.\
						<b>Publishing live will be disabled</b> until these urls are resolved.\
						<div class="broken-urls">' + res.join("<br/>") + '</div>\
					</div>');
					//need to pass a 2nd arg of superadmin
					//console.log(saveDraft);
					if(saveDraft.length > 0) {
						$('#broken-link-error').append(
							'<b>Please Note:</b> Your changes have not been saved. Click the <b>"Save Draft"</b> button below to save draft or click the <b>"Publish Anyway"</b> button if you have verified the links and want to proceed with caution.<br />\
							<div class="error-message-btns"><button id="save-draft-no-warning" class="button">Save Draft</button><button id="publish-anyway" class="button">Publish Anyway</button></div>'
						);
					} 
					else {
						$('#broken-link-error').append(
							'<b>Please Note:</b> Your changes have not been updated. Click the <b>"Publish Anyway"</b> button if you have verified the links and want to proceed with caution.<br />\
							<div class="error-message-btns"><button id="publish-anyway" class="button">Publish Anyway</button></div>'
						);
					}
					//if(superAdmin){
					/*$('#broken-link-error').append(
						'<button id="publish-anyway" class="button">Publish Anyway</button>'
					);*/
					//}
					$("html,body").animate({
						scrollTop: 0
					}, scrollSpeed);
					bustedUrls = [];
					publish.removeClass('disabled');
					checking = false;
				} else {
					lc.publishPost();
				}
			},
			setCookie: function(cname, cvalue, exdays) {
				var d = new Date();
				d.setTime(d.getTime() + (exdays * 1000));
				var expires = "expires="+d.toUTCString();
				var cookieVal = cvalue.join(",");
				document.cookie = cname + "=" + cookieVal + ";" + expires + "; path=/";
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
	function scrollToError(message) {
		alert('message');
	}
	lc = new LinkChecker();
	lc.init();
})(jQuery);