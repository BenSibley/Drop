<?php

/* Load the core theme framework. */
require_once( trailingslashit( get_template_directory() ) . 'library/hybrid.php' );
new Hybrid();

/* Do theme setup on the 'after_setup_theme' hook. */
add_action( 'after_setup_theme', 'ct_drop_theme_setup', 10 );

/**
 * Theme setup function.  This function adds support for theme features and defines the default theme
 * actions and filters.
 *
 * @since 1.0
 */

function ct_drop_theme_setup() {
	
    /* Get action/filter hook prefix. */
	$prefix = hybrid_get_prefix();
    
	/* Theme-supported features go here. */
    add_theme_support( 'hybrid-core-sidebars', array( 'subsidiary' ) );
    add_theme_support( 'hybrid-core-template-hierarchy' );
    add_theme_support( 'loop-pagination' );
    add_theme_support( 'cleaner-gallery' );

    // from WordPress core not theme hybrid
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'post-thumbnails' );
	add_theme_support( 'title-tag' );

	// load theme options page
	require_once( trailingslashit( get_template_directory() ) . 'theme-options.php' );

	// add inc folder files
	foreach ( glob( trailingslashit( get_template_directory() ) . 'inc/*' ) as $filename ) {
		include $filename;
	}

    // enable localization
    load_theme_textdomain('drop', get_template_directory() . '/languages');

    register_nav_menus(array(
        'primary' => __('Primary', 'drop')
    ));
}

function ct_drop_register_widget_areas(){

    /* register footer widget area */
    hybrid_register_sidebar( array(
        'name'         => __( 'Subsidiary', 'drop' ),
        'id'           => 'subsidiary',
        'description'  => __( 'Widgets in this area will be shown in the footer', 'drop' )
    ) );

}
add_action('widgets_init','ct_drop_register_widget_areas');

// takes user input from the customizer and outputs linked social media icons
function ct_drop_social_media_icons() {
    
    $social_sites = ct_drop_customizer_social_media_array();
    	
    // any inputs that aren't empty are stored in $active_sites array
    foreach($social_sites as $social_site) {
        if( strlen( get_theme_mod( $social_site ) ) > 0 ) {
            $active_sites[] = $social_site;
        }
    }
    
    // for each active social site, add it as a list item 
    if(!empty($active_sites)) {
        echo "<ul class='social-media-icons'>";
		foreach ($active_sites as $active_site) {?>
			<li>
                <a href="<?php echo esc_url(get_theme_mod( $active_site )); ?>">
                    <?php if( $active_site ==  "flickr" || $active_site ==  "dribbble" || $active_site ==  "instagram" || $active_site ==  "soundcloud" || $active_site ==  "spotify" || $active_site ==  "vine" || $active_site ==  "yahoo" || $active_site ==  "codepen" || $active_site ==  "delicious" || $active_site ==  "stumbleupon" || $active_site ==  "deviantart" || $active_site ==  "digg" || $active_site ==  "hacker-news" || $active_site == "vk") { ?>
                        <i class="fa fa-<?php echo $active_site; ?>"></i> <?php
                    } else { ?>
                    <i class="fa fa-<?php echo $active_site; ?>-square"></i><?php
                    } ?>
                </a>
			</li><?php
		}
		echo "</ul>";
	}
}

function ct_drop_further_reading() {
    
    global $post;
    
    // gets the next & previous posts if they exist
    $previous_blog_post = get_adjacent_post(false,'',true);
    $next_blog_post = get_adjacent_post(false,'',false);
    
	if(get_the_title($previous_blog_post)) {
		$previous_title = get_the_title($previous_blog_post);
	} else {
		$previous_title = __('The Previous Post','drop');
	}
	if(get_the_title($next_blog_post)) {
		$next_title = get_the_title($next_blog_post);
	} else {
		$next_title = __('The Next Post','drop');
	}
    
    echo "<nav class='further-reading'>";
    if($previous_blog_post) {
        echo "<p class='prev'>
        		<span>" . __('Previous Post','drop') . "</span>
        		<a href='".get_permalink($previous_blog_post)."'>".$previous_title."</a>
	        </p>"; 
    } else {
        echo "<p class='prev'>
                <span>" . __('This is the oldest post','drop') . "</span>
        		<a href='".esc_url(home_url())."'>" . __('Return to Blog', 'drop') . "</a>
        	</p>"; 
    }
    if($next_blog_post) {
    
        echo "<p class='next'>
        		<span>" . __('Next Post','drop') . "</span>
        		<a href='".get_permalink($next_blog_post)."'>".$next_title."</a>
	        </p>"; 
    } else {
        echo "<p class='next'>
                <span>" . __('This is the newest post', 'drop') . "</span>
        		<a href='".esc_url(home_url())."'>" . __('Return to Blog','drop') . "</a>
        	 </p>";    
    }
    echo "</nav>";
}

