<?php
class TsmAmp {
	public function TsmAmp(){
		$this->addActions();
	}

	public function addActions(){
		add_filter( 'amp_post_template_file', array( $this, 'tsm_amp_set_custom_template'), 10, 3 );
		add_action( 'tsm_get_logo', array( $this, 'set_the_logo'), 10, 3 );
		add_action( 'tsm_set_theme', array( $this, 'set_the_theme'),10, 3 );
		add_filter('wp_nav_menu', array( $this, 'footer_links_target_parent_links'), 10, 3);
		add_action( 'tsm_ad_slot', array( $this, 'choose_ad_slot' ),10, 3 );
		add_action( 'amp_social_share', array( $this, 'my_amp_footer_social_share_display' ) );
		add_filter( 'amp_post_template_data', array( $this, 'isa_amp_scripts' ), 10, 3 );
		add_action( 'amp_post_template_footer', array( $this, 'isa_amp_analytics' ), 10, 3 );
		add_action( 'tsm_unsupported', array( $this, 'unsupportedContentTypes' ),10 , 3 );
	}

	public function tsm_amp_set_custom_template( $file, $type, $post ) {
		if ( 'single' === $type ) {
			$file = dirname( __FILE__ ) . '/templates/tsm-amp-template.php';
		}
		return $file;
	}

	public function isa_amp_scripts( $data ) {
	    $data['amp_component_scripts']['amp-analytics'] = 'https://cdn.ampproject.org/v0/amp-analytics-0.1.js';
	    return $data;
	}

	public function isa_amp_analytics( $amp_template ) {
		global $post; 
		$siteTitle = get_bloginfo('name');
		$siteUrl = get_site_url();
		$permalink = get_permalink();
		$post_slug = get_post_field( 'post_name', get_post() );
		$postTitle = get_the_title();
		$gaID = get_option('ga_uid');
		$post_id = get_the_ID();
		$author_id = $post->post_author;
		$author_name = get_the_author_meta('user_nicename', $author_id);
		$pubtime = get_the_time();
		$pubdate = get_the_date( 'l F j, Y' );
		$postcats = get_the_category();
		$catcount = count($postcats);
		$catcounter = 0;
		
		if ($postcats) {
			foreach($postcats as $cat) {
				$catcounter ++;
				$catstr .= $cat->name;
				if($catcounter !== $catcount){ 
			    	$catstr .= ', ';
			    } 
			}
		}

		$posttags = get_the_tags();
		$tagcount = count($posttags);
		$tagcounter = 0;

		if ($posttags) {
		  foreach($posttags as $tag) {
		  	$tagcounter ++;
		    $tagstr .= $tag->name;
		    if($tagcounter !== $tagcount){ 
		    	$tagstr .= ', ';
		    } 
		  }
		}

		$post_type = get_post_type();
	    $content = get_post_field( 'post_content', $post->ID );
	    $word_count = str_word_count( strip_tags( $content ) );

	    $outboundLink = '${outboundLink}';

	    $analyticsObj = array(
	    	"vars" => array(
	    		"account" => "UA-69387434-23"
	    	),
	    	"triggers" => array(
	    		"trackPageview" => array(
	    			"on" => "visible",
	    			"request" => "pageview",
	    			"vars" => array(
	    				"title" => $postTitle,
	    				"documentLocation" => $permalink
	    			),
	    			"extraUrlParams" => array(
	    				"author" => $author_name,
	    				"categories" => $catstr,
	    				"tags" => $tagstr,
					    "pageType" => $post_type,
					    "publishDate" => get_the_date( 'l F j, Y' ),
					    "publishTime" => get_the_time(),
					    "viewType" => "AMP",
					    "wordCount" => $word_count,
					    "experimentGroup" => "",
					    "gallery" => "no"
	    			)
	    		),
	    		"outboundLinks" => array(
	    			"on" => "click",
			        "selector" => "a",
			        "request" => "event",
			        "vars" => array(
			          	"eventCategory" => "Outbound Traffic",
			          	"eventAction" => "userclicked",
			          	"eventLabel" => $outboundLink
			        )
	    		),
	    		"facebook" => array(
			        	"on" => "click",
				        "selector" => ".facebook-share",
				        "request" => "event",
				        "vars" => array(
					          "eventCategory" => "Social Traffic",
					          "eventAction" => "user-shared",
					          "eventLabel" => $outboundLink
				        )
			    ),
			    "twitter" => array(
			        "on" => "click",
			        "selector" => ".twitter-share",
			        "request" => "event",
			        "vars"  => array(
				          "eventCategory" => "Social Traffic",
				          "eventAction" => "user-tweeted",
				          "eventLabel" => $outboundLink
			        )
			    )

	    	)
	    );

		ob_start();
		include( __DIR__ . "/../views/amp_analytics.html" );	
		$analyticsTemplate = ob_get_clean();
		echo str_replace(
			"{{json}}",
			json_encode( $analyticsObj ),
			$analyticsTemplate
		);
	}

