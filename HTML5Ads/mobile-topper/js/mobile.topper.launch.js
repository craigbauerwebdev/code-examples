(function(w, wt) {
	w.top.igniteCampaigns = w.top.igniteCampaigns || {};
	var disableSlideIn = w.top.igniteCampaigns.adSettings.disableSlideIn,
	js = ['http://ignitecampaigns.com/utils/merge/?files=',
	'http://ignitecampaigns.com/global/js/jquery-2.1.1.min.js;',
	'http://ignitecampaigns.com/global/js/ignite.videohandler.min.js;',
	'http://ignitecampaigns.com/global/js/ignite.touchwipe.js;',
	'http://ignitecampaigns.com/global/js/ignite.gahelper.min.js;',
	'http://ignitecampaigns.com/global/js/ignite.sprite.plugin.min.js;',
	'http://ignitecampaigns.com/global/mobile-topper/js/mobile.topper.js'].join( '' );
	var b = window.document.getElementsByTagName('body')[0];
	s = window.document.createElement('script');
	s.type = 'text/javascript';
	s.src = js;
	b.appendChild( s );
	if(typeof disableSlideIn === undefined || !disableSlideIn) {
		var ifr = window.top.document.createElement('iframe');
		ifr.src='javascript:void(0);',
		ifr.height='500px',
		ifr.width='500px',
		ifr.scrolling='no',
		ifr.marginwidth='0',
		ifr.marginheight="0",
		ifr.frameborder='0',
		ifr.id='mp-slidein-frame-id',
		ifr.name='slide-out-frame',
		ifr.setAttribute('style','border:none;');
		window.top.document.body.appendChild(ifr);
		var js = ['http://ignitecampaigns.com/utils/merge/?files=',
		'http://ignitecampaigns.com/global/js/jquery-2.1.1.min.js;',
		'http://ignitecampaigns.com/global/js/ignite.videohandler.min.js;',
		'http://ignitecampaigns.com/global/js/ignite.touchwipe.js;',
		'http://ignitecampaigns.com/global/js/ignite.gahelper.min.js;',
		'http://ignitecampaigns.com/global/js/ignite.sprite.plugin.min.js;',
		'http://ignitecampaigns.com/global/mobile-topper/js/mobile.topper.slide.js'].join( '' );

		var tree = '<!DOCTYPE html><html><head></head><body><script src="'+js+
		'"></script></body></html>';
		
		var doc = ifr.contentWindow.document;
		doc.open();doc.write(tree);doc.close();
	}
}(window, window.top));