// 顶部菜单点击显示隐藏
function show() {
    var Top2 = document.getElementById("top2");
    var Top3 = document.getElementById("top3");
    var Top4 = document.getElementById("top4");

    var topIcon4 = Top4.getElementsByTagName('span')[0];
    var topIcon3 = Top3.getElementsByTagName('span')[0];
    var topIcon2 = document.getElementById('top2_2');
    var aOptation = getClass(document, 'optation');

    for (var i = 0; i < aOptation.length; i++) {
        aOptation[i].style.display = "none"
    }

    Top2.onclick = function (ev) {
        aOptation[2].style.display = "block"
        aOptation[1].style.display = "none"
        aOptation[0].style.display = "none"
        topIcon3.style.backgroundPosition = "-155px -90px";
        topIcon4.style.backgroundPosition = "-155px -90px";
        topIcon2.style.backgroundPosition = "-113px -90px";
        stopBubble(ev)
    }
    Top3.onclick = function (ev) {
        aOptation[1].style.display = "block"
        aOptation[0].style.display = "none"
        aOptation[2].style.display = "none"
        topIcon2.style.backgroundPosition = "-155px -90px";
        topIcon4.style.backgroundPosition = "-155px -90px";
        topIcon3.style.backgroundPosition = "-113px -90px";
        stopBubble(ev)
    }
    Top4.onclick = function (ev) {
        aOptation[0].style.display = "block"
        aOptation[1].style.display = "none"
        aOptation[2].style.display = "none"
        topIcon3.style.backgroundPosition = "-155px -90px";
        topIcon2.style.backgroundPosition = "-155px -90px";
        topIcon4.style.backgroundPosition = "-113px -90px";
        stopBubble(ev)
    }
    document.onclick = function () {
        for (i = 0; i < aOptation.length; i++) {
            aOptation[i].style.display = "none"
        }
        topIcon3.style.backgroundPosition = "-155px -90px";
        topIcon2.style.backgroundPosition = "-155px -90px";
        topIcon4.style.backgroundPosition = "-155px -90px";
    }
}
show();

// 阻止冒泡
function stopBubble(ev) {
    var ev = ev || event;
    if (document.all) {
        ev.cancelBubble = true;
        ev.returnValue = false;
    } else {
        ev.stopPropagation();
    }
}

// 施工团队选项卡切换
function tab() {
    var subTitleBtn = getClass(document, 'sub_title');
    var teamList = getClass(document, 'team_list');
    var teamBox = getClass(document, 'team_box')[0];
    for (i = 0; i < subTitleBtn.length; i++) {
        subTitleBtn[i].index = i;
        subTitleBtn[i].onclick = function () {
            for (i = 0; i < subTitleBtn.length; i++) {
                subTitleBtn[i].id = ""
                teamList[i].style.display = "none"
            }
            teamList[this.index].style.display = "block";
            this.id = "active"
        }
    }
}
tab();


// 人才招聘查看更多
function seemore() {
    var recruimentBtn = getClass(document, "recruiment_btn")[0]
    var recruimentList = getClass(document, "recruiment_list")[0];
    var recruimentBox = getClass(document, "recruiment")[0];
    var oneLi = recruimentList.children;
    var oneLiHeight = getCss(oneLi[0], 'height')
    var flag = true;
    //默认显示8条数据
    recruimentList.style.height = parseInt(oneLiHeight) * 8 + 'px';
    recruimentBtn.onclick = function () {
        if (flag) {
            recruimentBtn.innerHTML = "<span>收起</span><div class='toggle_icon' id='toggle_icon_active'></div>"
            recruimentList.style.height = parseInt(oneLiHeight) * oneLi.length + 'px';
            recruimentBox.style.height = parseInt(oneLiHeight) * oneLi.length + 77 + 'px';
            flag = false;
        } else {
            recruimentBtn.innerHTML = "<span>更多推荐</span><div class='toggle_icon'></div>"
            recruimentList.style.height = parseInt(oneLiHeight) * 8 + 'px';
            recruimentBox.style.height = parseInt(oneLiHeight) * 8 + 77 + 'px';
            flag = true;
        }
    }
    // 显示工作待遇
    var jobDis = getClass(document, 'job_dis');
    for (i = 0; i < oneLi.length; i++) {
        oneLi[i].index = i;
        oneLi[i].onmouseover = function () {
            for (i = 0; i < jobDis.length; i++) {
                jobDis[i].style.display = "none"
            }
            getClass(this, "job_dis")[0].style.display = "block"

        }
    }
}
seemore();

