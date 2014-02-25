<?php get_header(); ?>

<div class="entry">
    
    <div class='page-header'>
	    <h1>Search Results for "<?php echo $s ?>"</h1>
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
        <p>Can't find what you're looking for?  Try refining your search:</p>
        <?php get_search_form(); ?>    
    </div>

	</div><!--.excerpts-container-->
</div><!--.entry-->
<?php get_footer(); ?>