let gameSeq = []; //System flashed buttons
let userSeq = []; //user pressed buttons
let btns = ["red", "yellow", "green", "purple"]; //Available buttons

let started = false; //False = Not Started
let level = 0; 
let highScore = 0;

let h2 = document.querySelector("h2"); //h2 is Selected

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game is Started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText= (`Level ${level}`);

    let randIdx = Math.floor(Math.random()*3);  //choosing random color
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);  //Adding color in game sequence
    console.log(gameSeq);
    gameFlash(randBtn);

}

function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        if(level > highScore){
            highScore = level; // Update the high score
        }
        h2.innerHTML= (`Game over! Your score was <b>${level}</b> <br>Your highest score is <b>${highScore}</b><br> Press any key to Start.`);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);  //Adding color in user sequence

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}