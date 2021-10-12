import playRound from "./round.js"

let rendered = false;
let player1Cards = [];
let player2Cards = [];
firstRender();

function firstRender(){
    if(rendered){
        return;
    }
    getCards();
    rendered = true;
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch(evt.key)
        {
            case "ArrowUp":
                break;
            case "ArrowDown":
                break;
            case "Enter":
                playRound(player1Cards,player2Cards);
            default:
                return;
        }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  

async function getCards(){
    let pokeIndices = Array.from({length: 52}, (x, i) => i);
    pokeIndices = pokeIndices.slice(1, 52);
    let player1Indices = [];
    let player2Indices = [];
    for (let i=0; i<20;i++){
        var randomItem = pokeIndices[Math.floor(Math.random()*pokeIndices.length)];
        player1Indices.push(randomItem);
        pokeIndices.splice(
            parseInt(pokeIndices.indexOf(randomItem)
        ), 1);       
        randomItem = pokeIndices[Math.floor(Math.random()*pokeIndices.length)];
        player2Indices.push(randomItem);
        pokeIndices.splice(
            parseInt(pokeIndices.indexOf(randomItem)
        ), 1);     
    }
    player1Indices.forEach(async (index)=>{
        let singleCard = await mountSingleCard(index);
        player1Cards.push(singleCard);
    })
    player2Indices.forEach(async (index)=>{
        let singleCard = await mountSingleCard(index);
        player2Cards.push(singleCard);
    })    
}

async function mountSingleCard(index){
    let resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
    let pokeData = await resp.json();
    let pokeCard = {
        name:pokeData.name,
        spriteBack:pokeData.sprites.back_default,
        spriteFront:pokeData.sprites.front_default,
        hp:pokeData.stats[0].base_stat,
        attack:pokeData.stats[1].base_stat,
        defense:pokeData.stats[2].base_stat,
        weight:pokeData.weight
    }
    return pokeCard;
}