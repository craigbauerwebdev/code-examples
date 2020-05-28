<?php
class GravityWall{
	public function GravityWall(){
		$this->addActions();
	}

	public function addActions(){
		add_action('wp_router_generate_routes', array($this, 'add_route') );
		add_shortcode( 'gravitywall', array( $this, 'gravityWallShortcode' ), 9 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueueScripts' ) );
	}

	public function add_route($router) {
        $args = array(
            'path' => 'api/gravitywall',
            'title' => 'My API Endpoint for gravity Wall',
            'title_callback' => NULL,
            'page_callback' => array($this, 'handle_request'),
            'page_arguments' => array( ),
            'access_callback' => TRUE,
            'template' => FALSE,
        );

        $router->add_route('gravitywall_endpoint', $args);
    }
    public function handle_request() {
    	$blog_id = get_current_blog_id();
    	$tabel = 'ts_'.$blog_id.'_rg_lead_detail';
    	$tabel_long = 'ts_'.$blog_id.'_rg_lead_detail_long';
    	global $wpdb;
    	$seniorObj = array();
    	$formid = $_GET['id'];
    	$formnum = $formid;
		$gformMeta = RGFormsModel::get_form_meta( $formnum );
		$adminLabels = array();
		foreach( $gformMeta['fields'] as $meta) {
			if( isset($meta['adminLabel']) && $meta['adminLabel'] != '' ) {
				$adminLabels[$meta['adminLabel']] = $meta['id'];
			}			
		}
    	// create array for long descriptions
    	$long_desc_parent = array();
    	$longSubs = $wpdb->get_results( "SELECT lead_detail_id,value FROM $tabel_long" );
    	if ( !is_null( $longSubs ) ) {
    		foreach( $longSubs as $key => $row ) {
	    		$long_desc = array();
	    		$long_desc['long_id'] = $row->lead_detail_id;
	    		$long_desc['long_value'] = $row->value;
	    		array_push($long_desc_parent, $long_desc);
	    	}
    	}
		$submissions = $wpdb->get_results("SELECT id,field_number,lead_id,value FROM $tabel WHERE form_id=$formnum;");
		if ( !is_null( $submissions ) ) { //echo '<pre>'; print_r($submissions);
			foreach( $submissions as $key => $row ) {
				$currentLeadId = $row->lead_id;
				if( !isset( $seniorObj[ $currentLeadId ] ) ){
					$seniorObj[ $currentLeadId ] = array();
					$seniorObj[ $currentLeadId ][ "id" ] = $row->id;
				}
				if($row->field_number == $adminLabels['seniorfullname']){
					$seniorObj[ $currentLeadId ]['seniorfullname'] = $row->value;
					$seniorObj[ $currentLeadId ]['leadid'] = $row->lead_id;
				} else if ($row->field_number == $adminLabels['image']) {
					$seniorObj[ $currentLeadId ]['image'] = $row->value;
				} else if ($row->field_number == $adminLabels['description']) {
					$seniorObj[ $currentLeadId ]['description'] = $row->value;
					foreach($long_desc_parent as $long) {
						if($long['long_id'] == $row->id) {
							$seniorObj[ $currentLeadId ]['description'] = $long['long_value'];
							break;
						}
					}
				} else if ($row->field_number == $adminLabels['subfullname']) {
					$seniorObj[ $currentLeadId ]['subfullname'] = $row->value;
				} else if ($row->field_number == $adminLabels['relationship']) {
					$seniorObj[ $currentLeadId ]['relationship'] = $row->value;
				}
			}
		}
		$descSeniorObj = array_reverse($seniorObj);
		$seniorObj = json_encode($descSeniorObj);
        return $seniorObj;
    }

    public function gravityWallShortcode( $atts ) {
    	$a = shortcode_atts( array(
			'featured' => array(),
			'id' => '1',
			'button' => 'Submit Now',
			'header' => '',
			'mobile_header' => '',
			'tagline' => '',
			'sharemessage' => ''
		), $atts );
		$formid = $a['id'];
		$featured_att = $a['featured'];
		$shared = $a['sharemessage'];
		$featured = explode(',', $featured_att);
		$send_featured = implode(',',$featured);
		$buttonText = $a['button'];
		$site = Townsquare::get_station_info();
		$tagline = $a['tagline'];
	   	$tagline = str_replace(
			array(
				"{{market}}"
			),
			array(
				$site['market']
			),
			$tagline
		);
		$shared = str_replace(
			array(
				"{{market}}"
			),
			array(
				$site['market']
			),
			$shared
		);
		global $wpdb;
		$blog_id = get_current_blog_id();
    	$tabel = 'ts_'.$blog_id.'_rg_lead_detail';
    	$leadCount = 0;
		$sub = $wpdb->get_results("SELECT * FROM $tabel WHERE form_id=$formid;"); 
		if ( !is_null( $sub ) ) { //echo '<pre>'; print_r($submissions);
			foreach( $sub as $key => $row ) { 
				$leadCount = $leadCount + 1; 
			}
		}
		ob_start();
		include( __DIR__ . "/../views/markup.html" );
		$markup = ob_get_clean();
		$imageTemplate = '<img class="grav-desktop-header" src="{{header-desktop}}" width="100%" />';
		global $json_tsm_api;
		if( $json_tsm_api->webservice ){
			$imageTemplate = '<img class="grav-mobile-header" src="{{header-mobile}}" width="600" />';
		}
		$markup = str_replace(
			array(
				"{{imagetemplate}}"
			),
			array(
				$imageTemplate
			),
			$markup
		);
		$preloaderURL = plugins_url( 'assets/img/ajax-loader.gif', dirname(__FILE__));
	   	$markup = str_replace(
			array(
				"{{header-desktop}}",
				"{{header-mobile}}",
				"{{button-text}}",
				"{{form-id}}",
				"{{send-features}}",
				"{{gravity-form}}",
				"{{tagline}}",
				"{{sharemessage}}",
				"{{lead-count}}",
				"{{preloader}}"
			),
			array(
				$a['header'],//plugins_url( '/assets/img/header.jpg', dirname(__FILE__) ),
				$a['mobile_header'],
				$buttonText,
				$formid,
				$send_featured,
				do_shortcode( '[gravityform id='.$formid.']' ),
				$tagline,
				$shared,
				$leadCount,
				$preloaderURL

			),
			$markup
		);
		return $markup;
    }

    public function has_shortcode( $content, $tag ){
        global $shortcode_tags;
        if ( array_key_exists( $tag, $shortcode_tags ) ) {
            preg_match_all( '/' . get_shortcode_regex() . '/s', $content, $matches, PREG_SET_ORDER );
            if ( empty( $matches ) )
                return false;
            foreach ( $matches as $shortcode ) {
                if ( $tag === $shortcode[2] )
                    return true;
            }
        }
        return false;
    }

	public function enqueueScripts () {
		global $post;
		if( static::has_shortcode( $post->post_content, 'gravitywall' ) ){
			wp_register_script( 'gravity-wall-script', '/wp-content/plugins/gravity-wall/assets/js/gravitywallscript.js', array( 'jquery' ), version_cache(), true );
			wp_enqueue_script( 'gravity-wall-script' );	

			wp_enqueue_style( 'gravity-wall-styles', '/wp-content/plugins/gravity-wall/assets/css/gravitywallstyle.css', null, version_cache(), 'all'  );
		}
	}

	protected static $instance;
	public static function init() { static::$instance = self::get_instance(); }
	public static function get_instance() { if ( !is_a(static::$instance, __CLASS__) ) { static::$instance = new static; } return static::$instance; }
	final public function __clone() { trigger_error("No cloning allowed!", E_USER_ERROR); }
	final public function __sleep() { trigger_error("No serialization allowed!", E_USER_ERROR);}
}