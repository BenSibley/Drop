<?php get_header(); ?>

<div class="entry">
    
    <div class='page-header'>
	    <h1>
            <?php
            global $wp_query;
            $total_results = $wp_query->found_posts;
            if($total_results) {
                printf(__('%d search results for','drop'),$total_results);
            } else {
                _e("No search results for ",'drop');
            }
            ?>
            <span>"<?php echo $s ?>"</span>
        </h1>
	</div>
    <?php get_search_form(); ?>
	
	<div class='excerpts-container'>
	
    <?php 
    // The loop
    if ( have_posts() ) :
        while (have_posts() ) : 
            the_post();
            get_template_part( 'content-search' ); 
        endwhile;
    endif;
    ?>
    
    <?php if ( current_theme_supports( 'loop-pagination' ) ) loop_pagination(); ?>
    
    <div class="search-bottom">
        <p><?php _e("Can't find what you're looking for?  Try refining your search:",'drop'); ?></p>
        <?php get_search_form(); ?>    
    </div>

	</div><!--.excerpts-container-->
</div><!--.entry-->
<?php get_footer(); ?>