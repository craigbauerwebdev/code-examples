(function(w) {

	w.top.igniteCampaigns = w.top.igniteCampaigns || {};
	w.top.igniteCampaigns.mobileAnchor = w.top.igniteCampaigns.mobileAnchor || {};

	var js = ['//ignitecampaigns.com/utils/merge/?files=',
	'http://ignitecampaigns.com/global/js/jquery-2.1.1.min.js;',
	'http://ignitecampaigns.com/global/js/ignite.videohandler.min.js;',
	'http://ignitecampaigns.com/global/js/ignite.gahelper.min.js;',
	'http://ignitecampaigns.com/global/js/ignite.sprite.plugin.min.js;',
	'http://ignitecampaigns.com/global/mobile-anchor-unit/js/mobile-anchor-unit.min.js'].join( '' );

	//console.log(js);

	var b = window.document.getElementsByTagName('body')[0];

	s = window.document.createElement('script');
	s.type = 'text/javascript';
	s.src = js;
	b.appendChild( s );

}(window));