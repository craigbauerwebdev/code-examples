<?php
if ( ! is_single() ) {
    return;
}
 
global $post;
$taxs = get_object_taxonomies( $post );
if ( ! $taxs ) {
    return;
}
 
$count = 10;
  
// ignoring post formats
if( ( $key = array_search( 'post_format', $taxs ) ) !== false ) {
    unset( $taxs[$key] );
}
  
// try tags first
  
if ( ( $tag_key = array_search( 'post_tag', $taxs ) ) !== false ) {
  
    $tax = 'post_tag';
    $tax_term_ids = wp_get_object_terms( $post->ID, $tax, array( 'fields' => 'ids' ) );
}
  
// if no tags, then by cat or custom tax
  
if ( empty( $tax_term_ids ) ) {
    // remove post_tag to leave only the category or custom tax
    if ( $tag_key !== false ) {
        unset( $taxs[ $tag_key ] );
        $taxs = array_values($taxs);
    }
  
    $tax = $taxs[0];
    $tax_term_ids = wp_get_object_terms( $post->ID, $tax, array('fields' => 'ids') );
  
}
  
if ( $tax_term_ids ) {
    $args = array(
        'post_type' => $post->post_type,
        'posts_per_page' => $count,
        'orderby' => 'rand',
        'tax_query' => array(
            array(
                'taxonomy' => $tax,
                'field' => 'id',
                'terms' => $tax_term_ids
            )
        ),
        'post__not_in' => array ($post->ID),
    );
    $related = get_posts( $args );
    if ( $related ) {   ?>
        <div class="amp-wp-meta amp-wp-tax-tag">
            <h3>You May Also Like</h3>
            <ul class="releated-post-wrap">
            <?php 
            $first = 1;
            foreach( $related as $post) {
                setup_postdata( $post );
                //echo the_post_thumbnail();
                //$relthumbnail = get_the_post_thumbnail_url();
                //echo '<amp-img src="'.$thumbnail.'"></amp-img>';
                ?>
                <?php if($first) { 
                    $first = 0; 
                 } else { ?>
                    <div class="divider"></div>
                <?php } ?>

                <li class="amp-related-post"><a href="<?php echo esc_url( get_permalink( get_the_id() ) ); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></li>
                
            <?php } ?>
            </ul>
        </div>
    <?php
    }
    wp_reset_postdata();
}
?>