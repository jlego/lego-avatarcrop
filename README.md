# lego-avatarcrop 头像截取组件

### 参数说明：
- preview: [{
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
- value: [{url: '图片地址'}],   //已上传的头像
- onComplete(self, result, itemView) {}

### 方法：
this.upload()  //触发图片上传

### 效果图：
![A screenshot of your package](https://github.com/jlego/lego-avatarcrop/blob/master/preview.png)
