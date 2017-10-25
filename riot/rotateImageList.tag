<rotateImageList>
	<!-- layout -->
  <div class="rotate_image_list_container">
    <rotateImage obs={obs} each="{ value, i in files }" file={value} imgid={i}></rotateImage>
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
    let url = 'https://localhost/js_test/rotate_image/api/ajax.php';
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: 'get_image_list',
      })
    }).then( response => {
      return response.json()
    }).then( json => {
      this.files = json;
      this.update();
    });
  })
	</script>
</rotateImageList>
