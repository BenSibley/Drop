<?php get_header(); ?>

<div class="entry">
    
    <div class='page-header'>
	    <h1>
            <?php
            global $wp_query;
            $total_results = $wp_query->found_posts;
            if($total_results) {
	            printf( _n('%d search result for "%s"', '%d search results for "%s"', $total_results, 'drop'), $total_results, $s );
            } else {
	            printf( __('No search results for "%s"', 'drop'), $s );
            }
            ?>
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

	<?php
	// only display bottom search bar if there are search results
	$total_results = $wp_query->found_posts;
	if($total_results) {
		?>
	    <div class="search-bottom">
	        <p><?php _e("Can't find what you're looking for?  Try refining your search:",'drop'); ?></p>
	        <?php get_search_form(); ?>
	    </div>
	<?php } ?>
	</div><!--.excerpts-container-->
</div><!--.entry-->
<?php get_footer(); ?>