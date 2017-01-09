

var player = new Player();
// console.log(Player);
// new Enemy();
var gameTimer = setInterval(function () {
    new Enemy();
},500); //敌机出现速度

var grade = 0;

function gradeShow(grade) {
    var d=document.getElementById('grade');
    d.innerText= grade;
    // d.addClass('bigger');
}

function gameOver() {
    alert("游戏结束！你的得分是:" + grade);
}