	public function my_amp_post_article_footer_meta( $parts ) {
	    $index = 2; 
	    array_splice( $parts, $index, 0, array( 'my-related-posts' ) );
	    return $parts;
	}
	
	public function my_amp_related_posts_path( $file, $template_type, $post ) {
	    if ( 'my-related-posts' === $template_type ) {
	        $file = dirname( __FILE__ ) . '/templates/tsm-related-posts.php';
	    }
	    return $file;
	}

	public function set_the_logo() {
		ob_start();
		include( __DIR__ . "/../views/logo.html" );
		$siteLogo = ob_get_clean();
		echo $siteLogo;
	}

	public function choose_ad_slot( $slotType, $adslot ) {
		global $post; 
		$placeholder320x50 = '/wp-content/plugins/tsmamp/assets/img/320x50.gif';
		$placeholder300x250 = '/wp-content/plugins/tsmamp/assets/img/300x250.gif';
		if( $slotType === 'fixed') {
			$width = '320'; $height = '50';
			$placeholder = $placeholder320x50;
			$fallback = '';
		} else {
			$rando = rand(0,1);
			if($rando === 0) {
				$width =  '320'; $height = '50';
				$placeholder = $placeholder320x50;
				$fallback = '';	
			} else {
				$width =  '300'; $height = '250';
				$placeholder = $placeholder300x250;
				$fallback = '';
			}
		}
		$path = $this->get_ad_link();
		$author_id = $post->post_author;
		$author = get_the_author_meta('user_nicename', $author_id);
		$postSlug = $post->post_name;
		$postcats = get_the_category();
		$catcount = count($postcats);
		$catcounter = 0;
		$json = array();
		$kw = array($author, $postSlug, "pagetype-post");
		$categories = array();
		$tags = array();
		$genres = array();
		
		if ($postcats) {
			foreach($postcats as $cat) {
				array_push($kw, $cat->slug);
				array_push($categories, $cat->slug);
			}
		}

		$posttags = get_the_tags();
		if ($posttags) {
		  foreach($posttags as $tag) {
		  	array_push($kw, $tag->slug);
		  	array_push($tags, $tag->slug);
		  }
		}

		$stationInfo = Townsquare::get_station_info();
		$genres = $stationInfo['genre'];

		if ($genres) {
			foreach($genres as $g) {
				array_push($genres, $g);
			}
		}

		$site = Townsquare::get_station_info();
		$sitetype = $site['sitetype'];
		$market = $site['market'];
		$call = $site['callletters'];
		$kv = array();
		$getkv = $_GET['kv'];
		array_push($kv, $getkv);
		$json["kw"] = $kw;
		$json["catid"] = $categories;
		$json["tags"] = $tags;
		$json["author"] = $author;
		$json["sitetype"] = $sitetype;
		$json["market"] = $market;
		$json["callletters"] = $call;
		/*$json["device"] = 'web';*/
		$json["id"] = $postSlug;
		$json["genre"] = $genres;
		$json["right"] = "top";
		$json["pos"] = $adslot;
		$json["pagetype"] = 'post';
		$json["kv"] = $kv;
		ob_start();
		include( __DIR__ . "/../views/amp_ad.html" );
		$adMarkup = ob_get_clean();
	   	$adMarkup = str_replace(
			array(
				"{{adwidth}}",
				"{{adheight}}",
				"{{adpath}}",
				"{{placeholderImg}}",
				"{{json}}"
			),
			array(
				$width,
				$height,
				$path,
				$placeholder,
				json_encode( $json )
			),
			$adMarkup
		);
		echo $adMarkup;
	}

	private function get_ad_link() {
		$site = Townsquare::get_station_info();
		$sitetype = $site['sitetype'];
		$market = $site['market'];
		$call = $site['callletters'];
		if ($sitetype === 'National') {
			$nationalAd = '/8328825/'.$sitetype.'/'.$call.'/post';
			return $nationalAd;
		} elseif ($sitetype === 'Local') {
			$localAd = '/8328825/'.$sitetype.'/'.$market.'/'.$call.'/post';
			return $localAd;
		} else {
			$defaultAd = '/8328825/Local/Buffalo/WYRK/post';
			return $defaultAd;
		}
	}

