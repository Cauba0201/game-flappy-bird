//bắt đầu
var canvas = document.getElementById('gamezone');
var context= canvas.getContext('2d');
var scoreshow= document.getElementById('score');

var birdimg = new Image();
var hinhnenchinh = new Image();
var ongtren = new Image();
var ongduoi= new Image();

birdimg.src="img/bird.png";
hinhnenchinh.src="img/nenchinh.png";
ongtren.src="img/ongtren.png";
ongduoi.src="img/ongduoi.png";
// nạp các hình 
// tạo biến

var score = 0;
var khoangcachhaiong= 140;
var khoangcachdenongduoi; // khoảng cách đầu ống trên đến vị trí đầu ống dưới
// tạo biến chim với tọa độ ở giữa
var bird={
    x: hinhnenchinh.width/5,
    y: hinhnenchinh.height/2
}
var ong=[];// tạo mảng ống để chứa các ống di chuyển

ong[0]={
    x: canvas.width,
    y:0 // tạo ống đầu tiên nằm bên phải ngoài cùng với y=0;
}

// tạo hàm để chạy trò chơi

function run(){
    //load hình ảnh vào
    context.drawImage(hinhnenchinh,0,0);
    context.drawImage(birdimg,bird.x,bird.y)
    //cho chim rơi xuống

    for(var i=0;i<ong.length;i++){
        khoangcachdenongduoi=ongtren.height+khoangcachhaiong;
        context.drawImage(ongtren,ong[i].x,ong[i].y+ khoangcachdenongduoi)

        ong[i].x-=5;

        if(ong[i].x == canvas.width/2){
            ong.push({
                x:canvas.width,
                y:Math.floor(Math.random()*ongtren.height)-ongtren
            })
        }
        if(ong[i].x ==0)ong.splice(0,1);
        //nếu ống đụng lề trái thì xóa nó đi để tránh mảng ống
        // bbij đầy làm chậm
        if(ong[i].x==bird.x)score++;

        // khi chim đụng ống

        if (bird.y+birdimg.height==canvas.height || bird.x+birdimg.width >= ong[i].x && bird.x <= ong[i].x +ongtren.width && (bird.y<=ong[i].y+ongtren.height || bird.y + birdimg.height>= ong[i].y+ khoangcachdenongduoi )){
            return;
        }
    }

    scoreshow.innerHTML="score: "+ score;
//cho chim rơi xuống
    bird.y+=3;
    requestAnimationFrame(run);

}
// thêm funtion cho no bay lên
document.addEventListener("keydown",function(){
    bird.y-=60;
})

run();
