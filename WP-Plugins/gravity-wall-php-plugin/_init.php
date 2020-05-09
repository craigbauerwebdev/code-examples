<?php
/*
Plugin Name: Gravity Wall
Plugin URI: http://townsquaremedia.com/
Description: Adds Senior Wall througha Shortcode
Author: Craig
Version: 1.0
Author URI: http://townsquaremedia.com/
*/

/* This plugin pulls data from a gravity form on an sql database and creates am api in wp to power a gallery of user submissions  */

include_once( __DIR__ . '/classes/gravitywall.php' );
GravityWall::init();