	public function amp_social_share( $return = false ) {
	    $url = get_permalink();
	    $title = get_the_title();
	    $encoded_url = urlencode( $url );
	    $media = has_post_thumbnail() ? wp_get_attachment_url( get_post_thumbnail_id() ) : '';
		ob_start();
		include( __DIR__ . "/../views/amp_social_sharing.html" );
		$socialMarkup = ob_get_clean();
	   	$socialMarkup = str_replace(
			array(
				"{{encodedURL}}",
				"{{encodedTitle}}"
			),
			array(
				$encoded_url,
				urlencode( $title )
			),
			$socialMarkup
		);

		$out = $socialMarkup;
	    if ( $return ) {
	        return wp_kses_post( $out );
	    } else {
	        echo wp_kses_post( $out );
	    }
	}
	public function my_amp_footer_social_share_display( $amp_template ) {
	    $this->amp_social_share();
	}

	public function footer_links_target_parent_links($menu, $args) {
		if($args->theme_location == 'footer') {
			$menu = str_replace('<a target="_parent"', '<a', $menu);
		}
		return $menu;
	}

	public function set_the_theme(){
		$blog_id = get_current_blog_id();
		$mobileOptions = get_option('design_option_live');
		$headerColor = '#000';
		$themeColor = $mobileOptions['mobile_primary_color'];
		$themeColor2 = $mobileOptions['mobile_secondary_color'];
		$headerImg = $mobileOptions['header_img'];
		$mobilePrimaryColor = substr($themeColor, 2);
		$mobileSecondaryColor = substr($themeColor2, 2);
		$designOptions = get_option('design_option_live');
		$the_logo = $designOptions['logo_img_trim'];
		$cssValues = array(
			'header' => $headerColor,
			'links' => '#' . $mobilePrimaryColor,
			'secondary' => '#' . $mobileSecondaryColor,
			'bkgImg' => $headerImg
		);
		$topColor = $cssValues['links'];
		$bottomColor = $cssValues['secondary'];
		ob_start();
		include( __DIR__ . "/../views/amp_css.html" );
		$ampcss = ob_get_clean();
	   	$ampcss = str_replace(
			array(
				"{{links}}",
				"{{theLogo}}",
				"{{headerColor}}",
				"{{headerImg}}",
				"{{primaryColor}}",
				"{{secondaryColor}}"
			),
			array(
				$cssValues['links'],
				$the_logo,
				$cssValues['header'],
				$cssValues['bkgImg'],
				$topColor,
				$bottomColor
			),
			$ampcss
		);
	   	echo $ampcss;
	}

	public static function unsupportedContentTypes() {
		global $post;
		$list_data = get_post_meta($post->ID, 'list_data', true);
		if( is_array($list_data) && $list_data['layout'] == 'media-poll' ) {
			//button goes here
			global $wp;
			$current_url = home_url(add_query_arg(array(),$wp->request));
			$current_url = str_replace(
				array(
					'/amp'
				),
				array(
					''
				),
				$current_url
			);
			echo '<a class="ga_network_button list-post-btn" data-vars-outbound-link="'. $current_url . '" href="'. $current_url . '">Click Here To Vote</a>';
		} elseif( is_array($list_data) && $list_data['layout'] == 'standard' ) {
			global $wp;
			$current_url = home_url(add_query_arg(array(),$wp->request));
			$current_url = str_replace(
				array(
					'/amp'
				),
				array(
					''
				),
				$current_url
			);
			echo '<a class="ga_network_button list-post-btn" data-vars-outbound-link="'. $current_url . '" href="'. $current_url . '">View The Full List</a>';
		}
	}

	public static function curratedAmpContent( $content ){
		$content = preg_replace( "/<a(\s+.*?)href=(\"|')([^\"']+)(\"|')/", "<a$1href=\"$3\" data-vars-outbound-link=\"$3\"", $content );
		$content = str_replace(
			array(
				'alignment="left"',
				'https:=""',
				'alignleft',
				'alignright',
				'baseprofile="basic"',
				'type="audio/mpeg" src="http:'
			),
			array(
				'',
				'',
				'',
				'',
				'',
				'type="audio/mpeg" src="'
			),
			$content
		);
		return $content;
	}

	public static function detectPolldaddyShortcode ( $content ){
		global $post;
		if( has_shortcode( $post->post_content, 'polldaddy' ) ) {
			global $wp;
			$current_url = home_url(add_query_arg(array(),$wp->request));
			$current_url = str_replace(
				array(
					'/amp'
				),
				array(
					''
				),
				$current_url
			);
			return '<a class="ga_network_button list-post-btn" href="'. $current_url . '">Click Here To Vote</a>';
		}
	}

	public static function detectGravityFormsShortcode ( $content ){

		global $post;
		if( has_shortcode( $post->post_content, 'gravityform' ) ) {
			global $wp;
			$current_url = home_url(add_query_arg(array(),$wp->request));
			$current_url = str_replace(
				array(
					'/amp'
				),
				array(
					''
				),
				$current_url
			);
			return '<a class="ga_network_button list-post-btn" href="'. $current_url . '">Fill Out The Form</a>';
		}
	}

