<?php
/*
Plugin Name: Link Checker
Plugin URI: http://townsquaremedia.com/
Description: Checks Post Content for broken urls on save
Author: Craig - TSM
Version: 1.0
Author URI: http://townsquaremedia.com/
*/

include_once( __DIR__ . '/classes/linkchecker.php' );
LinkChecker::init();