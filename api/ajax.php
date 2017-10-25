<?php
$contentType = isset( $_SERVER['CONTENT_TYPE'] ) ? trim( $_SERVER['CONTENT_TYPE'] ) : '';

// $contentType = 'application/json';
// $decoded['type'] = 'rotate';
// $decoded['file'] = 'img/test.gif?date=1508304889608';
// $decoded['rotate'] = 270;

if ( $contentType === 'application/json' ) {
  $content = trim( file_get_contents('php://input') );
  $decoded = json_decode( $content, true );

  if( $decoded['type'] === 'get_image_list' ) {
    $img_dir = 'img/';
    $files = array(
      '3333' => $img_dir . 'test.jpg',
      '2222' => $img_dir . 'test.png',
      '1111' => $img_dir . 'test.gif',
    );

    echo json_encode( $files );
  }

  if( $decoded['type'] === 'rotate' ) {
    $filename = preg_replace( array( '/\?.*/' ), array( '' ), basename( $decoded['file'] ) );
    $filename_arr = explode('.', $filename);
    $img_dir = dirname( dirname( __FILE__ ) ) . '/img/';

    rotateImage( $img_dir . $filename, $decoded['rotate'] );
    foreach( glob($img_dir . $filename_arr[0] . '-*' . $filename_arr[1]) as $file ) {
      rotateImage( $file, $decoded['rotate'] );
    }

    echo json_encode( $decoded );
  }
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
			imagefill( $rotate_img, 0, 0, $bgcolor );
			imagecolortransparent( $rotate_img, $bgcolor );
			imagegif( $rotate_img, $tmp_name, 100 );
			break;
		case IMAGETYPE_PNG:
      $rotate_img = imagerotate( $image, $rotate, 0 );
			imagepng( $rotate_img, $tmp_name, 9 );
			break;
	}
	imagedestroy( $image );
	imagedestroy( $rotate_img );
}
