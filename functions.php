<?php

// register and enqueue all of the scripts used by Aside
function ct_drop_load_javascript_files() {

    wp_register_style( 'ct-drop-google-fonts', '//fonts.googleapis.com/css?family=Montserrat:400,700|Open+Sans:400italic,400,700');

    // enqueue scripts on front end
    if(! is_admin() ) {
        wp_enqueue_script('production', get_template_directory_uri() . '/js/build/production.min.js#ct_drop_asyncload', array('jquery'),'', true);

        if( is_rtl() ){
            wp_enqueue_style('style', get_template_directory_uri() . '/css/rtl.min.css');
        }
        else {
            wp_enqueue_style('style', get_template_directory_uri() . '/style.min.css');
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
    
    // adds the file with the customizer functionality
    require_once( trailingslashit( get_template_directory() ) . 'functions-admin.php' );

    // enable localization
    load_theme_textdomain('drop', get_template_directory() . '/languages');

    register_nav_menus(array(
        'primary' => __('Primary', 'tracks')
    ));
}

// Initialize the metabox class
add_action( 'init', 'ct_drop_initialize_cmb_meta_boxes', 9999 );
function ct_drop_initialize_cmb_meta_boxes() {
    if ( !class_exists( 'cmb_Meta_Box' ) ) {
        require_once( 'assets/custom-meta-boxes/init.php' );
    }
}

function ct_drop_register_widget_areas(){

    /* register footer widget area */
    hybrid_register_sidebar( array(
        'name'         => __( 'Subsidiary', 'tracks' ),
        'id'           => 'subsidiary',
        'description'  => __( 'Widgets in this area will be shown in the footer', 'tracks' )
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
                    <?php if( $active_site ==  "flickr" || $active_site ==  "dribbble" || $active_site ==  "instagram") { ?>
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
 
    ?>
    <li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
        <article id="comment-<?php comment_ID(); ?>" class="comment">
            
            <div class="comment-author">
                <img width="48" height="48" class="avatar lazy lazy-image" data-src="<?php echo ct_drop_get_gravatar_url(get_avatar( $comment, 50 )); ?>" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" />
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
    </li>
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

    // if blog/archive load smaller image size
    if(is_home() || is_archive()){

        // if not first page, lazy load image
        if (has_post_thumbnail( $post->ID ) ) {
            $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'blog' );
            $image = $image[0];
            echo "<div itemprop='thumbnailUrl' class='featured-image lazy lazy-bg-image' data-background='" . $image . "'></div>";
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

?>