<?php get_header(); ?>
   
<div class='excerpts-container'>
 
<?php

// The loop
if ( have_posts() ) :
    while (have_posts() ) : 
        the_post();
        get_template_part('content', get_post_format());
    endwhile;
endif; ?>

<?php ct_post_navigation(); ?>

</div>

<?php get_footer(); ?>