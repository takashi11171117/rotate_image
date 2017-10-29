<rotateImageList>
	<!-- layout -->
  <div class="rotate_image_list_container">
    <rotateImage obs={obs} each="{ value, i in files }" file="{value.url}" filename="{value.filename}" date="{value.date}" imgid="{i}"></rotateImage>
  </div>

	<!-- style -->
	<style type="sass">
    rotateImage
      display: inline-block
      vertical-align: top
      margin: 5px 5px
      width: calc( 50% - 10px )

    .rotate_image_list_container
      margin: -5px
	</style>

	<!-- javascript -->
	<script>
  this.files = {};
  this.on('mount', () => {
    $.ajax({
        type: 'POST',
        url: url,
        data: {
          action : 'images_show',
          post_id: this.opts.post_id,
          tax: this.opts.tax,
        },
        success: ( data ) => {
          data = $.parseJSON(data);
          this.files = data;
          this.update();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert("AJAXが機能していません。");
        }
    });
  })
	</script>
</rotateImageList>
