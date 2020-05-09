<?php
/*
Plugin Name: TSM Amp
Plugin URI: http://townsquaremedia.com/
Description: Cretes google AMP pages for all posts on this site.
Author: Craig
Version: 1.0
Author URI: http://townsquaremedia.com/
*/

/* This plugin sits on top of the google amp plugin to create custom templates */ 

include_once( __DIR__ . '/classes/tsmamp.php' );
TsmAmp::init();