(function(w) {
	var 
		windowWidth = screen.width,
		windowHeight = screen.height,
		height = screen.width * 2;
	getFrameForDocument = function(document){ var w = document.defaultView || document.parentWindow, frames = w.parent.document.getElementsByTagName('iframe'); for (var i = frames.length; i-->0;) { var frame = frames[i]; try { var d= frame.contentDocument || frame.contentWindow.document; if (d===document) return frame; } catch(e) {} } }
	var iFrame = jQuery(getFrameForDocument(document));
	iFrame
	.css('position', 'fixed')
	.css('width', '100%')
	.css('height', '100%')
	.css('top', '0')
	.css('right', '0')
	.css('bottom', '0')
	.css('left', '0')
	.css('border', '0')
	.css('z-index', '90000000000000');
	var image = {
	'back': { 'url':'http://ignitecampaigns.com/global/slimeWipe/assets/slime2.jpg', 'img':null },
	'front': { 'url':'http://ignitecampaigns.com/global/slimeWipe/assets/slime.jpg', 'img':null }
	},
	canvas = {'temp':null, 'draw':null},
	mouseDown = false;
	
	function getLocalCoords(elem, ev) {
		var ox = 0, oy = 0;
		var first;
		var pageX, pageY;
		while (elem != null) {
			ox += elem.offsetLeft;
			oy += elem.offsetTop;
			elem = elem.offsetParent;
		}
		if (ev.hasOwnProperty('changedTouches')) {
			first = ev.changedTouches[0];
			pageX = first.pageX;
			pageY = first.pageY;
		} else {
			pageX = ev.pageX;
			pageY = ev.pageY;
		}
		return { 'x': pageX - ox, 'y': pageY - oy };
	}

	function recompositeCanvases() {
		var 
			main = document.getElementById('maincanvas'),
			tempctx = canvas.temp.getContext('2d'),
			mainctx = main.getContext('2d');
		canvas.temp.width = canvas.temp.width; // resizing clears
		tempctx.drawImage(canvas.draw, 0, 0);
		tempctx.globalCompositeOperation = 'source-atop';
		tempctx.drawImage(image.back.img, 30, 30, windowWidth, windowHeight);
		mainctx.drawImage(image.front.img, 0, 0, windowWidth, windowHeight);
		mainctx.drawImage(canvas.temp, 0, 0);
	}

	function scratchLine(can, x, y, fresh) {
		var ctx = can.getContext('2d');
		ctx.lineWidth = 100;
		ctx.lineCap = ctx.lineJoin = 'round';
		ctx.strokeStyle = '#f00'; // can be any opaque color
		if (fresh) {
			ctx.beginPath();
			ctx.moveTo(x+0.01, y);
		}
		ctx.lineTo(x, y);
		ctx.stroke();
	}

	function setupCanvases() {
		var c = document.getElementById('maincanvas');
		c.width = windowWidth //image.back.img.width'';
		c.height = image.back.img.height;
		image.back.img.setAttribute('width', windowWidth);
		image.back.img.setAttribute('height', height);
		canvas.temp = document.createElement('canvas');
		canvas.draw = document.createElement('canvas');
		canvas.temp.width = canvas.draw.width = c.width;
		canvas.temp.height = canvas.draw.height = c.height;
		recompositeCanvases();
		function mousedown_handler(e) {
			var local = getLocalCoords(c, e);
			mouseDown = true;
			scratchLine(canvas.draw, local.x, local.y, true);
			recompositeCanvases();
			if (e.cancelable) { e.preventDefault(); } 
			return false;
		};
		function mousemove_handler(e) {
			if (!mouseDown) { return true; }
			var local = getLocalCoords(c, e);
			scratchLine(canvas.draw, local.x, local.y, false);
			recompositeCanvases();
			if (e.cancelable) { e.preventDefault(); } 
			return false;
		};
		function mouseup_handler(e) {
			if (mouseDown) {
				mouseDown = false;
				if (e.cancelable) { e.preventDefault(); } 
				return false;
			}
			return true;
		};
		c.addEventListener('mousedown', mousedown_handler, false);
		c.addEventListener('touchstart', mousedown_handler, false);
		w.addEventListener('mousemove', mousemove_handler, false);
		w.addEventListener('touchmove', mousemove_handler, false);
		w.addEventListener('mouseup', mouseup_handler, false);
		w.addEventListener('touchend', mouseup_handler, false);
	}
	function loadingComplete() {
		var main = document.getElementById('main');
		main.className = '';
	}
	function loadImages() {
		var 
			loadCount = 0,
			loadTotal = 0;
		function imageLoaded() {
			loadCount++;
			if (loadCount >= loadTotal) {
				setupCanvases();
				loadingComplete();
			}
		}
		for (k in image) if (image.hasOwnProperty(k))
			loadTotal++;
		for (k in image) if (image.hasOwnProperty(k)) {
			image[k].img = document.createElement('img'); // image is global
			image[k].img.addEventListener('load', imageLoaded, false);
			image[k].img.src = image[k].url;
		}
	}
	w.addEventListener('load', function() {
		loadImages();
	}, false);
})(window);