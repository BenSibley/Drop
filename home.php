<?php get_header(); ?>

<div class='page-header'>
	<h2><?php _x('Blog','noun: the blog page','drop'); ?></h2>
	<?php get_search_form(); ?>
</div>

<div class='excerpts-container'>

<?php

// The loop
if ( have_posts() ) :
    while (have_posts() ) : 
        the_post(); 
        get_template_part('content', get_post_format() );
    endwhile;
endif; ?>
       
<?php ct_drop_post_navigation(); ?>

</div>
    
<?php get_footer(); ?>