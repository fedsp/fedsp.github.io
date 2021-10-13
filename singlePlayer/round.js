export default function playRound(player1Cards,player2Cards){
    let player1Card = player1Cards[Math.floor(Math.random()*player1Cards.length)];
    drawPlayerCard(1,player1Card)
    let player2Card = player2Cards[Math.floor(Math.random()*player2Cards.length)];
    drawPlayerCard(2,player2Card)
}

function drawPlayerCard(player1Or2,card){
    let spriteDiv = document.getElementById(`player${player1Or2}Pokemon`);
    let spriteUrl = (player1Or2==1?card.spriteBack:card.spriteFront);
    spriteDiv.innerHTML = `<div class="pokemonName">${card.name}</div>
                          <img class="pokemonTile" src="${spriteUrl}"></img>`;
    let hpDiv = document.getElementById(`player${player1Or2}Hp`);
    hpDiv.innerHTML = card.hp;
    let attackDiv = document.getElementById(`player${player1Or2}Attack`);
    attackDiv.innerHTML = card.attack;
    let defenseDiv = document.getElementById(`player${player1Or2}Defense`);
    defenseDiv.innerHTML = card.defense;
    let weightDiv = document.getElementById(`player${player1Or2}Weight`);
    weightDiv.innerHTML = card.weight;
}
