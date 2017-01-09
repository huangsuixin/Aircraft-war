/**
 * Created by Silence on 2016/12/27.
 */

function Bullet(owner) {
    this.owner = owner;
    this.domEle = this.createElement();
    this.move();
}

Bullet.prototype.createElement = function () {
    var img = document.createElement('img');
    if (this.owner.tag == 'player') {
        img.src = 'img/bullet.png';
        img.style.width = '10px';
        img.style.height = '20px';
        img.style.position = 'absolute';
        img.style.top = this.owner.domEle.offsetTop - 20 + 'px';
        img.style.left = this.owner.domEle.offsetLeft + this.owner.domEle.offsetWidth * 0.5 - 5 + 'px';

    } else if (this.owner.tag == 'enemy') {
        img.src = 'img/bullet-bottom.png';
        img.style.width = '10px';
        img.style.height = '20px';
        img.style.position = 'absolute';
        img.style.top = this.owner.domEle.offsetTop + 20 +'px';
        img.style.left = this.owner.domEle.offsetLeft + this.owner.domEle.offsetWidth*0.5 - 5 +'px';
    }

    document.getElementsByClassName('game-box')[0].appendChild(img);
    return img;
};

Bullet.prototype.move = function () {
    var _this = this;
    if (this.owner.tag == 'player') {
        this.domEle.timer = setInterval(function () {
            _this.domEle.style.top = _this.domEle.offsetTop - 8 + 'px'; //玩家子弹的速度

            //子弹跑出屏幕
            if (_this.domEle.offsetTop < 0) {
                _this.domEle.remove();
                clearInterval(_this.domEle.timer);
            }
            //    判断是否和敌人相撞
            var enemys = document.getElementsByClassName('enemy');
            for (var i = 0; i < enemys.length; i++) {
                var e = enemys[i];
                if (_this.domEle.offsetLeft > e.offsetLeft && _this.domEle.offsetLeft < e.offsetLeft + e.offsetWidth) {
                    if (_this.domEle.offsetTop > e.offsetTop && _this.domEle.offsetTop < e.offsetTop + e.offsetHeight) {
                        _this.domEle.remove();
                        clearInterval(_this.domEle.timer);
                        e.remove();
                        clearInterval(e.timer);
                        gradeShow(++grade);

                    }
                }
            }

        }, 30)
    } else if (this.owner.tag == 'enemy') {
        this.domEle.timer = setInterval(function () {
            _this.domEle.style.top = _this.domEle.offsetTop + 8 + 'px';  //敌机子弹速度(垂直)
            // _this.domEle.style.top = _this.domEle.offsetLeft + 2 + 'px';  //敌机子弹速度(水平)

            if (_this.domEle.offsetTop > window.innerHeight) {
                _this.domEle.remove();
                clearInterval(_this.domEle.timer);
            }
            var playerEle = document.getElementById('player');

            //判断玩家是否存活
            if (playerEle) {

                var excessH = playerEle.offsetHeight*0.4;

                //判断敌人子弹是否与玩家相撞
                if (_this.domEle.offsetLeft > playerEle.offsetLeft && _this.domEle.offsetLeft < playerEle.offsetLeft + playerEle.offsetWidth) {
                    if (_this.domEle.offsetTop > playerEle.offsetTop +excessH && _this.domEle.offsetTop < playerEle.offsetTop + playerEle.offsetHeight) {
                        // _this.domEle.remove();
                        // clearInterval(_this.domEle.timer);
                        playerEle.remove();
                        gameOver();
                        clearInterval(gameTimer);
                        clearInterval(playerEle.timer);
                    }
                }
            }
        }, 30)
    }
};