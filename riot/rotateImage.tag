<rotateImage>
	<!-- layout -->
  <div class={ fade: is_container } id="rotate_image_container{ opts.imgid }">
    <div class="image_date">{opts.date}</div>
    <div class="rotate_button">
      <button type="button" name="left" onClick={ rotateLeft }><fa icon="undo" /></button>
      <button type="button" name="right" onClick={ rotateRight }><fa icon="repeat" /></button>
    </div>
    <div class={ thum: is_thum, rotate_image: true } id="rotate_image{ opts.imgid }" onClick={ selectThum }>
      <div class={ hover: is_imageover, over_image: true } id="over_image{ opts.imgid }"></div>
    </div>
    <div class="delete_button{ opts.imgid } delete_button">
      <button type="button" name="save" onClick={ saveImage }><fa icon="floppy-o" /></button>
      <button type="button" name="delete" onClick={ confirmImage }><fa icon="trash" /></button>
    </div>
  </div>
  <rg-modal modal="{ modal }">削除しますか？</rg-modal>

	<!-- style -->
	<style type="sass">
  .image_date
    margin-bottom: 5px

  .ope_button
    font-size: 16px
    padding: 5px
    background-color: white
    border-radius: 5px
    border: 1px solid #000
    cursor: pointer
    opacity: .5
    &:hover
      opacity: 1

  .rotate_image
    width: 100%
    position: relative
    img
      width: 100%
      height: auto

  .rotate_button
    margin-bottom: 5px
    button
      @extend .ope_button

  .delete_button
    margin-top: 5px
    button
      @extend .ope_button

  div
    transition: all .2s
    opacity: 1

  .fade
    opacity: 0

  .over_image
    display: none
    position: absolute
    top: 0
    left: calc( 100% + 10px )
    z-index: 999
    img
      width: 400px

  .hover
    display: block

  .thum
    border: 3px solid #ff0000
    box-sizing: border-box
	</style>

	<!-- javascript -->
	<script>
  this.is_container = false,
  this.is_imageover = false,
  this.is_thum = false,
  this.count = 0,
  this.rotate = 0,
  this.now_rotate = 0,
  this.width = 0,
  this.height = 0,
  this.rotate_img = null,
  this.over_img = null,
  this.buttons = null,
  this.img = new Image(),
  this.org_img = new Image(),
  this.modal = {
    isvisible: false,
    dismissable: true,
    heading: '確認画面',
    buttons: [{
      text: 'Ok',
      type: 'primary',
      action: () => {
        deleteImage();
      }
    }, {
      text: 'Cancel',
      action: () => {
        this.modal.isvisible = false;
        this.update();
      }
    }]
  };

  this.loadimg = ({ src }) => {
      return new Promise((resolve, reject) => {
          let img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = () => {
            resolve(img);
          };
          img.src = src;
      });
  };

  if( this.opts.file != null || this.opts.file != undefined ) {
    this.loadimg({
        src: `${this.opts.file}?date=${Date.now()}`,
    }).then((img) => {
        if( img ==  new Image() ) return;
        this.img = img,
        this.width = img.width,
        this.height = img.height;
        this.org_img.src = `${this.opts.file}?date=${Date.now()}`;
        this.rotate_img = document.getElementById(`rotate_image${this.opts.imgid}`);
        this.over_img = document.getElementById(`over_image${this.opts.imgid}`);
        this.buttons = document.querySelectorAll(`#rotate_image_container${this.opts.imgid} button`);
        this.rotate_img.appendChild(img);
        this.rotate_img.addEventListener('mouseover', (e) => this.imageover());
        this.rotate_img.addEventListener('mouseleave', (e) => this.imageout());
        this.over_img.appendChild(img.cloneNode(true));
    });
  }

  this.imageover = (e) => {
    this.is_imageover = true;
    this.update();
  }

  this.imageout = (e) => {
    this.is_imageover = false;
    this.update();
  }

  selectThum() {
    this.mixin('obs').obs.trigger('refresh_postthum', this.opts.imgid);
  }

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

  overImage() {
    this.rotate_img[0].before(this.img);
  }

  saveImage() {
    if( this.count == 0 ) {
      return false;
    }
    for( let i of this.buttons ) {
      i.disabled = true;
    }

    $.ajax({
        type: 'POST',
        url: url,
        data: {
          action : 'rotate_image',
          file: this.org_img.src,
          rotate: this.now_rotate,
          filename: this.opts.filename,
        },
        success: ( data ) => {
          data = $.parseJSON(data);
          this.count = 0;
          this.now_rotate = 0;
          for( let i of this.buttons ) {
            i.disabled = false;
          }
        },
        error: ( XMLHttpRequest, textStatus, errorThrown ) => {
          alert("AJAXが機能していません。");
        }
    });
  }

  confirmImage() {
    this.modal.isvisible = true;
    this.update();
  }

  this.mixin('obs').obs.on('refresh_postthum', (postthum) => {
    if( postthum == this.opts.imgid ) {
      this.is_thum = true;
    } else {
      this.is_thum = false;
    }
    this.update();
  })

  const deleteImage = () => {
    $.ajax({
        type: 'POST',
        url: url,
        data: {
          action : 'image_delete',
          att_id : this.opts.imgid,
        },
        success: ( data ) => {
          this.is_container = true;
          this.modal.isvisible = false;
          this.update();
        },
        error: ( XMLHttpRequest, textStatus, errorThrown ) =>{
          alert("AJAXが機能していません。");
        }
    });
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
