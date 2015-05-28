<?php

/* Add customizer panels, sections, settings, and controls */
add_action( 'customize_register', 'ct_drop_add_customizer_content' );

/**
 * Add logo upload in theme customizer screen.
 *
 * @since 1.0
 */
function ct_drop_add_customizer_content( $wp_customize ) {

	/* create custom control for url input so http:// is automatically added */
	class ct_drop_url_input_control extends WP_Customize_Control {
		public $type = 'url';

		public function render_content() {
			?>
			<label>
				<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
				<input type="url" <?php $this->link(); ?> value="<?php echo esc_url( $this->value() ); ?>" />
			</label>
		<?php
		}
	}

	// create textarea control
	class ct_drop_textarea_control extends WP_Customize_Control {
		public $type = 'textarea';

		public function render_content() {
			?>
			<label>
				<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
				<textarea rows="8" style="width:100%;" <?php $this->link(); ?>><?php echo esc_textarea( $this->value() ); ?></textarea>
			</label>
		<?php
		}
	}

	/***** Logo *****/

	// section
	$wp_customize->add_section( 'ct-upload', array(
		'title'      => __( 'Logo', 'drop' ),
		'priority'   => 60,
		'capability' => 'edit_theme_options'
	) );
	// setting
	$wp_customize->add_setting( 'logo_upload', array(
		'default'           => '',
		'type'              => 'theme_mod',
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'esc_url_raw',
	) );
	// control
	$wp_customize->add_control( new WP_Customize_Image_Control(
		$wp_customize, 'logo_image', array(
			'label'    => __( 'Upload custom logo.', 'drop' ),
			'section'  => 'ct-upload',
			'settings' => 'logo_upload',
		)
	) );

	/***** Social Media Icons *****/

	$wp_customize->add_section( 'ct_drop_social_settings', array(
		'title'          => __('Social Media Icons','drop'),
		'priority'       => 35,
	) );

	$social_sites = ct_drop_customizer_social_media_array();
	$priority = 5;

	foreach($social_sites as $social_site) {

		/* add setting for each social site */
		$wp_customize->add_setting( "$social_site", array(
			'default'        => '',
			'sanitize_callback' => 'esc_url_raw'
		) );

		/* add URL HTML5 input */
		$wp_customize->add_control( new ct_drop_url_input_control(
			$wp_customize, $social_site, array(
				'label'   => $social_site . " " . __( "url:", 'drop' ),
				'section' => 'ct_drop_social_settings',
				'type'    => 'text',
				'priority'=> $priority
			)
		) );
		$priority = $priority + 5;
	}

	/***** Custom CSS *****/

	// section
	$wp_customize->add_section( 'drop_custom_css', array(
		'title'      => __( 'Custom CSS', 'drop' ),
		'priority'   => 65,
		'capability' => 'edit_theme_options'
	) );
	// setting
	$wp_customize->add_setting( 'custom_css', array(
		'type'              => 'theme_mod',
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'wp_filter_nohtml_kses',
	) );
	// control
	$wp_customize->add_control( new ct_drop_textarea_control(
		$wp_customize, 'custom_css', array(
			'label'          => __( 'Add Custom CSS Here:', 'drop' ),
			'section'        => 'drop_custom_css',
			'settings'       => 'custom_css',
		)
	) );
}

function ct_drop_customizer_social_media_array() {

	// store social site names in array
	$social_sites = array('twitter', 'facebook', 'google-plus', 'flickr', 'pinterest', 'youtube', 'vimeo', 'tumblr', 'dribbble', 'rss', 'linkedin', 'instagram', 'reddit', 'soundcloud', 'spotify', 'vine','yahoo', 'behance', 'codepen', 'delicious', 'stumbleupon', 'deviantart', 'digg', 'git', 'hacker-news', 'steam', 'vk');

	return $social_sites;
}