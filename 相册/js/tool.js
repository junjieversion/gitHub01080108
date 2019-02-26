(function (w) {
    w.gestur = function (node,callback) {

        var flag = false;

        //线段初始长度
        var startC = 0;

        //初始角度
        var startD = 0;

        //gesturestart  手指触碰当前元素，屏幕上有两个或者两个以上的手指
        node.addEventListener('touchstart', function (event) {

            var touches = event.touches;
            if (touches.length >= 2) {

                //gesturestart
                flag = true;

                //初始线段长度
                startC = getC(touches[0],touches[1]);

                //初始角度
                startD = getD(touches[0],touches[1]);

                if (callback && callback['start']) {
                    callback['start']();
                };

            };

        });

        //gesturechange  手指触碰当前元素，屏幕上有两个或者两个以上的手指位置在发生移动
        node.addEventListener('touchmove', function (event) {

            var touches = event.touches;
            if (touches.length >= 2) {

                //gesturechange
                //线段结束位置
                var endC = getC(touches[0],touches[1]);
                event.scale = endC / startC;

                //结束角度
                var endD = getD(touches[0],touches[1]);
                event.rotation = endD - startD;

                //gesturechange
                if (callback && callback['change']) {
                    callback['change'](event);
                } ;

            } ;

        });

        //gestureend 在gesturestart后, 屏幕上只剩下两根以下（不包括两根）的手指
        node.addEventListener ('touchend', function (event) {

            var touches = event.touches;
            if (flag) {

                if (touches.length < 2){

                    //retureend
                    if (callback && callback['end']) {
                        callback['end']();
                    } ;

                } ;

            } ;

        });

        //求线段长度
        function getC(p1,p2) {
            var a = p1.clientX - p2.clientX;
            var b = p1.clientY - p2.clientY;
            var c = Math.sqrt(a*a+b*b);

            return c;

        }

        //求角度
        function getD(p1,p2) {
            var Y = p1.clientY - p2.clientY;
            var X = p1.clientX - P2.clientX;

            var deg = Math.atan2(Y, X);

            deg = deg * 180 / Math.PI;

            return deg;

        }

    }

})(window);