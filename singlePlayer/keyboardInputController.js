let { showEnemyCardFront , showEnemyCardBack } = await import("./drawer.js");

export async function keyboardInputController(evt, roundControllerObj) {
    evt = evt || window.event;

    if(evt.key=="a"){
        await showEnemyCardFront();
    }
    else if(evt.key=="s"){
        await showEnemyCardBack();
    }
    
    switch (roundControllerObj.gameState) {
        case "notReadyToBegin":
            return;
        case "readyToBegin":
            if(evt.key=="Enter"){
                await roundControllerObj.beginMatch();
            }
            else{
                return;
            }
            break;
        case "roundStarted":
            if(roundControllerObj.currentTurn!=1){
                return;
            }
            switch (evt.key) {
                case "ArrowUp":
                    roundControllerObj.attributeSelectorObj.selectAttribute("up");
                    break;
                case "ArrowDown":
                    roundControllerObj.attributeSelectorObj.selectAttribute("down");
                    break;
                case "Enter":
                    await roundControllerObj.confirmAttributeChoice();
                    break;
                default:
                    return;
            }
            break;
        default:
            return;
    }

}