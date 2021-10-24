let { playRound } = await import("./round.js");
let { attributeSelector } = await import("./selectAttribute.js");
const attributeSelectorObj = new attributeSelector();

export function keyboardInputController(evt){
    
    evt = evt || window.event;
    switch (evt.key) {
        case "ArrowUp":
            attributeSelectorObj.selectAttribute("up");
            break;
        case "ArrowDown":
            attributeSelectorObj.selectAttribute("down");
            break;
        case "Enter":
            if(self.player1Cards.length==self.consts.DECK_QTY){
                playRound();
            }
            else{
                let x = "";
            }
            break
        default:
            return;
    }
}