	public static function curratedAmpMainNav( $mainNav ){
		$mainNav = preg_replace( "/<a(\s+.*?)href=(\"|')([^\"']+)(\"|')/", "<a$1href=\"$3\" data-vars-outbound-link=\"$3\"", $mainNav );
		return $mainNav;
	}

	public static function curratedAmpFooterNav( $footerNav ){
		$footerNav = preg_replace( "/<a(\s+.*?)href=(\"|')([^\"']+)(\"|')/", "<a$1href=\"$3\" data-vars-outbound-link=\"$3\"", $footerNav );
		return $footerNav;
	}

	public function tsm_amp_change_endpoint( $amp_endpoint ) { //disabled
		return 'tsm';
	}

	/* Testing function */
	public function get_site_type() { //for visual info // disabled delete before prod
		$stationInfo = Townsquare::get_station_info();
		$genres = $stationInfo['genre'];
		$gstr = '[';
		if ($genres) {
			foreach($genres as $g) {
				$gcounter ++;
				$gstr .= '"'.$g.'"';
				if($catcounter !== $catcount){ 
			    	$catstr .= ', ';
			    }
			}
		
		}
		$gstr .= ']';
		echo $gstr;
		echo '<br />';
		$post_type = get_post_type();
		echo 'Post Type: ' . $post_type;		
		$word_count = str_word_count( strip_tags( $content ) );
		global $post; 
		$genre = get_option('dfp_site_genre');
		echo $genre;
		$author_id = $post->post_author;
		the_author_meta( 'display_name', $author_id );
		//echo 'Author: '.$author_name;
		echo '<br />';
		$post_id = get_the_ID();
		echo 'Post ID: ' . $post_id . '<br />';
		$pubtime = get_the_time();
		$pubdate = get_the_date('F j, Y');
		echo $pubdate;
		echo $pubtime;
		$catstr = 'Cats: ';
		$postcats = get_the_category();
		$catcount = count($postcats);
		$catcounter = 0;
		echo 'Cat Count: ' . $catcount . '<br />';
		if ($postcats) {
			foreach($postcats as $cat) {
				$catcounter ++;
				$catstr .= $cat->name;
				if($catcounter !== $catcount){ 
			    	$catstr .= ', ';
			    }
			}
		}
		echo $catstr;
		echo '<br />';
		$tagstr = 'Tags: ';
		$posttags = get_the_tags();
		$tagcount = count($posttags);
		echo 'Tag Count: ' . $tagcount . '<br />';
		$tagcounter = 0;
		if ($posttags) {
		  foreach($posttags as $tag) {
		  	$tagcounter ++;
		    $tagstr .= $tag->name; 
		    if($tagcounter !== $tagcount){ 
		    	$tagstr .= ', ';
		    }
		  }
		}
		echo $tagstr;
		echo '<br />';
		$blog_id = get_current_blog_id();
		$siteType234 = Townsquare::get_sitetypes();
		$gaID = get_option('ga_uid');
		echo 'gaID: ' . $gaID .'<br />';
		echo '<strong>Possible Site Types:</strong>';
		echo '<ul>';
		foreach( Townsquare::get_sitetypes() as $val ){
			echo '<li>' .$val . '</li>';
		}
		echo '</ul>';
		echo '<strong>Station Info:</strong>';
		echo '<ul>';
		foreach( Townsquare::get_station_info() as $key => $val2 ){
			echo '<li>' .$key.' : '.$val2 . '</li>';
		}
		echo '</ul>';
		echo '<h3>Site Info</h3>';
		$site = Townsquare::get_station_info();
		echo serialize($site);
		echo '<ul>';
		echo '<li><strong>Site Type:</strong> ' . $site['sitetype'] . '</li>';
		echo '<li><strong>Market:</strong> ' . $site['market'] . '</li>';
		echo '<li><strong>Call Letters:</strong> ' . $site['callletters'] . '</li>';
		echo '<li><strong>Blog ID:</strong> ' . $blog_id . '</li>';
		echo '</ul>';
		$themeoptions = get_option('design_option_live');
		foreach($themeoptions as $key => $opt ){
			echo $key . ': ' . $opt . '<br />';
		}
		$designOptions = get_option('design_option_live');
		echo $designOptions['logo_img_trim'];
	}

	/* Start Static Singleton */
	protected static $instance;
	public static function init() { static::$instance = self::get_instance(); }
	public static function get_instance() { if ( !is_a(static::$instance, __CLASS__) ) { static::$instance = new static; } return static::$instance; }
	final public function __clone() { trigger_error("No cloning allowed!", E_USER_ERROR); }
	final public function __sleep() { trigger_error("No serialization allowed!", E_USER_ERROR);}
	/* End Static Singleton */
}