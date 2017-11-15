var shooter;
var bullet;
var enemy;

function startGame() {
    shooter = new component(30, 30, "red", 225, 225);
    enemy = new component(30, 30, "red", 20, 22);
    bullet = new component(10, 30, "blue", shooter.x, shooter.y);
    canvasGame.start();
}

var canvasGame = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        
        window.addEventListener('keydown', function (e) {
            canvasGame.keys = (canvasGame.keys || []);
            canvasGame.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            canvasGame.keys[e.keyCode] = (e.type == "keydown");
        })
        
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {

    this.width = width;
    this.height = height;
    this.angle = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = canvasGame.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();    
    }
    this.newPos = function() {
        this.x += this.speed * Math.cos(this.angle);
    }
    this.newPosB = function() {
        this.y += this.speedB * Math.cos(this.angle);
    }
}

function updateGameArea() {
    canvasGame.clear();
    shooter.speed = 0;
    bullet.speedB = 0;

    if (canvasGame.keys[39]) {shooter.speed= 1;
    bullet.x = shooter.x;}
    if (canvasGame.keys[37]) {shooter.speed= -1;
    bullet.x = shooter.x;}
    if  (shooter.x <= 30 && canvasGame.keys[37]) {shooter.speed= 0; }
    if  (shooter.x >= 450 && canvasGame.keys[39]) {shooter.speed= 0; }
    if (canvasGame.keys[32]) {
    
    bullet.speedB -= 2;
    
    }
    if (bullet.y <= 20) {
        bullet = false;
    }
    if (bullet.x < enemy.x + enemy.width &&
   bullet.x + enemy.width > enemy.x &&
   bullet.y < enemy.y + enemy.height &&
   bullet.height + bullet.y > enemy.y) {
    enemy = false;
}
    
    
    shooter.newPos();
    shooter.update();
    enemy.update();
    bullet.newPosB();
    bullet.update();
}