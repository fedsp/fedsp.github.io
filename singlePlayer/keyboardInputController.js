let { playRound } = await import("./round.js");

export function keyboardInputController(evt){
    evt = evt || window.event;
    switch (evt.key) {
        case "ArrowUp":
            break;
        case "ArrowDown":
            break;
        case "Enter":
            if(self.player1Cards.length==self.consts.DECK_QTY){
                playRound();
            }
            else{
                let x = "";
            }
        default:
            return;
    }
}