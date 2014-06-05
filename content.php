<?php 

if( is_home() ) { ?>
    <div class='excerpt <?php hybrid_post_class(); ct_drop_contains_featured(); ?>' itemscope itemtype="http://schema.org/BlogPosting">
    	<?php ct_drop_featured_image(); ?>
    	<div class='excerpt-meta'>
			<span class='excerpt-date updated' itemprop="datePublished" content="<?php echo get_the_date('Y-m-d'); ?>">
				<?php echo get_the_date('d M Y'); ?>
			</span>
			<span itemprop="author" itemscope itemtype="http://schema.org/Person" class='excerpt-author'>
				<span><?php _e('Published by:','drop'); ?></span>
				<a href="<?php echo get_author_posts_url(get_the_author_meta('ID')) ?>" itemprop="name"><?php the_author_meta( 'display_name' ); ?></a>
			</span>
			<span class='excerpt-category'>
				<span><?php _e('Posted in:','drop'); ?></span>
				<?php ct_drop_excerpt_category_display(); ?>
			</span>
    	</div>    	
		<div class='excerpt-header'>
			<h1 class='excerpt-title' itemprop="headline">
				<a itemprop="url" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			</h1>
		</div>
		<div class='excerpt-content'>
			<article itemprop="description">
				<?php ct_drop_excerpt(); ?>
			</article>
		</div>
	</div>
<?php     
} elseif( is_single() ) { ?>
   <div class='entry <?php hybrid_post_class(); ct_drop_contains_featured(); ?>' itemscope itemtype="http://schema.org/BlogPosting">
        <?php ct_drop_featured_image(); ?>
        <div class='entry-meta-top'>
			<p>
                <span class="vcard author" itemprop="author" itemscope itemtype="http://schema.org/Person"><?php _e('Published by ','drop'); ?>
                    <a class="fn" href="<?php esc_url(get_author_posts_url(get_the_author_meta('ID'))) ?>" itemprop="name"><?php the_author_meta( 'display_name' ); ?></a>
                </span> on
                <span class="updated" itemprop="datePublished" content="<?php echo get_the_date('Y-m-d'); ?>"><?php the_date('M j, Y'); ?></span>
            </p>
		</div>
		<div class='entry-header'>
			<h1 class='entry-title' itemprop="headline"><?php the_title(); ?></h1>
		</div>
		<div class="entry-content">
			<article itemprop="articleBody">
				<?php the_content(); ?>
				<?php wp_link_pages(array('before' => '<p class="singular-pagination">' . __('Pages:','drop'), 'after' => '</p>', ) ); ?>
				<?php ct_drop_add_image_credit_link(); ?>
			</article>
		</div>
		<div class='entry-meta-bottom'>
			<?php ct_drop_further_reading(); ?>
			<div class="entry-categories"><?php ct_drop_category_display(); ?></div>
			<div class="entry-tags"><?php ct_drop_tags_display(); ?></div>
		</div>
    </div>
<?php 
} else { ?>
    <div class='excerpt <?php hybrid_post_class(); ct_drop_contains_featured(); ?>' itemscope itemtype="http://schema.org/BlogPosting">
        <?php ct_drop_featured_image(); ?>
        <div class='excerpt-meta'>
			<span class='excerpt-date' itemprop="datePublished" content="<?php echo get_the_date('Y-m-d'); ?>">
				<?php echo get_the_date('d M Y'); ?>
			</span>
			<span itemprop="author" itemscope itemtype="http://schema.org/Person" class='excerpt-author'>
				<span><?php _e('Published by:','drop'); ?></span>
				<a href="<?php echo get_author_posts_url(get_the_author_meta('ID')) ?>" itemprop="name"><?php the_author_meta( 'display_name' ); ?></a>
			</span>
			<span class='excerpt-category'>
				<span><?php _e('Posted in:','drop'); ?></span>
                <?php ct_drop_excerpt_category_display(); ?>
			</span>
        </div>
        <div class='excerpt-header'>
            <h1 class='excerpt-title' itemprop="headline">
                <a itemprop="url" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </h1>
        </div>
        <div class='excerpt-content'>
            <article itemprop="description">
                <?php ct_drop_excerpt(); ?>
            </article>
        </div>
    </div>
<?php 
}