//banner图淡入淡出
function picmove() {
    var bannerBox = getClass(document, 'banner')[0];
    var bannerLeft = getClass(document, 'banner_left')[0]
    var aDot = getClass(document, 'dot');
    var index = 0;
    var bannerList = getClass(document, 'banner_list')[0];
    var aLi = bannerList.children;
    var timer = null;
    // 点击切换
    for (i = 0; i < aDot.length; i++) {
        aDot[i].index = i;
        aDot[i].onclick = function () {
            index = this.index;
            move();
        }
    }
    // 淡入淡出
    animate(aLi[0], {
        'opacity': 100
    })

    function move() {
        for (i = 0; i < aLi.length; i++) {
            aDot[i].className = ''
            animate(aLi[i], {
                'opacity': 0
            })
        }
        aDot[index].className = "dot_active"
        animate(aLi[index], {
            'opacity': 100
        });
    }
    // 鼠标移入移出
    bannerBox.onmouseover = function () {
        clearInterval(timer)
    }
    bannerBox.onmouseout = function () {
        timer = setInterval(function () {
            index = (++index) % 4;
            move()
        }, 2000);
    }

    // 阻止冒泡 鼠标划过左侧menu时候不会停止播放
    // document.all在ie下为true  其他浏览器为false
    bannerLeft.onmouseover = function (ev) {
        stopBubble(ev)
    }
    bannerLeft.onmouseout = function (ev) {
        stopBubble(ev)
    }

    // 自动播放
    timer = setInterval(function () {
        index = (++index) % 4;
        move()
    }, 2000);

}
picmove();

// 无缝轮播
function autoplay() {
    var teamShowList = getClass(document, 'team_show_list')[0];
    var aLi = teamShowList.getElementsByTagName('li');
    teamShowList.innerHTML += teamShowList.innerHTML;
    var w = parseInt(getCss(aLi[0], 'width'));
    teamShowList.style.width = aLi.length * w + 'px';
    var speed = -5;
    var timer = null;
    // 定时器
    // 运动函数
    function move(speed) {
        teamShowList.style.left = teamShowList.offsetLeft + speed + 'px';
        if (teamShowList.offsetLeft < -teamShowList.offsetWidth / 2) {
            teamShowList.style.left = 0 + 'px';
        }
        if (teamShowList.offsetLeft > 0) {
            teamShowList.style.left = -teamShowList.offsetWidth / 2 + 'px';
        }
    }
    // 定时器自动播放
    timer = setInterval(function () {
        move(speed);
    }, 50);
    // 鼠标移入移出停止
    teamShowList.onmouseover = function (ev) {
        clearInterval(timer);

    }
    teamShowList.onmouseout = function (ev) {
        clearInterval(timer);
        timer = setInterval(function () {
            move(-5);
        }, 50);
    }

    // // 判断方向+鼠标移入移除停止
    // var preX = 0;
    // var preX1 = 0;
    // teamShowList.onmouseover = function (ev) {
    //     clearInterval(timer);
    //     var ev = ev || event;
    //     preX = ev.clientX;
    // }
    // teamShowList.onmousemove = function (ev) {
    //     clearInterval(timer);
    //     var ev = ev || event;
    //     preX1 = ev.clientX;
    //     console.log(preX1 - preX + "move")
    // if (preX1 - preX > 50) {
    //     // console.log("向右移动")
    //     speed = 5;
    // } else if (preX1 - preX < -50) {
    //     // console.log("向左移动")
    //     speed = -5
    // } else {
    //      clearInterval(timer);
    //      speed = 0;
    // }
    //  console.log("差值" + (preX1 - preX))
    // }

}
autoplay();


// 点击联系我们 出现弹窗
function contactUs() {
    var Box = getClass(document, 'contact_us_box')[0];
    var acontactBtn = getClass(document, 'contact_us');
    for (i = 0; i < acontactBtn.length; i++) {
        acontactBtn[i].onclick = function (ev) {
            Box.style.display = 'block';
            stopBubble(ev)
        }
    }
    document.body.onclick = function () {
        Box.style.display = 'none';
    }
}
contactUs();