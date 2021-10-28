

export async function keyboardInputController(evt, roundControllerObj) {

    evt = evt || window.event;
    switch (roundControllerObj.gameState) {
        case "notReadyToBegin":
            return;
        case "readyToBegin":
            if(evt.key=="Enter"){
                roundControllerObj.beginMatch();
            }
            else{
                return;
            }
            break;
        case "roundStarted":
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