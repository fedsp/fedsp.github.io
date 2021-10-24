let { drawPlayerCard, drawDeck } = await import("./drawer.js");

export function playRound(){
    let player1Card = self.player1Cards[Math.floor(Math.random()*self.player1Cards.length)];
    drawPlayerCard(1,player1Card);
    let player2Card = self.player2Cards[Math.floor(Math.random()*self.player2Cards.length)];
    drawPlayerCard(2,player2Card);
    drawDeck(1,self.player1Cards)
    drawDeck(2,self.player2Cards)
}
