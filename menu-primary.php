<button id="toggle-button" class="toggle-button">
    <i class="fa fa-bars"></i>
</button>


<div class='menu-slider'>
    <div class='site-info'>
        <?php echo get_avatar(get_bloginfo('admin_email')); ?>
        <p><?php echo bloginfo('description'); ?></p>
        <hr />
    </div>
    <div class="menu-container menu-primary" role="navigation">
        <?php wp_nav_menu( array( 'theme_location' => 'primary', 'container'=> 'false', 'menu_class' => 'menu-primary-items', 'menu_id' => 'menu-primary-items', 'items_wrap' => '<ul id="%1$s" class="%2$s" role="menubar">%3$s</ul>', 'fallback_cb' => 'ct_drop_wp_page_menu') ); ?>
    </div><!-- #menu-primary .menu-container -->
    <?php ct_drop_social_media_icons(); // adds social media icons ?>
</div>