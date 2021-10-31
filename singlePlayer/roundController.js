let { drawLoading , updateProgressBar , drawLoadAssets, drawPlayerCard, drawDeck , drawRoundBegin, drawPlayer1Turn, drawBattle , hideEnemyCard} = await import("./drawer.js");
let { mountData } = await import("./mountData.js");
let { attributeSelector } = await import("./selectAttribute.js");
let { battle } = await import("./battleController.js");


const optionSelectedAudio = new Audio('./media/audio/menu_confirm.wav');

export class roundController{
    constructor(){
        //possible states:
        //notReadyToBegin
        //readyToBegin
        //roundStarted
        //attributeChosen
        this.gameState = "notReadyToBegin";
        this.attributeSelectorObj = new attributeSelector();
    }

    async waitToBeginMatch(){   
        await drawLoading();      
        const cards =  await mountData();    
        await updateProgressBar(30);    
        this.player1Cards = cards[0];
        this.player2Cards = cards[1];
        await drawLoadAssets(this.player1Cards,this.player2Cards);  
        drawRoundBegin();
        this.gameState = "readyToBegin";
    }

    beginMatch(){        
        optionSelectedAudio.play();     
        this.gameState = "roundStarted"; 
        this.roundStart();
    }

    roundStart(){
        drawPlayer1Turn();
        drawDeck(1,this.player1Cards);
        drawDeck(2,this.player2Cards);
        this.player1Card = this.player1Cards[this.player1Cards.length-1];
        drawPlayerCard(1,this.player1Card);   
    } 

    async confirmAttributeChoice(){     
        this.gameState = "attributeChosen";   
        this.player2Card = this.player2Cards[this.player2Cards.length-1];
        drawPlayerCard(2,this.player2Card);   
        let battleResult = battle(this.player1Card,this.player2Card,this.attributeSelectorObj.currentSelection);
        let card;
        let tempCard;
        switch(battleResult){
            case 1:
                card = this.player2Cards.pop();
                this.player1Cards.unshift(card);
                tempCard = this.player1Cards.pop();
                this.player1Cards.unshift(tempCard);
                break;
            case 2:
                card = this.player1Cards.pop();
                this.player2Cards.unshift(card);
                tempCard = this.player2Cards.pop();
                this.player2Cards.unshift(tempCard);
                break;
            case 3:
                break;
        }
        await drawBattle();        
        hideEnemyCard(2); 
        this.gameState = "roundStarted";
        this.roundStart();
    }
    
}
