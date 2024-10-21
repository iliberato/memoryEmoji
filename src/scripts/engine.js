
const modal = document.getElementById("modal");
const caixaTempo = document.getElementById("tempo");
const caixaTempoTotal = document.getElementById("tempoTotal");

const recorde = localStorage.getItem("recorde");
document.getElementById("recorde").innerHTML = recorde;

const emojis = [
    "🤑",
    "😜",
    "🤐",
    "😎",
    "🤔",
    "😒",
    "👽",
    "👻",
];

const duplicateEmojis = [ ...emojis, ...emojis ];
let openCards = [];

let shuffleEmojis = duplicateEmojis.sort(() => (Math.random() > 0.5) ? 2: -1);

for(let i = 0; i < duplicateEmojis.length; i++) {

    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }

    console.log(openCards)
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.mp3`);
    audio.volume = 0.4;
    audio.play();
}

let timer = 0;
setInterval(() => {
    timer++;

    caixaTempo.innerText = timer;

}, 1000);

function checkMatch() {


    
    if(openCards[0].innerHTML === openCards[1].innerHTML) {

        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        playSound("acerto");
        
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        playSound("error");
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length  === duplicateEmojis.length) {
        playSound("win");
        modal.style.zIndex = "1";
        let tempoWinner = timer;
        caixaTempoTotal.innerHTML = tempoWinner;

        if (tempoWinner < recorde) {
            
            localStorage.setItem("recorde", tempoWinner)
        }


        caixaTempo.style.display = "none";
    }
}
