
let { attributeSelector } = await import("./selectAttribute.js");
const attributeSelectorObj = new attributeSelector();

export function keyboardInputController(evt, roundControllerObj) {

    evt = evt || window.event;
    switch (roundControllerObj.gameState) {
        case "notReadyToBegin":
            return;
        case "readyToBegin":
            roundControllerObj.playRound();
            break;
        case "roundStarted":
            switch (evt.key) {
                case "ArrowUp":
                    attributeSelectorObj.selectAttribute("up");
                    break;
                case "ArrowDown":
                    attributeSelectorObj.selectAttribute("down");
                    break;
                case "Enter":
                    roundControllerObj.roundPlaceover();
                    break;
                default:
                    return;
            }
            break;
        default:
            return;
    }

}