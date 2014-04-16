<?php get_header(); ?>
    
<div class='page-header'>
	<p>These Posts are by:</p>
	<h2><?php echo get_the_author(); ?></h2>
	<?php get_search_form(); ?>
</div>
    
<div class='excerpts-container'>

<?php

// The loop
if ( have_posts() ) :
    while (have_posts() ) : 
        the_post();
        get_template_part('content');
    endwhile;
endif; ?>

<?php ct_drop_post_navigation(); ?>

</div>

<?php get_footer(); ?>