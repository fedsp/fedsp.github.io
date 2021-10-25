let { drawPlayerCard, drawDeck , drawRoundBegin, drawPlayer1Turn } = await import("./drawer.js");
let { mountData } = await import("./mountData.js");

const optionSelectedAudio = new Audio('./media/audio/menu_confirm.wav');

export class roundController{
    constructor(){
        //possible states:
        //notReadyToBegin
        //readyToBegin
        //roundStarted
        //optionChosen
        this.gameState = "notReadyToBegin";
    }

    async beginMatch(){        
        const cards =  await mountData();
        this.player1Cards = cards[0];
        this.player2Cards = cards[1];    
        drawRoundBegin();
        this.gameState = "readyToBegin";
    }

    playRound(){
        this.gameState = "roundStarted";
        optionSelectedAudio.play();
        drawPlayer1Turn();
        drawDeck(1,this.player1Cards);
        drawDeck(2,this.player2Cards);
        let player1Card = this.player1Cards[Math.floor(Math.random()*this.player1Cards.length)];
        drawPlayerCard(1,player1Card);
    }

    roundPlaceover(){        
        let player2Card = this.player2Cards[Math.floor(Math.random()*this.player2Cards.length)];
        drawPlayerCard(2,player2Card);        
    }
    
}
