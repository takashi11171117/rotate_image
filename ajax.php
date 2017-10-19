<?php
$contentType = isset( $_SERVER['CONTENT_TYPE'] ) ? trim( $_SERVER['CONTENT_TYPE'] ) : 'application/json';

if ( $contentType === 'application/json' ) {
  $content = trim( file_get_contents('php://input') );
  $decoded = json_decode( $content, true );
  //$decoded['file'] = 'http://192.168.33.10/vagrant/js_test/rotate_image/img/test.jpg?date=1508304889608';
  //$decoded['rotate'] = 270;
  $filename_ext = preg_replace( '/\?.*/', '', basename( $decoded['file'] ) );
  $filename = preg_replace( array( '/\?.*/', '/\..*/' ), array( '', '' ), basename( $decoded['file'] ) );
  $img_dir = dirname( __FILE__ ) . '/img/';

  rotateImage( $img_dir . $filename_ext, $decoded['rotate'] );
  foreach(glob($img_dir . $filename . '-*') as $file) {
    rotateImage( $file, $decoded['rotate'] );
  }

  echo json_encode( $decoded );
}

function rotateImage( $tmp_name, $rotate ) {
  if ( $rotate === 90 || $rotate === 270 ) $rotate = $rotate - 180;
	list( $width, $height, $type ) = getimagesize( $tmp_name );
	switch ( $type ) {
		case IMAGETYPE_JPEG:
			$image = imagecreatefromjpeg( $tmp_name );
			break;
		case IMAGETYPE_GIF:
			$image = imagecreatefromgif( $tmp_name );
			break;
		case IMAGETYPE_PNG:
			imagealphablending( $image, false );
			imagesavealpha( $image, true );
			$image = imagecreatefrompng( $tmp_name );
			break;
	}
	switch ( $type ) {
		case IMAGETYPE_JPEG:
      $rotate_img = imagerotate( $image, $rotate, 0 );
			imagejpeg( $rotate_img, $tmp_name, 100 );
			break;
		case IMAGETYPE_GIF:
      $rotate_img = imagerotate( $image, $rotate, 0 );
			$bgcolor = imagecolorallocatealpha( $image, 0, 0, 0, 127 );
			imagefill( $image, 0, 0, $bgcolor );
			imagecolortransparent( $image, $bgcolor );
			imagegif( $image, $tmp_name, 100 );
			break;
		case IMAGETYPE_PNG:
      $rotate_img = imagerotate( $image, $rotate, 0 );
			imagepng( $rotate_img, $tmp_name, 100 );
			break;
	}
	imagedestroy( $image );
	imagedestroy( $rotate_img );
}
