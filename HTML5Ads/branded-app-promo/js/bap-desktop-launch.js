(function(w) {
	w.igniteCampaigns = w.igniteCampaigns || {};
	var js = ['//ignitecampaigns.com/utils/merge/?files=',
	'http://ignitecampaigns.com/global/js/jquery-2.1.1.min.js;',
	'http://ignitecampaigns.com/global/js/ignite.gahelper.min.js;',
	'http://ignitecampaigns.com/global/branded-app-promo/js/bap-desktop.min.js'].join( '' ); //change to .min before minifing
	var url = window.top.location.hostname;
	if( typeof window.top.__INITIAL_STATE__ != "undefined" ) {
    	var initState = window.top.__INITIAL_STATE__.json.response;
    	w.igniteCampaigns.adData = initState;
		var b = window.document.getElementsByTagName('body')[0];
		s = window.document.createElement('script');
		s.type = 'text/javascript';
		s.src = js;
		b.appendChild( s );
	} else {
		var domain;
		if(url === "localhost" || url === "ignitecampaigns.com") {
			domain = "https://cors-anywhere.herokuapp.com/https://wgna.com/rest/carbon/uri/";
		} else {
			domain = "https://"+url+"/rest/carbon/uri/";
		}
		fetch( domain, {
	      method: "GET",
	      headers: {
	        "Content-Type": "application/json"
	      }
	    })
	    .then(( res ) => res.json() )
	    .then( (json)=>{
	       //console.log(json);
	       w.igniteCampaigns.adData = json;
	       var b = window.document.getElementsByTagName('body')[0];
		   s = window.document.createElement('script');
		   s.type = 'text/javascript';
		   s.src = js;
		   b.appendChild( s );
	    })
	    .catch( e => {
	       console.log( "error: ", e );
	    });
  	}
}(window));