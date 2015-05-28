<?php


// register and enqueue all of the scripts used by Aside
function ct_drop_load_javascript_files() {

	wp_register_style( 'ct-drop-google-fonts', '//fonts.googleapis.com/css?family=Montserrat:400,700|Open+Sans:400italic,400,700');

	// enqueue scripts on front end
	if(! is_admin() ) {
		wp_enqueue_script('production', get_template_directory_uri() . '/js/build/production.min.js#ct_drop_asyncload', array('jquery'),'', true);

		if( is_rtl() ){
			wp_enqueue_style('ct-drop-style-rtl', get_stylesheet_uri() . '/css/rtl.min.css');
		}  else {
			wp_enqueue_style('ct-drop-style', get_stylesheet_uri() . '/style.min.css');
		}

		wp_enqueue_style('ct-drop-google-fonts');
		wp_enqueue_style('font-awesome', get_template_directory_uri() . '/assets/font-awesome/css/font-awesome.min.css');
	}

	// enqueues the comment-reply script on posts & pages with comments open.
	if( is_singular() && comments_open() && get_option('thread_comments') ){
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action('wp_enqueue_scripts', 'ct_drop_load_javascript_files' );

function ct_drop_enqueue_profile_image_uploader($hook) {

	// if is user profile page
	if( 'options-general.php' == $hook ){

		// Enqueues all scripts, styles, settings, and templates necessary to use all media JavaScript APIs.
		wp_enqueue_media();

		// enqueue the JS needed to utilize media uploader on profile image upload
		wp_enqueue_script('ct-profile-uploader', get_template_directory_uri() . '/js/build/profile-uploader.min.js');
	}
}
add_action('admin_enqueue_scripts', 'ct_drop_enqueue_profile_image_uploader');

// load all scripts enqueued by theme asynchronously
function ct_drop_add_async_script($url) {

	// if async parameter not present, do nothing
	if (strpos($url, '#ct_drop_asyncload')===false){
		return $url;
	}
	// if async parameter present, add async attribute
	return str_replace('#ct_drop_asyncload', '', $url)."' async='async";
}
add_filter('clean_url', 'ct_drop_add_async_script', 11, 1);