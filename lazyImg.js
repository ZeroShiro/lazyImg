//imgAll 使用 querySelectAll
let initLazyImg = {
  imgs: Array,
  init: function(imgAll, dfSrc) {
    this.setimgs(imgAll); //保存
    this.setDefaultSrc(imgAll, dfSrc); //设置默认透明背景
    this.findImgs(); //查找在视口中的图片
    this.onScroll(); //绑定scroll事件
  },
  setDefaultSrc: function(imgAll, dfSrc) {
    for (let i = 0; i < imgAll.length; i++) {
      imgAll[i].src = dfSrc;
    }
  },
  setimgs: function(imgAll) {
    let imgs = Array.from(imgAll);
    this.imgs = imgs;
  },
  findImgs: function() {
    for (let i = 0; i < this.imgs.length; i++) {
      let img = this.imgs[i];
      if (this.loadImg(img)) {
        this.imgs.splice(i, 1);
        i--;
      }
    }
  },
  loadImg: function(img) {
    let rect = img.getBoundingClientRect();
    if (
      rect.right > 0 &&
      rect.bottom > 0 &&
      rect.top < document.documentElement.clientHeight &&
      rect.left < document.documentElement.clientWidth
    ) {
      img.src = img.dataset.src;
      return true;
    }
    return false;
  },
  onScroll: function() {
    let _this = this;
    let timer = null;
    window.addEventListener("scroll", function() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        _this.findImgs();
      }, 300);
    });
  }
};
