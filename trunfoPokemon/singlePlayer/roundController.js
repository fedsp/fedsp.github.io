let { updateProgressBar, drawLoadAssets, drawPlayerCard, drawDeck, drawRoundBegin, drawPlayer1Turn, drawBattle, drawTieArea, hideEnemyCard, drawGameWin, drawGameOver } = await import("./drawer.js");
let { mountData } = await import("./mountData.js");
let { attributeSelector } = await import("./selectAttribute.js");
let { battle } = await import("./battleController.js");
let { robotEnemy } = await import("./robotEnemyPlayer.js");
let { animationsController } = await import("./animationsController.js")

const optionSelectedAudio = new Audio('./media/audio/menu_confirm.wav');

export class roundController {
    constructor() {
        //possible states:
        //notReadyToBegin
        //readyToBegin
        //roundStarted
        //attributeChosen
        //gameEnd
        this.gameState = "notReadyToBegin";
        this.attributeSelectorObj = new attributeSelector();
        this.tieCards = [];
        this.currentTurn = 1;
        this.robotEnemyObj = new robotEnemy();
        this.enemyAtrributeSelected;
        this.animationsObj = new animationsController();
    }

    async waitToBeginMatch() {
        const cards = await mountData();
        await updateProgressBar(30);
        this.player1Cards = cards[0];
        this.player2Cards = cards[1];
        await drawLoadAssets(this.player1Cards, this.player2Cards);
        drawRoundBegin();
        this.gameState = "readyToBegin";
    }

    async beginMatch() {
        optionSelectedAudio.play();
        this.gameState = "roundStarted";
        await this.roundStart();
    }

    async startBattle() {
        this.player2Card = this.player2Cards[this.player2Cards.length - 1];
        drawPlayerCard(2, this.player2Card);
        let roundAttribute = (
            this.currentTurn == 1 ?
                this.attributeSelectorObj.currentSelection
                :
                this.enemyAtrributeSelected
        )
        let battleResult = battle(
            this.player1Card,
            this.player2Card,
            roundAttribute
        );
        let card;
        let tempCard;
        switch (battleResult) {
            case 1:
                card = this.player2Cards.pop();
                this.player1Cards.unshift(card);
                tempCard = this.player1Cards.pop();
                this.player1Cards.unshift(tempCard);
                if (this.tieCards.length > 0) {
                    this.player1Cards.unshift(...this.tieCards);
                    this.tieCards = [];
                }
                this.currentTurn = 1;
                break;
            case 2:
                card = this.player1Cards.pop();
                this.player2Cards.unshift(card);
                tempCard = this.player2Cards.pop();
                this.player2Cards.unshift(tempCard);
                if (this.tieCards.length > 0) {
                    this.player2Cards.unshift(...this.tieCards);
                    this.tieCards = [];
                }
                this.currentTurn = 2;
                break;
            case 3:
                this.tieCards.push(
                    this.player1Card,
                    this.player2Card
                );
                this.player1Cards.pop();
                this.player2Cards.pop();
                break;
        }
        drawTieArea(this.tieCards);
        this.currentTurn==1?
            await this.animationsObj.player1Attack()
            :
            await this.animationsObj.player2Attack();
        await drawBattle();
        await hideEnemyCard();
        this.gameState = "roundStarted";
        this.roundStart();
    }

    async roundStart() {
        if (this.player1Cards.length == 0) {
            drawGameOver();
            this.gameState = "gameEnd";
            return;
        }
        else if (this.player2Cards.length == 0) {
            drawGameWin();
            this.gameState = "gameEnd";
            return;
        }
        drawPlayer1Turn();
        drawDeck(1, this.player1Cards);
        drawDeck(2, this.player2Cards);
        this.player1Card = this.player1Cards[this.player1Cards.length - 1];
        await drawPlayerCard(1, this.player1Card);
        if (this.currentTurn == 2) {
            this.enemyAtrributeSelected = this.robotEnemyObj.automaticPlayTurn(
                this.player2Cards[this.player2Cards.length - 1]
            );
            this.gameState = "attributeChosen";
            this.startBattle();
        }
        // ##############################
        let cheat = this.player2Cards[this.player2Cards.length - 1];
        console.log(cheat.hp);
        console.log(cheat.attack);
        console.log(cheat.defense);
        console.log(cheat.spAttack);
        console.log(cheat.spDefense);
        console.log(cheat.weight);
        // ##############################
    }

    async confirmAttributeChoice() {
        this.gameState = "attributeChosen";
        await this.startBattle();
    }
}
