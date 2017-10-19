<?php
  $img_dir = dirname( __FILE__ ) . '/img/';
  $file = 'test.jpg';
?>
<rotateImage file="<?php echo $img_dir . $file ?>"></rotateImage>
<script src="./build/js/commons.js"></script>
<script src="./build/rotate_image.js"></script>
