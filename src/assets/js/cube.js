;
(function($) {
    (function() {
        // cstart
        $.fn.cubeBox = function(opt) {
            var defaultO={
                'speed':1000,
                'width':200,
                'height': 200,
                'opacity':0.5,
                'activeOpacity':0.9,
                'drag':true,
                'autoPlay':5000
            };
            var opt = $.extend(true,{},defaultO,opt);
            // console.log(opt);
            var oBox = this;
            var oCube = this.find('.cube');
            var figure = oCube.find('figure');
            oBox.css({
                // 'width': opt.width,
                // 'height': opt.height,
                'position':'relative',
                'perspective':'1000px',
                '-webkit-perspective':'1000px',
                '-moz-perspective':'1000px',
                '-o-perspective':'1000px'
            });
            figure.css({
                // 'width': opt.width,
                // 'height': opt.height,
                'opacity': opt.opacity
            });
            var tslz = figure.width() / 2;
            oCube.find('.front').css({
                'opacity': opt.activeOpacity
            }).siblings().css({
                'opacity': opt.opacity
            });
            // set
            oCube.css({
                'transition-duration': '' + opt.speed + 'ms',
                '-webkit-transition-duration': '' + opt.speed + 'ms',
                '-moz-transition-duration': '' + opt.speed + 'ms',
                '-o-transition-duration': '' + opt.speed + 'ms'
            });
            setTimeout(function() {
                figure.css({
                    'transition': 'all 0.2s',
                    '-webkit-transition': 'all 0.2s',
                    '-moz-transition': 'all 0.2s',
                    '-o-transition': 'all 0.2s'
                });
            }, 500);
            oCube.find('.front').css({
                'transform': 'rotateY(0deg) translateZ(' + tslz + 'px)',
                '-webkit-transform': 'rotateY(0deg) translateZ(' + tslz + 'px)',
                '-moz-transform': 'rotateY(0deg) translateZ(' + tslz + 'px)',
                '-o-transform': 'rotateY(0deg) translateZ(' + tslz + 'px)'
            });
            oCube.find('.back').css({
                'transform': 'rotateY(180deg) translateZ(' + tslz + 'px)',
                '-webkit-transform': 'rotateY(180deg) translateZ(' + tslz + 'px)',
                '-moz-transform': 'rotateY(180deg) translateZ(' + tslz + 'px)',
                '-o-transform': 'rotateY(180deg) translateZ(' + tslz + 'px)'
            });
            oCube.find('.right').css({
                'transform': 'rotateY(90deg) translateZ(' + tslz + 'px)',
                '-webkit-transform': 'rotateY(90deg) translateZ(' + tslz + 'px)',
                '-moz-transform': 'rotateY(90deg) translateZ(' + tslz + 'px)',
                '-o-transform': 'rotateY(90deg) translateZ(' + tslz + 'px)'
            });
            oCube.find('.left').css({
                'transform': 'rotateY(-90deg) translateZ(' + tslz + 'px)',
                '-webkit-transform': 'rotateY(-90deg) translateZ(' + tslz + 'px)',
                '-moz-transform': 'rotateY(-90deg) translateZ(' + tslz + 'px)',
                '-o-transform': 'rotateY(-90deg) translateZ(' + tslz + 'px)'
            });
            oCube.find('.top').css({
                'transform': 'rotateX(90deg) translateZ(' + tslz + 'px)',
                '-webkit-transform': 'rotateX(90deg) translateZ(' + tslz + 'px)',
                '-moz-transform': 'rotateX(90deg) translateZ(' + tslz + 'px)',
                '-o-transform': 'rotateX(90deg) translateZ(' + tslz + 'px)'
            });
            oCube.find('.bottom').css({
                'transform': 'rotateX(-90deg) translateZ(' + tslz + 'px)',
                '-webkit-transform': 'rotateX(-90deg) translateZ(' + tslz + 'px)',
                '-moz-transform': 'rotateX(-90deg) translateZ(' + tslz + 'px)',
                '-o-transform': 'rotateX(-90deg) translateZ(' + tslz + 'px)'
            });
            oCube.css({
                'transform': 'translateZ(-100px)',
                '-webkit-transform': 'translateZ(-100px)',
                '-moz-transform': 'translateZ(-100px)',
                '-o-transform': 'translateZ(-100px)'
            });

            // if(isMoblie()){
            //     oBox.on('touchstart', dragStart);
            //     oBox.on('touchmove', dragMove);
            //     oBox.on('touchend', dragEnd);
            // }else{
            //     isClick(oBox);
            //     oBox.on('mousedown', dragStart);
            //     oBox.on('mousemove', dragMove);
            //     oBox.on('mouseup', dragEnd);
            // }

            function isClick(tar){
                var startPosX,startPosY,endPosX,endPosY,disPosX,disPosY;
                tar.on('mousedown', function(event) {
                    startPosX=event.clientX;
                    startPosY=event.clientY;
                });
                tar.on('mousemove', function(event) {
                   endPosX=event.clientX;
                   endPosY=event.clientY;
                });
                tar.on('click', function(event) {
                    disPosX=Math.abs(startPosX-endPosX);
                    disPosY=Math.abs(startPosY-endPosY);
                    if(disPosX>10||disPosY>10){
                        event.stopPropagation();
                        event.preventDefault();
                    }
                });
            }

            function isMoblie(){
                if(navigator.userAgent.indexOf('Mobile')==-1){
                    return false;
                }else{
                    return true;
                };
            }

            // drag function
            var orgX, orgY, moveX, moveY;
            // var arrH = ['show-left', 'show-front', 'show-right', 'show-back', 'show-top', 'show-bottom'];
            var arrH = ['show-front', 'show-right', 'show-back', 'show-left'];
            var numH = 1;
            var numAuto = 0;

            if (opt.autoPlay) {
                var timer=setInterval(function() {
                    numAuto++;
                    numAuto = numAutoTest(numAuto);
                    goTo(arrH[numAuto]);
                }, opt.autoPlay);
                oBox.mouseenter(function(){
                    clearInterval(timer);
                });
                oBox.mouseleave(function(){
                        timer=setInterval(function() {
                        numAuto++;
                        numAuto = numAutoTest(numAuto);
                        goTo(arrH[numAuto]);
                    }, opt.autoPlay);
                });
            }

            function dragStart(ev) {
                if(isMoblie()){
                    if (ev.originalEvent) {
                        orgX = ev.originalEvent.touches[0].clientX;
                        orgY = ev.originalEvent.touches[0].clientY;
                    } else {
                        orgX = ev.touches[0].clientX;
                        orgY = ev.touches[0].clientY;
                    }
                }else{
                    orgX = ev.clientX;
                    orgY = ev.clientY;
                }
            };

            function dragMove(ev) {
                ev.preventDefault();
                if(isMoblie()){
                    if (ev.originalEvent) {
                        moveX = ev.originalEvent.touches[0].clientX;
                        moveY = ev.originalEvent.touches[0].clientY;
                    } else {
                        moveX = ev.touches[0].clientX;
                        moveY = ev.touches[0].clientY;
                    }
                }else{
                    moveX = ev.clientX;
                    moveY = ev.clientY;
                }

            };

            function dragEnd(ev) {
                var disX = moveX - orgX;
                var disY = moveY - orgY;
                var pk = Math.abs(disX) - Math.abs(disY);
                if (pk >= 0) {
                    if (disX > 0) {
                        numH--;
                        numH = testNum(numH);
                        oCube.removeClass().addClass(arrH[numH] + ' cube');
                        addOpacity();
                    } else if (disX < 0) {
                        numH++;
                        numH = testNum(numH);
                        oCube.removeClass().addClass(arrH[numH] + ' cube');
                        addOpacity();
                    }
                } else {
                    if (disY > 0) { //下滑
                        if (oCube.attr('hDir') == 'top') { //top now
                            oCube.removeClass().addClass('cube show-left');
                            oCube.removeAttr('hDir', 'top');
                            addOpacity();
                        } else if (oCube.attr('hDir') == 'bottom') { //bottom now
                            oCube.removeClass().addClass('cube show-left');
                            oCube.removeAttr('hDir', 'bottom');
                            addOpacity();
                        } else { //center now
                            oCube.attr('hDir', 'top');
                            oCube.removeClass().addClass('cube show-top');
                            addOpacity();
                        }
                    } else if (disY < 0) { //上滑
                        if (oCube.attr('hDir') == 'top') { //top now
                            oCube.removeClass().addClass('cube show-right');
                            oCube.removeAttr('hDir', 'top');
                            addOpacity();
                        } else if (oCube.attr('hDir') == 'bottom') { //bottom now
                            oCube.removeClass().addClass('cube show-right');
                            oCube.removeAttr('hDir', 'bottom');
                            addOpacity();
                        } else { //center now
                            oCube.attr('hDir', 'bottom');
                            oCube.removeClass().addClass('cube show-bottom');
                            addOpacity();
                        }
                    }
                }
                moveX = undefined;
                moveY = undefined;
            }
            //end drag function

            function addOpacity() {
                if (oCube.hasClass('show-left')) {
                    oCube.find('.left').css({
                        'opacity': opt.activeOpacity
                    }).siblings().css({
                        'opacity': opt.opacity
                    });
                    return;
                }
                if (oCube.hasClass('show-right')) {
                    oCube.find('.right').css({
                        'opacity': opt.activeOpacity
                    }).siblings().css({
                        'opacity': opt.opacity
                    });
                    return;
                }
                if (oCube.hasClass('show-front')) {
                    oCube.find('.front').css({
                        'opacity': opt.activeOpacity
                    }).siblings().css({
                        'opacity': opt.opacity
                    });
                    return;
                }
                if (oCube.hasClass('show-back')) {
                    oCube.find('.back').css({
                        'opacity': opt.activeOpacity
                    }).siblings().css({
                        'opacity': opt.opacity
                    });
                    return;
                }
                if (oCube.hasClass('show-top')) {
                    oCube.find('.top').css({
                        'opacity': opt.activeOpacity
                    }).siblings().css({
                        'opacity': opt.opacity
                    });
                    return;
                }
                if (oCube.hasClass('show-bottom')) {
                    oCube.find('.bottom').css({
                        'opacity': opt.activeOpacity
                    }).siblings().css({
                        'opacity': opt.opacity
                    });
                    return;
                }

            }

            function testNum(a) {
                if (a < 0) {
                    a = 3;
                }
                if (a >
                    3) {
                    a = 0;
                }
                return a;
            }

            function numAutoTest(a) {
                if (a > 3) {
                    a = 0;
                }
                return a;
            }

            function goTo(dir) {
                switch (dir) {
                    case 'show-left':
                        oCube.removeClass().addClass('cube show-left');
                        oCube.removeAttr('hDir');
                        addOpacity();
                        break;
                    case 'show-right':
                        oCube.removeClass().addClass('cube show-right');
                        oCube.removeAttr('hDir');
                        addOpacity();
                        break;
                    case 'show-front':
                        oCube.removeClass().addClass('cube show-front');
                        oCube.removeAttr('hDir');
                        addOpacity();
                        break;
                    case 'show-back':
                        oCube.removeClass().addClass('cube show-back');
                        oCube.removeAttr('hDir');
                        addOpacity();
                        break;
                    case 'show-top':
                        oCube.removeClass().addClass('cube show-top');
                        oCube.removeAttr('hDir');
                        addOpacity();
                        break;
                    case 'show-bottom':
                        oCube.removeClass().addClass('cube show-bottom');
                        oCube.removeAttr('hDir');
                        addOpacity();
                        break;
                }
            }
            return {
                goTo: goTo
            };
        }
        // cend
    }) /*onload*/
})(window.Zepto || window.jQuery)