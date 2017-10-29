<?php
// $_POST['action'] = 'rotate';
// $_POST['file'] = 'img/test.gif?date=1508304889608';
// $_POST['rotate'] = 270;

if( $_POST['action'] === 'images_show' ) {
  $img_dir = 'img/';
  $files = array(
    '3333' => array(
      "date" =>  '2017-10-10',
      "filename" =>  'test.jpg',
      "url" => $img_dir . 'test.jpg',
    ),
    '2222' => array(
      "date" => '2017-10-10',
      "filename" => 'test.png',
      "url" =>  $img_dir . 'test.png',
    ),
    '1111' => array(
      "date" => '2017-10-10',
      "filename" => 'test.gif',
      "url" => $img_dir . 'test.gif',
    ),
  );

  echo json_encode( $files );
}

if( $_POST['action'] === 'rotate_image' ) {
  if( isset( $_POST['filename'] ) ) {
    $filename = $_POST['filename'];
    $filename_arr = explode( '.', $filename );
    $upload = dirname( dirname( __FILE__ ) ) . '/img/';
    $img_dir = $upload . '/' . $_POST['filename'];

    rotateImage( $img_dir, $_POST['rotate'] );
    foreach( glob( $upload . $filename_arr[0] . '-*' . $filename_arr[1]) as $file ) {
      rotateImage( $file, $_POST['rotate'] );
    }

    echo json_encode( glob( $upload . $filename_arr[0] . '-*' . $filename_arr[1]) );
  }
}

if( $_POST['action'] === 'delete_image' ) {
  echo json_encode( $_POST );
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
