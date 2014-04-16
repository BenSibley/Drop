<?php get_header(); ?>
    
<div class='page-header'>
	<p>Tag:</p>
	<h2><?php single_tag_title(); ?></h2>
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