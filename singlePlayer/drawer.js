
export function drawPlayerCard(player1Or2,card){
    let spriteDiv = document.getElementById(`player${player1Or2}PokemonTile`);
    let spriteUrl = (player1Or2==1?card.spriteBack:card.spriteFront);
    spriteDiv.src = spriteUrl;
    spriteDiv.className = card.tier=="SUPER TRUNFO"?"pokemonTile glowingTrunfo":"pokemonTile";
    let pokeNameDiv = document.getElementById(`player${player1Or2}PokemonName`);
    pokeNameDiv.innerHTML = card.name;
    let pokeTierDiv = document.getElementById(`player${player1Or2}PokemonTier`);
    pokeTierDiv.innerHTML = card.tier;
    pokeTierDiv.className = card.tier=="SUPER TRUNFO"?"tierSuperTrunfo pokemonTier":`tier${card.tier} pokemonTier`;
    let menuTableDiv = document.getElementById(`player${player1Or2}Table`);

    let hpRow = menuTableDiv.getElementsByClassName(`hpRow`)[0];    
    let hpDiv = hpRow.getElementsByClassName("scoreItem")[0];
    hpDiv.innerHTML = card.hp;

    let attackRow = menuTableDiv.getElementsByClassName(`attackRow`)[0];    
    let attackDiv = attackRow.getElementsByClassName("scoreItem")[0];
    attackDiv.innerHTML = card.attack;

    let defenseRow = menuTableDiv.getElementsByClassName(`defenseRow`)[0];    
    let defenseDiv = defenseRow.getElementsByClassName("scoreItem")[0];
    defenseDiv.innerHTML = card.defense;

    let spAttackRow = menuTableDiv.getElementsByClassName(`spAttackRow`)[0];    
    let spAttackDiv = spAttackRow.getElementsByClassName("scoreItem")[0];
    spAttackDiv.innerHTML = card.spAttack;

    let spDefenseRow = menuTableDiv.getElementsByClassName(`spDefenseRow`)[0];    
    let spDefenseDiv = spDefenseRow.getElementsByClassName("scoreItem")[0];
    spDefenseDiv.innerHTML = card.spDefense;
    
    let weightRow = menuTableDiv.getElementsByClassName(`weightRow`)[0];    
    let weightDiv = weightRow.getElementsByClassName("scoreItem")[0];
    weightDiv.innerHTML = card.weight;

}

export function drawDeck(player1Or2,deck){
    let deckDiv = document.getElementById(`player${player1Or2}deck`);
    for(let i =0;i<deck.length;i++){
        let cardPic = document.createElement("img");
        cardPic.className = "deckCard";
        cardPic.src = "./media/images/cardBack.png";
        cardPic.style.bottom = `${parseInt(i)*1.5}vh`;
        deckDiv.appendChild(cardPic);
    }
}


