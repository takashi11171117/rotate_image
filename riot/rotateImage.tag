<rotateImage>
	<!-- layout -->
  <div class={ rotate_image_container: true, fade: is_container }>
    <div class="rotate_button">
      <button type="button" name="left" onClick={ rotateLeft }>左に</button>
      <button type="button" name="right" onClick={ rotateRight }>右に</button>
    </div>
    <div class="rotate_image"></div>
    <div class="delete_button">
      <button type="button" name="save" onClick={ saveImage }>保存</button>
      <button type="button" name="delete" onClick={ deleteImage }>削除</button>
    </div>
  </div>

	<!-- style -->
	<style type="sass">
  .rotate_image
    width: 200px

  .rotate_image img
    width: 200%
    height: auto

  div
    transition: all .2s
    opacity: 1

  .fade
    opacity: 0
	</style>

	<!-- javascript -->
	<script>
  this.is_container = false,
  this.count = 0,
  this.rotate = 0,
  this.now_rotate = 0,
  this.width = 0,
  this.height = 0,
  this.rotate_img = document.getElementsByClassName("rotate_image"),
  this.rotate_image_container = document.getElementsByClassName("rotate_image_container"),
  this.img = new Image(),
  this.org_img = new Image();

  const loadimg = ({ src }) => {
      return new Promise((resolve, reject) => {
          let img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = () => {
              resolve(img);
          };
          img.src = src;
      });
  };

  loadimg({
      src: `${this.opts.file}?date=${Date.now()}`,
  }).then((img) => {
      this.img = img,
      this.width = img.width,
      this.height = img.height;
      this.org_img.src = `${this.opts.file}?date=${Date.now()}`;
      this.rotate_img[0].appendChild(img);
  });

  rotateLeft() {
      this.rotate = this.rotate - 90;
      this.now_rotate = this.now_rotate - 90;
      if( this.rotate < 0 ) this.rotate = this.rotate + 360;
      if( this.now_rotate < 0 ) this.now_rotate = this.now_rotate + 360;
      this.img.src = imageResize(this.org_img, "image/jpeg", this.width, this.height, this.rotate);
      this.count++;
  }

  rotateRight() {
      this.rotate = this.rotate + 90;
      this.now_rotate = this.now_rotate + 90;
      if( this.rotate >= 360 ) this.rotate = this.rotate - 360;
      if( this.now_rotate >= 360 ) this.now_rotate = this.now_rotate - 360;
      this.img.src = imageResize(this.org_img, "image/jpeg", this.width, this.height, this.rotate);
      this.count++;
  }

  saveImage() {
    if( this.count == 0 ) {
      return false
    }
    let url = 'http://192.168.33.10/vagrant/js_test/rotate_image/ajax.php'
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file: this.org_img.src,
        rotate: this.now_rotate,
      })
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      count = 0;
      now_rotate = 0;
      console.log(json);
    });
  }

  deleteImage() {
    this.is_container = true;
  }

  const imageResize = (image_src, mime_type, width, height, rotate) => {
      // New Canvas
      let canvas = document.createElement('canvas');
      if(rotate == 90 || rotate == 270) {
          // swap w <==> h
          canvas.width = height;
          canvas.height = width;
      } else {
          canvas.width = width;
          canvas.height = height;
      }
      // Draw (Resize)
      let ctx = canvas.getContext('2d');
      if(rotate && rotate > 0) {
          ctx.rotate(rotate * Math.PI / 180);
          if(rotate == 90)
              ctx.translate(0, -height);
          else if(rotate == 180)
              ctx.translate(-width, -height);
          else if(rotate == 270)
              ctx.translate(-width, 0);
      }
      ctx.drawImage(image_src, 0, 0, width, height);
      // Image Base64
      return canvas.toDataURL(mime_type);
  }
	</script>
</rotateImage>