function ct_drop_excerpt_category_display() {
       
    $category = get_the_category();
	echo '<a href="'.get_category_link( $category[0]->term_id ).'" title="' . esc_attr( sprintf( __( "View all posts in %s", 'drop' ), $category[0]->name ) ) . '">'.$category[0]->cat_name.'</a>';
}

// Outputs the categories the post was included in with their names hyperlinked to their permalink
// separator removed so links site tightly against each other
function ct_drop_category_display() {
       
    $categories = get_the_category();
    $separator = ' ';
    $output = '';
    if($categories){
	    echo "<p><span>" . __('Categories:','drop') . "</span>";
        foreach($categories as $category) {
            $output .= '<a href="'.get_category_link( $category->term_id ).'" title="' . esc_attr( sprintf( __( "View all posts in %s", 'drop' ), $category->name ) ) . '">'.$category->cat_name.'</a>'.$separator;
        }
        echo trim($output, $separator);
	    echo "</p>";
    }   
}

// Outputs the tags the post used with their names hyperlinked to their permalink
function ct_drop_tags_display() {
       
    $tags = get_the_tags();
    $separator = ' ';
    $output = '';
    if($tags){
        echo "<p><span>" . __('Tagged as:','drop') . "</span>";
        foreach($tags as $tag) {
            $output .= '<a href="'.get_tag_link( $tag->term_id ).'" title="' . esc_attr( sprintf( __( "View all posts tagged %s", 'drop' ), $tag->name ) ) . '">'.$tag->name.'</a>'.$separator;
        }
        echo trim($output, $separator);
	    echo "</p>";
    }
}

