/**
 * Created by Silence on 2016/12/27.
 */
function Enemy(){
    this.tag = 'enemy';
    this.domEle = this.createElement();
    this.move();
    this.shoot();
}
Enemy.prototype.shoot = function () {
    var _this = this;

    // new Bullet(this);
    this.domEle.timer = setInterval(function () {
        new Bullet(_this);
    },1000);  //player子弹发射间隔时间
};
Enemy.prototype.createElement = function () {

    var img = document.createElement('img'); //新建一个img元素
    img.src = 'img/enemy.png';
    img.className = 'enemy';

    document.getElementsByClassName('game-box')[0].appendChild(img);     //将该元素添加到页面中

    // img 随机位置
    img.style.left=Math.random()*window.innerHeight - img.offsetWidth + 'px';
    return img;
};
//敌机移动
Enemy.prototype.move = function () {
    var _this = this;
  this.domEle.timer = setInterval(function () {

      _this.domEle.style.top = _this.domEle.offsetTop + 3 + 'px';   //敌机下降速度

      _this.domEle.style.left = _this.domEle.offsetLeft + parseInt(Math.random()*2) + 'px';

      // console.log('kjkj');
      //当敌机走出屏幕
      if (_this.domEle.offsetTop>window.innerHeight){
          _this.domEle.remove();
          clearInterval(_this.domEle.timer);
      }

  //    判断是否撞到玩家
      var playerEle = document.getElementById('player');
      //如果玩家活着
      if (playerEle){

      //    判断水平方向
          if(_this.domEle.offsetLeft + _this.domEle.offsetWidth>playerEle.offsetLeft&&_this.domEle.offsetLeft < playerEle.offsetLeft + playerEle.offsetWidth){

          //    判断垂直方向
              if(_this.domEle.offsetTop + _this.domEle.offsetHeight>playerEle.offsetTop&&_this.domEle.offsetTop < playerEle.offsetTop + playerEle.offsetHeight){
                  playerEle.remove();
                  clearInterval(gameTimer);
                  clearInterval(playerEle.timer);
                  gameOver();
              }
          }
      }

  },30);
};