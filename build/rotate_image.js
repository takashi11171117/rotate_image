webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
//src: riot/rotateImage.tag
riot.tag2('rotateimage', '<div class="{fade: is_container}" id="rotate_image_container{opts.imgid}"> <div class="rotate_button"> <button type="button" name="left" onclick="{rotateLeft}"><fa icon="undo"></fa></button> <button type="button" name="right" onclick="{rotateRight}"><fa icon="repeat"></fa></button> </div> <div class="{thum: is_thum, rotate_image: true}" id="rotate_image{opts.imgid}" onclick="{selectThum}"> <div class="{hover: is_imageover, over_image: true}" id="over_image{opts.imgid}"></div> </div> <div class="delete_button{opts.imgid} delete_button"> <button type="button" name="save" onclick="{saveImage}"><fa icon="floppy-o"></fa></button> <button type="button" name="delete" onclick="{deleteImage}"><fa icon="trash"></fa></button> </div> </div>', 'rotateimage .button,[data-is="rotateimage"] .button,rotateimage .rotate_button button,[data-is="rotateimage"] .rotate_button button,rotateimage .delete_button button,[data-is="rotateimage"] .delete_button button{ font-size: 16px; padding: 5px; background-color: white; border-radius: 5px; border: 1px solid #000; cursor: pointer; opacity: .5; } rotateimage .button:hover,[data-is="rotateimage"] .button:hover,rotateimage .rotate_button button:hover,[data-is="rotateimage"] .rotate_button button:hover,rotateimage .delete_button button:hover,[data-is="rotateimage"] .delete_button button:hover{ opacity: 1; } rotateimage .rotate_image,[data-is="rotateimage"] .rotate_image{ width: 100%; position: relative; } rotateimage .rotate_image img,[data-is="rotateimage"] .rotate_image img{ width: 100%; height: auto; } rotateimage .rotate_button,[data-is="rotateimage"] .rotate_button{ margin-bottom: 5px; } rotateimage .delete_button,[data-is="rotateimage"] .delete_button{ margin-top: 5px; } rotateimage div,[data-is="rotateimage"] div{ transition: all .2s; opacity: 1; } rotateimage .fade,[data-is="rotateimage"] .fade{ opacity: 0; } rotateimage .over_image,[data-is="rotateimage"] .over_image{ display: none; position: absolute; top: 0; left: calc( 100% + 10px); z-index: 999; } rotateimage .over_image img,[data-is="rotateimage"] .over_image img{ width: 400px; } rotateimage .hover,[data-is="rotateimage"] .hover{ display: block; } rotateimage .thum,[data-is="rotateimage"] .thum{ border: 3px solid #ff0000; box-sizing: border-box; }', '', function (opts) {
  var _this = this;

  this.is_container = false, this.is_imageover = false, this.is_thum = false, this.count = 0, this.rotate = 0, this.now_rotate = 0, this.width = 0, this.height = 0, this.rotate_img = null, this.over_img = null, this.buttons = null, this.img = new Image(), this.org_img = new Image();

  this.loadimg = function (_ref) {
    var src = _ref.src;

    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        resolve(img);
      };
      img.src = src;
    });
  };

  if (this.opts.file != null || this.opts.file != undefined) {
    this.loadimg({
      src: this.opts.file + '?date=' + Date.now()
    }).then(function (img) {
      if (img == new Image()) return;
      _this.img = img, _this.width = img.width, _this.height = img.height;
      _this.org_img.src = _this.opts.file + '?date=' + Date.now();
      _this.rotate_img = document.getElementById('rotate_image' + _this.opts.imgid);
      _this.over_img = document.getElementById('over_image' + _this.opts.imgid);
      _this.buttons = document.querySelectorAll('#rotate_image_container' + _this.opts.imgid + ' button');
      _this.rotate_img.appendChild(img);
      _this.rotate_img.addEventListener('mouseover', function (e) {
        return _this.imageover();
      });
      _this.rotate_img.addEventListener('mouseleave', function (e) {
        return _this.imageout();
      });
      _this.over_img.appendChild(img.cloneNode(true));
    });
  }

  this.imageover = function (e) {
    _this.is_imageover = true;
    _this.update();
  };

  this.imageout = function (e) {
    _this.is_imageover = false;
    _this.update();
  };

  this.selectThum = function () {
    this.mixin('obs').obs.trigger('refresh_postthum', this.opts.imgid);
  }.bind(this);

  this.rotateLeft = function () {
    this.rotate = this.rotate - 90;
    this.now_rotate = this.now_rotate - 90;
    if (this.rotate < 0) this.rotate = this.rotate + 360;
    if (this.now_rotate < 0) this.now_rotate = this.now_rotate + 360;
    this.img.src = imageResize(this.org_img, "image/jpeg", this.width, this.height, this.rotate);
    this.count++;
    console.log(this.rotate, this.now_rotate, this.count);
  }.bind(this);

  this.rotateRight = function () {
    this.rotate = this.rotate + 90;
    this.now_rotate = this.now_rotate + 90;
    if (this.rotate >= 360) this.rotate = this.rotate - 360;
    if (this.now_rotate >= 360) this.now_rotate = this.now_rotate - 360;
    this.img.src = imageResize(this.org_img, "image/jpeg", this.width, this.height, this.rotate);
    this.count++;
  }.bind(this);

  this.overImage = function () {
    this.rotate_img[0].before(this.img);
  }.bind(this);

  this.saveImage = function () {
    var _this2 = this;

    if (this.count == 0) {
      return false;
    }
    for (var _iterator = this.buttons, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var i = _ref2;

      i.disabled = true;
    }
    var url = 'https://localhost/js_test/rotate_image/api/ajax.php';
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: 'rotate',
        file: this.org_img.src,
        rotate: this.now_rotate
      })
    }).then(function (response) {
      return response;
    }).then(function (json) {
      _this2.count = 0;
      _this2.now_rotate = 0;
      for (var _iterator2 = _this2.buttons, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref3 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref3 = _i2.value;
        }

        var i = _ref3;

        i.disabled = false;
      }
    }).catch(function (msg) {
      console.log(msg);
    });
  }.bind(this);

  this.deleteImage = function () {
    this.is_container = true;
  }.bind(this);

  this.mixin('obs').obs.on('refresh_postthum', function (postthum) {
    if (postthum == _this.opts.imgid) {
      _this.is_thum = true;
    } else {
      _this.is_thum = false;
    }
    _this.update();
  });

  var imageResize = function imageResize(image_src, mime_type, width, height, rotate) {

    var canvas = document.createElement('canvas');
    if (rotate == 90 || rotate == 270) {

      canvas.width = height;
      canvas.height = width;
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    var ctx = canvas.getContext('2d');
    if (rotate && rotate > 0) {
      ctx.rotate(rotate * Math.PI / 180);
      if (rotate == 90) ctx.translate(0, -height);else if (rotate == 180) ctx.translate(-width, -height);else if (rotate == 270) ctx.translate(-width, 0);
    }
    ctx.drawImage(image_src, 0, 0, width, height);

    return canvas.toDataURL(mime_type);
  };
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
//src: riot/rotateImageList.tag
riot.tag2('rotateimagelist', '<div class="rotate_image_list_container"> <rotateimage obs="{obs}" each="{value, i in files}" file="{value}" imgid="{i}"></rotateImage> </div>', 'rotateimagelist rotateImage,[data-is="rotateimagelist"] rotateImage{ display: inline-block; vertical-align: top; margin: 5px 5px; width: calc( 50% - 10px); } rotateimagelist .rotate_image_list_container,[data-is="rotateimagelist"] .rotate_image_list_container{ margin: -5px; }', '', function (opts) {
  var _this = this;

  this.files = {};
  this.on('mount', function () {
    var url = 'https://localhost/js_test/rotate_image/api/ajax.php';
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: 'get_image_list'
      })
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      _this.files = json;
      _this.update();
    });
  });
});

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(riot) {

__webpack_require__(2);
__webpack_require__(1);

var obs = riot.observable();

riot.mixin('obs', {
    obs: obs
});

riot.mount('rotateImageList');
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
],[5]);