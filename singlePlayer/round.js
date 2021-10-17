export default function playRound(player1Cards,player2Cards){
    let player1Card = player1Cards[Math.floor(Math.random()*player1Cards.length)];
    drawPlayerCard(1,player1Card);
    let player2Card = player2Cards[Math.floor(Math.random()*player2Cards.length)];
    drawPlayerCard(2,player2Card);
    drawDeck(1,player1Cards)
    drawDeck(2,player2Cards)

}

function drawPlayerCard(player1Or2,card){
    let spriteDiv = document.getElementById(`player${player1Or2}PokemonTile`);
    let spriteUrl = (player1Or2==1?card.spriteBack:card.spriteFront);
    spriteDiv.src = spriteUrl;
    spriteDiv.className = card.tier=="SUPER TRUNFO"?"pokemonTile glowingTrunfo":"pokemonTile";
    let pokeNameDiv = document.getElementById(`player${player1Or2}PokemonName`);
    pokeNameDiv.innerHTML = card.name;
    let pokeTierDiv = document.getElementById(`player${player1Or2}PokemonTier`);
    pokeTierDiv.innerHTML = card.tier;
    pokeTierDiv.className = card.tier=="SUPER TRUNFO"?"tierSuperTrunfo pokemonTier":`tier${card.tier} pokemonTier`;
    let hpDiv = document.getElementById(`player${player1Or2}Hp`);
    hpDiv.innerHTML = card.hp;
    let attackDiv = document.getElementById(`player${player1Or2}Attack`);
    attackDiv.innerHTML = card.attack;
    let defenseDiv = document.getElementById(`player${player1Or2}Defense`);
    defenseDiv.innerHTML = card.defense;
    let spAttackDiv = document.getElementById(`player${player1Or2}SpAttack`);
    spAttackDiv.innerHTML = card.spAttack;
    let spDefDiv = document.getElementById(`player${player1Or2}SpDefense`);
    spDefDiv.innerHTML = card.spDefense;
    let weightDiv = document.getElementById(`player${player1Or2}Weight`);
    weightDiv.innerHTML = card.weight;
}

function drawDeck(player1Or2,deck){
    let deckDiv = document.getElementById(`player${player1Or2}deck`);
    for(let i =0;i<deck.length;i++){
        let cardPic = document.createElement("img");
        cardPic.className = "deckCard";
        cardPic.src = "./media/images/cardBack.png";
        cardPic.style.bottom = `${parseInt(i)*2}px`;
        deckDiv.appendChild(cardPic);
    }
}


