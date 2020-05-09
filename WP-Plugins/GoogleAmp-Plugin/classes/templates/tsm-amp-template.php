<?php
/**
 * Template Name: Custom AMP Template - Google AMP
 */
?>
<!doctype html>
<html amp>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,700,900" rel="stylesheet" type="text/css" />
	
	<?php do_action( 'amp_post_template_head', $this ); ?>

	<style amp-custom>
	
		<?php $this->load_parts( array( 'style' ) ); ?>
	    <?php do_action('tsm_set_theme'); ?>

	</style>

	<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
	<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
	<script async custom-element="amp-sticky-ad" src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"></script>

</head>
<body class="<?php echo esc_attr( $this->get( 'body_class' ) ); ?>">

<nav class="amp-wp-title-bar">
	
	<amp-img role tabindex on='tap:sidebar1.open' width="32" height="32" class="mobile-btn" src="https://production.townsquareblogs.com/wp-content/uploads/2017/07/logo.gif?w=32&h=32">&#9776;</amp-img>

	<div class="logo-container">
		<a data-vars-outbound-link="<?php echo esc_url( $this->get( 'home_url' ) ); ?>" href="<?php echo esc_url( $this->get( 'home_url' ) ); ?>">
			
			<?php do_action('tsm_get_logo');

			$site_icon_url = $this->get( 'site_icon_url' );

		    if ( $site_icon_url ) : ?>
				<amp-img src="<?php echo esc_url( $site_icon_url ); ?>" width="32" height="32" class="amp-wp-site-icon"></amp-img>
			<?php endif; ?>
		</a>
	</div>
</nav>

<div class="divider"></div>

<div class="amp-ad-bkg">
	<div class="amp-ad-wrap">
		<?php do_action('tsm_ad_slot', 'flex', '320a'); ?>
	</div>	
</div>

<div class="divider"></div>

<!-- Main Menu (slide out) -->
<amp-sidebar id='sidebar1' layout='nodisplay'>
<div id="nav">
	<ul id="navigation-header">
		<li>
			<a data-vars-outbound-link="<?php echo esc_url( $this->get( 'home_url' ) ); ?>" href="<?php echo esc_url( $this->get( 'home_url' ) ); ?>" class="menu-header-title">
				<?php echo esc_html( $this->get( 'blog_name' ) ); ?>		
			</a>	
		</li>
	</ul>

	<?php 

		$mainNavContent = wp_nav_menu( array( 'echo' => false, 'theme_location' => 'main' ) );

		echo TsmAmp::curratedAmpMainNav( $mainNavContent ); 

	?>

</div>
<a role tabindex href="#" class="amp-close-btn" on="tap:sidebar1.close">&times;</a>
</amp-sidebar>

<div class="amp-wp-content">
	<div id="content_main" class="clearfix">
	    <section class="single">

	        <?php do_action('tsm_get_site_type'); ?>

	        <div class="amp-wp-article-content">

	        	<h1 class="amp-wp-title"><?php echo wp_kses_data( $this->get( 'post_title' ) ); ?></h1>
	        	<span class="date-time">by </span>

				<a href="<?php echo get_author_posts_url(  $this->get( "post_author" )->ID ); ?>">

					<?php $this->load_parts( apply_filters( 'amp_post_article_header_meta', array( 'meta-author' ) ) ); ?>
					
				</a>
				<span class="date-time"><?php echo get_the_date(); ?></span>
				
				<?php do_action('amp_social_share'); ?>

				<?php echo TsmAmp::curratedAmpContent( $this->get( 'post_amp_content' ) ); ?>

				<?php echo TsmAmp::detectPolldaddyShortcode(); ?>

				<?php echo TsmAmp::detectGravityFormsShortcode(); ?>

				<?php //echo TsmAmp::detectList(); ?>

				<?php echo do_action('tsm_unsupported'); ?>

			</div>
	    </section>
	</div>
</div>

<div class="divider"></div>

<div class="amp-ad-bkg">
	<div class="amp-ad-wrap">
		<?php do_action('tsm_ad_slot', 'flex', '320b'); ?>
	</div>	
</div>

<div class="divider"></div>
<div class="grey-container">
	<div class="amp-wp-content">
		<?php $this->load_parts( apply_filters( 'amp_post_article_footer_meta', array( 'meta-taxonomy' ) ) ); ?>		
	</div>
</div>

<div class="divider"></div>

<div class="amp-wp-content">

	<?php do_action( 'amp_post_template_footer', $this ); ?>

	<footer class="amp-wp-article-footer">

	<div class="social-sharing-container">
		<?php do_action('amp_social_share'); ?>	
	</div>

</div>

		<div class="zerg-bar">
			<div class="inner-bar">Recommended For You</div>
		</div>
<div class="amp-wp-content">
		<amp-embed
		    width="980" height="600"
		    heights="(max-width:360px) 215%, (max-width:400px) 198%, (max-width:475px) 190%, (max-width:600px) 180%, 0%"
		    layout="responsive"
		    type="zergnet"
		    data-zergid="35854">
		</amp-embed>
</div>
		<div class="zerg-bar">
			<div class="inner-bar">
				Around The Internet
			</div>
		</div>
<div class="amp-wp-content">
		<amp-embed
		    width="780" height="300"
		    heights="(max-width:360px) 135%, (max-width:400px) 125%, (max-width:475px) 115%, (max-width:600px) 100%, 0%"
		    layout="responsive"
		    type="zergnet"
		    data-zergid="13399">
		</amp-embed>

	</footer>
</div>

<footer class="site-footer">

	<?php 

		$footerNavContent = wp_nav_menu( array( 'echo' => false, 'theme_location' => 'footer' ) );

		echo TsmAmp::curratedAmpFooterNav( $footerNavContent ); 

	?>

</footer>

<div class="amp-ad-bkg">
	<div class="amp-ad-wrap">
		<?php do_action('tsm_ad_slot', 'flex', '320c'); ?>
	</div>	
</div>

<amp-sticky-ad layout="nodisplay">
	<?php do_action('tsm_ad_slot', 'fixed', '320c'); ?>
</amp-sticky-ad>

</body>
</html>