/* added to customize the comments. Same as default except -> added use of gravatar images for comment authors */
function ct_drop_customize_comments( $comment, $args, $depth ) {
    $GLOBALS['comment'] = $comment;
    global $post;
 
    ?>
    <li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
        <article id="comment-<?php comment_ID(); ?>" class="comment">
            
            <div class="comment-author">
                <?php
                // if is post author
                if( $comment->user_id === $post->post_author ) {
                    echo "<div class='author-profile-avatar'>";
                        ct_drop_profile_image_output();
                    echo "</div>";
                } else { ?>
                    <img width="48" height="48" class="avatar lazy lazy-image" data-src="<?php echo ct_drop_get_gravatar_url(get_avatar( $comment, 50 )); ?>" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" />
                <?php } ?>

                <div>
                    <div class="author-name"><?php comment_author_link(); ?> <?php _e('said','drop'); ?>&#8230;</div>
                </div>    
            </div>
            <?php if ($comment->comment_approved == '0') : ?>
                <em><?php _e('Your comment is awaiting moderation.', 'drop') ?></em>
                <br />
            <?php endif; ?>
            <div class="comment-content">
                <?php if ($comment->comment_approved == '0') : ?>
                    <em><?php _e('Your comment is awaiting moderation.', 'drop') ?></em>
                    <br />
                <?php endif; ?>
                <?php comment_text(); ?>
            </div>
            <div class='comment-footer'>
				<?php comment_reply_link( array_merge( $args, array( 'reply_text' => __( 'Reply', 'drop' ), 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
				<div class="comment-date"><?php comment_date(); ?></div>
				<div><?php edit_comment_link( 'edit' ); ?></div>
			</div>
        </article>
    <?php
}

/* added HTML5 placeholders for each default field */
function ct_drop_update_fields($fields) {

    $commenter = wp_get_current_commenter();
    $req = get_option( 'require_name_email' );
    $aria_req = ( $req ? " aria-required='true'" : '' );

	$fields['author'] = 
		'<p class="comment-form-author">
		    <label class="screen-reader-text">' . __('Your Name','drop') . '</label>
			<input required minlength="3" maxlength="30" placeholder="Your Name*" id="author" name="author" type="text" aria-required="true" value="' . esc_attr( $commenter['comment_author'] ) .
    '" size="30"' . $aria_req . ' />
    	</p>';
    
    $fields['email'] = 
    	'<p class="comment-form-email">
    	    <label class="screen-reader-text">' . __('Your Email','drop') . '</label>
    		<input required placeholder="Your Email*" id="email" name="email" type="email" aria-required="true" value="' . esc_attr(  $commenter['comment_author_email'] ) .
    '" size="30"' . $aria_req . ' />
    	</p>';
	
	$fields['url'] = 
		'<p class="comment-form-url">
		    <label class="screen-reader-text">' . __('Your Website','drop') . '</label>
			<input placeholder="Your URL" id="url" name="url" type="url" value="' . esc_attr( $commenter['comment_author_url'] ) .
    '" size="30" />
    	</p>';
    
	return $fields;
}
add_filter('comment_form_default_fields','ct_drop_update_fields');

function ct_drop_update_comment_field($comment_field) {
	
	$comment_field = 
		'<p class="comment-form-comment">
            <label class="screen-reader-text">' . __('Your Comment','drop') . '</label>
			<textarea required placeholder="Enter Your Comment&#8230;" id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea>
		</p>';
	
	return $comment_field;
}
add_filter('comment_form_field_comment','ct_drop_update_comment_field');

// remove allowed tags text after comment form
function ct_drop_remove_comments_notes_after($defaults){

    $defaults['comment_notes_after']='';
    return $defaults;
}

add_action('comment_form_defaults', 'ct_drop_remove_comments_notes_after');


// for 'read more' tag excerpts
function ct_drop_excerpt() {
	
	global $post;
	// check for the more tag
    $ismore = strpos( $post->post_content, '<!--more-->');
    
	/* if there is a more tag, edit the link to keep reading
	*  works for both manual excerpts and read more tags
	*/
    if($ismore) {
        $read_more_link = __('Read the Post','drop');
        $read_more_link .= "<span class='screen-reader-text'>" . get_the_title() . "</span>";
        the_content($read_more_link);
    }
    // otherwise the excerpt is automatic, so output it
    else {
        the_excerpt();
    }
}

// for custom & automatic excerpts
function ct_drop_excerpt_read_more_link($output) {
	global $post;
	return $output . "<p><a class='more-link' href='". get_permalink() ."'>" . __('Read the Post','drop') . "<span class='screen-reader-text'>" . get_the_title() . "</span></a></p>";
}

add_filter('the_excerpt', 'ct_drop_excerpt_read_more_link');

// switch [...] to ellipsis on automatic excerpt
function ct_drop_new_excerpt_more( $more ) {
	return '&#8230;';
}
add_filter('excerpt_more', 'ct_drop_new_excerpt_more');

// turns of the automatic scrolling to the read more link 
function ct_drop_remove_more_link_scroll( $link ) {
	$link = preg_replace( '|#more-[0-9]+|', '', $link );
	return $link;
}

add_filter( 'the_content_more_link', 'ct_drop_remove_more_link_scroll' );

// change the custom excerpt length
function ct_drop_custom_excerpt_length( $length ) {
    return 35;
}
add_filter( 'excerpt_length', 'ct_drop_custom_excerpt_length', 999 );

// Adds navigation through pages in the loop
function ct_drop_post_navigation() {
    if ( current_theme_supports( 'loop-pagination' ) ) loop_pagination();
}

// adds the url from the image credit box to the post and makes it clickable
function ct_drop_add_image_credit_link() {
    
    global $post;
    $link = get_post_meta( $post->ID, 'ct-image-credit-link', true );
    if(!empty($link)) {
        echo "<p id='image-credit' class='image-credit'>" . __('image credit:','drop') . make_clickable($link)."</p>";
    }
}

// for displaying featured images including mobile versions and default versions
function ct_drop_featured_image() {
	
	global $post;

    // if blog or archive, lazy load smaller image
    if(is_home() || is_archive()){

        if (has_post_thumbnail( $post->ID ) ) {
            $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'blog' );
            $image = $image[0];
            echo "
                <div itemprop='thumbnailUrl' class='featured-image lazy lazy-bg-image' data-background='" . $image . "'>
                    <a href='" . get_the_permalink() ."'>" . get_the_title() . "</a>
                </div>";
        }
    }
	elseif (has_post_thumbnail( $post->ID ) ) {
		$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' );
		$image = $image[0];
        echo "<div itemprop='thumbnailUrl' class='featured-image' style=\"background-image: url('".$image."')\"></div>";
	}
}

/* add a smaller size for the blog page */
if( function_exists('add_image_size')){
    add_image_size('blog', 600, 400);
}

// adds title to homepage
add_filter( 'wp_title', 'ct_drop_add_homepage_title' );
function ct_drop_add_homepage_title( $title )
{
    if( empty( $title ) && ( is_home() || is_front_page() ) ) {
        return get_bloginfo( 'title' ) . ' | ' . get_bloginfo( 'description' );
    }
    return $title;
}

// calls pages for menu if menu not set
function ct_drop_wp_page_menu() {
    wp_page_menu(array("menu_class" => "menu-unset"));
}

/* adds 'not-front' to body on non-front pages */
function ct_drop_body_class( $classes ) {
    if ( ! is_front_page() ) {
        $classes[] = 'not-front';
    }
    return $classes;
}
add_filter( 'body_class', 'ct_drop_body_class' );

function ct_drop_post_class_update($classes){

    $remove = array();
    $remove[] = 'entry';

    if ( ! is_singular() ) {
        foreach ( $classes as $key => $class ) {

            if ( in_array( $class, $remove ) ){
                unset( $classes[ $key ] );
                $classes[] = 'excerpt';
            }
        }
    }
    return $classes;
}
add_filter( 'post_class', 'ct_drop_post_class_update' );

// fix for bug with Disqus saying comments are closed
if ( function_exists( 'dsq_options' ) ) {
    remove_filter( 'comments_template', 'dsq_comments_template' );
    add_filter( 'comments_template', 'dsq_comments_template', 99 ); // You can use any priority higher than '10'
}

function ct_drop_get_gravatar_url($get_avatar){
    preg_match("/src='(.*?)'/i", $get_avatar, $matches);
    return $matches[1];
}

// outputs the user's uploaded profile picture with Gravatar fallback
function ct_drop_profile_image_output(){

    // if post author has profile image set
    if(get_option('ct_drop_profile_image_upload')) {

        // get the id based on the image's URL
        $image_id = ct_drop_get_image_id(get_option('ct_drop_profile_image_upload'));

        // retrieve the thumbnail size of profile image
        $image_thumb = wp_get_attachment_image($image_id, 'thumbnail');

        // display the image
        echo $image_thumb;

    } else {
        echo get_avatar( get_the_author_meta( 'ID' ), 72 );
    }
}

// retrieves the attachment ID from the file URL
function ct_drop_get_image_id($url) {

    // Split the $url into two parts with the wp-content directory as the separator
    $parsed_url  = explode( parse_url( WP_CONTENT_URL, PHP_URL_PATH ), $url );

    // Get the host of the current site and the host of the $url, ignoring www
    $this_host = str_ireplace( 'www.', '', parse_url( home_url(), PHP_URL_HOST ) );
    $file_host = str_ireplace( 'www.', '', parse_url( $url, PHP_URL_HOST ) );

    // Return nothing if there aren't any $url parts or if the current host and $url host do not match
    if ( ! isset( $parsed_url[1] ) || empty( $parsed_url[1] ) || ( $this_host != $file_host ) ) {
        return;
    }

    // Now we're going to quickly search the DB for any attachment GUID with a partial path match
    // Example: /uploads/2013/05/test-image.jpg
    global $wpdb;

    $attachment = $wpdb->get_col( $wpdb->prepare( "SELECT ID FROM {$wpdb->prefix}posts WHERE guid RLIKE %s;", $parsed_url[1] ) );

    // Returns null if no attachment is found
    return $attachment[0];
}

/**
 * Class for adding a new field to the options-general.php page
 */
class ct_drop_add_profile_image_upload {

    /**
     * Class constructor
     */
    public function __construct() {
        add_filter( 'admin_init' , array( &$this , 'register_fields' ) );
    }

    /**
     * Add new fields to wp-admin/options-general.php page
     */
    public function register_fields() {
        register_setting( 'general', 'ct_drop_profile_image_upload', 'esc_attr' );
        add_settings_field(
            'ct_drop_profile_image_upload',
            '<label for="ct_drop_profile_image_upload">' . __( 'Avatar' , 'drop' ) . '</label>',
            array( &$this, 'fields_html' ),
            'general'
        );
    }

    /**
     * HTML for extra settings
     */
    public function fields_html() {
        $value = get_option( 'ct_drop_profile_image_upload', '' );

        ?>
        <!-- Outputs the image after save -->
        <img id="image-preview" src="<?php echo esc_url( $value ); ?>" style="width:100px;"><br />
        <!-- Outputs the text field and displays the URL of the image retrieved by the media uploader -->
        <input type="text" name="ct_drop_profile_image_upload" id="ct_drop_profile_image_upload" value="<?php echo esc_url_raw( $value ); ?>" class="regular-text" />
        <!-- Outputs the save button -->
        <input type='button' id="profile-image-upload" class="button-primary" value="<?php _e( 'Upload Image', 'drop' ); ?>"/><br />
        <span class="description"><?php _e( 'This image will be used in the sidebar instead of your Gravatar.', 'drop' ); ?></span>
        <?php
    }
}
new ct_drop_add_profile_image_upload();

if ( ! function_exists( '_wp_render_title_tag' ) ) :
	function ct_drop_add_title_tag() {
		?>
		<title><?php wp_title(); ?></title>
	<?php
	}
	add_action( 'wp_head', 'ct_drop_add_title_tag' );
endif;

// custom css output
function ct_drop_custom_css_output(){

	$custom_css = get_theme_mod('custom_css');

	/* output custom css */
	if( $custom_css ) {
		wp_add_inline_style( 'ct-drop-style', $custom_css );
		wp_add_inline_style( 'ct-drop-style-rtl', $custom_css );
	}
}
add_action('wp_enqueue_scripts', 'ct_drop_custom_css_output', 20);