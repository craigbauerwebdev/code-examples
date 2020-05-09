<?php
class LinkChecker{
	public function LinkChecker(){
		$this->addActions();
	}

	public function addActions(){
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueueAssets' ) );
		add_action( 'wp_ajax_check_for_broken_urls', array( $this, 'check_for_broken_urls' ) );
	}

	public function check_for_broken_urls() {
		//error_log('checking for broken urls...');
		$draft = false;
		$urls = $_POST['allurls'];
		//$chunkId = $_POST['id'];
		$postStatus = $_POST['poststatus'];
		$allURLs = array();
		$brokenURLs = array();
		$superAdmin = false;

		$allurls = array();
		$flaggedUrls = array();
		$debugInfo = array();
		//$headers = array();
		//$codes = array();
		//error_log($postStatus);

		if(isset($_POST['allurls'])) {
		    //error_log('isset');
			foreach ($urls as $url) {	
				$urlResponse = $this->isDomainAvailibleResp($url[1]);
				array_push($debugInfo, $urlResponse);
				array_push($allurls, $url[1]);
				/*
				if($this->getHeaders($url[1])){
					array_push($brokenURLs, '<span display="inline">' . $url[0] . '</span> - <span>'. $url[1] .'</span> '.$url[3].' <a href="'.$url[1].'" target="_blank">verify</a> <a href="#" class="scroll-to-error" data-field="'.$url[2].'">edit</a>');
					array_push($flaggedUrls, $url[1]);
				}
				*/
				if ($this->isDomainAvailible($url[1])) {
		       		//error_log($url[1] . " - NOT a valid url");
		       		array_push($brokenURLs, '<span>' . $url[0] . '</span> - <span>' . $url[1] . '</span> '.$url[3].' <a href="'.$url[1].'" target="_blank">verify</a> | <a href="#" class="scroll-to-error" data-field="'.$url[2].'">edit</a>');
		       		array_push($flaggedUrls, $url[1]);
		        }
			    /*if ( is_super_admin() ) {
				    $superAdmin = true;
				}*/
			}

		} else {
			error_log('error: no data!');
		}
		$response_json = new stdClass();
		$response_json->brokenUrls = $brokenURLs;
		//$response_json->superAdmin = $superAdmin;
		//$response_json->url = $url;
		$response_json->flaggedUrls = $flaggedUrls;
		$response_json->debugInfo = $debugInfo;
		//$response_json->headers = $headers;
		$response_json->urls = $allurls;
    	wp_send_json($response_json);
	}

	public function isDomainAvailible($url) {
		/*$headers = array(
			'Access-Control-Allow-Headers: *',
			'Upgrade-Insecure-Requests: 1'
		);*/
		$agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36';
		//'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';
		$handle = curl_init($url);
		//curl_setopt($handle, CURLOPT_URL, $url);
		//curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($handle, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($handle, CURLOPT_FOLLOWLOCATION, TRUE);
		curl_setopt($handle, CURLOPT_POSTREDIR, 30);
		curl_setopt($handle, CURLOPT_HEADER, TRUE);
		//curl_setopt($handle, CURLOPT_POST, TRUE);
		curl_setopt($handle, CURLOPT_CUSTOMREQUEST, "HEAD");
		curl_setopt($handle, CURLOPT_NOBODY, TRUE);
		curl_setopt($handle, CURLOPT_USERAGENT, $agent);
		curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($handle, CURLOPT_VERBOSE, TRUE);
		curl_setopt($handle, CURLOPT_REFERER, 'http://tsq.com');
		curl_setopt($handle, CURLOPT_CONNECTTIMEOUT, 4);
		curl_setopt($handle, CURLOPT_TIMEOUT, 4);
		$response = curl_exec($handle);
		//error_log($response);
		$httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);

