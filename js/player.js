

function Player(){
    this.tag = 'player';
    this.domEle = document.getElementById("player");
    this.control();
    this.shoot();
}
Player.prototype.control = function () {
    this.domEle.addEventListener('touchmove',function (e) {
        //this 是飞机
        this.style.left = e.touches[0].clientX - this.offsetWidth*0.5 +'px';
        this.style.top = e.touches[0].clientY - this.offsetHeight*0.5+ 'px';
    })
};


Player.prototype.shoot = function () {
    var _this = this;
    this.domEle.timer = setInterval(function () {
        new Bullet(_this);
    },200);  //player子弹发射间隔时间
};