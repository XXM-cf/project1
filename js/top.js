var timer = null;
var back = getClass(document, 'back_top')[0];
var stop = true;
var clientHeight = document.documentElement.clientHeight || document.body.clientHeight //获取可视区域高度
window.onscroll = function () {
  var osTop = document.body.scrollTop || document.documentElement.scrollTop;
  if (osTop >= clientHeight - 200) {
    back.style.display = "block";
  } else {
    back.style.display = "none";
  }

  if (!stop) {
    clearInterval(timer)
  }

  stop = false;

}

back.onclick = function () {
  clearInterval(timer);
  var speed = 0;
  timer = setInterval(function () {
    var osTop = document.body.scrollTop || document.documentElement.scrollTop;
    speed = Math.floor(-osTop / 10); //缓冲
    document.body.scrollTop = osTop + speed;
    //  兼容ie8 
    document.documentElement.scrollTop = osTop + speed;

    if (osTop == 0) {
      clearInterval(timer);
    }
    stop = true;

  }, 30);
}