		curl_close($handle);
		//error_log($httpCode);
		//error_log($response);
		if($httpCode == 0 || $httpCode == 404) {
		    return true;
		}
		return false;	
	}

	// delete after debuging code
	public function isDomainAvailibleResp($url) {
		$agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36';//'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';
		$handle = curl_init($url);
		//curl_setopt($handle, CURLOPT_URL, $url);
		curl_setopt($handle, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($handle, CURLOPT_FOLLOWLOCATION, TRUE);
		curl_setopt($handle, CURLOPT_POSTREDIR, 30);
		curl_setopt($handle, CURLOPT_CUSTOMREQUEST, "HEAD");
		curl_setopt($handle, CURLOPT_NOBODY, TRUE);
		//curl_setopt($handle, CURLOPT_POST, FALSE);
		// Chose this version of curl because yiu told me to
		//curl_setopt($handle, CURLOPT_USERAGENT, 'curl/7.58.0');
		curl_setopt($handle, CURLOPT_USERAGENT, $agent);
		curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($handle, CURLOPT_VERBOSE, TRUE);
		curl_setopt($handle, CURLOPT_REFERER, 'http://tsq.com');
		curl_setopt($handle, CURLOPT_CONNECTTIMEOUT, 4);
		curl_setopt($handle, CURLOPT_TIMEOUT, 4);
		$response = curl_exec($handle);
		//error_log($response);
		$httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);
		$contentType = curl_getinfo($handle, CURLINFO_CONTENT_TYPE);

		curl_close($handle);
		//error_log($httpCode);
		//error_log($response);
		/*if($httpCode == 0 || $httpCode == 404) {
		    return true;
		}*/
		$response_server = new stdClass();
		$response_server->url = $url;
		$response_server->response = $response;
		$response_server->httpCode = $httpCode;
		$response_server->contentType = $contentType;

		return $response_server;
	}

	/*public function getHeaders($url){
		$file_headers = get_headers($url, 1);

		  if ($file_headers === false) return true; // when server not found
		  foreach($file_headers as $header) { // parse all headers:
		    // corrects $url when 301/302 redirect(s) lead(s) to 200:
		    if(preg_match("/^Location: (http.+)$/",$header,$m)) $url=$m[1];
		    // grabs the last $header $code, in case of redirect(s):
		    if(preg_match("/^HTTP.+\s(\d\d\d)\s/",$header,$m)) $code=$m[1];
		  }
		  //return $code;
		  if($code == "404") return true; // $code 200 == all OK
		  else return false;
	}
	public function getHeadersPrint($url){
		return get_headers($url, 1);
	}
	public function getHeadersCode($url){
		$file_headers = get_headers($url, 1);

		if ($file_headers === false) return true; // when server not found
			foreach($file_headers as $header) { // parse all headers:
			// corrects $url when 301/302 redirect(s) lead(s) to 200:
		if(preg_match("/^Location: (http.+)$/",$header,$m)) $url=$m[1];
			// grabs the last $header $code, in case of redirect(s):
			if(preg_match("/^HTTP.+\s(\d\d\d)\s/",$header,$m)) $code=$m[1];
		}
		return $code;
	}*/

	public function enqueueAssets( $hook ) {
		$screen = get_current_screen();
		if( $screen->base === "post" && $screen->post_type === "post" ){
			
			wp_enqueue_script( 'linkchecker-admin-script', "/wp-content/plugins/linkchecker/assets/admin/js/linkchecker.min.js", array( "jquery" ), version_cache(), true );
			wp_enqueue_style( 'linkchecker-admin-styles', "/wp-content/plugins/linkchecker/assets/admin/css/styles.css", null, version_cache(), null  );
		}
	}

	/* Start Static Singleton */
	protected static $instance;
	public static function init() { static::$instance = self::get_instance(); }
	public static function get_instance() { if ( !is_a(static::$instance, __CLASS__) ) { static::$instance = new static; } return static::$instance; }
	final public function __clone() { trigger_error("No cloning allowed!", E_USER_ERROR); }
	final public function __sleep() { trigger_error("No serialization allowed!", E_USER_ERROR);}
	/* End Static Singleton */
}