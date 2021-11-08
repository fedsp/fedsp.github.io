let { sleep } = await import("./utils.js");

export async function drawLoadAssets(deck1, deck2) {
    let assetDiv = document.getElementById("assetPreloadDiv");
    [deck1, deck2].forEach(function (deck, deckNumber) {
        deck.forEach(function (item, PokeNumber) {
            const singlePokeImg = document.createElement("img");
            singlePokeImg.id = `singlePokeImgD${(deckNumber + 1)}P${PokeNumber}`;
            singlePokeImg.src = (deckNumber + 1) == 1 ? item.spriteBack : item.spriteFront;
            singlePokeImg.className = "singlePokeImg";
            assetDiv.appendChild(singlePokeImg);
        })
    })
    let spritesLoaded = false;
    while (!spritesLoaded) {
        spritesLoaded = await checkAssetLoadingProgress();
        await sleep(100);
    }
    await sleep(300);
    document.getElementById("loadingScreen").style.display = "none";
}

export async function updateProgressBar(percentage){
    let progressBarContent = document.getElementById("loadingBarFill");
    let absolutePercentageValue = percentage * 0.15;
    progressBarContent.style.width = absolutePercentageValue + "vw";
}

async function checkAssetLoadingProgress() {
    const deckQty = self.consts.DECK_QTY;
    let spritesLoaded = 0;
    for (let deck = 1; deck <= 2; deck++) {
        for (let cardNumber = 0; cardNumber < deckQty; cardNumber++) {
            const image = document.getElementById(`singlePokeImgD${deck}P${cardNumber}`);
            if (image.complete && image.naturalHeight !== 0) {
                spritesLoaded++;
            }
        }
    }
    let percentage = (spritesLoaded*102)/(deckQty*2);
    updateProgressBar(percentage);
    if (spritesLoaded < (deckQty * 2)) {
        return false;
    }
    else {
        return true;
    }
}

export async function drawPlayerCard(player1Or2, card) {
    let menuDiv = document.getElementById(`player${player1Or2}Menu`);
    menuDiv.className = "";
    let spriteImg = document.getElementById(`player${player1Or2}PokemonTile`);
    let spriteUrl = (player1Or2 == 1 ? card.spriteBack : card.spriteFront);
    spriteImg.src = spriteUrl;
    spriteImg.className = card.tier == "SUPER TRUNFO" ? "pokemonTile glowingTrunfo" : "pokemonTile";

    let pokeContainerDiv = document.getElementById(`player${player1Or2}Pokemon`);
    let labelsDiv = pokeContainerDiv.getElementsByTagName("div")[0];
    labelsDiv.className = "pokemonLabels";
    let pokeNameDiv = document.getElementById(`player${player1Or2}PokemonName`);
    pokeNameDiv.innerHTML = card.name;
    let pokeTierDiv = document.getElementById(`player${player1Or2}PokemonTier`);
    pokeTierDiv.innerHTML = card.tier;
    pokeTierDiv.className = card.tier == "SUPER TRUNFO" ? "tierSuperTrunfo pokemonTier" : `tier${card.tier} pokemonTier`;
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
    if (player1Or2 == 2) {
        showEnemyCardFront();
    }
}

export function drawDeck(player1Or2, deck) {
    let deckDiv = document.getElementById(`player${player1Or2}deck`);
    deckDiv.innerHTML = "";
    for (let i = 0; i < deck.length; i++) {
        let cardPic = document.createElement("img");
        cardPic.className = "deckCard";
        cardPic.src = "./media/images/cardBack.png";
        cardPic.style.bottom = `${parseInt(i) * 1.5}vh`;
        deckDiv.appendChild(cardPic);
    }
}

