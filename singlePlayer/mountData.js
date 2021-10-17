export default async function mountData(){
    let pokeIndexes = Array.from({ length: POKEMON_QTY }, (x, i) => i);
    pokeIndexes = pokeIndexes.slice(1, POKEMON_QTY);
    let player1Indexes = [];
    let player2Indexes = [];
    for (let i = 0; i < DECK_QTY; i++) {
        var randomItem = pokeIndexes[Math.floor(Math.random() * pokeIndexes.length)];
        player1Indexes.push(randomItem);
        pokeIndexes.splice(
            parseInt(pokeIndexes.indexOf(randomItem)
            ), 1);
        randomItem = pokeIndexes[Math.floor(Math.random() * pokeIndexes.length)];
        player2Indexes.push(randomItem);
        pokeIndexes.splice(
            parseInt(pokeIndexes.indexOf(randomItem)
            ), 1);
    }
    for (const index of player1Indexes) {
        let singleCard = await mountSingleCard(index);
        player1Cards.push(singleCard);
    }
    for (const index of player2Indexes) {
        let singleCard = await mountSingleCard(index);
        player2Cards.push(singleCard);
    }
    let randomIndex = parseInt(Math.floor(Math.random() * DECK_QTY));
    Math.random() >= 0.5 ? player1Cards[randomIndex].tier='SUPER TRUNFO' : player2Cards[randomIndex].tier='SUPER TRUNFO';
    rendered = true;
    controllersLocked = false;
    document.getElementById("loadingScreen").style.display = "none";
    return player1Cards,player2Cards;
}

async function mountSingleCard(index) {
    let resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
    let pokeData = await resp.json();
    let hpScore = Math.round((parseInt(pokeData.stats[0].base_stat)*0.1))*10;
    let attackScore = Math.round((parseInt(pokeData.stats[1].base_stat)*0.1))*10;
    let defenseScore = Math.round((parseInt(pokeData.stats[2].base_stat)*0.1))*10;
    let specialAttackScore = Math.round((parseInt(pokeData.stats[3].base_stat)*0.1))*10;
    let specialDefenseScore = Math.round((parseInt(pokeData.stats[4].base_stat)*0.1))*10;

    let pokeCard = {
        name: pokeData.name,
        spriteBack: pokeData.sprites.back_default != null ? pokeData.sprites.back_default : "./media/images/genericPokemonBack.png",
        spriteFront: pokeData.sprites.front_default != null ? pokeData.sprites.front_default : "./media/images/genericPokemonBack.png",
        hp: hpScore,
        attack: attackScore,
        defense: defenseScore,
        spAttack: specialAttackScore,
        spDefense: specialDefenseScore,
        weight: pokeData.weight,
        trunfo: false
    }
    let pokemonTier = calcPokemonTier(pokeCard);
    pokeCard.tier = pokemonTier;
    return pokeCard;
}

function calcPokemonTier(card) {
    let hpRate = (card.hp / AVG_HP)>1.6?1.6:(card.hp / AVG_HP);
    let attackRate = (card.attack / AVG_ATK)>1.6?1.6:(card.attack / AVG_ATK);
    let defenseRate = (card.defense / AVG_DEF)>1.6?1.6:(card.defense / AVG_DEF);
    let spAttackRate = (card.spAttack / AVG_SP_ATK)>1.6?1.6:(card.spAttack / AVG_SP_ATK);
    let spDefenseRate = (card.spDefense / AVG_SP_DEF)>1.6?1.6:(card.spDefense / AVG_SP_DEF);
    let pokemonScore = (
        (hpRate * 0.12) +
        (attackRate * 0.12) +
        (defenseRate * 0.12) +
        (spAttackRate * 0.12) +
        (spDefenseRate * 0.12) 
    )
    let pokemonTier;
    switch (true) {
        case (pokemonScore < 0.35):
            pokemonTier = "D";
            break;
        case (pokemonScore >= 0.35 && pokemonScore < 0.5):
            pokemonTier = "C";
            break;
        case (pokemonScore >= 0.5 && pokemonScore < 0.75):
            pokemonTier = "B";
            break;
        case (pokemonScore >= 0.75):
            pokemonTier = "A";
            break;
        default:
            pokemonTier = "?";
            break;
    }
    return pokemonTier;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
