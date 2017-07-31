/**
 * 视图类: 类名称
 * 作者: yuronghui
 * 创建日期: 2017/7/26
 */
import Cropper from 'cropper-cjs';
import 'cropper-cjs/dist/cropper.min.css';

class View extends Lego.UI.Baseupload {
    constructor(opts = {}) {
        const options = {
            uploadUri: '',
            percent: 0,     //上传进度百分比
            isAuto: false,
            readonly: false,
            showZoom: true,
            file: {},
            type: 'file',
            headers: {},
            params: {},
            onBegin() {},
            onProgress() {},
            onComplete() {},
            onFail() {},
            onCancel() {},
            onRemove() {},
            components: []
        };
        Object.assign(options, opts);
        super(options);
    }
    components(){
        this.addCom({
            el: '#progressbar_' + this.options.vid,
            showInfo: false,
            status: 'success',
            onComplete(self){
                self.options.percent = 100;
            }
        });
    }
    render() {
        let opts = this.options;
        return hx `<div>
            <div class="progress-container"><progressbar id="${'progressbar_' + opts.vid}"></progressbar></div>
            <img id="image_${opts.vid}" src="${val(opts.previewImgSrc)}">
        </div>`;
    }
    renderAfter(){
        let opts = this.options,
            that = this,
            context = opts.context.options.context,
            imgEl = this.$('#image_' + opts.vid),
            imgW = imgEl.width(),
            imgH = imgEl.height(),
            previewOption = opts.context.options.preview,
            previews = context.$('.lego-avatarcrop-preview');
        if(opts.percent < 100){
            if(imgW >= imgH) imgEl.height('100%');
            if(imgW < imgH) imgEl.width('100%');
            this.cropper = new Cropper(imgEl[0], {
                aspectRatio: 1,
                dragMode: 'move',
                ready() {
                    let clone = $(this).clone();
                    previews.each(function (index, elem) {
                        $(elem).html(clone.clone());
                    });
                },
                crop(e) {
                    let data = e.detail,
                        cropper = this.cropper,
                        imageData = cropper.getImageData();
                    context.result = data;
                    previews.each(function (index, elem) {
                        let previewImage = $(elem).children('img'),
                            item = previewOption[index],
                            imageScaledRatio = data.width / item.width;
                        previewImage.css({
                            width: imageData.naturalWidth / imageScaledRatio,
                            height: imageData.naturalHeight / imageScaledRatio,
                            marginLeft: -data.x / imageScaledRatio,
                            marginTop: -data.y / imageScaledRatio
                        });
                    });
                }
            });
        }else{
            this.$('.progress-container').hide();
        }
    }
}
export default View;
