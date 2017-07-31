/**
 * 组件类: 色彩选择器
 * 作者: yuronghui
 * 创建日期: 2017/7/25
 * https://farbelous.github.io/bootstrap-avatarcrop/
 */
import './asset/index.scss';
import Avatarimg from './avatarimg';

class ComView extends Lego.UI.Baseview {
    constructor(opts = {}) {
        const options = {
            type: 'crop',
            acceptSuffix: ['jpg', 'jpeg', 'png', 'gif'],
            maxFileSize: '1mb',
            uploadItem: Avatarimg,
            isAuto: false,
            previewContainer: '.img-container',
            showUploadList: false,
            preview: [{
                width: 120,
                height: 120,
                description: '大尺寸120x120'
            }, {
                width: 40,
                height: 40,
                description: '中尺寸40x40'
            }, {
                width: 20,
                height: 20,
                description: '小尺寸20x20'
            }],
            value: [],
            onComplete(){}
        };
        Object.assign(options, opts);
        super(options);
    }
    components(){
        let opts = this.options,
            that = this;
        if(opts.token || opts.data){
            this.addCom({
                el: '#upload_' + opts.vid,
                buttonText: '选择照片',
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
                onComplete(self, result, itemView){
                    let data = that.getValue(),
                        image = new Image();
                    itemView.cropper.destroy();
                    result.url += `?imageMogr2/crop/!${data.width}x${data.height}a${data.x}a${data.y}`;
                    image.onload = function(){
                        image.onload = null;
                        let container = $('<div class="img-full-width"></div>');
                        container.append(image);
                        that.$(`#img_container_${opts.vid}`).html(container).fadeIn(350);;
                    };
                    image.src = result.url;
                    if(typeof opts.onComplete == 'function') opts.onComplete(self, result, itemView);
                }
            });
        }
    }
    render() {
        this.result = this.result || {};
        let opts = this.options,
            vDom = hx`<div class="lego-avatarcrop">
            <upload id="upload_${opts.vid}"></upload>
            <p>支持jpg、gif、png、jpeg格式，文件小于2M，尺寸建议在640x640以上<br>可以在大照片上裁剪满意部分</p>
            <div class="row">
              <div class="col-md-8">
                <div class="img-container" id="img_container_${opts.vid}">
                    ${opts.value.length ? hx`<div class="img-full-width"><img src="${opts.value[0].url}"></div>` : ''}
                </div>
              </div>
              <div class="col-md-4">
                  ${opts.preview.map((item, index) => hx`<div class="preview-container">
                    <div class="lego-avatarcrop-preview thumb-${item.width}">
                    ${opts.value.length ? hx`<img src="${opts.value[0].url}/thumbnail/${item.width}x${item.height}">` : ''}
                    </div>
                    <span>${item.description}</span>
                  </div>`)}
              </div>
            </div>
        </div>`;
        return vDom;
    }
    getValue(){
        return this.result;
    }
    upload(){
        let opts = this.options,
            uploadView = Lego.getView('#img_container_' + opts.vid + ' > div');
        if(uploadView){
            uploadView.$('.progress-container').show();
            uploadView.start();
        }
    }
}
Lego.components('avatarcrop', ComView);
export default ComView;
