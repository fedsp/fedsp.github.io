import playRound from "./round.js";
import mountData from "./mountData";
let rendered = false;
let controllersLocked = true;
const POKEMON_QTY = 760;
const DECK_QTY = 20;
const STANDARD_DEVIATION_HP = 25.35;
const STANDARD_DEVIATION_ATK = 29.03;
const STANDARD_DEVIATION_DEF = 29.16;
const AVG_HP = 68.12;
const AVG_ATK = 74.97;
const AVG_DEF = 70.49;
const AVG_SP_ATK = 68.53;
const AVG_SP_DEF = 69.12;
main();


function main() {
    if (rendered) {
        return;
    }    
    document.cards = mountData();
    
}

document.onkeydown = function (evt) {
    if(controllersLocked){
        return;
    }
    evt = evt || window.event;
    switch (evt.key) {
        case "ArrowUp":
            break;
        case "ArrowDown":
            break;
        case "Enter":
            if(player1Cards.length==DECK_QTY){
                playRound(document.cards[0], document.cards[1]);
            }
            else{
                let x = "";
            }
        default:
            return;
    }
};



window.doStuff = function () {
    playRound(player1Cards, player2Cards);
}