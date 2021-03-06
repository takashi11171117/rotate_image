webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
//src: riot/rotateImage.tag
riot.tag2('rotateimage', '<div class="{fade: is_container}" id="rotate_image_container{opts.imgid}"> <div class="image_date">{opts.date}</div> <div class="rotate_button"> <button type="button" name="left" onclick="{rotateLeft}"><fa icon="undo"></fa></button> <button type="button" name="right" onclick="{rotateRight}"><fa icon="repeat"></fa></button> </div> <div class="{thum: is_thum, rotate_image: true}" id="rotate_image{opts.imgid}" onclick="{selectThum}"> <div class="{hover: is_imageover, over_image: true}" id="over_image{opts.imgid}"></div> </div> <div class="delete_button{opts.imgid} delete_button"> <button type="button" name="save" onclick="{saveImage}"><fa icon="floppy-o"></fa></button> <button type="button" name="delete" onclick="{confirmImage}"><fa icon="trash"></fa></button> </div> </div> <rg-modal modal="{modal}">削除しますか？</rg-modal>', 'rotateimage .image_date,[data-is="rotateimage"] .image_date{ margin-bottom: 5px; } rotateimage .ope_button,[data-is="rotateimage"] .ope_button,rotateimage .rotate_button button,[data-is="rotateimage"] .rotate_button button,rotateimage .delete_button button,[data-is="rotateimage"] .delete_button button{ font-size: 16px; padding: 5px; background-color: white; border-radius: 5px; border: 1px solid #000; cursor: pointer; opacity: .5; } rotateimage .ope_button:hover,[data-is="rotateimage"] .ope_button:hover,rotateimage .rotate_button button:hover,[data-is="rotateimage"] .rotate_button button:hover,rotateimage .delete_button button:hover,[data-is="rotateimage"] .delete_button button:hover{ opacity: 1; } rotateimage .rotate_image,[data-is="rotateimage"] .rotate_image{ width: 100%; position: relative; } rotateimage .rotate_image img,[data-is="rotateimage"] .rotate_image img{ width: 100%; height: auto; } rotateimage .rotate_button,[data-is="rotateimage"] .rotate_button{ margin-bottom: 5px; } rotateimage .delete_button,[data-is="rotateimage"] .delete_button{ margin-top: 5px; } rotateimage div,[data-is="rotateimage"] div{ transition: all .2s; opacity: 1; } rotateimage .fade,[data-is="rotateimage"] .fade{ opacity: 0; } rotateimage .over_image,[data-is="rotateimage"] .over_image{ display: none; position: absolute; top: 0; left: calc( 100% + 10px); z-index: 999; } rotateimage .over_image img,[data-is="rotateimage"] .over_image img{ width: 400px; } rotateimage .hover,[data-is="rotateimage"] .hover{ display: block; } rotateimage .thum,[data-is="rotateimage"] .thum{ border: 3px solid #ff0000; box-sizing: border-box; }', '', function (opts) {
  var _this = this;

  this.is_container = false, this.is_imageover = false, this.is_thum = false, this.count = 0, this.rotate = 0, this.now_rotate = 0, this.width = 0, this.height = 0, this.rotate_img = null, this.over_img = null, this.buttons = null, this.img = new Image(), this.org_img = new Image(), this.modal = {
    isvisible: false,
    dismissable: true,
    heading: '確認画面',
    buttons: [{
      text: 'Ok',
      type: 'primary',
      action: function action() {
        deleteImage();
      }
    }, {
      text: 'Cancel',
      action: function action() {
        _this.modal.isvisible = false;
        _this.update();
      }
    }]
  };

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

    $.ajax({
      type: 'POST',
      url: url,
      data: {
        action: 'rotate_image',
        file: this.org_img.src,
        rotate: this.now_rotate,
        filename: this.opts.filename
      },
      success: function success(data) {
        data = $.parseJSON(data);
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
      },
      error: function error(XMLHttpRequest, textStatus, errorThrown) {
        alert("AJAXが機能していません。");
      }
    });
  }.bind(this);

  this.confirmImage = function () {
    this.modal.isvisible = true;
    this.update();
  }.bind(this);

  this.mixin('obs').obs.on('refresh_postthum', function (postthum) {
    if (postthum == _this.opts.imgid) {
      _this.is_thum = true;
    } else {
      _this.is_thum = false;
    }
    _this.update();
  });

  var deleteImage = function deleteImage() {
    $.ajax({
      type: 'POST',
      url: url,
      data: {
        action: 'image_delete',
        att_id: _this.opts.imgid
      },
      success: function success(data) {
        _this.is_container = true;
        _this.modal.isvisible = false;
        _this.update();
      },
      error: function error(XMLHttpRequest, textStatus, errorThrown) {
        alert("AJAXが機能していません。");
      }
    });
  };

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
riot.tag2('rotateimagelist', '<div class="rotate_image_list_container"> <rotateimage obs="{obs}" each="{value, i in files}" file="{value.url}" filename="{value.filename}" date="{value.date}" imgid="{i}"></rotateImage> </div>', 'rotateimagelist rotateImage,[data-is="rotateimagelist"] rotateImage{ display: inline-block; vertical-align: top; margin: 5px 5px; width: calc( 50% - 10px); } rotateimagelist .rotate_image_list_container,[data-is="rotateimagelist"] .rotate_image_list_container{ margin: -5px; }', '', function (opts) {
  var _this = this;

  this.files = {};
  this.on('mount', function () {
    $.ajax({
      type: 'POST',
      url: url,
      data: {
        action: 'images_show',
        post_id: _this.opts.post_id,
        tax: _this.opts.tax
      },
      success: function success(data) {
        data = $.parseJSON(data);
        _this.files = data;
        _this.update();
      },
      error: function error(XMLHttpRequest, textStatus, errorThrown) {
        alert("AJAXが機能していません。");
      }
    });
  });
});

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(riot) {riot.tag2("rg-alerts",'<div class="alerts"> <div each="{opts.alerts}" class="alerts__alert {\'alerts__alert--\' + type}" if="{isvisible}" onclick="{select}"> <button class="button button--close" if="{dismissable != false}" onclick="{parent.dismiss}"> &times; </button> {text} </div> </div>',"","",function(t){var e=this;this.on("update",function(){t.alerts&&t.alerts.forEach(function(t){"undefined"==typeof t.isvisible&&(t.isvisible=!0),t.timeout&&(t.startTimer=function(){t.timer=setTimeout(function(){e.dismiss({item:t})},t.timeout)},t.startTimer())})}),this.dismiss=function(t){var a=t.item;a.isvisible=!1,clearTimeout(a.timer),e.trigger("dismiss",a),e.update()},this.select=function(t){var a=t.item;a.onclick&&a.onclick(a),e.trigger("select",a)}}),riot.tag2("rg-bubble",'<div class="context"> <div class="bubble bubble--top" if="{isvisible}"> {opts.bubble.text} </div> <div class="content" onmouseover="{showBubble}" onmouseout="{hideBubble}" onclick="{toggleBubble}"> <yield></yield> </div> </div>','rg-bubble .context,[riot-tag="rg-bubble"] .context,[data-is="rg-bubble"] .context,rg-bubble .content,[riot-tag="rg-bubble"] .content,[data-is="rg-bubble"] .content{ display: inline-block; position: relative; } rg-bubble .bubble,[riot-tag="rg-bubble"] .bubble,[data-is="rg-bubble"] .bubble{ position: absolute; top: -70px; left: 50%; transform: translate3d(-50%, 0, 0); }',"",function(t){var e=this;this.showBubble=function(){clearTimeout(e._timer),e.isvisible=!0},this.hideBubble=function(){e._timer=setTimeout(function(){e.isvisible=!1,e.update()},1e3)},this.toggleBubble=function(){e.isvisible=!e.isvisible}}),riot.tag2("rg-chart","<canvas></canvas>",'rg-chart,[riot-tag="rg-chart"],[data-is="rg-chart"]{ display: inline-block; width: 100%; }',"",function(t){var e=this;Chart.defaults.global.responsive=!0,this.on("mount",function(){a()}),this.on("loaded",function(t){e.on("unmount",function(){t.destroy()})});var a=function(){t.chart||(t.chart={});var a=e.root.querySelector("canvas").getContext("2d"),i=new Chart(a),o=null;switch(t.chart.type){case"line":o=i.Line(t.chart.data,t.chart.options);break;case"radar":o=i.Radar(t.chart.data,t.chart.options);break;case"polar":o=i.PolarArea(t.chart.data,t.chart.options);break;case"pie":o=i.Pie(t.chart.data,t.chart.options);break;case"doughnut":o=i.Doughnut(t.chart.data,t.chart.options);break;default:o=i.Bar(t.chart.data,t.chart.options)}e.trigger("loaded",o)}}),riot.tag2("rg-code",'<div class="editor"></div>','rg-code .editor,[riot-tag="rg-code"] .editor,[data-is="rg-code"] .editor{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; }',"",function(t){var e=this;t.editor||(t.editor={code:""});var a=void 0,i=function(){a.setTheme("ace/theme/"+(t.editor.theme||"monokai")),a.getSession().setMode("ace/mode/"+(t.editor.mode||"html")),a.getSession().setTabSize(t.editor.tabsize||2),a.getSession().setUseSoftTabs(t.editor.softtabs),a.getSession().setUseWrapMode(t.editor.wordwrap),a.setReadOnly(t.editor.readonly)};this.on("mount",function(){if(a=ace.edit(e.root.querySelector(".editor")),a.$blockScrolling=1/0,e.on("update",function(){i(),t.editor.code!=a.getValue()&&a.setValue(t.editor.code,1)}),t.url){var o=new XMLHttpRequest;o.onload=function(a){t.editor.code=a,e.update()},o.open("get",t.url,!0),o.send()}a.setValue(t.editor.code,1),a.getSession().on("change",function(i){t.editor.code=a.getValue(),e.trigger("onchange",a.getValue())}),i(),e.update()})}),riot.tag2("rg-credit-card-number",'<input type="text" name="cardnumber" class="field card-no {icon} {\'field--success\': opts.card.valid}" oninput="{validate}" placeholder="{opts.card.placeholder}">','rg-credit-card-number .card-no,[riot-tag="rg-credit-card-number"] .card-no,[data-is="rg-credit-card-number"] .card-no{ padding-right: 60px; background-repeat: no-repeat; background-position: right center; background-size: 60px; } rg-credit-card-number .amex,[riot-tag="rg-credit-card-number"] .amex,[data-is="rg-credit-card-number"] .amex{ background-image: url(img/amex.png); } rg-credit-card-number .diners_club,[riot-tag="rg-credit-card-number"] .diners_club,[data-is="rg-credit-card-number"] .diners_club{ background-image: url(img/diners_club.png); } rg-credit-card-number .discover,[riot-tag="rg-credit-card-number"] .discover,[data-is="rg-credit-card-number"] .discover{ background-image: url(img/discover.png); } rg-credit-card-number .jcb,[riot-tag="rg-credit-card-number"] .jcb,[data-is="rg-credit-card-number"] .jcb{ background-image: url(img/jcb.png); } rg-credit-card-number .mastercard,[riot-tag="rg-credit-card-number"] .mastercard,[data-is="rg-credit-card-number"] .mastercard{ background-image: url(img/mastercard.png); } rg-credit-card-number .visa,[riot-tag="rg-credit-card-number"] .visa,[data-is="rg-credit-card-number"] .visa{ background-image: url(img/visa.png); }',"",function(t){function e(t){var e,a,i,o,n,r,s,d,l,c,g,u,p=[].indexOf||function(t){for(var e=0,a=this.length;a>e;e++)if(e in this&&this[e]===t)return e;return-1};i=[{name:"amex",icon:"images/amex.png",pattern:/^3[47]/,valid_length:[15]},{name:"diners_club",icon:"images/diners_club.png",pattern:/^30[0-5]/,valid_length:[14]},{name:"diners_club",icon:"images/diners_club.png",pattern:/^36/,valid_length:[14]},{name:"jcb",icon:"images/jcb.png",pattern:/^35(2[89]|[3-8][0-9])/,valid_length:[16]},{name:"laser",pattern:/^(6304|670[69]|6771)/,valid_length:[16,17,18,19]},{name:"visa_electron",pattern:/^(4026|417500|4508|4844|491(3|7))/,valid_length:[16]},{name:"visa",icon:"images/visa.png",pattern:/^4/,valid_length:[16]},{name:"mastercard",icon:"images/mastercard.png",pattern:/^5[1-5]/,valid_length:[16]},{name:"maestro",pattern:/^(5018|5020|5038|6304|6759|676[1-3])/,valid_length:[12,13,14,15,16,17,18,19]},{name:"discover",icon:"images/discover.png",pattern:/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,valid_length:[16]}];var m={};for(null==m.accept&&(m.accept=function(){var t,a,o;for(o=[],t=0,a=i.length;a>t;t++)e=i[t],o.push(e.name);return o}()),u=m.accept,c=0,g=u.length;g>c;c++)if(a=u[c],p.call(function(){var t,a,o;for(o=[],t=0,a=i.length;a>t;t++)e=i[t],o.push(e.name);return o}(),a)<0)throw"Credit card type '"+a+"' is not supported";return o=function(t){var o,n,r;for(r=function(){var t,a,o,n;for(n=[],t=0,a=i.length;a>t;t++)e=i[t],o=e.name,p.call(m.accept,o)>=0&&n.push(e);return n}(),o=0,n=r.length;n>o;o++)if(a=r[o],t.match(a.pattern))return a;return null},r=function(t){var e,a,i,o,n,r;for(i=0,r=t.split("").reverse(),a=o=0,n=r.length;n>o;a=++o)e=r[a],e=+e,a%2?(e*=2,i+=10>e?e:e-9):i+=e;return i%10===0},n=function(t,e){var a;return a=t.length,p.call(e.valid_length,a)>=0},l=function(t){return function(t){var e,i;return a=o(t),i=!1,e=!1,null!=a&&(i=r(t),e=n(t,a)),{card_type:a,valid:i&&e,luhn_valid:i,length_valid:e}}}(this),s=function(t){return t.replace(/[ -]/g,"")},(d=function(e){return function(){return l(s(t))}}(this))(t)}var a=this;t.card||(t.card={cardnumber:""}),this.on("update",function(){a.cardnumber.value!=t.card.cardnumber&&(a.cardnumber.value=t.card.cardnumber),a.validate()}),this.validate=function(){t.card.cardnumber=a.cardnumber.value;var i=e(t.card.cardnumber);t.card.valid=i.valid,a.icon=t.card.valid?i.card_type.name:""}}),riot.tag2("rg-date",'<div class="container"> <input type="text" class="field" onclick="{open}" value="{opts.date.date.format(format)}" readonly> <div class="calendar calendar--high" if="{opts.date.isvisible}"> <button class="calendar__control" __disabled="{opts.date.min.isSame(opts.date.date, \'year\')}" onclick="{prevYear}">‹</button> <div class="calendar__header">{opts.date.date.format(yearFormat)}</div> <button class="calendar__control" __disabled="{opts.date.max.isSame(opts.date.date, \'year\')}" onclick="{nextYear}">›</button> <button class="calendar__control" __disabled="{opts.date.min.isSame(opts.date.date, \'month\')}" onclick="{prevMonth}">‹</button> <div class="calendar__header">{opts.date.date.format(monthFormat)}</div> <button class="calendar__control" __disabled="{opts.date.max.isSame(opts.date.date, \'month\')}" onclick="{nextMonth}">›</button> <div class="calendar__day">Mo</div> <div class="calendar__day">Tu</div> <div class="calendar__day">We</div> <div class="calendar__day">Th</div> <div class="calendar__day">Fr</div> <div class="calendar__day">Sa</div> <div class="calendar__day">Su</div> <button class="calendar__date {\'calendar__date--selected\': day.selected, \'calendar__date--today\': day.today}" __disabled="{day.disabled}" each="{day in startBuffer}" onclick="{select}">{day.date.format(dayFormat)}</button> <button class="calendar__date calendar__date--in-month {\'calendar__date--selected\': day.selected, \'calendar__date--today\': day.today}" __disabled="{day.disabled}" each="{day in days}" onclick="{select}">{day.date.format(dayFormat)}</button> <button class="calendar__date {\'calendar__date--selected\': day.selected, \'calendar__date--today\': day.today}" __disabled="{day.disabled}" each="{day in endBuffer}" onclick="{select}">{day.date.format(dayFormat)}</button> <button class="button button--block button--primary" __disabled="{opts.date.min.isAfter(moment(), \'day\') || opts.date.max.isBefore(moment(), \'day\')}" onclick="{setToday}">Today</button> </div> </div>','rg-date .container,[riot-tag="rg-date"] .container,[data-is="rg-date"] .container{ position: relative; display: inline-block; cursor: pointer; } rg-date .calendar,[riot-tag="rg-date"] .calendar,[data-is="rg-date"] .calendar{ position: absolute; min-width: 300px; margin-top: .5em; left: 0; }',"",function(t){function e(){var t=window,e=document,a=e.documentElement,i=e.getElementsByTagName("body")[0],o=t.innerWidth||a.clientWidth||i.clientWidth,n=t.innerHeight||a.clientHeight||i.clientHeight;return{width:o,height:n}}var a=this,i=function(t){return moment.isMoment(t)||(t=moment(t)),t.isValid()?t:moment()},o=function(t){a.root.contains(t.target)||a.close(),a.update()},n=function(e){var a=e||moment();return{date:a,selected:t.date.date.isSame(e,"day"),today:moment().isSame(e,"day"),disabled:t.date.min&&t.date.min.isAfter(e)||t.date.max&&t.date.max.isBefore(e)}},r=function(){a.format="LL",a.yearFormat="YYYY",a.monthFormat="MMMM",a.dayFormat="DD",a.days=[],a.startBuffer=[],a.endBuffer=[];for(var e=moment(t.date.date).startOf("month"),i=moment(t.date.date).daysInMonth(),o=moment(t.date.date).endOf("month"),r=e.isoWeekday()-1;r>0;r-=1){var s=moment(e).subtract(r,"days");a.startBuffer.push(n(s))}for(var r=0;i>r;r++){var d=moment(e).add(r,"days");a.days.push(n(d))}for(var r=o.isoWeekday()+1;7>=r;r++){var s=moment(o).add(r-o.isoWeekday(),"days");a.endBuffer.push(n(s))}};this.on("mount",function(){t.date||(t.date={date:moment()}),t.date.date||(t.date.date=moment()),t.date.date=i(t.date.date),t.date.min&&(t.date.min=i(t.date.min),t.date.min.isAfter(moment(),"day")&&(t.date.date=moment(t.date.min))),t.date.max&&(t.date.max=i(t.date.max),t.date.max.isBefore(moment(),"day")&&(t.date.date=moment(t.date.max))),a.on("update",function(){t.date.date=i(t.date.date),r(),s()}),document.addEventListener("click",o),a.update()}),this.on("unmount",function(){document.removeEventListener("click",o)}),this.open=function(){t.date.isvisible=!0,a.trigger("open")},this.close=function(){t.date.isvisible&&(t.date.isvisible=!1,a.trigger("close"))},this.select=function(e){t.date.date=e.item.day.date,a.trigger("select",t.date.date)},this.setToday=function(){t.date.date=moment(),a.trigger("select",t.date.date)},this.prevYear=function(){t.date.date=t.date.date.subtract(1,"year")},this.nextYear=function(){t.date.date=t.date.date.add(1,"year")},this.prevMonth=function(){t.date.date=t.date.date.subtract(1,"month")},this.nextMonth=function(){t.date.date=t.date.date.add(1,"month")};var s=function(){var i=e(),o=a.root.querySelector(".calendar");if(o){if(!t.date.isvisible)return o.style.marginTop="",void(o.style.marginLeft="");var n=o.getBoundingClientRect();i.width<n.left+n.width&&(o.style.marginLeft=i.width-(n.left+n.width)-20+"px"),n.left<0&&(o.style.marginLeft="20px"),i.height<n.top+n.height&&(o.style.marginTop=i.height-(n.top+n.height)-20+"px")}}}),riot.tag2("rg-drawer",'<div class="overlay" if="{opts.drawer.isvisible}" onclick="{close}"></div> <div class="drawer {\'drawer--\' + opts.drawer.position || \'drawer--bottom\'} {\'drawer--visible\': opts.drawer.isvisible}"> <h4 class="heading heading--xsmall">{opts.drawer.header}</h4> <ul class="menu"> <li class="menu__item {\'menu__item--active\': active}" each="{opts.drawer.items}" onclick="{parent.select}"> {text} </li> </ul> <div class="drawer__body"> <yield></yield> </div> </div>',"","",function(t){var e=this;this.on("mount",function(){t.drawer||(t.drawer={})}),this.close=function(){t.drawer.isvisible=!1,e.trigger("close")},this.select=function(a){t.drawer.items.forEach(function(t){return t.active=!1}),a.item.active=!0,e.trigger("select",a.item)}}),riot.tag2("rg-ga","","","",function(t){!function(t,e,a,i,o,n,r){t.GoogleAnalyticsObject=o,t[o]=t[o]||function(){(t[o].q=t[o].q||[]).push(arguments)},t[o].l=1*new Date,n=e.createElement(a),r=e.getElementsByTagName(a)[0],n.async=1,n.src=i,r.parentNode.insertBefore(n,r)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create",t.property,"auto"),ga("send","pageview")}),riot.tag2("rg-iframify",'<div class="iframify"> <div class="frame"> <yield></yield> </div> </div>','rg-iframify .iframify,[riot-tag="rg-iframify"] .iframify,[data-is="rg-iframify"] .iframify{ margin: 0; padding: 0; } rg-iframify iframe,[riot-tag="rg-iframify"] iframe,[data-is="rg-iframify"] iframe{ position: relative; width: 100%; border: 0; }',"",function(t){var e=this;this.on("mount",function(){iframify(e.root.querySelector(".frame"),e.opts)})}),riot.tag2("rg-include","<div> {responseText} </div>","","",function(t){var e=this,a=function(){var a=new XMLHttpRequest;a.onload=function(i){t.include.unsafe?e.root.innerHTML=a.responseText:e.responseText=a.responseText,e.update(),e.trigger("loaded")},a.open("get",t.include.url,!0),a.send(),e.trigger("loading")};this.on("mount",function(){a()})}),riot.tag2("rg-map",'<div class="rg-map"></div>','rg-map .rg-map,[riot-tag="rg-map"] .rg-map,[data-is="rg-map"] .rg-map{ margin: 0; padding: 0; width: 100%; height: 100%; } rg-map .rg-map img,[riot-tag="rg-map"] .rg-map img,[data-is="rg-map"] .rg-map img{ max-width: inherit; }',"",function(t){var e=this;window.rg=window.rg||{},window.rg.gmap=riot.observable({initialize:function(){window.rg.gmap.trigger("initialize")}}),this.on("mount",function(){if(t.map||(t.map={center:{lat:53.806,lng:-1.535},zoom:7}),rg.gmap.on("initialize",function(){t.map.mapObj=new google.maps.Map(e.root.querySelector(".rg-map"),t.map),e.trigger("loaded",t.map.mapObj)}),!document.getElementById("gmap_script")){var a=document.createElement("script");a.setAttribute("id","gmap_script"),a.type="text/javascript",a.src="https://maps.googleapis.com/maps/api/js?callback=window.rg.gmap.initialize",document.body.appendChild(a)}})}),riot.tag2("rg-markdown","","","",function(t){var e=this;commonmark&&(this.reader=new commonmark.Parser,this.writer=new commonmark.HtmlRenderer),this.on("update",function(){t.markdown||(t.markdown={}),t.markdown.content?e.root.innerHTML=e.writer.render(e.reader.parse(t.markdown.content)):t.markdown.url&&!function(){var a=new XMLHttpRequest;a.onload=function(t){e.root.innerHTML=e.writer.render(e.reader.parse(a.responseText)),e.trigger("loaded")},a.open("get",t.markdown.url,!0),a.send(),e.trigger("loading")}()})}),riot.tag2("rg-modal",'<div class="overlay {overlay--dismissable: opts.modal.dismissable}" if="{opts.modal.isvisible}" onclick="{close}"></div> <div class="modal {modal--ghost: opts.modal.ghost}" if="{opts.modal.isvisible}"> <header class="modal__header"> <button if="{opts.modal.dismissable}" type="button" class="button button--close" onclick="{close}"> &times; </button> <h3 class="heading heading--small">{opts.modal.heading}</h3> </header> <div class="modal__body"> <yield></yield> </div> <footer class="modal__footer {\'modal__footer--block\': !opts.modal.ghost}"> <button each="{opts.modal.buttons}" type="button" class="button {\'button--\' + type}" onclick="{action}" riot-style="{style}"> {text} </button> </footer> </div>','rg-modal .modal--ghost .modal__footer .button,[riot-tag="rg-modal"] .modal--ghost .modal__footer .button,[data-is="rg-modal"] .modal--ghost .modal__footer .button{ margin: 0 .5em 0 0; }',"",function(t){var e=this;this.on("mount",function(){t.modal||(t.modal={})}),this.close=function(){t.modal.dismissable&&(t.modal.isvisible=!1,e.trigger("close"))}}),riot.tag2("rg-pagination",'<div class="pagination"> <div class="pagination__controls pagination__controls--backward"> <button class="pagination__control" __disabled="{opts.pagination.page <= 1}" onclick="{first}">«</button> <button class="pagination__control" __disabled="{opts.pagination.page <= 1}" onclick="{back}">‹</button> </div> <div class="pagination__controls"> <span class="pagination__ellipsis" if="{opts.pagination.page > 2}">&hellip;</span> <button class="pagination__page" onclick="{back}" if="{opts.pagination.page > 1}">{opts.pagination.page - 1}</button> <button class="pagination__page pagination__page--current">{opts.pagination.page}</button> <button class="pagination__page" onclick="{forward}" if="{opts.pagination.page < opts.pagination.pages}">{opts.pagination.page + 1}</button> <span class="pagination__ellipsis" if="{opts.pagination.page < opts.pagination.pages - 1}">&hellip;</span> </div> <div class="pagination__controls pagination__controls--forward"> <button class="pagination__control" __disabled="{opts.pagination.page >= opts.pagination.pages}" onclick="{forward}">›</button> <button class="pagination__control" __disabled="{opts.pagination.page >= opts.pagination.pages}" onclick="{last}">»</button> </div> </div>',"","",function(t){var e=this;this.on("update",function(){t.pagination||(t.pagination={pages:1,page:1})}),this.on("page",function(){for(var t=e.root.querySelectorAll("button"),a=0;a<t.length;a++)t[a].blur()}),this.forward=function(){t.pagination.page++,e.trigger("page",t.pagination.page)},this.back=function(){t.pagination.page--,e.trigger("page",t.pagination.page)},this.first=function(){t.pagination.page=1,e.trigger("page",t.pagination.page)},this.last=function(){t.pagination.page=t.pagination.pages,e.trigger("page",t.pagination.page)}}),riot.tag2("rg-phone-sim",'<div class="emulator"> <iframe class="screen" riot-src="{opts.phonesim.url}"></iframe> </div>','rg-phone-sim .emulator,[riot-tag="rg-phone-sim"] .emulator,[data-is="rg-phone-sim"] .emulator{ position: relative; width: 365px; height: 792px; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW0AAAMYCAMAAAA3r0ZLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRFMDk6+vr6KTM0lJucMz4/PklKJS8wLTg5Qk1OxsjILzo7gomJ2NvbdH5/ho2O9fb2KzY3ztHRPEdIOkVGZWxtjJSVOEJDkpeYWGRluL2+KTQ1vcHBoaWlPUZHcnp6nKKjOkRF1NfXqa2tp62tZnBxanV2VmFiZ29wVl1eaXJzbXR04uTktbq7QElK1tnZipKTi5CRTlZXpKioo6mqXmlqUVlaOEFCSVFSUFxdISssT1tcTlpbJC4vIiwtTVlaJjAxIy0uTFhZS1dYJzEyKDIzSlZXPUhJOURFO0ZHSVVWKzU2P0pLKjQ1OENEND0+QEtMLDY3SFRVN0JDQ05PLTc4ND9ANUBBQUxNNkFCR1NUMTo7RE9QLjg5N0BBR1JTRlJTLzk6RVFSMjs8RVBRRlFSNj9AMzw9SFNUMj0+IissMTs8MDo7SVRVRFBRMDs8MTw9IiwsMz0+Mjw9SlVWQ09QLjk6NT4/S1ZXND4/JC4uQU1OIy0tQk5PTFdYTVhZQExNTllaJS8vJzIyP0tMLzg5LDc4KDMzNT9AKjU1N0FCNkBBJjAwIywtMDs7Mj09NkFBJjExLjk5LDc3N0JCNUBAKjU2MTw8LDU2Ljc4OUNEKDEyQU1NPEhIPEhJO0dHOkZGND8/Qk5ORFBQQ09PLTY3OUREPkpKPkpLPUlJT1pbP0tLJTAwPUlKJzAxKjM07u/vKTIzsbW2YGprtLm50tXWPkhJo6endn+A3d/f6uvreoOEg4yN2tvc/Pz8n6am8/T0VFtcm6CgJS4v4OLi5ufnYGdncnt8dHp7gYaHJC0uu8DAjJGRQkxNxMfHKzQ1YGtsS1NUaXN0bnh5yMzMyszMy83Oy8/PdoCAKDIy7O3tT1dYuLu70NTUbXd46Onq6erreoCA2dzc8PHx8vPz5OXlnaSkn6Wmqq6ucHZ2t7y8o6eoeoSEkJaWm5+gW2ZnZG5vqa+wOEFB09bWtru7qrCwcXd4t7u83eDgzM7O7/DwNT4+7e7uwMPDwcPEeH5/////70wnUQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAA+NSURBVHja7N13nBTlGcDxEQI5AmJQBAkcnqhEDIhoWMt5iogmQbOaYNrqYrJh16gplmTVkILJpYCmF+DSE1JIcjRR7L333ntPYjQxvTl55tnr7N7t7uw+vDP3+/0x3G3hs5+vr++8M7s7eH75Xb5x+rOjN017aeq+tO++U1+atmn0s9M3Xl6BoFfm466ZOPROhIt259CJ19RS++7LdgW133a97O7aaI/a+VE0y+jRnUeF1p6wqfvvaz6+YVjT0jMyJ3rkeSdmzljaNKzh+OZuoE0TQmmvv67zLzrwmMY8wkXLNx5zYCfTdeur1p6wdeegblgKar8tbegc4lv/rirtjTMLT99/UVMKzgFLNS3avwA2c2Pl2n8tPHV1QxLJMks2rC6g/alC7ScvKozrhhyIFZRrKIzvi56sRHt94b/RIsZ1xeN7UYFuffna4/UJB68Er4rGHax648vUfmqkPnxBBrmqyixQv5FPlaP9Dz2eWdIEW9U1LdFjnQsG1n5ETz4dyowdavY+VE9XPTKQ9phddPfICjvk6lt3lruM6V97j132l26BK3S3BJAv79Gf9jN3BY85HKsadHhAedebSmtf+ofgEcOQqknDAsyLLi2pPTq4/0icatSRAefoUto7Bvc2oFSzGgLQHYtr3xTct5DVSA1XJgsD0puKaa99s9wzlwPImh5WzhXTl/5TRHt7uaN5GUI1bVmzqL64ufZfgkF/GD417rCA9e99tf8VzCPHoVPzjhPXaVv10d5bblzCyZE6nDIJ5pKde2u/Egz487Cp1zHlHr20h8otp50ETT2WgaeL7dCe2vcF/uOQqUsrA9z7emgHQ3thdEZLLpeL0kHYwq7BrdqjAv2ofEAnlU0EZaPjvTTgHdWlvXeEhnYu0VkuUoN7707tbW6X35oiciyc6C4yZxmaxPf2bTq0z5VfTo/IC8/20M5GZnAHy5JzO7Tvj85bCKlEzyIzdQdvLNxf0L4wmMQjMgnmemlHZubOBcQXqvb0CO0jk720o3OmIdhPTlft4FTrth5ju55tK8bbq/YG+emUiLzqTC/t6Lz1cYoYbwi0r47QisTz0j2w0xE6ngxWJVeLdrD+WxCZVx3J9ba0QNeAnj9T/twuOi87GcF9pLSdKM8U7Q2rV6+O0jcQMoXJJB2t96tzorzB99Y2NzfPjdQL9zLJZDJynw2YK85rvZ1ku9Cjuq+4xXknb4Js+XxU/WsQ5wnec7LlDcn6d544P+ddLFu+zlT/Vorzxd5k2fIJqfq3TJwney/Lls+RGBwniPPL3g6y5aOWBstWcd7BmypbLjhS/1LiPNWTTTMWBik02mijTWijTWijjTbFVTuZTqSTRW8OUzqJdpGyxT89mU2ELYv25kO4+LvnyUT4kmj3LV38YzjpGmin3dReIm2pF9BlU+LmMDmnrdBbUntQje0trj2o5m2FPlBiTWKQQm9R7cG03nZAexCFNtpoE9poE9poo01oo01oo01oo4021VT7MxIUBik02mijTeG1D5agMEih0UYbbUIbbUIbbbQJbbQJbbQJbbTRplppf1qCwiCFRhtttCm89lwJCoMUGm200Sa00Sa00Uab0Eab0Eab0EY73tqnS1AYpNBoo402hdc+VILCIIVGG220CW20CW200Sa00Sa00aYC9GkSFAYpNNpoo01oR0v7bRIUBik02mijTWijTWijjTahjTah7bL2hyUoDFJotNFGm9BGm0ppv0OCwiCFRhtttAlttAlttNEmtOOhfbwEhUEKjTbaaBPaaBPaLmi/T4LCIIVGG220CW20CW200ab6aS+UoDBIodFGG21CG21C2wXt4yQoDFJotNFGm9BGm9BGe7BpL5KgMEih0UYbbUIbbULbBe0PSFAYpNBoo402oY02oY32YNP+oASFQQqNNtpoE9poE9poDzbtj0hQGKTQaKONNqGNNpXS/qkEhUEKfYwEhUEKjTbaaBPaaBPaaA827Y9LUBik0GijjTahHS3tn0lQGKTQCyQoDFJotNFGm9BGm9BGG22qn/anJCgMUmi00Uabwmv/RILCIIVukKAwSKHRRhttQhttQhtttKl+2p+UoDBIodFGG20Kr/09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\'); background-repeat: no-repeat; background-position: center; background-size: cover; } rg-phone-sim .screen,[riot-tag="rg-phone-sim"] .screen,[data-is="rg-phone-sim"] .screen{ position: absolute; top: 105px; left: 22px; background-color: white; width: 320px; height: 568px; border: 0; }',"",function(t){}),riot.tag2("rg-placeholdit",'<img riot-src="https://placeholdit.imgix.net/~text?bg={opts.placeholdit.background}&txtclr={opts.placeholdit.color}&txt={opts.placeholdit.text}&txtsize={opts.placeholdit.textsize}&w={opts.placeholdit.width}&h={opts.placeholdit.height}&fm={opts.placeholdit.format}">',"","",function(t){this.on("update",function(){t.placeholdit||(t.placeholdit={}),t.placeholdit.width=t.placeholdit.width||450,t.placeholdit.height=t.placeholdit.height||250,t.placeholdit.background=t.placeholdit.background||"000",t.placeholdit.color=t.placeholdit.color||"fff",t.placeholdit.text=t.placeholdit.text||t.placeholdit.width+" x "+t.placeholdit.height,t.placeholdit.textsize=t.placeholdit.textsize||30,t.placeholdit.format=t.placeholdit.format||"png"})}),riot.tag2("rg-raw","<span></span>","","",function(t){this.on("mount update",function(){this.root.innerHTML=t.content||""})}),riot.tag2("rg-select",'<input type="{opts.select.filter ? \'search\' : \'text\'}" name="selectfield" class="field" placeholder="{opts.select.placeholder}" onkeydown="{navigate}" oninput="{filterOptions}" onfocus="{open}" __readonly="{!opts.select.filter}"> <ul class="menu menu--high" if="{opts.select.isvisible}"> <li each="{options}" no-reorder onclick="{parent.select}" class="menu__item {\'menu__item--active\': selected, \'menu__item--disabled\': disabled, \'menu__item--hover\': active}"> {text} </li> </ul>','rg-select .menu,[riot-tag="rg-select"] .menu,[data-is="rg-select"] .menu{ position: absolute; }',"",function(t){function e(){var t=window,e=document,a=e.documentElement,i=e.getElementsByTagName("body")[0],o=t.innerWidth||a.clientWidth||i.clientWidth,n=t.innerHeight||a.clientHeight||i.clientHeight;return{width:o,height:n}}var a=this;t.select||(t.select={options:[]});var i=function(t){a.root.contains(t.target)||a.close(),a.update()},o=function(){for(var e=0;e<t.select.options.length;e++){var i=t.select.options[e];if(i.selected){a.selectfield.value=i.text;break}}};this.filterOptions=function(){a.options=t.select.options,t.select.filter&&(a.options=a.options.filter(function(e){var i=e[t.select.filter];return i&&i.toLowerCase().indexOf(a.selectfield.value.toLowerCase())>-1})),a.trigger("filter",a.selectfield.value)};var n=function(){var i=e(),o=a.root.querySelector(".menu");if(o){if(!t.select.isvisible)return o.style.marginTop="",void(o.style.marginLeft="");var n=o.getBoundingClientRect();i.width<n.left+n.width&&(o.style.marginLeft=i.width-(n.left+n.width)-20+"px"),n.left<0&&(o.style.marginLeft="20px"),i.height<n.top+n.height&&(o.style.marginTop=i.height-(n.top+n.height)-20+"px")}};this.navigate=function(e){if([13,38,40].indexOf(e.keyCode)>-1&&!t.select.isvisible)return e.preventDefault(),a.open(),!0;var i=a.options.length;if(i>0&&[13,38,40].indexOf(e.keyCode)>-1){e.preventDefault();for(var o=null,n=0;i>n;n++){var r=a.options[n];if(r.active){o=n;break}}null!=o&&(a.options[o].active=!1),38==e.keyCode?null==o||0==o?a.options[i-1].active=!0:a.options[o-1].active=!0:40==e.keyCode?null==o||o==i-1?a.options[0].active=!0:a.options[o+1].active=!0:13==e.keyCode&&null!=o&&a.select({item:a.options[o]})}return!0},this.open=function(){t.select.isvisible=!0,a.trigger("open")},this.close=function(){t.select.isvisible&&(t.select.isvisible=!1,a.trigger("close"))},this.select=function(e){t.select.options.forEach(function(t){return t.selected=!1}),e.item.selected=!0,o(),a.filterOptions(),t.select.isvisible=!1,a.trigger("select",e.item)},this.on("mount",function(){o(),a.filterOptions(),document.addEventListener("click",i),a.update()}),this.on("update",function(){t.select.filter||o(),n()}),this.on("unmount",function(){document.removeEventListener("click",i)})}),riot.tag2("rg-tabs",'<div class="tabs {\'tabs--\' + opts.tabs.type}"> <div class="tabs__headings"> <div each="{opts.tabs.tabs}" class="tab-heading {\'tab-heading--active\': active, \'tab-heading--disabled\': disabled}" onclick="{parent.open}"> {heading} </div> </div> <div each="{opts.tabs.tabs}" class="tabs__tab {\'tabs__tab--active\': active}"> <div if="{text}"> {text} </div> <div if="{include}"> {include.responseText} </div> </div> </div>',"","",function(t){var e=this,a=function(t){var a=new XMLHttpRequest;a.onload=function(i){var o=e.root.querySelector(".tabs__tab--active");o&&(o.innerHTML=a.responseText),e.trigger("loaded",t)},a.open("get",t.include,!0),a.send(),e.trigger("loading",t)};this.open=function(a){var i=a.item;i.disabled||i.active||(t.tabs.tabs.forEach(function(t){t.active=!1}),e.trigger("open",i),i.active=!0)},this.on("update",function(){t.tabs||(t.tabs={}),Array.isArray(t.tabs.tabs)&&t.tabs.tabs.forEach(function(t){!t.disabled&&t.active&&t.include&&a(t)})})}),riot.tag2("rg-tags",'<div class="tags"> <span class="tags__container"> <button each="{opts.tags.tags}" onclick="{removeTag}" type="button" class="button button--primary tag"> {text} <span class="tag__close">×</span> </button> </span> <div class="tags__field-container"> <input type="{opts.tags.filter ? \'search\' : \'text\'}" name="selectfield" class="field" placeholder="{opts.tags.placeholder}" onkeydown="{navigate}" oninput="{filterOptions}" onfocus="{open}" __readonly="{!opts.tags.filter}"> <ul class="menu menu--high" if="{opts.tags.isvisible}"> <li each="{options}" no-reorder onclick="{parent.select}" class="menu__item {\'menu__item--active\': selected, \'menu__item--disabled\': disabled, \'menu__item--hover\': active}"> {text} </li> </ul> </div> </div>','rg-tags .menu,[riot-tag="rg-tags"] .menu,[data-is="rg-tags"] .menu{ position: absolute; }',"",function(t){function e(){var t=window,e=document,a=e.documentElement,i=e.getElementsByTagName("body")[0],o=t.innerWidth||a.clientWidth||i.clientWidth,n=t.innerHeight||a.clientHeight||i.clientHeight;return{width:o,height:n}}var a=this;t.tags||(t.tags={options:[],tags:[]}),t.tags.options||(t.tags.options=[]),t.tags.tags||(t.tags.tags=[]);var i=function(t){a.root.contains(t.target)||a.close(),a.update()},o=function(){a.selectfield.value="";for(var e=0;e<t.tags.options.length;e++){var i=t.tags.options[e];i.selected=!1}};this.filterOptions=function(){a.options=t.tags.options,t.tags.filter&&(a.options=a.options.filter(function(e){var i=e[t.tags.filter];return i&&i.toLowerCase().indexOf(a.selectfield.value.toLowerCase())>-1;
})),a.trigger("filter",a.selectfield.value)};var n=function(){var i=e(),o=a.root.querySelector(".menu");if(o){if(!t.tags.isvisible)return o.style.marginTop="",void(o.style.marginLeft="");var n=o.getBoundingClientRect();i.width<n.left+n.width&&(o.style.marginLeft=i.width-(n.left+n.width)-20+"px"),n.left<0&&(o.style.marginLeft="20px"),i.height<n.top+n.height&&(o.style.marginTop=i.height-(n.top+n.height)-20+"px")}};this.navigate=function(e){if([13,38,40].indexOf(e.keyCode)>-1&&!t.tags.isvisible)return e.preventDefault(),a.open(),!0;var i=a.options.length;if(i>0&&[13,38,40].indexOf(e.keyCode)>-1){e.preventDefault();for(var o=null,n=0;i>n;n++){var r=a.options[n];if(r.active){o=n;break}}null!=o&&(a.options[o].active=!1),38==e.keyCode?null==o||0==o?a.options[i-1].active=!0:a.options[o-1].active=!0:40==e.keyCode?null==o||o==i-1?a.options[0].active=!0:a.options[o+1].active=!0:13==e.keyCode&&null!=o&&a.select({item:a.options[o]})}return!0},this.open=function(){t.tags.isvisible=!0,a.trigger("open")},this.close=function(){t.tags.isvisible&&(t.tags.isvisible=!1,a.trigger("close"))},this.select=function(e){t.tags.options.forEach(function(t){return t.selected=!1}),e.item.selected=!0,a.addTag(e.item),o(),a.filterOptions(),a.trigger("select",e.item)},this.addTag=function(e){-1==t.tags.tags.indexOf(e)&&t.tags.tags.push(e)},this.removeTag=function(e){t.tags.tags=t.tags.tags.filter(function(t){return t._id!=e.item._id?t:void 0})},this.on("mount",function(){o(),a.filterOptions(),document.addEventListener("click",i),a.update()}),this.on("update",function(){t.tags.options.forEach(function(t){t._id=t._id||(Math.floor(60466175*Math.random())+1679615).toString(36)}),t.tags.tags.forEach(function(t){t._id=t._id||(Math.floor(60466175*Math.random())+1679615).toString(36)}),t.tags.filter||o(),n()}),this.on("unmount",function(){document.removeEventListener("click",i)})}),riot.tag2("rg-toasts",'<div if="{opts.toasts.isvisible}" class="toasts {\'toasts--\' + opts.toasts.position}"> <div each="{opts.toasts.toasts}" class="toast {\'toast--\' + type}" if="{isvisible}" onclick="{parent.toastClicked}"> {text} </div> </div>',"","",function(t){var e=this;this.toastClicked=function(t){var a=t.item;window.clearTimeout(a.timer),a.isvisible=!1,e.trigger("select",a)};var a=1,i=function(){return a++};this.on("update",function(){t.toasts&&Array.isArray(t.toasts.toasts)&&(t.toasts.position=t.toasts.position||"bottomright",t.toasts.toasts.forEach(function(t){"undefined"==typeof t.isvisible&&(t.isvisible=!0),t.id=t.id||i(),t.timer||t.sticky||(t.startTimer=function(){t.timer=window.setTimeout(function(){t.isvisible=!1,e.trigger("close",t),e.update()},t.timeout||6e3)},t.startTimer())}),t.toasts.isvisible=t.toasts.toasts.filter(function(t){return t.isvisible}).length>0)})}),riot.tag2("rg-toggle",'<div class="toggle {\'toggle--\' + opts.toggle.type}"> <label class="toggle__wrapper"> <input type="checkbox" __checked="{opts.toggle.checked}" onclick="{toggle}"> <div class="toggle__track"> <div class="toggle__handle"></div> </div> </label> </div>',"","",function(t){var e=this;this.on("mount",function(){t.toggle||(t.toggle={checked:!1})}),this.toggle=function(){t.toggle.checked=!t.toggle.checked,e.trigger("toggle",t.toggle.checked)}}),riot.tag2("rg-unsplash",'<img riot-src="https://unsplash.it/{opts.unsplash.greyscale}{opts.unsplash.width}/{opts.unsplash.height}/?{options}">',"","",function(t){var e=this;this.on("update",function(){e.options="",t.unsplash||(t.unsplash={}),t.unsplash.width=t.unsplash.width||450,t.unsplash.height=t.unsplash.height||250,t.unsplash.greyscale&&(t.unsplash.greyscale="g/"),t.unsplash.random&&(e.options+="random&"),t.unsplash.blur&&(e.options+="blur&"),t.unsplash.image&&(e.options+="image="+t.unsplash.image+"&"),"undefined"!=typeof t.unsplash.gravity&&(e.options+="gravity="+t.unsplash.gravity)})});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(riot) {

__webpack_require__(4);
__webpack_require__(2);
__webpack_require__(1);

var obs = riot.observable();

riot.mixin('obs', {
    obs: obs
});

riot.mount('rotateImageList');
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
],[6]);