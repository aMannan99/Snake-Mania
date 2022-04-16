//board
var blocksize=25;
let score=0;
let highest=0;
var rows=20;
var cols=20;
var board;
var context;

//hi score;
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    high_score.innerHTML=hiscore;
}

//snake
var snakex=blocksize*6;
var snakey=blocksize*6;

var snakebody=[];

//food
var foodx;
var foody;

var gameover=false;

//speed;
var velocityx=0;
var velocityy=0;

window.onload = function(){
    board=document.getElementById('board');
    board.height=rows*blocksize;
    board.width=cols*blocksize;
    context=board.getContext("2d") //getting drawing board;
  
    placefood();
    document.addEventListener('keyup',changedir);
    setInterval(update,1000/10);
}

function update(){
    if(gameover){
        return;
    }
    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="red";
    context.fillRect(foodx,foody,blocksize,blocksize);

    if(snakex==foodx && snakey==foody){
        snakebody.push([foodx,foody]);
       score++;
       scorebox.innerHTML= score; 
        placefood();
    }
    if(score>hiscoreval){
        hiscoreval=score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        high_score.innerHTML=hiscoreval;
      }

    for(let i=snakebody.length-1;i>0;i--){
        snakebody[i]=snakebody[i-1];
    }
    if(snakebody.length){
        snakebody[0]=[snakex,snakey];
    }

    context.fillStyle="green";
    snakex+=velocityx*blocksize;
    snakey+=velocityy*blocksize;
    context.fillRect(snakex,snakey,blocksize,blocksize);

    for(let i=0 ;i<snakebody.length ;i++){
        context.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize);
    }
   
    //gameover condition;
    if((snakex<0 || snakex>cols*blocksize) || (snakey<0 || snakey>rows*blocksize)){
        gameover=true;
        alert("game is over");
    }
    for(let i=0; i<snakebody.length;i++){
        if(snakex==snakebody[i][0] && snakey==snakebody[i][1]){
             gameover=true;
             alert("game is over");
        }
    }
}

function changedir(e){
    if(e.code=="ArrowUp" && velocityy!=1){
       velocityx=0;
       velocityy=-1;
    }
   else if(e.code=="ArrowDown" && velocityy!=-1){
        velocityx=0;
        velocityy=1;
     }
    else if(e.code=="ArrowLeft" && velocityx!=1){
        velocityx=-1;
        velocityy=0;
     }
    else if(e.code=="ArrowRight" && velocityx!=-1){
        velocityx=1;
        velocityy=0;
     }
}

function placefood(){
    foodx=Math.floor(Math.random()*cols)*blocksize;
    foody=Math.floor(Math.random()*rows)*blocksize;
}
