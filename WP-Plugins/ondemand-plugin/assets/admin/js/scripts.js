(function($){
	$( "#ondemand-item-container" ).sortable({
		update: function( event, ui ){
			redoDisplay();
		},
		placeholder: "ondemand-item-highlight"
	});
	$( "#ondemand-item-container" ).disableSelection();

	document.querySelector( '.ondemand-add' ).addEventListener('click', addItem);
	document.querySelector( 'body' ).addEventListener('click', function(e) {
		if (e.target.classList.contains( 'ondemand-delete' )) {
			removeItem(e);
		}
	});
	
	function addItem() {
		var container = document.getElementById( 'ondemand-item-container' );
		var markupTemplate = ondemandMarkupTemplate
			.replace(/{{x}}/g, container.children.length)
			.replace(/{{index}}/g, container.children.length + 1)
			.replace(/{{title}}/g, '')
			.replace(/{{url}}/g, '');

		$( container ).append( markupTemplate );
	}

	function removeItem(e) {
		e.target.parentElement.parentElement.remove();
		redoDisplay();
	}

	function redoDisplay(){
		var movieIndexes = document.querySelectorAll( ".movie-index" );
		movieIndexes.forEach(function( movieIndex, i ){
			movieIndex.innerHTML = i + 1;
		});
	}
})(jQuery);