<?php
class OnDemand{
	public function OnDemand(){
		$this->addActions();
	}

	public function addActions(){
		add_action( 'add_meta_boxes', array( $this, 'ondemandCustomMeta' ) );
		add_action( 'save_post', array( $this, 'ondemandMetaSave' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueueAssets' ) );
		add_shortcode( 'ondemand', array( $this, 'ondemandShortcode' ) );
	}

	public function enqueueAssets( $hook ) {
		$screen = get_current_screen();
		if( $screen->base === "post" && $screen->post_type === "post" && video_hubs_is_activated() ){
			wp_enqueue_script( 'jquery-ui-core' );
			wp_enqueue_script( 'ondemand-admin-script', "/wp-content/plugins/ondemand/assets/admin/js/scripts.js", array( "jquery", "jquery-ui-core" ), version_cache(), true );
			wp_enqueue_style( 'ondemand-admin-styles', "/wp-content/plugins/ondemand/assets/admin/css/styles.css", null, version_cache(), null  );
		}
	}

	public function ondemandCustomMeta() {
		if (video_hubs_is_activated()){
			add_meta_box( 'ondemand_meta', 'On Demand Links', array( $this, 'ondemandMetaCallback' ), 'post', 'normal', 'default' );
		}
	}

	public function ondemandMetaCallback( $post ) {
		$meta = get_post_meta( $post->ID, 'ondemand', true );
		if( !is_array( $meta ) ){
			$meta = array();
		}
		ob_start();
		include( __DIR__ . "/../views/metabox.html" );
		$metaboxMarkup = ob_get_clean();
		ob_start();
		include( __DIR__ . "/../views/item.html" );
		$itemTemplate = ob_get_clean();
		$item = "";
		for($x = 0; $x < count( $meta ); $x++) {
			$item .= str_replace(
				array(
					"{{x}}",
					"{{index}}",
					"{{title}}",
					"{{url}}"
				),
				array(
					$x,
					$x+1,
					isset ( $meta[ $x ]['title'] ) ? $meta[ $x ]['title'] : "",
					isset ( $meta[ $x ]['url'] ) ? $meta[ $x ]['url'] : ""
				),
				$itemTemplate
			);
		}
		$metaboxMarkup = str_replace( 
			array(
				"{{items}}",
				"{{itemTemplate}}"
			),
			array(
				$item,
				preg_replace( "/\n/", "", $itemTemplate )
			),
			$metaboxMarkup
		);
		wp_nonce_field( basename( __FILE__ ), 'ondemand_nonce' );
		echo $metaboxMarkup;
	}

	public function ondemandMetaSave( $post_id ) {
		// Checks save status
		$is_autosave = wp_is_post_autosave( $post_id );
		$is_revision = wp_is_post_revision( $post_id );
		$is_valid_nonce = ( isset( $_POST[ 'ondemand_nonce' ] ) && wp_verify_nonce( $_POST[ 'ondemand_nonce' ], basename( __FILE__ ) ) ) ? 'true' : 'false';
	 
		// Exits script depending on save status
		if ( $is_autosave || $is_revision || !$is_valid_nonce ) {
			return;
		}//print_r( $_POST );exit;
		$saveData = array();
		if( isset( $_POST[ 'ondemand' ] ) ) {
			foreach(  $_POST[ 'ondemand' ] as $item ){
				$saveData[] = $item;
			}
			update_post_meta( $post_id, 'ondemand', $saveData );
		}
	}

	public function ondemandShortcode( $atts ) {

		$mymeta = get_post_meta( get_the_ID(), 'ondemand', true );
		$len = count($mymeta);
		$title = '';
		$a = shortcode_atts( array(
			'movie' => 'http://townsquaremedia.com',
			'btntext' => 'WATCH NOW'
		), $atts );

		if (isset($atts['movie']) && $atts['movie'] == 'all'){
			ob_start(); ?>
			<div class="video-hub-ondemand">
				<div class="video-hub-stripes top"></div>
				<li class="ondemand">
				  <a class="button" href="<?php echo $mymeta[0]['url']?>" target="_blank"><?php echo $a['btntext']?></a>
				  <span><?php echo $mymeta[0]['title']?></span>
				</li>
				<li class="ondemand">
				  <a class="button" href="<?php echo $mymeta[1]['url']?>" target="_blank"><?php echo $a['btntext']?></a>
				  <span><?php echo $mymeta[1]['title']?></span>
				</li>
				<li class="ondemand">
				  <a class="button" href="<?php echo $mymeta[2]['url']?>" target="_blank"><?php echo $a['btntext']?></a>
				  <span><?php echo $mymeta[2]['title']?></span>
				</li>
				<div class="ondemand-logo"></div>
				<div class="video-hub-stripes bottom"></div>
			</div>
			<?php
			return ob_get_clean();
		}

		elseif ( isset($atts['movie']) && $atts['movie'] > 0 && $atts['movie'] <= $len) {
			//echo 'Within the range';
			$m = $atts['movie'] - 1;
			$url = isset($mymeta[$m]['url']) ? $mymeta[$m]['url'] : 'http://townsquaremedia.com';
			$title = isset($mymeta[$m]['title']) ? $mymeta[$m]['title'] : '';
		} else {
			//echo 'Out of range';
			$url = 'http://townsquaremedia.com';
			$title = '';
		}
		return "<a class='video_ondemand_button' href='{$url}' target='_blank'>{$a['btntext']}</a><span class='video_ondemand_title'>$title</span>";
	}

	/* Start Static Singleton */
	protected static $instance;
	public static function init() { static::$instance = self::get_instance(); }
	public static function get_instance() { if ( !is_a(static::$instance, __CLASS__) ) { static::$instance = new static; } return static::$instance; }
	final public function __clone() { trigger_error("No cloning allowed!", E_USER_ERROR); }
	final public function __sleep() { trigger_error("No serialization allowed!", E_USER_ERROR);}
	/* End Static Singleton */
}