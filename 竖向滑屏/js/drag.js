(function (w) {
    w.navs = function (navsWrap) {
        // var navsWrap = document.getElementById('wrap');
        // var navsList = document.getElementById('content');
        var navsList = navsWrap.children[0];
        transformCss(navsList, 'translateZ', 0.1);

        //定义元素初始位置，手指初始位置
        var eleY = 0;
        var startY = 0;

        //加速
        var beginTime = 0;
        var beginValue = 0;
        var endTime = 0;
        var endValue = 0;
        //距离差时间差
        var disTime = 1;
        var disValue = 0;

        navsWrap.addEventListener("touchstart", function (event) {
            var touch = event.changedTouches[0];

            //清除过渡
            navsList.style.transition = 'none';

            eleY = transformCss(navsList, 'translateY');
            startY = touch.clientY;

            beginTime = new Date().getTime();//毫秒
            beginValue = eleY;

            //清除速度
            disValue = 0;

        });

        navsWrap.addEventListener("touchmove", function (event) {
            var touch = event.changedTouches[0];
            //手指结束位置
            var endY = touch.clientY;
            //手指距离差
            var disY = endY - startY;

            //范围限定
            var translateY = disY + eleY;
            var scale = 0;
            var minY = document.documentElement.clientHeight - navsList.offsetHeight;
            if (translateY > 0) {
                // translateY = 0;
                //比例：越来越小
                //    留白/屏幕宽度 （保证不同机型，实现相同效果）
                //留白 逐渐增大 ，scale逐渐减小，   1-留白/屏幕宽度
                scale = 1 - translateY / document.documentElement.clientHeight;

                translateY = translateY * scale;
            } else if (translateY < minY) {
                // translateY = document.documentElement.clientHeight - navsList.offsetHeight;
                var over = minY - translateY;
                scale = 1 - over / document.documentElement.clientHeight;
                translateY = minY - over * scale;
            }

            transformCss(navsList, 'translateY', translateY);

            endTime = new Date().getTime();
            endValue = translateY;
            disValue = endValue - beginValue;
            disTime = endTime - beginTime;

        });

        navsWrap.addEventListener("touchend", function (event) {
            var touch = event.changedTouches[0];

            //速度
            var speed = disValue / disTime;
            console.log(speed);
            //目标位移距离 =  touchmove产生的距离 + 速度计算出的结果
            var target = transformCss(navsList, 'translateY') + speed * 100;

            var minY = document.documentElement.clientHeight - navsList.offsetHeight;
            //橡皮筋回弹效果
            var bezier = '';
            if (target > 0) {
                target = 0;
                bezier = 'cubic-bezier(.09,1.61,.92,1.45)';
            } else if (target < minY) {
                target = minY;
                bezier = 'cubic-bezier(.09,1.61,.92,1.45)';
            }

            navsList.style.transition = '2s ' + bezier;
            transformCss(navsList, 'translateY', target);

        });
    }
})(window);