export function drawCursor(prevIndex, newIndex) {
    const attributeRowNames = [
        "hpRow",
        "attackRow",
        "defenseRow",
        "spAttackRow",
        "spDefenseRow",
        "weightRow",
    ]
    let menuTable = document.getElementById(`player1Table`);
    let prevRow = menuTable.getElementsByClassName(attributeRowNames[prevIndex])[0];
    let prevCursorDiv = prevRow.getElementsByClassName("cursorCell")[0];
    prevCursorDiv.className = "cursorCell";
    let newRow = menuTable.getElementsByClassName(attributeRowNames[newIndex])[0];
    let newCursorDiv = newRow.getElementsByClassName("cursorCell")[0];
    newCursorDiv.className = "cursorCell cursorCellCurrent";
}

export function drawRoundBegin() {
    for (let i = 1; i <= 2; i++) {
        // let spriteImg = document.getElementById(`player${i}PokemonTile`);
        // let frontOrBack = i == 1 ? "Back" : "Front";
        // spriteImg.src = `./media/images/misteriousPokemon${frontOrBack}.png`;
        // let playerMenu = document.getElementById(`player${i}Menu`);
        // playerMenu.className = "hiddenElement";
        // let pokemonLabelDiv = document.getElementById(`player${i}Pokemon`);
        // let innerPokemonLabelDiv = pokemonLabelDiv.getElementsByTagName("div")[0];
        // innerPokemonLabelDiv.className = "pokemonLabels hiddenElement";
        // if(i==2){
        //     showEnemyCardFront();
        // }
    }
}


export function drawPlayer1Turn() {
    let pressStartDiv = document.getElementById("pressStart");
    pressStartDiv.className = "hiddenElement";
    let playerMenu = document.getElementById(`player1Menu`);
    playerMenu.className = "";
    let pokemonLabelDiv = document.getElementById(`player1Pokemon`);
    let innerPokemonLabelDiv = pokemonLabelDiv.getElementsByTagName("div")[0];
    innerPokemonLabelDiv.className = "pokemonLabels";
}

export async function drawBattle() {
    await sleep(1);
}

export async function hideEnemyCard() {
    let spriteImg = document.getElementById(`player2PokemonTile`);
    spriteImg.src = `./media/images/misteriousPokemonFront.png`;
    await showEnemyCardBack();
    let playerMenu = document.getElementById(`player2Menu`);
    playerMenu.className = "hiddenElement";
    let pokemonLabelDiv = document.getElementById(`player2Pokemon`);
    let innerPokemonLabelDiv = pokemonLabelDiv.getElementsByTagName("div")[0];
    innerPokemonLabelDiv.className = "hiddenElement pokemonLabels";
}

export function drawTieArea(tieCards){
    let tieAreaDiv = document.getElementById("tieAreaDiv");
    let internalTieAreaDiv = document.getElementById("internalTieAreaDiv");
    internalTieAreaDiv.innerHTML = "";
    if(tieCards.length>0){
        tieAreaDiv.className = "";
        tieCards.forEach((tieCard)=>{
            const miniPoke = document.createElement("img");
            miniPoke.src = tieCard.spriteFront;
            miniPoke.className = "tieAreaPokemon";
            internalTieAreaDiv.appendChild(miniPoke);
        })
    }
    else{
        tieAreaDiv.className = "hiddenElement";
    }
}

export function drawGameWin(){
    let gameWinOverlay = document.getElementById("gameWinOverlay");
    gameWinOverlay.classList.remove("hiddenElement");
}

export function drawGameOver(){
    let gameOverOverlay = document.getElementById("gameOverOverlay");
    gameOverOverlay.classList.remove("hiddenElement");
}

export function showEnemyCardFront(){
    const enemyCardBackDiv = document.getElementById("enemyCardBackDiv");
    enemyCardBackDiv.className = "enemyCardBackDivAppear";
    const enemyCardFrontDiv = document.getElementById("enemyCardFrontDiv");
    enemyCardFrontDiv.className = "enemyCardFrontDivhide";
}


export function showEnemyCardBack(){
    const enemyCardFrontDiv = document.getElementById("enemyCardFrontDiv");
    enemyCardFrontDiv.className = "enemyCardFrontDivAppear";
    const enemyCardBackDiv = document.getElementById("enemyCardBackDiv");
    enemyCardBackDiv.className = "enemyCardBackDivhide";
}