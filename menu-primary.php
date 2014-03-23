<i class="fa fa-bars toggle-button"></i>

<div class='menu-slider'>
    <div class='site-info'>
        <?php echo get_avatar(get_bloginfo('admin_email')); ?>
        <p><?php echo bloginfo('description'); ?></p>
        <hr />
    </div>
    <div class="menu-container menu-primary">
        <?php wp_nav_menu( array( 'theme_location' => 'primary', 'container_class' => 'menu', 'menu_class' => 'menu-primary-items', 'menu_id' => 'menu-primary-items', 'fallback_cb' => 'wp_page_menu' ) ); ?>
    </div><!-- #menu-primary .menu-container -->
    <?php ct_social_media_icons(); // adds social media icons ?>
</div>