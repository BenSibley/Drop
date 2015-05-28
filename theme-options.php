<?php

/* create theme options page */
function ct_drop_register_theme_page(){
add_theme_page( 'Drop Dashboard', 'Drop Dashboard', 'edit_theme_options', 'drop-options', 'ct_drop_options_content', 'ct_drop_options_content');
}
add_action( 'admin_menu', 'ct_drop_register_theme_page' );

/* callback used to add content to options page */
function ct_drop_options_content(){
    ?>
    <div id="drop-dashboard-wrap" class="wrap">
        <h2><?php _e('Drop Dashboard', 'drop'); ?></h2>
        <?php hybrid_do_atomic( 'theme_options_before' ); ?>
        <div class="content content-customization">
            <h3><?php _e('Customization', 'drop'); ?></h3>
            <p><?php _e('Click the "Customize" link in your menu, or use the button below to get started customizing Drop', 'drop'); ?>.</p>
            <p>
                <a class="button-primary" href="<?php echo admin_url('customize.php'); ?>"><?php _e('Use Customizer', 'drop') ?></a>
            </p>
        </div>
        <div class="content content-support">
	        <h3><?php _e('Support', 'drop'); ?></h3>
            <p><?php _e("You can find the knowledgebase, changelog, support forum, and more in the Drop Support Center", "drop"); ?>.</p>
            <p>
                <a target="_blank" class="button-primary" href="https://www.competethemes.com/documentation/drop-support-center/"><?php _e('Visit Support Center', 'drop'); ?></a>
            </p>
        </div>
        <div class="content content-premium-upgrade">
            <h3><?php _e('Upgrade to Drop Pro', 'drop'); ?></h3>
            <p><?php _e('Drop Pro is the premium upgrade for Drop. It has custom colors, new layouts, background images, and more', 'drop'); ?>...</p>
            <p>
                <a target="_blank" class="button-primary" href="https://www.competethemes.com/drop-pro/"><?php _e('See Full Feature List', 'drop'); ?></a>
            </p>
        </div>
        <div class="content content-resources">
            <h3><?php _e('WordPress Resources', 'drop'); ?></h3>
            <p><?php _e('Save time and money searching for WordPress products by following our recommendations', 'drop'); ?>.</p>
            <p>
                <a target="_blank" class="button-primary" href="https://www.competethemes.com/wordpress-resources/"><?php _e('View Resources', 'drop'); ?></a>
            </p>
        </div>
        <div class="content content-delete-settings">
            <h3><?php _e('Reset Customizer Settings', 'drop'); ?></h3>
            <p>
                <?php
                $url = admin_url('customize.php');
                $text = sprintf( __( '<strong>Warning:</strong> Clicking this button will erase your current settings in the <a href="%s">Customizer</a>', 'drop' ), esc_url( $url ) );
                echo $text . ".";
                ?>
            </p>
            <form method="post">
                <input type="hidden" name="drop_reset_customizer" value="drop_reset_customizer_settings" />
                <p>
                    <?php wp_nonce_field( 'drop_reset_customizer_nonce', 'drop_reset_customizer_nonce' ); ?>
                    <?php submit_button( __( 'Reset Customizer Settings', 'drop' ), 'delete', 'delete', false ); ?>
                </p>
            </form>
        </div>
        <?php hybrid_do_atomic( 'theme_options_after' ); ?>
    </div>
<?php } ?>
