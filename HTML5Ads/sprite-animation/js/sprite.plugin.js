/* !Sprite Plugin*/
(function(w) {
	w.igniteCampaigns = w.igniteCampaigns || {};
	w.igniteCampaigns.SpriteAnimation = function(adSettings) {
		var sprite = {
			code: function() {
				$(adSettings.spriteContainer).append('<img id="spriteContainer" style="position: absolute; top: 0; left: 0;" src="' + adSettings.spriteImg + '"/>');
				function animationVideo(){
					var 
						frames,loop,
						totalTime = adSettings.animationTime * 1000,
				    	totalFrames = (adSettings.rows * adSettings.cols),
				    	vars = {
							w: $(w),
							spriteContainer: $('#spriteContainer')
						}
				    if (typeof adSettings.topOffset !== 'undefined') {
				    	vars.spriteContainer.css('margin-top', adSettings.topOffset);
					}
					var 
						move = 0, hScroll = 0, vScroll = 0,
						frameRate = totalTime / totalFrames;
					if( !$('#animationStyles' ).length ){
					  	$('head').append('<style id="animationStyles"></style>');
					}
					$('#animationStyles').text(
				        '#spriteContainer { width:' + ( 100 * adSettings.cols ) + '%; display: block;}'+
				    	'.vThumb {padding-top:' + ( 100 * adSettings.frameHeight/adSettings.frameWidth ) + '%;}'
				    );
					frames = 0;
					horiz = adSettings.cols;
					loop = setInterval(function(){
						hScroll++;
				    	frames ++;
				    	if (frames === totalFrames) {
				    		move = 0;
				    		hScroll = 0;
				    		frames = 0;
							vScroll = 0;		
				    	} else if (frames === horiz){
							hScroll = 0;
							vScroll++;
				    	}     	
						vars.spriteContainer.css('-webkit-transform', 'translate( -' + (hScroll*100/adSettings.cols) + '%, -' + (vScroll*100/adSettings.rows) + '% )');
				  	}, frameRate );
				} 
				animationVideo();
			}
		}
		return sprite;
	}
}(window));