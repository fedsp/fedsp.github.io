

export async function mountData(){
    let pokeIndexes = Array.from({ length: self.consts.POKEMON_QTY }, (x, i) => i);
    pokeIndexes = pokeIndexes.slice(1, self.consts.POKEMON_QTY);
    let player1Indexes = [];
    let player2Indexes = [];
    for (let i = 0; i < self.consts.DECK_QTY; i++) {
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
        self.player1Cards.push(singleCard);
    }
    for (const index of player2Indexes) {
        let singleCard = await mountSingleCard(index);
        self.player2Cards.push(singleCard);
    }
    let randomIndex = parseInt(Math.floor(Math.random() * self.consts.DECK_QTY));
    Math.random() >= 0.5 ? player1Cards[randomIndex].tier='SUPER TRUNFO' : player2Cards[randomIndex].tier='SUPER TRUNFO';    
    document.getElementById("loadingScreen").style.display = "none";
    self.controllersLocked = false;
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
    let hpRate = (card.hp / self.consts.AVG_HP)>1.6?1.6:(card.hp / self.consts.AVG_HP);
    let attackRate = (card.attack / self.consts.AVG_ATK)>1.6?1.6:(card.attack / self.consts.AVG_ATK);
    let defenseRate = (card.defense / self.consts.AVG_DEF)>1.6?1.6:(card.defense / self.consts.AVG_DEF);
    let spAttackRate = (card.spAttack / self.consts.AVG_SP_ATK)>1.6?1.6:(card.spAttack / self.consts.AVG_SP_ATK);
    let spDefenseRate = (card.spDefense / self.consts.AVG_SP_DEF)>1.6?1.6:(card.spDefense / self.consts.AVG_SP_DEF);
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


