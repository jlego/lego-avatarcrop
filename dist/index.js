/**
 * avatarcrop.js v0.1.22
 * (c) 2017 yuronghui
 * @license MIT
 */
"use strict";

function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var Cropper = _interopDefault(require("cropper-cjs"));

var cropperCjs_dist_cropper_min_css = require("cropper-cjs/dist/cropper.min.css");

var _createClass$1 = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _templateObject$1 = _taggedTemplateLiteral$1([ '<div>\n            <div class="progress-container"><progressbar id="', '"></progressbar></div>\n            <img id="image_', '" src="', '">\n        </div>' ], [ '<div>\n            <div class="progress-container"><progressbar id="', '"></progressbar></div>\n            <img id="image_', '" src="', '">\n        </div>' ]);

function _taggedTemplateLiteral$1(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}

function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn$1(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var View = function(_Lego$UI$Baseupload) {
    _inherits$1(View, _Lego$UI$Baseupload);
    function View() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _classCallCheck$1(this, View);
        var options = {
            uploadUri: "",
            percent: 0,
            isAuto: false,
            readonly: false,
            showZoom: true,
            file: {},
            type: "file",
            headers: {},
            params: {},
            onBegin: function onBegin() {},
            onProgress: function onProgress() {},
            onComplete: function onComplete() {},
            onFail: function onFail() {},
            onCancel: function onCancel() {},
            onRemove: function onRemove() {},
            components: []
        };
        Object.assign(options, opts);
        return _possibleConstructorReturn$1(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, options));
    }
    _createClass$1(View, [ {
        key: "components",
        value: function components() {
            this.addCom({
                el: "#progressbar_" + this.options.vid,
                showInfo: false,
                status: "success",
                onComplete: function onComplete(self) {
                    self.options.percent = 100;
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var opts = this.options;
            return hx(_templateObject$1, "progressbar_" + opts.vid, opts.vid, val(opts.previewImgSrc));
        }
    }, {
        key: "renderAfter",
        value: function renderAfter() {
            var opts = this.options, that = this, context = opts.context.options.context, imgEl = this.$("#image_" + opts.vid), imgW = imgEl.width(), imgH = imgEl.height(), previewOption = opts.context.options.preview, previews = context.$(".lego-avatarcrop-preview");
            if (opts.percent < 100) {
                if (imgW >= imgH) imgEl.height("100%");
                if (imgW < imgH) imgEl.width("100%");
                this.cropper = new Cropper(imgEl[0], {
                    aspectRatio: 1,
                    dragMode: "move",
                    ready: function ready() {
                        var clone = $(this).clone();
                        previews.each(function(index, elem) {
                            $(elem).html(clone.clone());
                        });
                    },
                    crop: function crop(e) {
                        var data = e.detail, cropper = this.cropper, imageData = cropper.getImageData();
                        context.result = data;
                        previews.each(function(index, elem) {
                            var previewImage = $(elem).children("img"), item = previewOption[index], imageScaledRatio = data.width / item.width;
                            previewImage.css({
                                width: imageData.naturalWidth / imageScaledRatio,
                                height: imageData.naturalHeight / imageScaledRatio,
                                marginLeft: -data.x / imageScaledRatio,
                                marginTop: -data.y / imageScaledRatio
                            });
                        });
                    }
                });
            } else {
                this.$(".progress-container").hide();
            }
        }
    } ]);
    return View;
}(Lego.UI.Baseupload);

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _templateObject = _taggedTemplateLiteral([ '<div class="lego-avatarcrop">\n            <upload id="upload_', '"></upload>\n            <p>支持jpg、gif、png、jpeg格式，文件小于2M，尺寸建议在640x640以上<br>可以在大照片上裁剪满意部分</p>\n            <div class="row">\n              <div class="col-md-8">\n                <div class="img-container" id="img_container_', '">\n                    ', '\n                </div>\n              </div>\n              <div class="col-md-4">\n                  ', "\n              </div>\n            </div>\n        </div>" ], [ '<div class="lego-avatarcrop">\n            <upload id="upload_', '"></upload>\n            <p>支持jpg、gif、png、jpeg格式，文件小于2M，尺寸建议在640x640以上<br>可以在大照片上裁剪满意部分</p>\n            <div class="row">\n              <div class="col-md-8">\n                <div class="img-container" id="img_container_', '">\n                    ', '\n                </div>\n              </div>\n              <div class="col-md-4">\n                  ', "\n              </div>\n            </div>\n        </div>" ]);

var _templateObject2 = _taggedTemplateLiteral([ '<div class="img-full-width"><img src="', '"></div>' ], [ '<div class="img-full-width"><img src="', '"></div>' ]);

var _templateObject3 = _taggedTemplateLiteral([ '<div class="preview-container">\n                    <div class="lego-avatarcrop-preview thumb-', '">\n                    ', "\n                    </div>\n                    <span>", "</span>\n                  </div>" ], [ '<div class="preview-container">\n                    <div class="lego-avatarcrop-preview thumb-', '">\n                    ', "\n                    </div>\n                    <span>", "</span>\n                  </div>" ]);

var _templateObject4 = _taggedTemplateLiteral([ '<img src="', "/thumbnail/", "x", '">' ], [ '<img src="', "/thumbnail/", "x", '">' ]);

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ComView = function(_Lego$UI$Baseview) {
    _inherits(ComView, _Lego$UI$Baseview);
    function ComView() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _classCallCheck(this, ComView);
        var options = {
            type: "crop",
            acceptSuffix: [ "jpg", "jpeg", "png", "gif" ],
            maxFileSize: "1mb",
            uploadItem: View,
            isAuto: false,
            previewContainer: ".img-container",
            showUploadList: false,
            preview: [ {
                width: 120,
                height: 120,
                description: "大尺寸120x120"
            }, {
                width: 40,
                height: 40,
                description: "中尺寸40x40"
            }, {
                width: 20,
                height: 20,
                description: "小尺寸20x20"
            } ],
            value: [],
            onComplete: function onComplete() {}
        };
        Object.assign(options, opts);
        return _possibleConstructorReturn(this, (ComView.__proto__ || Object.getPrototypeOf(ComView)).call(this, options));
    }
    _createClass(ComView, [ {
        key: "components",
        value: function components() {
            var opts = this.options, that = this;
            if (opts.token || opts.data) {
                this.addCom({
                    el: "#upload_" + opts.vid,
                    buttonText: "选择照片",
                    previewContainer: opts.previewContainer,
                    type: opts.type,
                    data: opts.token || opts.data,
                    acceptSuffix: opts.acceptSuffix,
                    maxFileSize: opts.maxFileSize,
                    uploadItem: opts.uploadItem,
                    multiple: false,
                    isAuto: opts.isAuto,
                    showUploadList: opts.showUploadList,
                    preview: opts.preview,
                    value: opts.value,
                    onComplete: function onComplete(self, result, itemView) {
                        var data = that.getValue(), image = new Image();
                        itemView.cropper.destroy();
                        result.url += "?imageMogr2/crop/!" + data.width + "x" + data.height + "a" + data.x + "a" + data.y;
                        image.onload = function() {
                            image.onload = null;
                            var container = $('<div class="img-full-width"></div>');
                            container.append(image);
                            that.$("#img_container_" + opts.vid).html(container).fadeIn(350);
                        };
                        image.src = result.url;
                        if (typeof opts.onComplete == "function") opts.onComplete(self, result, itemView);
                    }
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            this.result = this.result || {};
            var opts = this.options, vDom = hx(_templateObject, opts.vid, opts.vid, opts.value.length ? hx(_templateObject2, opts.value[0].url) : "", opts.preview.map(function(item, index) {
                return hx(_templateObject3, item.width, opts.value.length ? hx(_templateObject4, opts.value[0].url, item.width, item.height) : "", item.description);
            }));
            return vDom;
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return this.result;
        }
    }, {
        key: "upload",
        value: function upload() {
            var opts = this.options, uploadView = Lego.getView("#img_container_" + opts.vid + " > div");
            if (uploadView) {
                uploadView.$(".progress-container").show();
                uploadView.start();
            }
        }
    } ]);
    return ComView;
}(Lego.UI.Baseview);

Lego.components("avatarcrop", ComView);

module.exports = ComView;
